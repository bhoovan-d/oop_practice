import { NextResponse } from "next/server";

const JAVA_LANGUAGE_ID = 62;
const MAX_SOURCE_LENGTH = 60_000;
const MAX_INPUT_LENGTH = 8_000;

type SubmissionResult = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  time?: string | null;
  memory?: number | null;
  status?: { id?: number; description?: string };
};

function headers() {
  const token = process.env.JUDGE0_AUTH_TOKEN;
  return {
    "Content-Type": "application/json",
    ...(token ? { "X-Auth-Token": token } : {}),
  };
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { sourceCode?: unknown; stdin?: unknown };
    const sourceCode = typeof body.sourceCode === "string" ? body.sourceCode : "";
    const stdin = typeof body.stdin === "string" ? body.stdin : "";

    if (!sourceCode.trim()) {
      return NextResponse.json({ error: "Write some Java code before running it." }, { status: 400 });
    }
    if (sourceCode.length > MAX_SOURCE_LENGTH || stdin.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({ error: "The code or input is too large for this practice runner." }, { status: 413 });
    }

    const base = (process.env.JUDGE0_BASE_URL || "https://ce.judge0.com").replace(/\/$/, "");
    const created = await fetch(`${base}/submissions?base64_encoded=false&wait=false`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: JAVA_LANGUAGE_ID,
        stdin,
        cpu_time_limit: 3,
        wall_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    if (!created.ok) {
      return NextResponse.json(
        { error: "The free Java runner is busy. Your code is saved; try again shortly." },
        { status: 503 },
      );
    }

    const submission = (await created.json()) as { token?: string };
    if (!submission.token) {
      return NextResponse.json({ error: "The runner did not accept this submission." }, { status: 502 });
    }

    let result: SubmissionResult | null = null;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      await wait(650);
      const response = await fetch(
        `${base}/submissions/${encodeURIComponent(submission.token)}?base64_encoded=false&fields=stdout,stderr,compile_output,message,status,time,memory`,
        { headers: headers() },
      );
      if (!response.ok) continue;
      result = (await response.json()) as SubmissionResult;
      const statusId = result.status?.id ?? 0;
      if (statusId > 2) break;
    }

    if (!result || (result.status?.id ?? 0) <= 2) {
      return NextResponse.json({ error: "The runner timed out while waiting for a result." }, { status: 504 });
    }

    return NextResponse.json({
      status: result.status?.description || "Finished",
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compileOutput: result.compile_output || "",
      message: result.message || "",
      time: result.time || null,
      memory: result.memory || null,
    });
  } catch {
    return NextResponse.json(
      { error: "The Java runner is temporarily unavailable. Your draft remains saved." },
      { status: 503 },
    );
  }
}

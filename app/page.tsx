"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Code2,
  Flame,
  Lightbulb,
  ListChecks,
  Loader2,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Terminal,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  allChallenges,
  challengesFor,
  modules,
  starterFor,
  type Difficulty,
} from "@/lib/curriculum";

const STORAGE_KEY = "object-lab-progress-v1";

type SavedProgress = {
  completed: string[];
  drafts: Record<string, string>;
  attempts: Record<string, number>;
  lastChallenge?: string;
};

type RunResult = {
  status?: string;
  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  time?: string | null;
  error?: string;
};

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown | Promise<unknown>;
    },
    options?: { signal?: AbortSignal },
  ) => void | Promise<void>;
};

declare global {
  interface Document {
    readonly modelContext?: ModelContext;
  }
}

const emptyProgress: SavedProgress = { completed: [], drafts: {}, attempts: {} };

function difficultyStyle(difficulty: Difficulty) {
  if (difficulty === "easy") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (difficulty === "moderate") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-orange-200 bg-orange-50 text-orange-800";
}

function sourceLabel(source: (typeof modules)[number]["source"]) {
  if (source === "sample-calibrated") return "Lab-sheet grounded";
  if (source === "course-confirmed") return "Course confirmed";
  return "Syllabus derived";
}

function approachFor(week: number) {
  if (week <= 2) {
    return "Separate input, calculation and output. Write one small helper method for each calculation, then drive those methods from Main. Test every boundary named in the requirements.";
  }
  if (week <= 5) {
    return "List the domain nouns, decide which object owns each rule, and expose operations instead of changing fields directly. Let Main coordinate input and output while the objects protect their own state.";
  }
  if (week <= 8) {
    return "Choose the data structure or functional interface from the operations you need. Keep traversal and transformation logic reusable, then test empty, singleton, duplicate and malformed inputs.";
  }
  if (week <= 10) {
    return "Keep the application state and rules outside the AWT widgets. Event handlers should translate an event into one model operation and then refresh the visible controls.";
  }
  if (week === 11) {
    return "Validate close to the domain rule, throw a meaningful exception, and catch it only where the program can recover or add context. Verify that failed operations leave state unchanged.";
  }
  if (week === 12) {
    return "Define resource ownership and shared-state invariants before coding. Use bounded work, deterministic cleanup and explicit coordination instead of relying on timing.";
  }
  return "Identify what varies, place it behind a small interface, and keep the stable workflow in one place. Demonstrate that a new behaviour can be added with a local change.";
}

export default function Home() {
  const [moduleId, setModuleId] = useState(modules[0].id);
  const [conceptId, setConceptId] = useState(modules[0].concepts[0][0]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState("learn");
  const [progress, setProgress] = useState<SavedProgress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);
  const [code, setCode] = useState(starterFor("easy"));
  const [stdin, setStdin] = useState("");
  const [consoleText, setConsoleText] = useState("Run your program when you are ready.");
  const [running, setRunning] = useState(false);
  const [runAccepted, setRunAccepted] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  const activeModule = modules.find((module) => module.id === moduleId) ?? modules[0];
  const moduleChallenges = useMemo(() => challengesFor(activeModule), [activeModule]);
  const challenge =
    moduleChallenges.find(
      (item) => item.conceptId === conceptId && item.difficulty === difficulty,
    ) ?? moduleChallenges[0];

  const completed = progress.completed.includes(challenge.id);
  const totalComplete = progress.completed.length;
  const mastery = Math.round((totalComplete / allChallenges.length) * 100);
  const moduleComplete = moduleChallenges.filter((item) => progress.completed.includes(item.id)).length;
  const attempts = progress.attempts[challenge.id] ?? 0;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress({ ...emptyProgress, ...JSON.parse(saved) });
    } catch {
      setProgress(emptyProgress);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const savedDraft = progress.drafts[challenge.id];
    setCode(mode === "exam" ? "" : (savedDraft ?? starterFor(challenge.difficulty)));
    setStdin("");
    setConsoleText("Run your program when you are ready.");
    setRunAccepted(false);
    setHintCount(0);
    setSecondsLeft(challenge.duration * 60);
  }, [challenge.id, challenge.difficulty, hydrated, mode]);

  useEffect(() => {
    if (mode !== "exam") return;
    const timer = window.setInterval(
      () => setSecondsLeft((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const reportRegistrationError = (error: unknown) => {
      console.warn("WebMCP registration failed", error);
    };

    void Promise.resolve(
      context.registerTool(
        {
          name: "read_practice_progress",
          title: "Read practice progress",
          description: "Read the learner's visible CS F213 progress and current coding challenge.",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
          annotations: { readOnlyHint: true, untrustedContentHint: false },
          execute: () => ({
            completed: totalComplete,
            total: allChallenges.length,
            masteryPercent: mastery,
            current: {
              week: activeModule.week,
              module: activeModule.title,
              concept: challenge.concept,
              difficulty: challenge.difficulty,
              challengeId: challenge.id,
            },
          }),
        },
        { signal: lifecycle.signal },
      ),
    ).catch(reportRegistrationError);

    void Promise.resolve(
      context.registerTool(
        {
          name: "start_practice_challenge",
          title: "Start a practice challenge",
          description: "Open a visible coding challenge by week, concept ID and difficulty.",
          inputSchema: {
            type: "object",
            properties: {
              week: { type: "integer", minimum: 1, maximum: 13 },
              conceptId: { type: "string" },
              difficulty: { type: "string", enum: ["easy", "moderate", "hard"] },
            },
            required: ["week", "conceptId", "difficulty"],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute: (input: unknown) => {
            if (!input || typeof input !== "object") throw new Error("Input must be an object.");
            const request = input as { week?: unknown; conceptId?: unknown; difficulty?: unknown };
            const selectedModule = modules.find((item) => item.week === request.week);
            if (!selectedModule) throw new Error("Week must be between 1 and 13.");
            const selectedConcept = selectedModule.concepts.find(([id]) => id === request.conceptId);
            if (!selectedConcept) throw new Error("The concept ID does not belong to that week.");
            if (!(["easy", "moderate", "hard"] as unknown[]).includes(request.difficulty)) {
              throw new Error("Difficulty must be easy, moderate or hard.");
            }
            setModuleId(selectedModule.id);
            setConceptId(selectedConcept[0]);
            setDifficulty(request.difficulty as Difficulty);
            return {
              opened: `${selectedModule.id}-${selectedConcept[0]}-${request.difficulty}`,
              week: selectedModule.week,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(reportRegistrationError);

    return () => lifecycle.abort();
  }, [activeModule, challenge, mastery, totalComplete]);

  function saveProgress(next: SavedProgress) {
    setProgress(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function updateDraft(value: string) {
    setCode(value);
    if (!hydrated) return;
    saveProgress({
      ...progress,
      drafts: { ...progress.drafts, [challenge.id]: value },
      lastChallenge: challenge.id,
    });
  }

  function chooseModule(nextModuleId: string) {
    const nextModule = modules.find((module) => module.id === nextModuleId) ?? modules[0];
    setModuleId(nextModule.id);
    setConceptId(nextModule.concepts[0][0]);
    setDifficulty("easy");
  }

  function chooseDifficulty(nextDifficulty: string) {
    setDifficulty(nextDifficulty as Difficulty);
  }

  async function runCode() {
    setRunning(true);
    setRunAccepted(false);
    setConsoleText("Sending your program to the Java runner...");
    const nextAttempts = { ...progress.attempts, [challenge.id]: attempts + 1 };
    saveProgress({ ...progress, attempts: nextAttempts, lastChallenge: challenge.id });

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceCode: code, stdin }),
      });
      const result = (await response.json()) as RunResult;
      if (!response.ok) throw new Error(result.error || "The runner could not complete this attempt.");

      const output = [
        `Status: ${result.status}`,
        result.compileOutput ? `\nCompiler\n${result.compileOutput}` : "",
        result.stderr ? `\nErrors\n${result.stderr}` : "",
        result.stdout ? `\nOutput\n${result.stdout}` : "\nOutput\n(no output)",
        result.time ? `\nTime: ${result.time}s` : "",
      ].filter(Boolean).join("");
      setConsoleText(output);
      setRunAccepted(result.status === "Accepted" && !result.compileOutput && !result.stderr);
    } catch (error) {
      setConsoleText(
        `${error instanceof Error ? error.message : "The runner is unavailable."}\n\nYour draft is saved. You can retry without losing any work.`,
      );
    } finally {
      setRunning(false);
    }
  }

  function markComplete() {
    if (completed) return;
    saveProgress({
      ...progress,
      completed: [...progress.completed, challenge.id],
      drafts: { ...progress.drafts, [challenge.id]: code },
      lastChallenge: challenge.id,
    });
  }

  function nextChallenge() {
    const currentIndex = moduleChallenges.findIndex((item) => item.id === challenge.id);
    const ordered = [
      ...moduleChallenges.slice(currentIndex + 1),
      ...moduleChallenges.slice(0, currentIndex + 1),
    ];
    const next = ordered.find((item) => !progress.completed.includes(item.id));
    if (next) {
      setConceptId(next.conceptId);
      setDifficulty(next.difficulty);
      return;
    }
    const moduleIndex = modules.findIndex((module) => module.id === activeModule.id);
    chooseModule(modules[(moduleIndex + 1) % modules.length].id);
  }

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "18rem" } as React.CSSProperties}
      className="bg-[#07111f]"
    >
      <Sidebar className="border-r-0 bg-[#07111f] text-slate-100">
        <SidebarHeader className="gap-5 px-4 pb-3 pt-5">
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-300 text-[#07111f] shadow-[0_0_30px_rgba(103,232,249,.2)]">
              <Braces className="size-5" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300">CS F213</p>
              <p className="text-base font-semibold tracking-tight">Object Lab</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Course mastery</span>
              <span className="font-mono text-cyan-300">{mastery}%</span>
            </div>
            <Progress value={mastery} className="h-1.5 bg-white/10 [&_[data-slot=progress-indicator]]:bg-cyan-300" />
            <p className="mt-2 text-[11px] text-slate-500">{totalComplete} of {allChallenges.length} challenges complete</p>
          </div>
        </SidebarHeader>

        <SidebarContent className="scrollbar-thin px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
              Learning path
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {modules.map((module) => {
                  const list = challengesFor(module);
                  const done = list.filter((item) => progress.completed.includes(item.id)).length;
                  return (
                    <SidebarMenuItem key={module.id}>
                      <SidebarMenuButton
                        isActive={module.id === activeModule.id}
                        onClick={() => chooseModule(module.id)}
                        className="h-11 rounded-lg px-2.5 text-slate-400 hover:bg-white/[0.06] hover:text-white data-[active=true]:bg-cyan-300/10 data-[active=true]:text-cyan-100"
                        tooltip={module.title}
                      >
                        <span className="w-6 font-mono text-[11px] text-slate-600 group-data-[active=true]/menu-button:text-cyan-300">
                          {String(module.week).padStart(2, "0")}
                        </span>
                        <span className="flex-1 truncate text-sm">{module.shortTitle}</span>
                      </SidebarMenuButton>
                      {done === list.length && done > 0 ? (
                        <SidebarMenuBadge className="text-emerald-300"><Check className="size-3.5" /></SidebarMenuBadge>
                      ) : done > 0 ? (
                        <SidebarMenuBadge className="font-mono text-[10px] text-cyan-300">{done}/{list.length}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-4 pb-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3">
            <span className="grid size-9 place-items-center rounded-lg bg-orange-400/10 text-orange-300"><Flame className="size-4" /></span>
            <div>
              <p className="text-sm font-medium">Adaptive path</p>
              <p className="text-xs text-slate-500">Only unfinished work is recommended</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-svh overflow-hidden bg-[#f4f7fb] text-[#102033]">
        <header className="flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/85 px-4 py-3 backdrop-blur md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="shrink-0 text-slate-500" />
            <span className="hidden text-sm text-slate-400 sm:inline">Week {activeModule.week}</span>
            <ChevronRight className="hidden size-4 text-slate-300 sm:block" />
            <span className="truncate text-sm font-medium">{activeModule.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {mode === "exam" && (
              <span className={`font-mono text-sm font-semibold ${secondsLeft < 300 ? "text-red-600" : "text-slate-500"}`}>
                {minutes}:{seconds}
              </span>
            )}
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="h-9 rounded-lg bg-slate-100 p-1">
                <TabsTrigger value="learn" className="px-3 text-xs"><BookOpen className="size-3.5" /> Learn</TabsTrigger>
                <TabsTrigger value="exam" className="px-3 text-xs"><Clock3 className="size-3.5" /> Exam</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        <div className="scrollbar-thin min-h-0 flex-1 overflow-auto">
          <section className="mx-auto w-full max-w-[1520px] px-4 py-5 md:px-7 md:py-7">
            <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(260px,1fr)_auto_auto] lg:items-end">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={difficultyStyle(challenge.difficulty)}>{challenge.difficulty}</Badge>
                  <Badge variant="outline" className="border-slate-200 bg-white text-slate-500">{sourceLabel(activeModule.source)}</Badge>
                  <span className="font-mono text-xs text-slate-400">{challenge.id.toUpperCase()}</span>
                </div>
                <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#0b1b2d] md:text-[2rem]">{challenge.title}</h1>
                <p className="mt-1.5 max-w-3xl text-[15px] leading-6 text-slate-500">{challenge.brief}</p>
              </div>

              <Select value={conceptId} onValueChange={setConceptId}>
                <SelectTrigger className="h-11 min-w-56 bg-white"><SelectValue /></SelectTrigger>
                <SelectContent align="end">
                  {activeModule.concepts.map(([id, title]) => (
                    <SelectItem key={id} value={id}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tabs value={difficulty} onValueChange={chooseDifficulty}>
                <TabsList className="h-11 bg-white p-1 shadow-sm">
                  <TabsTrigger value="easy" className="px-3 text-xs">Easy</TabsTrigger>
                  <TabsTrigger value="moderate" className="px-3 text-xs">Moderate</TabsTrigger>
                  <TabsTrigger value="hard" className="px-3 text-xs">Hard</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-cyan-50 text-cyan-700"><Target className="size-4" /></span>
                <div>
                  <p className="text-xs text-slate-400">Concept progress</p>
                  <p className="text-sm font-medium">{moduleComplete}/{moduleChallenges.length} in this module</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {completed && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"><CircleCheck className="size-3.5" /> Completed</Badge>}
                <Button variant="outline" size="sm" onClick={nextChallenge}>Next unfinished <ChevronRight className="size-4" /></Button>
              </div>
            </div>

            <div className="grid min-h-[690px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,.07)] xl:grid-cols-[minmax(370px,.8fr)_minmax(560px,1.2fr)]">
              <article className="scrollbar-thin overflow-auto border-b border-slate-200 p-5 md:p-7 xl:max-h-[calc(100svh-230px)] xl:border-b-0 xl:border-r">
                {mode === "learn" ? (
                  <div className="mb-7 flex items-start gap-3 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-700" />
                    <div>
                      <p className="text-sm font-semibold text-cyan-950">Core idea</p>
                      <p className="mt-1 text-sm leading-6 text-cyan-900/70">{challenge.principle}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-7 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-orange-700" />
                    <div>
                      <p className="text-sm font-semibold text-orange-950">Exam conditions</p>
                      <p className="mt-1 text-sm leading-6 text-orange-900/70">Blank editor, no hints, and a {challenge.duration}-minute timer. Your draft is still saved.</p>
                    </div>
                  </div>
                )}

                <h2 className="text-lg font-semibold">Your task</h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">{challenge.brief}</p>

                <h3 className="mt-7 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400">
                  <ListChecks className="size-4" /> Requirements
                </h3>
                <ul className="mt-3 space-y-3 text-[15px] text-slate-600">
                  {challenge.requirements.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-500" /><span>{item}</span></li>
                  ))}
                </ul>

                <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">Completion target</p>
                      <p className="mt-1 text-sm font-medium">A complete Java 11 program in Main.java</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">~{challenge.duration} min</span>
                  </div>
                </div>

                {mode === "learn" && (
                  <div className="mt-6 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-between border-amber-200 bg-amber-50 text-amber-950 hover:bg-amber-100"
                      onClick={() => setHintCount((value) => Math.min(3, value + 1))}
                    >
                      <span className="flex items-center gap-2"><Lightbulb className="size-4 text-amber-600" /> Reveal hint {Math.min(3, hintCount + 1)} of 3</span>
                      <ChevronRight className="size-4" />
                    </Button>
                    {hintCount >= 1 && <p className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm leading-6 text-slate-600"><strong>Hint 1:</strong> {challenge.principle}</p>}
                    {hintCount >= 2 && <p className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm leading-6 text-slate-600"><strong>Hint 2:</strong> Write the smallest valid normal case first. Add one rule at a time and rerun after each change.</p>}
                    {hintCount >= 3 && <p className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm leading-6 text-slate-600"><strong>Hint 3:</strong> Turn every requirement into a separate test in Main before you consider the solution complete.</p>}
                    {attempts >= 2 && (
                      <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                        <p className="text-sm font-semibold text-indigo-950">Solution approach</p>
                        <p className="mt-1 text-sm leading-6 text-indigo-900/70">{approachFor(activeModule.week)}</p>
                      </div>
                    )}
                  </div>
                )}
              </article>

              <section className="flex min-h-[690px] min-w-0 flex-col bg-[#0a1525] text-slate-100 xl:max-h-[calc(100svh-230px)]">
                <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
                  <div className="flex items-center gap-2 text-sm"><Code2 className="size-4 text-cyan-300" /><span className="font-mono">Main.java</span><span className="text-xs text-slate-600">autosaved</span></div>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-white/10 hover:text-white" onClick={() => updateDraft(mode === "exam" ? "" : starterFor(challenge.difficulty))}>
                    <RotateCcw className="size-3.5" /> Reset
                  </Button>
                </div>

                <textarea
                  aria-label="Java code editor"
                  value={code}
                  onChange={(event) => updateDraft(event.target.value)}
                  spellCheck={false}
                  placeholder={mode === "exam" ? "Write your complete Java program here..." : undefined}
                  className="scrollbar-thin min-h-[360px] flex-1 resize-none bg-[#0a1525] p-5 font-mono text-[14px] leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-cyan-400/40"
                />

                <div className="grid shrink-0 border-t border-white/10 lg:grid-cols-[minmax(180px,.42fr)_minmax(300px,.58fr)]">
                  <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
                    <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4 text-xs font-medium text-slate-400"><Terminal className="size-3.5" /> Standard input</div>
                    <textarea
                      aria-label="Program standard input"
                      value={stdin}
                      onChange={(event) => setStdin(event.target.value)}
                      spellCheck={false}
                      placeholder="Optional input for Scanner..."
                      className="scrollbar-thin h-32 w-full resize-none bg-[#07111f] px-4 py-3 font-mono text-xs leading-5 text-slate-300 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-cyan-400/30 lg:h-44"
                    />
                  </div>
                  <div className="bg-[#07111f]">
                    <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
                      <div>
                        <p className="text-sm font-medium">Run console</p>
                        <p className="text-xs text-slate-500">Attempt {attempts + 1}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(runAccepted || completed) && !completed && <Button size="sm" variant="outline" className="border-emerald-500/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20" onClick={markComplete}><Trophy className="size-4" /> Mark complete</Button>}
                        <Button onClick={runCode} disabled={running || !code.trim()} className="bg-cyan-300 text-[#06101d] shadow-[0_0_24px_rgba(103,232,249,.18)] hover:bg-cyan-200">
                          {running ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4 fill-current" />}{running ? "Running" : "Run code"}
                        </Button>
                      </div>
                    </div>
                    <pre aria-live="polite" className="scrollbar-thin h-28 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-5 text-slate-400 lg:h-[130px]">{consoleText}</pre>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-[#050d18] px-4 py-2 text-[11px] text-slate-500">
                  <AlertTriangle className="size-3.5 text-amber-500/70" />
                  The free runner checks compilation and execution. Confirm every requirement before marking complete.
                </div>
              </section>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

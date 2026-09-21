"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  BookOpen, Braces, Check, ChevronRight, CircleCheck, ClipboardCheck,
  Clock3, Copy, FileCode2, Flame, Lightbulb, ListChecks, Save,
  Sparkles, Target, Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allChallenges, challengesFor, modules, type Difficulty } from "@/lib/curriculum";

const STORAGE_KEY = "object-lab-progress-v2";
type SavedProgress = { completed: string[]; solutions: Record<string, string>; lastChallenge?: string };
const emptyProgress: SavedProgress = { completed: [], solutions: {} };

type ModelContext = { registerTool: (tool: {
  name: string; title: string; description: string; inputSchema: object;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown | Promise<unknown>;
}, options?: { signal?: AbortSignal }) => void | Promise<void> };
declare global { interface Document { readonly modelContext?: ModelContext } }

function difficultyStyle(value: Difficulty) {
  if (value === "easy") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (value === "moderate") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-orange-200 bg-orange-50 text-orange-800";
}

function sourceLabel(source: (typeof modules)[number]["source"]) {
  if (source === "sample-calibrated") return "Lab-sheet grounded";
  if (source === "course-confirmed") return "Course confirmed";
  return "Syllabus derived";
}

export default function Home() {
  const [moduleId, setModuleId] = useState(modules[0].id);
  const [conceptId, setConceptId] = useState(modules[0].concepts[0][0]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState("learn");
  const [progress, setProgress] = useState<SavedProgress>(emptyProgress);
  const [solution, setSolution] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const activeModule = modules.find((item) => item.id === moduleId) ?? modules[0];
  const moduleChallenges = useMemo(() => challengesFor(activeModule), [activeModule]);
  const challenge = moduleChallenges.find(
    (item) => item.conceptId === conceptId && item.difficulty === difficulty,
  ) ?? moduleChallenges[0];
  const totalComplete = progress.completed.length;
  const mastery = Math.round((totalComplete / allChallenges.length) * 100);
  const moduleComplete = moduleChallenges.filter((item) => progress.completed.includes(item.id)).length;
  const completed = progress.completed.includes(challenge.id);

  useEffect(() => {
    try {
      const v2 = window.localStorage.getItem(STORAGE_KEY);
      if (v2) setProgress({ ...emptyProgress, ...JSON.parse(v2) });
      else {
        const v1 = window.localStorage.getItem("object-lab-progress-v1");
        if (v1) {
          const old = JSON.parse(v1) as { completed?: string[]; drafts?: Record<string, string> };
          const migrated = { completed: old.completed ?? [], solutions: old.drafts ?? {} };
          setProgress(migrated);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        }
      }
    } catch { setProgress(emptyProgress); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSolution(progress.solutions[challenge.id] ?? "");
    setHintCount(0); setCopied(false); setSavedNotice(false);
    setSecondsLeft(challenge.duration * 60);
  }, [challenge.id, challenge.duration, hydrated]);

  useEffect(() => {
    if (mode !== "exam") return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (value: void | Promise<void>) => void Promise.resolve(value).catch(console.warn);
    register(context.registerTool({
      name: "read_practice_progress", title: "Read practice progress",
      description: "Read the visible CS F213 topic, question and completion progress.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ completed: totalComplete, total: allChallenges.length, masteryPercent: mastery,
        current: { week: activeModule.week, topic: challenge.concept, difficulty: challenge.difficulty, challengeId: challenge.id } }),
    }, { signal: lifecycle.signal }));
    register(context.registerTool({
      name: "start_practice_challenge", title: "Open a practice question",
      description: "Open a visible coding question by week, topic ID and difficulty.",
      inputSchema: { type: "object", properties: {
        week: { type: "integer", minimum: 1, maximum: 13 }, conceptId: { type: "string" },
        difficulty: { type: "string", enum: ["easy", "moderate", "hard"] },
      }, required: ["week", "conceptId", "difficulty"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input: unknown) => {
        if (!input || typeof input !== "object") throw new Error("Input must be an object.");
        const request = input as { week?: unknown; conceptId?: unknown; difficulty?: unknown };
        const selectedModule = modules.find((item) => item.week === request.week);
        if (!selectedModule) throw new Error("Week must be between 1 and 13.");
        const selectedConcept = selectedModule.concepts.find(([id]) => id === request.conceptId);
        if (!selectedConcept) throw new Error("The topic ID does not belong to that week.");
        if (!(["easy", "moderate", "hard"] as unknown[]).includes(request.difficulty)) throw new Error("Invalid difficulty.");
        setModuleId(selectedModule.id); setConceptId(selectedConcept[0]); setDifficulty(request.difficulty as Difficulty);
        return { opened: `${selectedModule.id}-${selectedConcept[0]}-${request.difficulty}` };
      },
    }, { signal: lifecycle.signal }));
    return () => lifecycle.abort();
  }, [activeModule, challenge, mastery, totalComplete]);

  function persist(next: SavedProgress) {
    setProgress(next); window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  function updateSolution(value: string) {
    setSolution(value);
    if (!hydrated) return;
    const next = { ...progress, solutions: { ...progress.solutions, [challenge.id]: value }, lastChallenge: challenge.id };
    persist(next);
  }
  function saveSolution() {
    persist({ ...progress, solutions: { ...progress.solutions, [challenge.id]: solution }, lastChallenge: challenge.id });
    setSavedNotice(true); window.setTimeout(() => setSavedNotice(false), 1800);
  }
  function chooseModule(id: string) {
    const next = modules.find((item) => item.id === id) ?? modules[0];
    setModuleId(next.id); setConceptId(next.concepts[0][0]); setDifficulty("easy");
  }
  function markComplete() {
    const nextCompleted = completed ? progress.completed.filter((id) => id !== challenge.id) : [...progress.completed, challenge.id];
    persist({ ...progress, completed: nextCompleted, solutions: { ...progress.solutions, [challenge.id]: solution }, lastChallenge: challenge.id });
  }
  function nextChallenge() {
    const current = moduleChallenges.findIndex((item) => item.id === challenge.id);
    const ordered = [...moduleChallenges.slice(current + 1), ...moduleChallenges.slice(0, current + 1)];
    const next = ordered.find((item) => !progress.completed.includes(item.id));
    if (next) { setConceptId(next.conceptId); setDifficulty(next.difficulty); return; }
    chooseModule(modules[(modules.findIndex((item) => item.id === activeModule.id) + 1) % modules.length].id);
  }
  async function copyQuestion() {
    const spec = challenge.spec;
    await navigator.clipboard.writeText([
      `${challenge.title} (${challenge.difficulty})`, `Topic: ${challenge.concept}`, "", "OBJECTIVE", spec.objective,
      "", "PROBLEM STATEMENT", ...spec.problemStatement, "", "REQUIRED FILES", ...spec.requiredFiles.map((item) => `- ${item}`),
      "", "TYPE CONTRACTS", ...spec.contracts.flatMap((contract) => [
        `${contract.kind.toUpperCase()}: ${contract.name}`, contract.purpose,
        "Fields:", ...contract.fields.map((item) => `- ${item}`), "Constructors:", ...contract.constructors.map((item) => `- ${item}`),
        "Methods:", ...contract.methods.map((item) => `- ${item}`), `Collaboration: ${contract.collaboration}`, "",
      ]),
      "PROGRAM FLOW", ...spec.programFlow.map((item, index) => `${index + 1}. ${item}`), "", "RULES AND VALIDATION", ...spec.rules.map((item) => `- ${item}`),
      "", "INPUT FORMAT", ...spec.inputFormat.map((item) => `- ${item}`), "", `${challenge.inputLabel.toUpperCase()}`, challenge.sampleInput,
      "", "OUTPUT FORMAT", ...spec.outputFormat.map((item) => `- ${item}`), "", `${challenge.outputLabel.toUpperCase()}`, challenge.sampleOutput,
      "", "COMPLETION TESTS", ...spec.completionTests.map((item) => `- ${item}`),
    ].join("\n"));
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  }

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <SidebarProvider style={{ "--sidebar-width": "18rem" } as CSSProperties} className="bg-[#07111f]">
      <Sidebar className="border-r-0 bg-[#07111f] text-slate-100">
        <SidebarHeader className="gap-5 px-4 pb-3 pt-5">
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-300 text-[#07111f]"><Braces className="size-5" strokeWidth={2.5} /></span>
            <div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300">CS F213</p><p className="font-semibold">Object Lab</p></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
            <div className="mb-2 flex justify-between text-xs"><span className="text-slate-400">Course mastery</span><span className="font-mono text-cyan-300">{mastery}%</span></div>
            <Progress value={mastery} className="h-1.5 bg-white/10 [&_[data-slot=progress-indicator]]:bg-cyan-300" />
            <p className="mt-2 text-[11px] text-slate-500">{totalComplete} of {allChallenges.length} questions complete</p>
          </div>
        </SidebarHeader>
        <SidebarContent className="scrollbar-thin px-2">
          <SidebarGroup><SidebarGroupLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Course modules</SidebarGroupLabel>
            <SidebarGroupContent><SidebarMenu className="gap-1.5">{modules.map((module) => {
              const list = challengesFor(module); const done = list.filter((item) => progress.completed.includes(item.id)).length;
              return <SidebarMenuItem key={module.id}>
                <SidebarMenuButton isActive={module.id === activeModule.id} onClick={() => chooseModule(module.id)}
                  className="h-11 rounded-lg px-2.5 text-slate-400 hover:bg-white/[0.06] hover:text-white data-[active=true]:bg-cyan-300/10 data-[active=true]:text-cyan-100" tooltip={module.title}>
                  <span className="w-6 font-mono text-[11px] text-slate-600">{String(module.week).padStart(2, "0")}</span><span className="flex-1 truncate text-sm">{module.shortTitle}</span>
                </SidebarMenuButton>
                {done === list.length && done > 0 ? <SidebarMenuBadge className="text-emerald-300"><Check className="size-3.5" /></SidebarMenuBadge> : done > 0 ? <SidebarMenuBadge className="font-mono text-[10px] text-cyan-300">{done}/{list.length}</SidebarMenuBadge> : null}
              </SidebarMenuItem>;
            })}</SidebarMenu></SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-4 pb-4"><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3">
          <span className="grid size-9 place-items-center rounded-lg bg-orange-400/10 text-orange-300"><Flame className="size-4" /></span>
          <div><p className="text-sm font-medium">Topic by topic</p><p className="text-xs text-slate-500">Easy → moderate → hard</p></div>
        </div></SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-svh bg-[#f4f7fb] text-[#102033]">
        <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur md:px-7">
          <div className="flex min-w-0 items-center gap-3"><SidebarTrigger className="shrink-0 text-slate-500" /><span className="hidden text-sm text-slate-400 sm:inline">Week {activeModule.week}</span><ChevronRight className="hidden size-4 text-slate-300 sm:block" /><span className="truncate text-sm font-medium">{activeModule.title}</span></div>
          <div className="flex items-center gap-3">{mode === "exam" && <span className={`font-mono text-sm font-semibold ${secondsLeft < 300 ? "text-red-600" : "text-slate-500"}`}>{minutes}:{seconds}</span>}
            <Tabs value={mode} onValueChange={setMode}><TabsList className="h-9 rounded-lg bg-slate-100 p-1"><TabsTrigger value="learn" className="px-3 text-xs"><BookOpen className="size-3.5" /> Learn</TabsTrigger><TabsTrigger value="exam" className="px-3 text-xs"><Clock3 className="size-3.5" /> Exam</TabsTrigger></TabsList></Tabs>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1480px] px-4 py-5 md:px-7 md:py-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-cyan-50 text-cyan-700"><Target className="size-4" /></span><div><p className="text-xs text-slate-400">Module progress</p><p className="text-sm font-medium">{moduleComplete}/{moduleChallenges.length} questions completed</p></div></div>
            <Button variant="outline" size="sm" onClick={nextChallenge}>Next unfinished <ChevronRight className="size-4" /></Button>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
              <div className="px-3 pb-3 pt-2"><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">Topics in week {activeModule.week}</p><h2 className="mt-1 font-semibold">{activeModule.title}</h2></div>
              <div className="space-y-1">{activeModule.concepts.map(([id, title], index) => {
                const done = moduleChallenges.filter((item) => item.conceptId === id && progress.completed.includes(item.id)).length;
                const selected = id === conceptId;
                return <button key={id} onClick={() => { setConceptId(id); setDifficulty("easy"); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${selected ? "bg-[#0b1b2d] text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span className={`grid size-7 shrink-0 place-items-center rounded-lg font-mono text-[11px] ${selected ? "bg-cyan-300 text-[#07111f]" : "bg-slate-100 text-slate-400"}`}>{index + 1}</span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{title}</span><span className="text-[11px] text-slate-400">{done}/3 complete</span></span>{done === 3 && <CircleCheck className="size-4 text-emerald-400" />}
                </button>;
              })}</div>
            </aside>

            <section className="min-w-0 space-y-5">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,.07)]">
                <div className="border-b border-slate-200 p-5 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2"><Badge variant="outline" className={difficultyStyle(challenge.difficulty)}>{challenge.difficulty}</Badge><Badge variant="outline" className="border-slate-200 bg-white text-slate-500">{sourceLabel(activeModule.source)}</Badge><span className="font-mono text-[11px] text-slate-400">{challenge.concept}</span></div>
                    <h1 className="text-2xl font-semibold tracking-[-0.035em] text-[#0b1b2d] md:text-[2rem]">{challenge.title}</h1><p className="mt-2 max-w-4xl text-[15px] leading-7 text-slate-600">{challenge.brief}</p>
                  </div><Button variant="outline" onClick={copyQuestion}>{copied ? <ClipboardCheck className="size-4 text-emerald-600" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy question"}</Button></div>
                  <Tabs value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)} className="mt-6"><TabsList className="h-11 bg-slate-100 p-1"><TabsTrigger value="easy" className="px-5 text-xs">Easy</TabsTrigger><TabsTrigger value="moderate" className="px-5 text-xs">Moderate</TabsTrigger><TabsTrigger value="hard" className="px-5 text-xs">Hard</TabsTrigger></TabsList></Tabs>
                </div>

                <div className="space-y-7 p-5 md:p-7">
                  {mode === "learn" ? <div className="flex items-start gap-3 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4"><Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-700" /><div><p className="text-sm font-semibold text-cyan-950">Objective</p><p className="mt-1 text-sm leading-6 text-cyan-900/75">{challenge.spec.objective}</p></div></div> : <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4"><Clock3 className="mt-0.5 size-4 shrink-0 text-orange-700" /><div><p className="text-sm font-semibold text-orange-950">Exam attempt</p><p className="mt-1 text-sm leading-6 text-orange-900/70">The complete contract remains visible. Work in your own IDE without opening the hints, then return here to save your solution.</p></div></div>}

                  <section><h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400"><BookOpen className="size-4" /> Problem statement</h2>
                    <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-650">{challenge.spec.problemStatement.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
                  </section>

                  <section><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400"><Braces className="size-4" /> Required files and type contracts</h2><p className="mt-2 text-sm leading-6 text-slate-500">Create these files and public signatures first. The method bodies are the part you must solve.</p></div><div className="flex flex-wrap gap-2">{challenge.spec.requiredFiles.map((file) => <code key={file} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">{file}</code>)}</div></div>
                    <div className="mt-4 space-y-4">{challenge.spec.contracts.map((contract) => <article key={contract.name} className="overflow-hidden rounded-2xl border border-slate-200"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3"><h3 className="font-semibold text-slate-900">{contract.name}</h3><Badge variant="outline" className="bg-white font-mono text-[10px] uppercase text-slate-500">{contract.kind}</Badge></div><div className="space-y-5 p-4"><p className="text-sm leading-6 text-slate-600">{contract.purpose}</p><div className="grid gap-5 lg:grid-cols-3"><div><h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fields</h4><ul className="mt-2 space-y-2">{contract.fields.map((item) => <li key={item}><code className="block rounded-lg bg-[#07111f] px-3 py-2 text-xs leading-5 text-cyan-100">{item}</code></li>)}</ul></div><div><h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Constructors</h4><ul className="mt-2 space-y-2">{contract.constructors.map((item) => <li key={item}><code className="block rounded-lg bg-[#07111f] px-3 py-2 text-xs leading-5 text-cyan-100">{item}</code></li>)}</ul></div><div><h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Required methods</h4><ul className="mt-2 space-y-2">{contract.methods.map((item) => <li key={item}><code className="block rounded-lg bg-[#07111f] px-3 py-2 text-xs leading-5 text-cyan-100">{item}</code></li>)}</ul></div></div><p className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-2 text-sm leading-6 text-indigo-950/75"><strong>How it collaborates:</strong> {contract.collaboration}</p></div></article>)}</div>
                  </section>

                  <section><h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400"><ListChecks className="size-4" /> Program flow</h2>
                    <ol className="mt-4 space-y-3">{challenge.spec.programFlow.map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0b1b2d] font-mono text-sm font-semibold text-cyan-300">{index + 1}</span><p className="pt-1 text-sm leading-6 text-slate-600">{item}</p></li>)}</ol>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"><h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400"><CircleCheck className="size-4" /> Rules and validation</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{challenge.spec.rules.map((item) => <li key={item} className="flex gap-3"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-500" /><span>{item}</span></li>)}</ul>
                  </section>

                  <section><h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-400">Input and output contract</h2><div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="rounded-xl border border-slate-200 p-4"><h3 className="font-semibold text-slate-800">Input format</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{challenge.spec.inputFormat.map((item) => <li key={item} className="flex gap-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-500" /><span>{item}</span></li>)}</ul></div><div className="rounded-xl border border-slate-200 p-4"><h3 className="font-semibold text-slate-800">Output format</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{challenge.spec.outputFormat.map((item) => <li key={item} className="flex gap-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-500" /><span>{item}</span></li>)}</ul></div></div></section>

                  <section><div className="mb-3 flex flex-wrap items-end justify-between gap-2"><div><p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-400">Worked example</p><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{challenge.spec.exampleExplanation}</p></div><span className="font-mono text-xs text-slate-400">Target time: {challenge.duration} min</span></div>
                    <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-[#07111f] text-slate-100 lg:grid-cols-2"><div className="border-b border-white/10 lg:border-b-0 lg:border-r"><div className="border-b border-white/10 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-cyan-300">{challenge.inputLabel}</div><pre className="min-h-36 overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-slate-300">{challenge.sampleInput}</pre></div><div><div className="border-b border-white/10 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-emerald-300">{challenge.outputLabel}</div><pre className="min-h-36 overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-slate-300">{challenge.sampleOutput}</pre></div></div>
                  </section>

                  <section><h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-400"><Target className="size-4" /> Completion tests</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{challenge.spec.completionTests.map((item, index) => <div key={item} className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Test {index + 1}</p><p className="mt-2 text-sm leading-6 text-slate-600">{item}</p></div>)}</div></section>

                  {mode === "learn" && <section className="space-y-3"><Button variant="outline" className="w-full justify-between border-amber-200 bg-amber-50 text-amber-950 hover:bg-amber-100" onClick={() => setHintCount((value) => Math.min(3, value + 1))}><span className="flex items-center gap-2"><Lightbulb className="size-4 text-amber-600" /> Reveal hint {Math.min(3, hintCount + 1)} of 3</span><ChevronRight className="size-4" /></Button>{challenge.spec.hints.slice(0, hintCount).map((hint, index) => <p key={hint} className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm leading-6 text-slate-600"><strong>Hint {index + 1}:</strong> {hint}</p>)}</section>}
                </div>
              </article>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-3"><span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700"><FileCode2 className="size-5" /></span><div><h2 className="font-semibold">My solution</h2><p className="mt-1 text-sm text-slate-500">Write the program in your own IDE, then paste it here if you want to keep it with your progress.</p></div></div>{completed && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"><CircleCheck className="size-3.5" /> Completed</Badge>}</div>
                <textarea aria-label="Paste your Java solution" value={solution} onChange={(event) => updateSolution(event.target.value)} spellCheck={false} placeholder="Paste your completed Java solution here (optional)..." className="mt-5 min-h-56 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-400">Stored only in this browser. No code is uploaded or executed.</p><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={saveSolution}><Save className="size-4" />{savedNotice ? "Saved" : "Save solution"}</Button><Button onClick={markComplete} className={completed ? "bg-slate-700 hover:bg-slate-600" : "bg-[#0b1b2d] hover:bg-[#132d49]"}>{completed ? <Check className="size-4" /> : <Trophy className="size-4" />}{completed ? "Mark incomplete" : "Save and mark complete"}</Button></div></div>
              </section>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

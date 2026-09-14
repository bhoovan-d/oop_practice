export type PlanDifficulty = "easy" | "moderate" | "hard";

export type ImplementationStep = {
  title: string;
  detail: string;
};

type PlanContext = {
  week: number;
  conceptId: string;
  title: string;
  brief: string;
  principle: string;
  difficulty: PlanDifficulty;
  taskRules: string[];
  inputLabel: string;
  outputLabel: string;
};

const conceptTechnique: Record<string, string> = {
  "program-structure": "Put the entry point in public class Main and move each report calculation into a small static method selected by the command.",
  "primitive-types": "Declare each value with the narrowest suitable primitive type, but promote operands before any calculation that can exceed that type's range.",
  "scanner-input": "Choose next(), nextInt() or nextLine() for each field; after token input, consume the pending newline exactly once before reading a full line.",
  conversion: "Write the formula with floating-point operands, store the unrounded result, and round only in printf when displaying it.",
  "math-formatting": "Calculate every requested value first, then use one printf format for each required precision or column width.",
  arguments: "Validate args.length before indexing args, convert inside a guarded block, and route the first argument to the requested operation.",
  conditionals: "Write mutually exclusive branches in boundary order and keep each adjustment in a named variable so overlapping rules are applied once.",
  switch: "Read the selector, route it with switch, validate the operands inside the selected case, and give invalid selectors a default response.",
  "while-loops": "Initialize the changing state before the loop, update it once per iteration, and make the exit condition or sentinel explicit.",
  "for-loops": "Use the loop header for the counter and limit; keep accumulated values outside the loop and check overflow before multiplication or addition.",
  "nested-control": "Let the outer loop own rows or candidates and the inner loop own columns or comparisons; reset inner-loop state at the start of each outer iteration.",
  "break-continue": "Name the outer loop when one decision must skip or stop both loops, and update counters before each continue or break.",
  "class-basics": "List the state owned by each class, make that state private, then add methods for the operations that are allowed to change it.",
  constructors: "Declare required fields first and validate every constructor argument before assigning fields or registering the object.",
  "overloaded-constructors": "Choose one full constructor as the canonical path and make every shorter constructor call it with this(...).",
  references: "Create the original object, assign or copy references deliberately, mutate through one reference, and print identity and state evidence through the others.",
  methods: "Turn each domain action into an instance method; validate inside that method and return a value that tells Main whether the action succeeded.",
  encapsulation: "Keep fields private, validate proposed values before assignment, and calculate derived values in methods instead of exposing setters for them.",
  "static-members": "Keep per-object data in instance fields and put only the shared counter, policy or allocator in static fields and methods.",
  "object-parameters": "Pass complete domain objects to the coordinator method, validate both objects before mutation, then update both as one successful operation.",
  "returning-objects": "Search or construct the result inside a method and return the actual domain object; return null or an explicit result only for the specified failure case.",
  composition: "Store owned collaborator objects in private fields and make the containing service coordinate their operations rather than copying their data.",
  responsibilities: "Place each validation or calculation in the class that owns the required data; leave Main responsible only for setup, commands and printing.",
  "this-keyword": "Use this.field for assignments, this(...) for constructor delegation and return this only after a chained update has passed validation.",
  "method-overloading": "Define the required parameter lists, then delegate simpler overloads to the most complete overload so the rule is implemented once.",
  "varargs-nesting": "Expose one varargs entry method, validate the operand count there and use private nested helpers for the individual operations.",
  extends: "Put shared fields and behavior in the superclass, subtype-only state in subclasses and exercise every subtype through superclass references.",
  "super-access": "Initialize inherited state with super(...), call super.method() only for behavior being extended and keep visibility as narrow as subclass access allows.",
  "constructor-chains": "Make each subclass constructor call super(...) first, then validate and assign only its additional fields.",
  overriding: "Declare the common operation in the base type, override it with the same signature and call it through a base-type collection to demonstrate dynamic dispatch.",
  "abstract-classes": "Put shared state and concrete workflow code in the abstract class, declare the varying operation abstract and implement it in every concrete subclass.",
  interfaces: "Declare the capability methods in an interface, implement them in unrelated classes and invoke them through interface references.",
  packages: "Create the requested package folders, add matching package declarations, expose only the types used across packages and import them in Main.",
  "array-basics": "Allocate the array from the supplied size, fill every index, then make the requested result in a separate traversal without assuming the sample size.",
  "array-methods": "Put the transformation in a method that accepts the array and decide explicitly whether it mutates the input or returns a new array.",
  "two-dimensional": "Read row and column sizes independently, nest loops using each row's actual length and keep result storage separate when updates depend on old values.",
  "object-arrays": "Allocate reference slots, construct objects only for valid records, check for null before access and centralize add, find, update and remove logic.",
  "array-list": "Store domain objects in an ArrayList and implement each command with add, indexed traversal or removeIf while preserving the required order.",
  maps: "Normalize the key once, use it consistently for lookup and update, and define duplicate-key behavior before modifying the map.",
  iteration: "Choose Iterator when removing during traversal and Enumeration only where the legacy collection is part of the exercise.",
  "string-basics": "Keep the original String unchanged, store each transformed result separately and traverse code points when the task includes non-ASCII text.",
  comparison: "Normalize only when the rule requires it, compare content with equals or equalsIgnoreCase and handle ambiguous partial matches explicitly.",
  "builder-buffer": "Create one builder, append inside the loop and convert to String once; synchronize only when several threads share the same mutable buffer.",
  tokenization: "Define delimiters and quoted or empty-field rules first, then scan one token at a time while recording the position of invalid input.",
  "regex-validation": "Compile one anchored Pattern for each complete-field rule, call matches(), and print the specific rule that failed.",
  "regex-extraction": "Compile the Pattern once, iterate with Matcher.find(), read named or numbered groups and accumulate each extracted result.",
  "lambda-syntax": "Declare a single-method functional interface, create the required lambdas and select or store them through that interface type.",
  "block-lambdas": "Use braces for the multi-step lambda body, keep intermediate values local and return a value on every branch.",
  "functional-interfaces": "Give each interface one abstract method with precise input and output types, then supply implementations with lambdas.",
  "passing-lambdas": "Write one traversal method that accepts the functional interface and call it with different predicates, comparators or policies.",
  capture: "Keep captured configuration effectively final and replace shared mutable counters with a safe accumulator when work can run concurrently.",
  "method-references": "Match each existing constructor or method signature to the target functional interface before replacing the forwarding lambda with :: syntax.",
  frames: "Create the Frame and components on EventQueue.invokeLater, add components, set size or pack, and install a closing handler.",
  layouts: "Assign layout managers before adding controls, nest Panels for separate regions and call pack so preferred sizes drive the window.",
  controls: "Construct each control, add it to a labelled panel, read its value only on submit and place validation feedback beside the relevant control.",
  "menus-dialogs": "Create menu actions once, open a focused Dialog for editing and copy values into the model only when the user confirms.",
  graphics: "Store drawing data as fields, override paint(Graphics), derive coordinates from current component size and call repaint after state changes.",
  "ui-architecture": "Implement and test the model or service first, then let event handlers translate widget values into service calls and display returned results.",
  "action-listeners": "Register each listener once, map the event source or action command to a short handler and send all calculations to reusable methods.",
  adapters: "Extend the appropriate adapter, override only the callbacks used and translate each callback into an update of model state.",
  "input-events": "Register the key or mouse listener, translate event coordinates or key codes into domain commands and clamp all resulting state to valid bounds.",
  "event-state": "Create one model object that survives between events and make every handler complete or reject its state change before refreshing controls.",
  "event-design": "Keep handlers as a three-step flow: read controls, call a domain operation, then render the returned state or error.",
  "try-catch": "Put only the operation that can fail inside try, catch the recoverable exception, print context and continue at the correct loop boundary.",
  "multiple-catch": "Catch specific exception types first, give each a distinct response and avoid a broad catch that hides programming faults.",
  "throw-throws": "Check the method contract before mutation, throw a meaningful exception on failure and declare checked exceptions for the caller to handle.",
  propagation: "Let lower methods throw without printing, add context at the service boundary and catch once in Main where recovery is possible.",
  "custom-exceptions": "Create a named exception with useful context fields, throw it at the failed domain rule and catch it separately from unrelated failures.",
  "finally-assertions": "Acquire the resource before try, release it in finally and use assert only for internal states that should be impossible after validation.",
  "thread-creation": "Put each independent task in Runnable, create named Threads, call start() and join every worker before printing the combined result.",
  "thread-lifecycle": "Use join, interruption and shared completion state for coordination; make loops respond to interruption without timing assumptions.",
  synchronization: "Identify the shared invariant, guard every read-modify-write path with the same lock and acquire multiple locks in a fixed order.",
  "keyboard-streams": "Wrap text streams in buffered readers and writers with an explicit charset and process one line at a time inside try-with-resources.",
  "byte-streams": "Open buffered byte streams in try-with-resources, loop until read returns -1 and write exactly the number of bytes read.",
  "file-api": "Convert the supplied path once, inspect existence and type before acting, sort directory results and reject destination conflicts before moving anything.",
  "random-data-io": "Document the binary field order and byte size, write fields in that order and seek to headerSize + index * recordSize for updates.",
  serialization: "Make the required classes Serializable, define serialVersionUID, mark excluded state transient and validate the graph after deserialization.",
  "responsibility-design": "List the domain responsibilities, assign each to one class and make the application service coordinate objects without duplicating their rules.",
  singleton: "Hide the constructor, store one private static instance, expose getInstance() and add the required synchronization only for concurrent creation.",
  factory: "Return an interface or abstract type from the factory, validate the type key there and keep concrete construction out of Main.",
  strategy: "Define one strategy interface, implement each algorithm separately and inject the selected strategy into the context before calculation.",
  observer: "Keep observers in the subject, prevent duplicate subscriptions, update subject state first and notify a safe snapshot of listeners.",
  "adapter-template": "Wrap the incompatible API in an adapter and put the fixed workflow order in a final template method with protected variation steps.",
};

function programStructure(week: number) {
  if (week <= 2) return "Create Main.java with public class Main. Add small static helper methods for calculation and validation so main only reads input, calls the helpers and prints results.";
  if (week <= 4) return "Create Main.java and the domain classes named by the question. Give each class private fields, a constructor and only the methods needed for its own responsibilities.";
  if (week === 5) return "Create Main.java plus the required base type, subclasses or interfaces. Keep shared members in the base type and specialized behavior in the concrete types.";
  if (week <= 8) return "Create Main.java and separate the data-processing operation into reusable methods or small domain classes before connecting it to input and output.";
  if (week <= 10) return "Create the domain model first, then create the AWT Frame or controller that reads controls and calls that model from event handlers.";
  if (week === 11) return "Create Main.java, the domain operation that may fail and any named exception classes required by the question.";
  if (week === 12) return "Create Main.java and separate worker, stream or persistence classes so lifecycle and cleanup rules stay outside the demonstration code.";
  return "Create Main.java, the stable abstraction for the pattern and one class for each participating implementation named by the question.";
}

function inputStep(inputLabel: string, conceptId: string) {
  if (conceptId === "arguments") return "Read values from String[] args in the exact order shown in Sample input. Check the operation name and argument count before converting any value.";
  if (inputLabel.includes("user actions")) return "Create the controls shown by the sample actions. Treat each click, selection or typed value as an event and send it to the model in the same order.";
  if (inputLabel.includes("setup / actions")) return "Construct the initial objects shown in the sample setup, then invoke each listed action in order. Do not hard-code the expected result.";
  return "In main, read the fields in the exact order shown under Sample input. Use loops for repeated records or commands, and store parsed values before changing program state.";
}

function splitRules(rules: string[]) {
  return rules.flatMap((rule) => rule.split(/;\s+|\.\s+(?=[A-Z])/).map((part) => part.trim()).filter(Boolean));
}

function validationStep(difficulty: PlanDifficulty) {
  if (difficulty === "easy") return "Run the worked example, then run one boundary value such as zero, an empty value or the smallest allowed size. Fix formatting differences character by character.";
  if (difficulty === "moderate") return "Run the worked example plus one boundary case and one invalid case. Confirm rejected input produces the required message and does not leave a partial update.";
  return "Run the worked example, a valid alternative, every important boundary and at least one failure for each rejection rule. Compare state before and after every rejected operation.";
}

function ruleTitle(rule: string) {
  const value = rule.toLowerCase();
  if (value.startsWith("create") || value.startsWith("model") || value.startsWith("declare")) return "Create the required types";
  if (value.startsWith("read") || value.startsWith("accept")) return "Read and validate the data";
  if (value.startsWith("support") || value.startsWith("process")) return "Implement the commands";
  if (value.startsWith("print") || value.startsWith("produce")) return "Produce the required result";
  if (value.startsWith("reject") || value.startsWith("prevent")) return "Handle rejected operations";
  if (value.startsWith("use") || value.startsWith("put")) return "Apply the required design";
  return "Implement the next task rule";
}

const exactPlans: Record<string, ImplementationStep[]> = {
  "class-basics:hard": [
    {
      title: "Implement Vehicle",
      detail: "Give Vehicle a private registration field, validate that it is not blank in the constructor, and provide a getter. A registration identifies one vehicle throughout the program.",
    },
    {
      title: "Implement ParkingTicket",
      detail: "Store the Vehicle and its arrival time in ParkingTicket. Provide getters so ParkingLot can calculate the stay without letting Main edit ticket state.",
    },
    {
      title: "Store active vehicles in ParkingLot",
      detail: "Give ParkingLot a fixed capacity and a collection keyed by registration. Add containsRegistration(...) and availableSpaces() helpers so duplicate and full-lot checks live in one place.",
    },
    {
      title: "Implement enter(...) before exit(...) ",
      detail: "enter(Vehicle, arrivalTime) first checks capacity and duplicate registration. On success, create and store a ParkingTicket; on failure, return a clear result without changing the collection.",
    },
    {
      title: "Implement exit(...) and its fee calculation",
      detail: "exit(registration, exitTime) finds the active ticket, rejects a missing vehicle or an exit before arrival, and calculates ceil((exitTime - arrivalTime) / 30.0) fee units. Remove the ticket only after the calculation succeeds.",
    },
    {
      title: "Connect commands in Main",
      detail: "Read ENTER and EXIT commands in a loop. For ENTER, construct a Vehicle and call lot.enter(...); for EXIT, call lot.exit(...). Print the returned ticket, fee or rejection message after each command.",
    },
  ],
};

export function buildImplementationSteps(context: PlanContext): ImplementationStep[] {
  const rules = splitRules(context.taskRules);
  const ruleSteps = rules.map((rule, index) => ({
    title: `${ruleTitle(rule)}${rules.filter((item) => ruleTitle(item) === ruleTitle(rule)).length > 1 ? ` (${index + 1})` : ""}`,
    detail: `${rule.replace(/[.]$/, "")}.`,
  }));
  const exactPlan = exactPlans[`${context.conceptId}:${context.difficulty}`];
  const coreSteps = exactPlan ?? [
    {
      title: `Implement ${context.title}`,
      detail: `${context.brief} Do the calculation or state transition from input values rather than copying the sample answer.`,
    },
    {
      title: `Use ${context.conceptId.replaceAll("-", " ")}`,
      detail: conceptTechnique[context.conceptId] ?? context.principle,
    },
    ...ruleSteps,
  ];

  return [
    { title: "Create the files and types", detail: programStructure(context.week) },
    { title: "Define the input path", detail: inputStep(context.inputLabel, context.conceptId) },
    ...coreSteps,
    {
      title: "Print the required result",
      detail: `Produce every line and state change shown under ${context.outputLabel}, in the same order and with the same labels. Values must still be calculated for different inputs.`,
    },
    { title: "Verify before marking complete", detail: validationStep(context.difficulty) },
  ];
}

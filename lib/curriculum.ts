import { challengeExamples } from "@/lib/challenge-examples";
import { hardContracts } from "@/lib/hard-contracts";
import { buildChallengeSpec, validateChallengeSpecs, type ChallengeSpec } from "@/lib/question-specs";

export type Difficulty = "easy" | "moderate" | "hard";

export type Challenge = {
  id: string;
  moduleId: string;
  conceptId: string;
  concept: string;
  difficulty: Difficulty;
  title: string;
  brief: string;
  principle: string;
  duration: number;
  spec: ChallengeSpec;
  sampleInput: string;
  sampleOutput: string;
  inputLabel: string;
  outputLabel: string;
};

type ConceptSeed = [
  id: string,
  title: string,
  principle: string,
  easy: string,
  moderate: string,
  hard: string,
];

export type Module = {
  id: string;
  week: number;
  title: string;
  shortTitle: string;
  source: "sample-calibrated" | "course-confirmed" | "syllabus-derived";
  concepts: ConceptSeed[];
};

const c = (...seed: ConceptSeed): ConceptSeed => seed;

export const modules: Module[] = [
  {
    id: "java-foundations",
    week: 1,
    title: "Java foundations",
    shortTitle: "Java foundations",
    source: "sample-calibrated",
    concepts: [
      c("program-structure", "Program structure", "A Java program starts in a correctly named class with a valid main method.", "Personal greeting::Read a name and print a precisely formatted welcome message from a valid Main class.", "Profile formatter::Read a name, ID and branch, then produce an aligned three-line profile without extra output.", "Command report engine::Design a console program that accepts a command followed by values and prints one of several precisely formatted reports."),
      c("primitive-types", "Primitive types and defaults", "Choose a type for the values and operations the program must support, not merely the current sample.", "Primitive showcase::Declare values of every Java primitive type and print each value with its type label.", "Measurement record::Read mixed numeric and character data, choose suitable types, and print a formatted measurement record.", "Range-safe telemetry::Process sensor readings near Java numeric limits and prevent silent overflow when calculating totals and averages."),
      c("scanner-input", "Scanner input", "Token input and line input consume the stream differently; manage the pending newline deliberately.", "Contact card::Read an integer followed by a full name and print both correctly using Scanner.", "Student intake::Read several token and full-line fields, validate them, and print a normalized student record.", "Flexible application form::Parse a multi-line application whose optional fields may contain spaces while recovering cleanly from invalid numeric input."),
      c("conversion", "Conversions and expressions", "Java promotes operands according to their types; preserve precision before converting the final result.", "Temperature converter::Read Celsius and print Fahrenheit to two decimal places.", "Unit conversion table::Convert a distance into centimetres, metres, feet and inches with controlled rounding.", "Precision billing::Calculate a bill from mixed integer and decimal inputs, explain rounding through output, and avoid integer-division errors."),
      c("math-formatting", "Math and formatted output", "Separate the numerical calculation from the representation used to print it.", "Circle report::Read a radius and print area and circumference to two decimal places.", "Planet statistics::Calculate values for several planets and print a neatly aligned table using printf.", "Numerical stability lab::Compare two formulas over extreme inputs, detect non-finite results, and present a stable formatted report."),
      c("arguments", "Command-line arguments", "Arguments arrive as strings and must be counted, validated and converted before use.", "Argument adder::Accept two integer command-line arguments and print their sum or a usage message.", "CLI converter::Support multiple conversion commands with different argument counts and clear validation errors.", "Batch command parser::Interpret a variable-length command line containing an operation and several values without crashing on malformed input."),
    ],
  },
  {
    id: "control-flow",
    week: 2,
    title: "Operators and control flow",
    shortTitle: "Control flow",
    source: "sample-calibrated",
    concepts: [
      c("conditionals", "Conditional logic", "Make conditions mutually understandable and test boundaries explicitly.", "Number classifier::Read an integer and classify it as positive, negative or zero and as even or odd.", "Scholarship checker::Apply several eligibility rules with inclusive boundaries and explain the result through output.", "Fare-rule engine::Calculate a travel fare from age, route, membership and peak-hour rules whose conditions overlap."),
      c("switch", "Switch statements", "Use switch when one discrete value selects one well-defined behavior.", "Weekday finder::Map integers 1 through 7 to weekday names and reject all other values.", "Shape menu::Repeatedly calculate measurements for circle, rectangle or square until the user quits.", "Console command router::Process a stream of commands with different operands, aliases and invalid-command recovery."),
      c("while-loops", "While and do-while loops", "Write the loop invariant first: what must be true before and after every iteration.", "Digit sum::Calculate the sum of the digits of a non-negative integer with a while loop.", "Numeric analyser::Reverse a number, count its digits and determine whether it is a palindrome.", "Account session::Run a do-while banking menu that preserves balance rules across an unknown number of transactions."),
      c("for-loops", "For loops", "A counted loop should make its start, continuation rule and progress visible.", "Factorial table::Print factorials from 0 through n while detecting the first long overflow.", "Pattern builder::Print a requested numeric triangle without trailing spaces.", "Sequence laboratory::Generate and analyse several sequences, stopping safely when limits or overflow conditions occur."),
      c("nested-control", "Nested loops", "Understand which loop owns each piece of state and when that state must reset.", "Multiplication grid::Print a rectangular multiplication table with aligned columns.", "Matrix neighbourhoods::Read a matrix and print the sum of valid neighbours around every cell.", "Seating allocator::Manage a two-dimensional seating map with bookings, cancellations, adjacency requests and summary statistics."),
      c("break-continue", "Break, continue and labels", "Use control-transfer statements only when they make the exit or skip rule clearer.", "Filtered series::Print values in a range while skipping multiples of a chosen divisor and stopping at a sentinel.", "Search grid::Find the first matching matrix element and leave both loops using a labelled break.", "Constraint scanner::Search nested candidate combinations with labelled continue and break while reporting why candidates were rejected."),
    ],
  },
  {
    id: "classes-objects",
    week: 3,
    title: "Classes and objects",
    shortTitle: "Classes & objects",
    source: "sample-calibrated",
    concepts: [
      c("class-basics", "Class fundamentals", "A class should own meaningful state and the operations that preserve that state.", "Rectangle objects::Create a Rectangle class and compare the areas of several objects.", "Product records::Model products with state and behaviour, then print an inventory summary from Main.", "Parking domain::Choose classes for vehicles, tickets and a parking area and demonstrate their collaboration."),
      c("constructors", "Constructors", "A constructor should establish a valid object immediately.", "Student constructor::Initialize a student with an ID, name and marks and print pass status.", "Bank account setup::Support default and parameterized account construction while rejecting invalid opening balances.", "Reservation lifecycle::Design constructors across several reservation objects so no partially valid booking can exist."),
      c("overloaded-constructors", "Constructor overloading", "Overloads should represent useful creation paths and delegate to one canonical initializer.", "Meal card defaults::Create meal cards with a default balance or a caller-supplied balance.", "Time values::Support several valid ways to construct a time while normalizing every instance.", "Order creation paths::Design multiple order constructors for walk-in, registered and delivery customers without duplicating validation."),
      c("references", "Object references and aliasing", "Two variables can refer to the same object; assignment does not copy the object.", "Alias experiment::Create two references to one counter and demonstrate how mutation is observed through both.", "Object swap study::Write methods that attempt to swap references and mutate objects, then print evidence of Java parameter passing.", "Shared-resource tracker::Model several users sharing mutable resources while preventing unintended alias-based changes."),
      c("methods", "Instance methods", "Methods should express behaviour, keep invariants local and return useful results.", "Grade checker::Add methods that calculate and report a student's result.", "Calculator service::Implement arithmetic methods with safe division and a user-selected operation.", "Tournament engine::Coordinate scoring methods across players, rounds and a scoreboard while keeping results consistent."),
      c("encapsulation", "Getters, setters and validation", "Keep fields private when callers must not bypass validation or derived values.", "Validated employee::Create private fields with setters that reject invalid names and salaries.", "Painting commission::Keep commission derived from price and prevent callers from setting it directly.", "Subscription registry::Protect identity, pricing and duplicate-address rules across subscriber objects."),
      c("static-members", "Static members and utilities", "Static state belongs to the class as a whole; instance state belongs to one object.", "Object counter::Count how many objects have been successfully created.", "Account policy::Add a shared fee policy and unique account numbers to a BankAccount class.", "ID allocation service::Generate collision-free IDs across several entity classes and provide safe class-level statistics."),
    ],
  },
  {
    id: "object-collaboration",
    week: 4,
    title: "Object collaboration",
    shortTitle: "Object collaboration",
    source: "sample-calibrated",
    concepts: [
      c("object-parameters", "Objects as parameters", "Passing an object lets a method work with a complete domain value instead of disconnected fields.", "Point distance::Pass two Point objects to a method and calculate their distance.", "Transfer operation::Pass account objects to a transfer method that changes both only when all rules pass.", "Delivery dispatcher::Assign orders to drivers by passing domain objects through a coordinator without leaking invalid state."),
      c("returning-objects", "Returning objects", "Return an object when the result has identity or several values that belong together.", "Battle winner::Return the winning Player object or null for a draw.", "Best candidate::Evaluate an array of applicants and return the strongest eligible object without copying it.", "Route planner::Build and return a Route object composed from several stops while reporting impossible routes safely."),
      c("composition", "Composition", "Use composition when one object owns or uses another as part of its behaviour.", "Engine and car::Build a Car that delegates starting and stopping to its Engine.", "Library loans::Coordinate Book, Member and Loan objects while enforcing copy availability.", "Hostel allocation::Design rooms, residents, payments and allocations with clear ownership and rollback on failure."),
      c("responsibilities", "Multiple-class responsibilities", "Put each rule with the object that has the information needed to enforce it.", "Employee and company::Separate employee bonus calculation from company reporting.", "Shopping basket::Coordinate Product, BasketItem and Cart without storing duplicated totals.", "Meal-card system::Design StudentAccount, MealCard, Purchase and Cafeteria classes with atomic transaction rules."),
      c("this-keyword", "The this keyword", "Use this to identify the current object, disambiguate parameters and delegate constructors.", "Fluent profile::Use this for field assignment and return this from safe update methods.", "Builder-style invoice::Chain validated invoice updates and constructor delegation without creating invalid states.", "Configuration workflow::Design a fluent configuration object whose chained methods remain readable and safe."),
      c("method-overloading", "Method overloading", "Overloads share a concept but differ unambiguously by parameter list, not return type.", "Area calculator::Overload methods for square, rectangle and circle measurements.", "Notification sender::Overload delivery methods for default, scheduled and priority messages.", "Search service::Design several useful search overloads while avoiding ambiguous calls and duplicated logic."),
      c("varargs-nesting", "Varargs and nested classes", "Use varargs for a genuine variable-length operation and nesting when a helper belongs to one enclosing type.", "Variable average::Calculate an average for any positive number of values and handle an empty call.", "Report sections::Use a nested formatter and varargs to build a multi-section report.", "Command pipeline::Design an outer command processor with private nested steps and variable-length operands."),
    ],
  },
  {
    id: "inheritance",
    week: 5,
    title: "Inheritance and polymorphism",
    shortTitle: "Inheritance",
    source: "course-confirmed",
    concepts: [
      c("extends", "Basic inheritance", "Inheritance models a real is-a relationship; shared state belongs in the superclass.", "Vehicle hierarchy::Extend Vehicle with a Car that adds model information.", "Campus people::Create Student and Instructor subclasses with shared Person behaviour.", "Asset tracker::Design a useful asset hierarchy for appliances, vehicles, furniture and media."),
      c("super-access", "Member access and super", "Visibility controls subclass access; super deliberately selects parent state or behaviour.", "Shadowed names::Use super and this to print parent and child name fields.", "Salary calculation::Extend a base calculation while reusing part of the superclass implementation.", "Policy hierarchy::Refactor a rule hierarchy so protected access is minimal and superclass behaviour remains reusable."),
      c("constructor-chains", "Inheritance constructors", "Superclass construction completes before subclass initialization.", "Student construction::Call a Person constructor before initializing a student roll number.", "Product variants::Create a three-level constructor chain with validated shared and specialized fields.", "Account families::Design constructor chains for several account types without duplicate or partially initialized state."),
      c("overriding", "Overriding and dynamic dispatch", "Runtime object type chooses an overridden instance method through a parent reference.", "Animal sounds::Override one method in two subclasses and call it through Animal references.", "Payroll dispatch::Calculate pay for mixed Employee subclasses stored through the base type.", "Transport pricing::Process a heterogeneous fleet where pricing and eligibility dispatch dynamically without type checks."),
      c("abstract-classes", "Abstract classes", "An abstract superclass can preserve shared implementation while requiring subtype-specific behaviour.", "Shape areas::Implement Circle and Rectangle from an abstract Shape.", "Element catalogue::Model metals and nonmetals with shared properties and required descriptions.", "Document workflow::Create an abstract processing lifecycle with validated subtype steps and reusable reporting."),
      c("interfaces", "Interfaces and capabilities", "Interfaces describe capabilities independent of one class hierarchy.", "Drivable car::Extend Machine and implement a Drivable capability.", "Payable items::Process unrelated invoices and employees through one Payable interface.", "Smart-campus devices::Combine several small capability interfaces across unrelated device classes without duplicating logic."),
      c("packages", "Packages and access", "Packages organize related public types and make access boundaries explicit.", "Academic package::Place Student and Course in a package and import them into Main.", "Layered catalogue::Separate model, service and application packages with the minimum required public access.", "Multi-package system::Organize a substantial application into packages and remove illegal dependency directions."),
    ],
  },
  {
    id: "arrays-collections",
    week: 6,
    title: "Arrays and collections",
    shortTitle: "Arrays & collections",
    source: "syllabus-derived",
    concepts: [
      c("array-basics", "Array fundamentals", "An array has fixed length, zero-based indices and a single element type.", "Largest value::Read an array and report its largest element and index.", "Statistics pass::Calculate minimum, maximum, mean and counts without sorting the input.", "Sliding analysis::Find constrained windows in a large array while handling empty and extreme data."),
      c("array-methods", "Passing arrays to methods", "A method receives a reference to the same array; decide whether mutation is part of its contract.", "Array scaler::Pass an array to methods that scale and print its contents.", "Safe normalization::Return a normalized copy while proving the original array is unchanged.", "Transformation pipeline::Compose in-place and copy-returning array methods without accidental aliasing."),
      c("two-dimensional", "Two-dimensional arrays", "Treat row and column bounds independently, especially for non-square or ragged arrays.", "Matrix totals::Print row, column and diagonal totals for a square matrix.", "Ragged marks::Analyse courses containing different numbers of assessments per student.", "Grid simulation::Update a rectangular grid over several rounds using a separate next-state matrix."),
      c("object-arrays", "Arrays of objects", "Array slots hold references and can be null; object invariants still belong to each object.", "Student ranking::Store Student objects and find the best eligible student.", "Reservation roster::Add, find, update and remove bookings from a fixed-capacity object array.", "Fleet scheduler::Allocate object-array resources across requests while preventing duplicate assignment."),
      c("array-list", "ArrayList", "Use a list when ordered contents grow or shrink and index-based access remains useful.", "Reading list::Add, remove and list unique book titles in order.", "Task manager::Manage Task objects with filters, updates and stable display ordering.", "Wait-list engine::Coordinate promotion, cancellation and capacity changes across several ArrayLists."),
      c("maps", "Maps and hash tables", "A map associates unique keys with values; define what replacing an existing key means.", "Word frequency::Count normalized words using a map.", "Student lookup::Maintain records keyed by unique ID with safe updates and deletion.", "Inventory ledger::Process stock transactions by SKU with atomic validation and summary reports."),
      c("iteration", "Iterators and legacy collections", "Choose an iteration method that remains safe when elements may be removed.", "Vector traversal::Store values in a Vector and print them through an Enumeration.", "Safe removal::Remove expired records from a collection without concurrent-modification errors.", "Collection migration::Wrap a legacy Vector/Hashtable subsystem behind a cleaner collection-based service."),
    ],
  },
  {
    id: "strings-regex",
    week: 7,
    title: "Strings and regular expressions",
    shortTitle: "Strings & regex",
    source: "syllabus-derived",
    concepts: [
      c("string-basics", "String operations", "Strings are immutable values; each transformation produces another string.", "Name normalizer::Trim a full name, fix capitalization and print its initials.", "Text statistics::Count letters, digits, words and whitespace without changing the input.", "Unicode-aware cleaner::Normalize mixed user text while preserving intended characters and reporting rejected ones."),
      c("comparison", "String comparison", "Use content comparison for values and choose case sensitivity deliberately.", "Credential comparison::Compare two entered identifiers with explicit case rules.", "Duplicate detector::Find normalized duplicate names while preserving their original spellings.", "Command resolver::Resolve exact names, aliases and case-insensitive abbreviations without ambiguous matches."),
      c("builder-buffer", "StringBuilder and StringBuffer", "Use a mutable builder for repeated construction; use synchronization only when shared mutation requires it.", "Reverse builder::Reverse and transform a sentence with StringBuilder.", "Report assembler::Build a large formatted report efficiently from many records.", "Concurrent log buffer::Compare safe and unsafe shared text construction and produce a correct synchronized design."),
      c("tokenization", "Tokenization and parsing", "Define delimiters and empty-field behaviour before splitting structured text.", "CSV-lite parser::Parse a simple comma-separated record and validate its field count.", "Command interpreter::Tokenize commands with optional arguments and quoted text.", "Configuration parser::Process structured lines with comments, escaping, duplicate keys and precise error locations."),
      c("regex-validation", "Regular-expression validation", "Anchor a validation pattern when the entire input must match.", "Identifier validator::Validate course IDs and print a clear accepted or rejected result.", "Contact validator::Validate several email and phone formats without accepting partial matches.", "Record gatekeeper::Validate a multi-field registration record and report every failed rule separately."),
      c("regex-extraction", "Pattern matching and extraction", "Use matcher groups to extract structure rather than repeatedly slicing raw text.", "Number extractor::Find and sum every signed integer in a line.", "Log parser::Extract timestamps, levels and messages from valid log lines and count malformed lines.", "Mini template engine::Find placeholders with named components, validate them and render values with missing-key handling."),
    ],
  },
  {
    id: "lambdas",
    week: 8,
    title: "Lambda expressions",
    shortTitle: "Lambdas",
    source: "syllabus-derived",
    concepts: [
      c("lambda-syntax", "Lambda syntax", "A lambda supplies behaviour for the single abstract method of a functional interface.", "Numeric operation::Implement several arithmetic behaviours using one functional interface.", "Text transformations::Pass lambdas that normalize, mask and summarize strings.", "Rule registry::Store named validation behaviours and apply a selected sequence to each record."),
      c("block-lambdas", "Block lambdas", "Use a block when behaviour needs local steps or branches and return explicitly when required.", "Range classifier::Write a block lambda that classifies integer ranges.", "Pricing rule::Express a multi-step discount and tax calculation as a block lambda.", "Scoring policy::Compose complex block lambdas while keeping shared state outside the policies."),
      c("functional-interfaces", "Functional interfaces", "Design one focused abstract operation and keep unrelated methods default, static or elsewhere.", "Converter interface::Create a typed Converter and implement it with lambdas.", "Repository filter::Design reusable predicates for filtering domain objects.", "Workflow contracts::Define small functional interfaces for validation, transformation and notification and wire them safely."),
      c("passing-lambdas", "Lambdas as arguments", "Passing behaviour lets one traversal support many policies.", "List filter::Pass a predicate into a method that selects matching integers.", "Student processing::Pass filters and comparators into a reusable report method.", "Transaction pipeline::Configure validation and fee policies at runtime without switch statements."),
      c("capture", "Variable capture", "Captured local variables must be final or effectively final; mutable objects require extra care.", "Threshold filter::Capture an unchanged threshold in a predicate.", "Configurable counter::Demonstrate safe capture while collecting statistics from a stream of values.", "Parallel capture audit::Remove unsafe shared mutation from lambda-based concurrent processing."),
      c("method-references", "Method references", "Use a method reference when an existing method already matches the required function shape.", "Printer reference::Replace simple forwarding lambdas with method references.", "Parser pipeline::Use constructor, static and instance method references in one transformation flow.", "Dispatch catalogue::Build a map of commands to compatible method references and handle unknown commands."),
    ],
  },
  {
    id: "awt-graphics",
    week: 9,
    title: "AWT components and graphics",
    shortTitle: "AWT & graphics",
    source: "syllabus-derived",
    concepts: [
      c("frames", "Frames and components", "Create UI objects on the correct thread and give each component a clear purpose.", "Hello frame::Create a Frame containing a Label and close it safely.", "Profile form::Arrange labels, text fields and buttons for a small student form.", "Reusable application shell::Design a multi-panel desktop shell while isolating its domain state from widgets."),
      c("layouts", "Layout managers", "Let a layout manager position components instead of hard-coding coordinates.", "Border layout::Place five labelled panels in a BorderLayout.", "Responsive calculator::Combine layout managers so calculator controls resize sensibly.", "Dashboard composition::Nest several layouts to keep a dense interface usable at different window sizes."),
      c("controls", "Controls and choices", "Read and update control state through a small boundary around the interface.", "Course selector::Create text fields, a Choice and a submit button with a result label.", "Order form::Build reusable input controls with validation messages and reset behaviour.", "Dynamic settings panel::Create dependent controls whose allowed values change without losing valid selections."),
      c("menus-dialogs", "Menus and dialogs", "Menus expose actions; dialogs should collect or confirm one focused decision.", "File menu::Create a Frame with working New and Exit menu items.", "Preferences dialog::Edit settings in a modal dialog and apply them only on confirmation.", "Document workflow::Coordinate menus, confirmation dialogs and unsaved-change state without duplicated action logic."),
      c("graphics", "Graphics and painting", "Override painting methods to render from state rather than drawing imperatively at arbitrary times.", "Shape canvas::Draw basic shapes and labels in a custom Canvas.", "Chart painter::Scale a bar chart to the current component dimensions.", "Interactive scene::Render a state-driven scene that resizes cleanly and avoids flicker or accumulated drawing artifacts."),
      c("ui-architecture", "Separating UI and logic", "Keep business rules testable without constructing a window.", "Counter model::Connect a small counter model to AWT controls.", "Grade calculator::Keep calculation and validation outside the form class.", "Booking desktop app::Design model, service and AWT view classes so the complete booking logic can be tested headlessly."),
    ],
  },
  {
    id: "event-handling",
    week: 10,
    title: "Event handling",
    shortTitle: "Event handling",
    source: "syllabus-derived",
    concepts: [
      c("action-listeners", "Action listeners", "Register listeners once and keep each event handler short.", "Button counter::Update a label whenever a button is pressed.", "Operation buttons::Route several calculator buttons to shared calculation logic.", "Command-based toolbar::Map many UI actions to reusable commands without a long conditional chain."),
      c("adapters", "Adapter classes", "An adapter lets you override only the event callbacks that matter.", "Window closing::Use WindowAdapter to close a Frame safely.", "Mouse tracker::Use MouseAdapter to record clicks and drags on a canvas.", "Interaction controller::Combine window, mouse and key adapters while keeping transient gesture state consistent."),
      c("input-events", "Keyboard and mouse events", "Event objects describe what occurred; translate them into domain actions deliberately.", "Key display::Show the last key pressed and its code.", "Keyboard navigator::Move an object with keys while enforcing canvas boundaries.", "Shortcut system::Implement configurable shortcuts, focus rules and repeated-key handling without conflicting actions."),
      c("event-state", "State across events", "Every event may observe state left by earlier events, so preserve invariants after each handler.", "Toggle state::Use button events to switch a model between two valid states.", "Quiz controller::Track current item, attempts and score across several controls.", "Reservation editor::Handle create, modify, cancel and undo events while preventing stale selections and partial updates."),
      c("event-design", "Event-driven design", "Events should call reusable operations rather than contain the whole application.", "Temperature UI::Connect input and button events to a separate converter class.", "Inventory form::Connect several UI events to one validated inventory service.", "Multi-window workflow::Coordinate editor and summary windows through domain events without sharing widget references."),
    ],
  },
  {
    id: "exceptions",
    week: 11,
    title: "Exception handling",
    shortTitle: "Exceptions",
    source: "syllabus-derived",
    concepts: [
      c("try-catch", "Catching exceptions", "Catch an exception where the program can add context or recover meaningfully.", "Safe division::Catch invalid numeric input and division by zero without ending the session.", "Record importer::Continue processing valid records while reporting malformed ones.", "Recovery loop::Build a command processor that recovers from several failure types without hiding programming errors."),
      c("multiple-catch", "Multiple catch blocks", "Order catches from specific to general and give each failure an appropriate response.", "Input reader::Handle number format, missing argument and invalid index failures separately.", "File command::Distinguish missing files, malformed content and invalid commands.", "Failure translator::Convert several low-level failures into stable user-level errors while retaining useful causes."),
      c("throw-throws", "Throw and throws", "Throw when a method cannot honour its contract; declare checked failures the caller must handle.", "Age validator::Throw an exception when an entered age is outside the allowed range.", "Transfer contract::Reject invalid transfers with meaningful exceptions and unchanged balances.", "Service boundary::Design checked and unchecked exceptions across repository, service and application layers."),
      c("propagation", "Exception propagation", "Let a failure travel until a layer has enough context to decide what to do.", "Call-chain trace::Create three methods and handle a propagated failure only in Main.", "Booking stack::Propagate validation and availability failures through cooperating objects.", "Batch transaction::Roll back a multi-step operation when a deeply nested method fails."),
      c("custom-exceptions", "Programmer-defined exceptions", "A domain exception should name a meaningful failed rule and carry useful context.", "Insufficient funds::Create and use an InsufficientFundsException.", "Course enrollment errors::Model duplicate, capacity and prerequisite failures with useful exceptions.", "Reservation failure family::Design a small exception hierarchy and recover differently from retryable and permanent failures."),
      c("finally-assertions", "Finally and assertions", "Use finally for mandatory cleanup and assertions for internal assumptions, not user validation.", "Cleanup proof::Show that a finally block runs after both success and failure.", "Resource lifecycle::Protect a manually managed resource across several exit paths.", "Invariant audit::Combine cleanup and assertions in a stateful service without changing behaviour when assertions are disabled."),
    ],
  },
  {
    id: "threads-io",
    week: 12,
    title: "Multithreading, I/O and serialization",
    shortTitle: "Threads & I/O",
    source: "syllabus-derived",
    concepts: [
      c("thread-creation", "Creating threads", "A Thread executes a Runnable independently; start launches it, while run is a normal call.", "Two workers::Start two named threads that perform separate bounded tasks and join both.", "Parallel summaries::Calculate independent section totals on worker threads and combine them after joining.", "Task coordinator::Launch a variable number of workers, collect failures and guarantee orderly completion."),
      c("thread-lifecycle", "Thread lifecycle", "Coordinate completion and interruption without relying on arbitrary sleep timing.", "Join order::Start workers and print a final message only after all have completed.", "Interruptible worker::Stop a long-running task through interruption and preserve its interrupted status.", "Graceful shutdown::Coordinate producers and consumers through cancellation, completion and failure states."),
      c("synchronization", "Synchronization", "Protect each shared invariant with one consistent locking strategy.", "Safe counter::Demonstrate and fix lost updates on a shared counter.", "Ticket seller::Prevent overselling while several threads reserve tickets.", "Bank transfer concurrency::Avoid lost updates and deadlock across simultaneous two-account transfers."),
      c("keyboard-streams", "Keyboard and character streams", "Choose character-oriented APIs for text and define encoding where files are involved.", "Buffered console::Read lines until a sentinel and print numbered copies.", "Text statistics file::Read text through buffered character streams and write a summary.", "Streaming transformer::Process a large text source line by line with clean failure reporting and cleanup."),
      c("byte-streams", "Byte streams", "Use byte streams for raw binary data and never assume one read fills the buffer.", "File copier::Copy a binary file with a buffer and report the byte count.", "Checksum copier::Copy data while calculating a checksum and verifying the destination.", "Binary archive::Design a small record archive with headers, lengths and corruption detection."),
      c("file-api", "Files and directories", "Validate paths and distinguish files, directories and missing entries before acting.", "File inspector::Print useful metadata for a supplied path.", "Directory report::List matching files in stable order and summarize their sizes.", "Safe organizer::Plan and perform categorized file moves while detecting name conflicts and partial failures."),
      c("random-data-io", "Random access and data streams", "Binary formats need a documented field order and fixed interpretation.", "Primitive record::Write and read typed values with DataOutputStream and DataInputStream.", "Indexed records::Update a fixed-size record in place with RandomAccessFile.", "Versioned store::Design a binary record file with version headers, indexes, updates and malformed-file detection."),
      c("serialization", "Object serialization", "Serialize a stable object graph deliberately and control transient or incompatible state.", "Save one object::Serialize and restore a simple Student object.", "Catalogue snapshot::Persist a collection of related objects while excluding derived transient fields.", "Compatible persistence::Evolve a serializable object model, validate restored data and handle corrupt or older snapshots."),
    ],
  },
  {
    id: "design-patterns",
    week: 13,
    title: "Object-oriented design patterns",
    shortTitle: "Design patterns",
    source: "syllabus-derived",
    concepts: [
      c("responsibility-design", "Object-oriented design", "Assign responsibilities by information ownership and keep dependencies moving in one direction.", "Class refactor::Split a monolithic student-management class into focused collaborators.", "Domain design::Implement a small ordering system from responsibilities and relationships you identify.", "Change-resistant model::Design a system for a detailed specification, then accommodate a new rule without broad edits."),
      c("singleton", "Singleton", "A singleton controls instance count but creates global coupling; use it only for truly shared coordination.", "Single registry::Implement a lazy single-instance configuration registry.", "Thread-safe singleton::Make instance creation safe under concurrent access.", "Replaceable configuration::Use a singleton behind an interface so tests and future storage changes remain practical."),
      c("factory", "Factory", "A factory centralizes object-creation decisions and returns a useful abstraction.", "Shape factory::Create Shape objects from validated type names.", "Account factory::Create several account types from structured input without exposing constructors to Main.", "Plugin loader::Design an extensible factory registry that adds new implementations without changing a central switch."),
      c("strategy", "Strategy", "Strategy moves a varying algorithm behind a stable interface and allows runtime selection.", "Discount strategy::Select one of several discount calculations at runtime.", "Route strategy::Compare distance, time and cost route policies over the same data.", "Pricing engine::Compose and replace pricing strategies while preserving validation and audit details."),
      c("observer", "Observer", "Observers receive state-change notifications without the subject depending on concrete listeners.", "Score listener::Notify displays whenever a score changes.", "Stock alerts::Subscribe and unsubscribe several alert types from product updates.", "Reliable event hub::Handle observer removal, duplicate subscription and listener failure during notification."),
      c("adapter-template", "Adapter and template method", "Adapters translate incompatible interfaces; template methods fix an algorithm outline while allowing selected steps to vary.", "Legacy adapter::Adapt an old printer API to a new Printable interface.", "Report template::Create an abstract report workflow with replaceable formatting steps.", "Import framework::Combine adapters and a template method to process several incompatible record sources consistently."),
    ],
  },
];

function parseTask(value: string) {
  const [title, brief] = value.split("::");
  return { title, brief };
}

export function challengesFor(module: Module): Challenge[] {
  return module.concepts.flatMap((seed) => {
    const [conceptId, concept, principle, easy, moderate, hard] = seed;
    return (["easy", "moderate", "hard"] as Difficulty[]).map((difficulty, index) => {
      const task = parseTask({ easy, moderate, hard }[difficulty]);
      const sample = challengeExamples[conceptId]?.[index];
      if (!sample) throw new Error(`Missing worked example for ${conceptId}/${difficulty}`);
      const specificRequirements = difficulty === "hard"
        ? hardContracts[conceptId]
        : [
            task.brief,
            "Read every value in the documented Input format and calculate the result from those values; do not embed the worked-example values in the program.",
            "Print every label and result defined by the Output format in the stated order.",
          ];
      if (!specificRequirements) throw new Error(`Missing hard contract for ${conceptId}`);
      const usesUiActions = module.week === 9 || module.week === 10;
      const usesSystemScenario = module.week === 12 || module.week === 13;
      const inputLabel = usesUiActions
        ? "Sample user actions"
        : usesSystemScenario
          ? "Sample setup / actions"
          : "Sample input";
      const outputLabel = usesUiActions ? "Expected visible result" : "Expected output";
      const brief = task.brief;
      return {
        id: `${module.id}-${conceptId}-${difficulty}`,
        moduleId: module.id,
        conceptId,
        concept,
        difficulty,
        title: task.title,
        brief,
        principle,
        duration: difficulty === "easy" ? 15 : difficulty === "moderate" ? 25 : 40,
        spec: buildChallengeSpec({
          week: module.week,
          conceptId,
          concept,
          title: task.title,
          brief,
          principle,
          difficulty,
          rules: specificRequirements,
          inputLabel,
          outputLabel,
          sampleInput: sample.input,
          sampleOutput: sample.output,
        }),
        sampleInput: sample.input,
        sampleOutput: sample.output,
        inputLabel,
        outputLabel,
      };
    });
  });
}

export const allChallenges = modules.flatMap(challengesFor);
validateChallengeSpecs(allChallenges);

export function starterFor(difficulty: Difficulty) {
  if (difficulty === "hard") return "";
  return `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Build your solution here\n    }\n}\n`;
}

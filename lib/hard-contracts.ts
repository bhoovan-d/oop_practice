// Additional rules that make every Hard question self-contained.
export const hardContracts: Record<string, string[]> = {
  "program-structure": [
    "Support SUM, AVERAGE and RANGE commands. Each command is followed by a count n and then n integers.",
    "Print the command name, accepted value count and result. Reject an unknown command, a missing value or a count mismatch without crashing.",
  ],
  "primitive-types": [
    "Read an integer count followed by signed sensor readings that may be near the int limits; store each reading as int but calculate totals as long.",
    "Print the count, safe total and double average. For an empty set print count 0 and 'Average: undefined'.",
  ],
  "scanner-input": [
    "Read full name, age, full postal address and an optional full-line note in that order; names and addresses may contain spaces.",
    "If age is not an integer from 16 to 100, keep asking for age only. Print the normalized application after every required field is valid.",
  ],
  conversion: [
    "Read an item count and then that many decimal prices. Calculate subtotal, 18% tax and final total using double arithmetic.",
    "Reject a negative count or negative price. Print every money value with exactly two decimal places and perform rounding only for display.",
  ],
  "math-formatting": [
    "For each x, compute sqrt(x*x + x*x) once with direct multiplication and once with Math.hypot(x,x).",
    "Print both results in scientific notation; print OVERFLOW for a non-finite result and show that the stable formula still handles very large inputs.",
  ],
  arguments: [
    "Accept one command-line operation followed by any number of values: sum, average, min, max or stats.",
    "Ignore non-numeric values with a message, reject an operation with no valid values and print a usage line for unknown operations.",
  ],
  conditionals: [
    "Read age, route type, membership status and peak-hour status. Base fares are local=100, intercity=300 and airport=500.",
    "Apply child 50% or senior 30% discount first, then 20% peak surcharge, then 10% member discount. Print each applied adjustment and the final fare.",
  ],
  switch: [
    "Process ADD, SUBTRACT, MULTIPLY, DIVIDE and POWER commands until QUIT. Every operation command is followed by two numbers.",
    "Use switch for routing, reject division by zero and unknown commands, and continue accepting later commands after an error.",
  ],
  "while-loops": [
    "Start with an opening balance and process deposit, withdraw, balance and quit commands through a do-while menu.",
    "Reject non-positive deposits and withdrawals that exceed the balance; a rejected transaction must not change the balance.",
  ],
  "for-loops": [
    "Support fib, squares and primes followed by a positive upper limit. Print values in the chosen sequence up to that inclusive limit.",
    "Stop before arithmetic overflow, print the term count and explain whether the stop was caused by the limit or overflow.",
  ],
  "nested-control": [
    "Represent seats as a rectangular grid with row letters and column numbers. Support BOOK, BOOKGROUP, CANCEL, SHOW and SUMMARY.",
    "BOOKGROUP k must choose k adjacent free seats in one row or make no booking. SUMMARY prints occupancy and remaining adjacent pairs.",
  ],
  "break-continue": [
    "Search positive integer triples a<b<c with a²+b²=c² and c within the supplied limit; skip candidates that violate ordering.",
    "Use labelled continue for rejected candidates and labelled break after the first solution. Print the solution and number of rejected candidates.",
  ],
  "class-basics": [
    "Create Vehicle, ParkingTicket and ParkingLot classes. The lot has a fixed capacity and cannot contain the same registration twice.",
    "ENTER records arrival time and returns a ticket; EXIT calculates one fee unit per started 30 minutes and frees the space; rejected operations leave the lot unchanged.",
  ],
  constructors: [
    "Create Room, Guest and Reservation classes. A Reservation constructor requires an ID, room, guest and positive number of nights.",
    "Prevent construction when capacity or date rules fail. Only successfully constructed reservations may be added to the registry.",
  ],
  "overloaded-constructors": [
    "Provide distinct constructors for walk-in, registered and delivery orders, with the minimum fields shown by their sample commands.",
    "Delegate every overload to one canonical constructor, validate positive item count, and require a nonblank address only for delivery orders.",
  ],
  references: [
    "Model User and SharedResource. Sharing must make both users refer to the same resource object, while an unshared copy must be independent.",
    "Demonstrate aliasing through an update, prevent duplicate owners and expose an immutable owner list so callers cannot alter it directly.",
  ],
  methods: [
    "Create Player, Round and Scoreboard classes. A round awards points to players and may be applied only once.",
    "The scoreboard calculates totals and returns the winner or a draw result; Main must demonstrate at least three rounds and a rejected duplicate round.",
  ],
  encapsulation: [
    "Create Subscriber, Plan and SubscriptionRegistry classes with private identity, email and pricing state.",
    "Email addresses are unique case-insensitively, prices come only from the selected plan and a rejected add or upgrade leaves all stored records unchanged.",
  ],
  "static-members": [
    "Give Student and Course independent sequential IDs such as STU-0001 and CRS-0001 through class-level allocation state.",
    "Count only successfully created objects, provide static statistics and demonstrate that IDs remain unique when invalid construction is rejected.",
  ],
  "object-parameters": [
    "Create Driver, Order and Dispatcher classes. A driver has capacity, distance and AVAILABLE/BUSY state; an order has a required capacity.",
    "Dispatcher receives objects, selects the nearest available capable driver and updates both objects atomically; print a clear result when no driver qualifies.",
  ],
  "returning-objects": [
    "Create Stop, Connection and Route classes. RoutePlanner must return a Route object containing ordered stops and total distance, or null when impossible.",
    "Reject repeated stops and missing connections. Demonstrate a direct route, a multi-stop route and an impossible request.",
  ],
  composition: [
    "Create Room, Resident, Payment and Allocation classes plus a Hostel service that owns the active allocations.",
    "An allocation and its payment must either both succeed or both fail; enforce capacity, prevent duplicate residents and demonstrate rollback on failure.",
  ],
  responsibilities: [
    "Create StudentAccount, MealCard, Purchase and Cafeteria. A card delegates balance ownership to one account; Cafeteria creates purchase records.",
    "A purchase succeeds only for an active card, positive price and sufficient balance. On failure, create no approved purchase and deduct no money.",
  ],
  "this-keyword": [
    "Create a Configuration with host, port and timeout. Chained methods return this after validating and assigning the current object fields.",
    "Delegate all constructors to one initializer and let build validate nonblank host, port 1–65535 and positive timeout before returning the finished configuration.",
  ],
  "method-overloading": [
    "Implement search(query), search(query, field) and search(query, field, limit) over the same record collection.",
    "Delegate shorter overloads to the most specific method, validate supported fields and positive limits, and avoid any pair of overloads that makes a call ambiguous.",
  ],
  "varargs-nesting": [
    "Create CommandProcessor with private nested command implementations for add, multiply, min and divide.",
    "The public run method takes a command plus varargs operands, enforces each command's operand rules and reports unknown commands or invalid division without crashing.",
  ],
  extends: [
    "Model Appliance, Vehicle, Furniture and Media as useful Asset subtypes with shared ID, purchase value and description in Asset.",
    "Put subtype-only fields and depreciation logic in subclasses; process all assets through Asset references and print totals without instanceof checks.",
  ],
  "super-access": [
    "Refactor a base Policy and specialised policy classes so common validation remains private or protected only where subclass reuse is required.",
    "A specialised decision must call reusable parent behaviour through super, add its rule once and print which rule rejected a request.",
  ],
  "constructor-chains": [
    "Create Account, SavingsAccount and CurrentAccount constructors with shared account ID, owner and opening balance initialized by super.",
    "Savings adds a non-negative rate; Current adds a non-negative overdraft. Invalid subtype fields must prevent a usable account from being registered.",
  ],
  overriding: [
    "Create Bus, Taxi and Metro subclasses of Transport with overridden fare and eligibility methods.",
    "Store a mixed fleet as Transport references, process it with dynamic dispatch and do not use type tests or switches to choose subtype behaviour.",
  ],
  "abstract-classes": [
    "Create an abstract DocumentProcessor with a final process workflow: open, validate, transform, report and close.",
    "PDF and Text processors implement only the required varying steps; shared timing and cleanup remain in the base class and run for failed validation too.",
  ],
  interfaces: [
    "Define small Switchable, Dimmable, Recordable and Lockable interfaces and implement only meaningful combinations in Light, Camera and SmartLock.",
    "Process each capability through its interface type, demonstrate at least three device classes and avoid an oversized interface that forces empty methods.",
  ],
  packages: [
    "Organize the project into model, service and app packages. Model types know no service or UI classes; services depend on model; app depends on services.",
    "Expose only the constructors and methods needed across package boundaries, import them from Main and include the required directory/package declarations.",
  ],
  "array-basics": [
    "Read array length, window length and maximum allowed sum. Print every contiguous window of that length whose sum is within the limit.",
    "Use a sliding update rather than recomputing each sum, handle window length 1 and n, and reject lengths outside 1..n.",
  ],
  "array-methods": [
    "Build a pipeline containing at least one documented in-place array operation and one operation that returns a transformed copy.",
    "Print object identity/equality evidence showing which stages changed the original; reject null input and preserve the original during copy-returning stages.",
  ],
  "two-dimensional": [
    "Read rows, columns, round count and a 0/1 grid. For each round, a cell becomes 1 only when exactly three of its eight valid neighbours are 1, or remains 1 with two neighbours.",
    "Calculate into a separate next-state matrix, support non-square grids and print the final grid without modifying cells early in a round.",
  ],
  "object-arrays": [
    "Use a fixed array of Vehicle references and a fixed array of Request references. Each vehicle has unique ID, capacity and assignment state.",
    "Assign each request to the smallest available sufficient vehicle; never assign a vehicle twice and print every unassigned request with its reason.",
  ],
  "array-list": [
    "Maintain admitted and waiting ArrayLists under a changeable capacity. JOIN appends uniquely, CANCEL removes a person and promotes from the front.",
    "When capacity increases, promote as many as possible; when it decreases, keep current admissions but admit nobody new until within capacity.",
  ],
  maps: [
    "Maintain stock by unique SKU in a Map and process ADD, SELL, RETURN and REPORT transactions in order.",
    "Reject unknown SKUs, non-positive quantities and overselling without changing stock; REPORT prints SKUs in sorted order with quantities and total units.",
  ],
  iteration: [
    "Wrap a legacy Vector/Hashtable store behind a service returning modern List and Map views rather than exposing legacy types.",
    "Support add, find, remove and safe iteration; returned collections must not allow callers to mutate the legacy store accidentally.",
  ],
  "string-basics": [
    "Normalize Unicode text, collapse every run of whitespace to one space, trim ends and lowercase text without corrupting supplementary characters.",
    "Count Unicode code points rather than UTF-16 char units and demonstrate decomposed accented input plus at least one emoji.",
  ],
  comparison: [
    "Normalize commands by trimming and uppercasing with Locale.ROOT, then resolve START, STOP and STATUS by content.",
    "Demonstrate why == is unsuitable, accept equivalent String objects and report UNKNOWN for every other normalized command.",
  ],
  "builder-buffer": [
    "Have multiple threads append complete timestamped records to one shared log buffer.",
    "Use a thread-safe design so no record's characters interleave, join all writers and print the exact final record count plus the complete log.",
  ],
  tokenization: [
    "Parse key=value configuration lines with blank lines, # comments, escaped # characters and optional spaces around =.",
    "Later duplicate keys replace earlier values with a warning containing the line number; malformed lines are reported and do not stop later valid lines.",
  ],
  "regex-validation": [
    "Read ID, email, phone and six-digit PIN fields. Validate the entire value with anchored patterns rather than accepting partial matches.",
    "Print every failed field and its rule in input order; print ACCEPTED only when all fields pass.",
  ],
  "regex-extraction": [
    "Recognize placeholders {{key}} and {{key|default}} with a regex matcher and named or numbered groups.",
    "Replace from a key map, use the default when supplied, keep a clear marker for missing keys without defaults and print resolved/missing counts.",
  ],
  "lambda-syntax": [
    "Define one functional interface for an integer rule and register named positive, even and range rules as lambdas in a Map.",
    "Apply a requested sequence of rules to every value, print PASS/FAIL per rule and calculate overall acceptance without hard-coded command switches.",
  ],
  "block-lambdas": [
    "Represent scoring policies as block lambdas taking a participant record and returning an integer score after several conditional steps.",
    "Run at least two policies over the same immutable records, print each calculated score and resolve equal top scores as a draw.",
  ],
  "functional-interfaces": [
    "Define separate functional interfaces for validation, transformation and notification with one focused abstract method each.",
    "Build a workflow that stops before transformation on validation failure and reports notification failure without undoing a successful transformation.",
  ],
  "passing-lambdas": [
    "Build a transaction pipeline receiving validation predicates and fee functions as arguments rather than selecting them in a switch.",
    "Run validation before fees, preserve the original transaction on rejection and return a result containing approval, applied fees and net amount.",
  ],
  capture: [
    "Process values concurrently with lambdas while collecting results and a total without mutating an unsynchronised captured local collection.",
    "Return deterministic output in original input order and demonstrate that repeated runs produce the same count, values and total.",
  ],
  "method-references": [
    "Create a command Map whose values are compatible method references for uppercasing, measuring, reversing and parsing text.",
    "Dispatch through the map, validate missing commands and incompatible input, and avoid forwarding lambdas where a direct method reference fits.",
  ],
  frames: [
    "Create the AWT UI on EventQueue, with a reusable frame shell containing navigation, header, content panel and status area.",
    "Switch panels without opening duplicate frames, preserve model state during navigation and make window closing release resources exactly once.",
  ],
  layouts: [
    "Compose BorderLayout, GridBagLayout or GridLayout panels for a dashboard containing navigation, filters, cards, table area and status footer.",
    "At 800x600 and 1200x800, controls must remain visible, fields must grow sensibly and no component may rely on setBounds.",
  ],
  controls: [
    "Build a settings panel where Country controls valid State/Region choices and a checkbox enables an optional notification field.",
    "When a parent choice changes, preserve a still-valid child choice or select the first valid one; Save must validate and print the complete configuration.",
  ],
  "menus-dialogs": [
    "Implement New, Open, Save and Exit actions shared by menus and buttons, plus an unsaved-changes flag.",
    "Before destructive navigation, show Save/Discard/Cancel; Cancel keeps the current document, Save proceeds only after success and handlers must not duplicate logic.",
  ],
  graphics: [
    "Store circles as model objects with position, radius and colour. Mouse clicks add circles and dragging moves the selected circle within canvas bounds.",
    "paint renders entirely from model state, resizing preserves relative valid positions and repainting must not leave old trails or accumulate drawings.",
  ],
  "ui-architecture": [
    "Separate Booking, BookingService and AWT views. The service enforces availability and conflict rules without importing java.awt.",
    "Create, edit and cancel through the service; update every view from model results and demonstrate headless tests for one success and two rejection cases.",
  ],
  "action-listeners": [
    "Represent Save, Undo, Redo and Delete toolbar actions as command objects in a command registry.",
    "One shared listener resolves the action command, disabled actions cannot execute and undo/redo state updates after every command.",
  ],
  adapters: [
    "Use WindowAdapter, MouseAdapter and KeyAdapter in one interaction controller for closing, drag gestures and keyboard modifiers.",
    "Track gesture start/current/end states, cancel an incomplete gesture on focus loss or window close and reset transient state after every path.",
  ],
  "input-events": [
    "Implement configurable keyboard shortcuts with exact modifier matching, repeated-key handling and focus rules for text fields.",
    "Detect conflicting bindings before saving them; a shortcut fires once per intended press and must not block normal text entry when disabled for an editable control.",
  ],
  "event-state": [
    "Model reservation create, edit, cancel and undo operations as complete state changes with stable reservation IDs.",
    "After deletion or undo, selections must reference an existing record or clear; rejected edits produce no partial state and every visible panel refreshes consistently.",
  ],
  "event-design": [
    "Use a domain event type and listener interface to coordinate editor and summary windows without either storing references to the other's widgets.",
    "Publish an event only after a valid model change, unsubscribe closed windows and demonstrate that reopening a view reconstructs the current model state.",
  ],
  "try-catch": [
    "Process ADD, DIVIDE, GET and QUIT commands in a continuing loop, with separate recovery for malformed numbers, zero division and invalid indexes.",
    "Print one clear error per failed command, keep the session alive and do not catch Error or hide unexpected programming failures.",
  ],
  "multiple-catch": [
    "Translate repository timeout, missing-record and malformed-record failures into stable service exceptions while retaining each original cause.",
    "Main prints a retry recommendation only for temporary failures; catch specific exceptions before general ones and never expose a raw stack trace as normal output.",
  ],
  "throw-throws": [
    "Separate repository, service and application layers. Use checked exceptions for recoverable external data failures and unchecked exceptions for broken method preconditions.",
    "Translate exceptions only at a meaningful boundary, preserve causes and demonstrate successful load, missing data, invalid argument and temporary I/O failure.",
  ],
  propagation: [
    "Implement a transaction with debit, item reservation and credit steps; any deep failure must propagate to the coordinator.",
    "The coordinator rolls back completed steps in reverse order, reports the failed step and proves balances, stock and audit state match their pre-transaction values.",
  ],
  "custom-exceptions": [
    "Create retryable and permanent subclasses under ReservationException, each carrying reservation ID, rule code and message.",
    "Handle them differently in Main: retry temporary availability failures within a fixed limit and immediately stop for invalid dates or permanent conflicts.",
  ],
  "finally-assertions": [
    "Use finally or try-with-resources for required cleanup and assertions only for internal invariants such as conserved totals.",
    "Demonstrate success, expected validation failure and an intentionally corrupted test with assertions enabled; cleanup must occur exactly once in all paths.",
  ],
  "thread-creation": [
    "Run a variable list of Callable-like tasks through bounded worker threads, recording a value or failure for every task ID.",
    "Limit simultaneous work, join all workers, restore result order by task ID and print a final SUCCESS or PARTIAL_FAILURE summary with no live workers.",
  ],
  "thread-lifecycle": [
    "Coordinate multiple producers and consumers with a clear completion signal and interruption-based cancellation; do not use arbitrary sleeps for correctness.",
    "On cancellation, stop accepting new work, drain or discard according to one documented policy, unblock waiters and prove all threads terminate.",
  ],
  synchronization: [
    "Transfer concurrently between Account objects while preserving non-negative balances and the total amount across all accounts.",
    "Use a consistent account lock order to avoid deadlock, reject invalid transfers atomically and join every thread before printing the invariant checks.",
  ],
  "keyboard-streams": [
    "Transform a potentially large UTF-8 text file line by line without loading the whole file into memory.",
    "Skip blank lines, uppercase retained lines, number them in the output and report input/output counts; close both streams after success or failure.",
  ],
  "byte-streams": [
    "Define a binary archive with magic header, version, record count and length-prefixed ID/data pairs.",
    "Read until the declared count, reject impossible lengths or premature EOF with a byte offset, and demonstrate round-trip plus a deliberately corrupted archive.",
  ],
  "file-api": [
    "Scan one directory and plan moves into Images, Documents and Other without touching the filesystem during planning.",
    "Detect destination name conflicts and unsafe paths first; only execute a conflict-free plan, record each completed move and report partial failure without repeating moves.",
  ],
  "random-data-io": [
    "Design a versioned fixed-record binary store with header, record size/count and an ID-to-offset index.",
    "Support read and in-place update, reject header/version/length corruption and prove an update changes only the targeted record bytes.",
  ],
  serialization: [
    "Give serializable classes an explicit serialVersionUID, validate every restored object and rebuild derived transient state after deserialization.",
    "Demonstrate loading an older compatible snapshot, rejecting invalid/corrupt data and using a default for one newly added field.",
  ],
  "responsibility-design": [
    "Design a multi-class system from a supplied ordering scenario, assigning storage, pricing, payment and fulfilment rules to focused collaborators.",
    "Then add one new pricing rule through a local class or interface implementation; list the unchanged classes as evidence that the design contains the change.",
  ],
  singleton: [
    "Expose shared configuration through an interface so consumers do not call the singleton directly and tests can inject a fake implementation.",
    "Make initialization thread-safe, prove one production instance under concurrent access and reset no global state from ordinary application code.",
  ],
  factory: [
    "Create an importer factory registry mapping format names to Supplier-like creators of a common Importer interface.",
    "Register CSV and JSON without a central switch, reject duplicate/unknown formats and demonstrate adding a third importer without editing the factory implementation.",
  ],
  strategy: [
    "Compose named pricing strategies that each return an adjustment and audit description while the pricing engine owns validation and application order.",
    "Allow runtime replacement, reject invalid bases before strategies run and print the final amount plus an ordered audit entry for every applied strategy.",
  ],
  observer: [
    "Allow subscribe/unsubscribe without duplicates and notify from a snapshot so observers may remove themselves safely during notification.",
    "One failing observer must not prevent others; collect failures, complete the subject state change and print the final subscriber count.",
  ],
  "adapter-template": [
    "Create adapters that convert CSV and legacy fixed-width sources into StandardRecord objects used by one template-method import workflow.",
    "The fixed workflow reads, validates, transforms, saves and reports; source parsing varies through adapters, invalid records are counted and valid later records continue.",
  ],
};

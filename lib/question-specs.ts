export type JavaTypeContract = {
  name: string;
  kind: "class" | "abstract class" | "interface" | "enum";
  purpose: string;
  fields: string[];
  constructors: string[];
  methods: string[];
  collaboration: string;
};

export type ChallengeSpec = {
  objective: string;
  problemStatement: string[];
  requiredFiles: string[];
  contracts: JavaTypeContract[];
  programFlow: string[];
  rules: string[];
  inputFormat: string[];
  outputFormat: string[];
  exampleExplanation: string;
  completionTests: string[];
  hints: [string, string, string];
};

type SpecContext = {
  week: number;
  conceptId: string;
  concept: string;
  principle: string;
  difficulty: "easy" | "moderate" | "hard";
  title: string;
  brief: string;
  rules: string[];
  inputLabel: string;
  outputLabel: string;
  sampleInput: string;
  sampleOutput: string;
};

const helperSignatures: Record<string, string[]> = {
  "program-structure": ["public static void main(String[] args)", "static void printResult(...)"],
  "primitive-types": ["public static void main(String[] args)", "static void printValues(...)"],
  "scanner-input": ["public static void main(String[] args)", "static String readRequiredLine(Scanner sc)", "static int readValidInt(Scanner sc)"],
  conversion: ["public static void main(String[] args)", "static double convert(double value)", "static void printResult(double value)"],
  "math-formatting": ["public static void main(String[] args)", "static double calculate(double value)", "static void printReport(...)"],
  arguments: ["public static void main(String[] args)", "static void printUsage()", "static double parseValue(String value)"],
  conditionals: ["public static void main(String[] args)", "static String classify(...)"],
  switch: ["public static void main(String[] args)", "static void executeCommand(String command, Scanner sc)"],
  "while-loops": ["public static void main(String[] args)", "static long processWithWhile(long value)"],
  "for-loops": ["public static void main(String[] args)", "static void generate(int limit)"],
  "nested-control": ["public static void main(String[] args)", "static void processGrid(...)"],
  "break-continue": ["public static void main(String[] args)", "static void search(...)"],
  "array-basics": ["public static void main(String[] args)", "static void analyse(int[] values)"],
  "array-methods": ["public static void main(String[] args)", "static int[] transform(int[] values)"],
  "two-dimensional": ["public static void main(String[] args)", "static int[][] process(int[][] values)"],
  "object-arrays": ["public static void main(String[] args)", "static int findById(Object[] values, String id)"],
  "array-list": ["public static void main(String[] args)", "static void processCommands(Scanner sc)"],
  maps: ["public static void main(String[] args)", "static void processCommands(Scanner sc)"],
  iteration: ["public static void main(String[] args)", "static void traverseAndUpdate(...)"],
  "string-basics": ["public static void main(String[] args)", "static String normalize(String input)"],
  comparison: ["public static void main(String[] args)", "static boolean matches(String first, String second)"],
  "builder-buffer": ["public static void main(String[] args)", "static String buildReport(...)"],
  tokenization: ["public static void main(String[] args)", "static List<String> tokenize(String line)"],
  "regex-validation": ["public static void main(String[] args)", "static List<String> validate(String value)"],
  "regex-extraction": ["public static void main(String[] args)", "static List<String> extract(String text)"],
  "lambda-syntax": ["public static void main(String[] args)", "R apply(T value)"],
  "block-lambdas": ["public static void main(String[] args)", "double apply(double value)"],
  "functional-interfaces": ["public static void main(String[] args)", "R apply(T value)"],
  "passing-lambdas": ["public static void main(String[] args)", "static <T> List<T> select(List<T> values, Predicate<T> rule)"],
  capture: ["public static void main(String[] args)", "static void process(List<Integer> values, int threshold)"],
  "method-references": ["public static void main(String[] args)", "static Result parse(String value)"],
  "try-catch": ["public static void main(String[] args)", "static void execute(String input)"],
  "multiple-catch": ["public static void main(String[] args)", "static void execute(String[] args)"],
  "throw-throws": ["public static void main(String[] args)", "static void validate(...) throws Exception"],
  propagation: ["public static void main(String[] args)", "static void application()", "static void service() throws Exception", "static void repository() throws Exception"],
  "custom-exceptions": ["public static void main(String[] args)"],
  "finally-assertions": ["public static void main(String[] args)", "static void useResource()"],
  "thread-creation": ["public static void main(String[] args)", "public void run()"],
  "thread-lifecycle": ["public static void main(String[] args)", "public void run()", "public void requestStop()"],
  synchronization: ["public static void main(String[] args)", "public synchronized boolean update(...)"],
  "keyboard-streams": ["public static void main(String[] args)", "static void transform(Reader input, Writer output) throws IOException"],
  "byte-streams": ["public static void main(String[] args)", "static long copy(InputStream input, OutputStream output) throws IOException"],
  "file-api": ["public static void main(String[] args)", "static void inspect(Path path) throws IOException"],
  "random-data-io": ["public static void main(String[] args)", "static void writeRecord(DataOutput out, Record value) throws IOException"],
  serialization: ["public static void main(String[] args)", "static void save(Path path, Serializable value) throws IOException", "static Object load(Path path) throws IOException, ClassNotFoundException"],
};

const oopConcepts = new Set([
  "class-basics", "constructors", "overloaded-constructors", "references", "methods", "encapsulation", "static-members",
  "object-parameters", "returning-objects", "composition", "responsibilities", "this-keyword", "method-overloading", "varargs-nesting",
  "extends", "super-access", "constructor-chains", "overriding", "abstract-classes", "interfaces", "packages",
  "responsibility-design", "singleton", "factory", "strategy", "observer", "adapter-template",
]);

const ignoredCapitalized = new Set([
  "A", "An", "Apply", "Build", "Calculate", "Choose", "Combine", "Compare", "Configure", "Console", "Create", "Design",
  "Demonstrate", "Extend", "Find", "Implement", "Interpret", "Java", "Keep", "Main", "Manage", "Model", "Process", "Read",
  "Return", "Run", "Store", "Support", "Use", "Write", "The", "Several", "Every", "One", "Sample", "Expected",
]);

const explicitTypes: Record<string, string[]> = {
  "menus-dialogs:Document workflow": ["DocumentFrame", "PreferencesDialog", "DocumentModel"],
  "Rectangle objects": ["Rectangle"],
  "Product records": ["Product", "Inventory"],
  "Parking domain": ["Vehicle", "ParkingTicket", "ParkingLot"],
  "Student constructor": ["Student"],
  "Bank account setup": ["BankAccount"],
  "Reservation lifecycle": ["Room", "Guest", "Reservation", "ReservationRegistry"],
  "Meal card defaults": ["MealCard"],
  "Time values": ["Time"],
  "Order creation paths": ["Order"],
  "Alias experiment": ["Counter"],
  "Object swap study": ["Point"],
  "Shared-resource tracker": ["User", "SharedResource"],
  "Grade checker": ["Student"],
  "Calculator service": ["Calculator"],
  "Tournament engine": ["Player", "Round", "Scoreboard"],
  "Validated employee": ["Employee"],
  "Painting commission": ["Painting"],
  "Subscription registry": ["Subscriber", "Plan", "SubscriptionRegistry"],
  "Object counter": ["TrackedObject"],
  "Account policy": ["BankAccount"],
  "ID allocation service": ["Student", "Course", "IdStatistics"],
  "Point distance": ["Point", "Geometry"],
  "Transfer operation": ["BankAccount", "TransferService"],
  "Delivery dispatcher": ["Driver", "Order", "Dispatcher"],
  "Battle winner": ["Player", "Battle"],
  "Best candidate": ["Applicant", "CandidateSelector"],
  "Route planner": ["Stop", "Connection", "Route", "RoutePlanner"],
  "Engine and car": ["Engine", "Car"],
  "Library loans": ["Book", "Member", "Loan", "Library"],
  "Hostel allocation": ["Room", "Resident", "Payment", "Allocation", "Hostel"],
  "Employee and company": ["Employee", "Company"],
  "Shopping basket": ["Product", "BasketItem", "Cart"],
  "Meal-card system": ["StudentAccount", "MealCard", "Purchase", "Cafeteria"],
  "Fluent profile": ["Profile"],
  "Builder-style invoice": ["Invoice"],
  "Configuration workflow": ["Configuration"],
  "Area calculator": ["AreaCalculator"],
  "Notification sender": ["NotificationSender"],
  "Search service": ["Record", "SearchService"],
  "Variable average": ["Statistics"],
  "Report sections": ["Report", "ReportFormatter"],
  "Command pipeline": ["CommandProcessor", "CommandStep"],
  "Vehicle hierarchy": ["Vehicle", "Car"],
  "Campus people": ["Person", "Student", "Instructor"],
  "Asset tracker": ["Asset", "Appliance", "Vehicle", "Furniture", "Media"],
  "Shadowed names": ["ParentRecord", "ChildRecord"],
  "Salary calculation": ["Employee", "SalariedEmployee"],
  "Policy hierarchy": ["Policy", "SpecialPolicy"],
  "Student construction": ["Person", "Student"],
  "Product variants": ["Product", "PhysicalProduct", "PerishableProduct"],
  "Account families": ["Account", "SavingsAccount", "CurrentAccount"],
  "Animal sounds": ["Animal", "Dog", "Cat"],
  "Payroll dispatch": ["Employee", "SalariedEmployee", "HourlyEmployee"],
  "Transport pricing": ["Transport", "Bus", "Taxi", "Metro"],
  "Shape areas": ["Shape", "Circle", "Rectangle"],
  "Element catalogue": ["Element", "MetalElement", "NonMetalElement"],
  "Document workflow": ["DocumentProcessor", "TextDocument", "ImageDocument"],
  "Drivable car": ["Drivable", "Machine", "Car"],
  "Payable items": ["Payable", "Invoice", "Employee"],
  "Smart-campus devices": ["Switchable", "Networked", "Measurable", "SmartLight", "Sensor"],
  "Academic package": ["Student", "Course"],
  "Layered catalogue": ["Product", "CatalogueService"],
  "Multi-package system": ["DomainEntity", "Repository", "ApplicationService"],
  "Hello frame": ["HelloFrame"],
  "Profile form": ["ProfileForm", "Profile"],
  "Reusable application shell": ["ApplicationShell", "ApplicationModel"],
  "Border layout": ["BorderLayoutDemo"],
  "Responsive calculator": ["CalculatorFrame", "CalculatorModel"],
  "Dashboard composition": ["DashboardFrame", "DashboardModel"],
  "Course selector": ["CourseSelectorFrame", "CourseSelection"],
  "Order form": ["OrderForm", "Order"],
  "Dynamic settings panel": ["SettingsFrame", "SettingsModel"],
  "File menu": ["MenuFrame"],
  "Preferences dialog": ["PreferencesFrame", "PreferencesModel"],
  "Shape canvas": ["ShapeFrame", "ShapeCanvas"],
  "Chart painter": ["ChartFrame", "ChartCanvas", "ChartModel"],
  "Interactive scene": ["SceneFrame", "SceneCanvas", "SceneModel"],
  "Counter model": ["CounterFrame", "CounterModel"],
  "Grade calculator": ["GradeFrame", "GradeCalculator"],
  "Booking desktop app": ["BookingFrame", "Booking", "BookingService"],
  "Button counter": ["CounterFrame", "CounterModel"],
  "Operation buttons": ["CalculatorFrame", "CalculatorModel"],
  "Command-based toolbar": ["ToolbarFrame", "UiCommand", "CommandRegistry"],
  "Window closing": ["ClosingFrame"],
  "Mouse tracker": ["MouseTrackerFrame", "TrackingCanvas"],
  "Interaction controller": ["InteractionFrame", "InteractionController", "InteractionModel"],
  "Key display": ["KeyDisplayFrame"],
  "Keyboard navigator": ["NavigatorFrame", "NavigationModel"],
  "Shortcut system": ["ShortcutFrame", "ShortcutRegistry"],
  "Toggle state": ["ToggleFrame", "ToggleModel"],
  "Quiz controller": ["QuizFrame", "QuizController", "QuizModel"],
  "Reservation editor": ["ReservationFrame", "ReservationController", "ReservationModel"],
  "Temperature UI": ["TemperatureFrame", "TemperatureConverter"],
  "Inventory form": ["InventoryFrame", "InventoryService", "Product"],
  "Multi-window workflow": ["EditorFrame", "SummaryFrame", "WorkflowModel"],
  "Safe division": ["DivisionService"],
  "Record importer": ["ImportRecord", "RecordImporter"],
  "Recovery loop": ["CommandProcessor"],
  "Input reader": ["InputReader"],
  "File command": ["FileCommandService"],
  "Failure translator": ["ApplicationException", "FailureTranslator"],
  "Age validator": ["AgeValidator"],
  "Transfer contract": ["BankAccount", "TransferService"],
  "Service boundary": ["RepositoryException", "ServiceException", "ApplicationService"],
  "Call-chain trace": ["CallChain"],
  "Booking stack": ["Booking", "BookingRepository", "BookingService"],
  "Batch transaction": ["TransactionStep", "BatchTransaction"],
  "Insufficient funds": ["BankAccount", "InsufficientFundsException"],
  "Course enrollment errors": ["Course", "Student", "EnrollmentService", "EnrollmentException"],
  "Reservation failure family": ["Reservation", "ReservationException", "RetryableReservationException", "PermanentReservationException"],
  "Cleanup proof": ["ManagedResource", "CleanupDemo"],
  "Resource lifecycle": ["ManagedResource", "ResourceService"],
  "Invariant audit": ["AuditedService", "ManagedResource"],
  "Two workers": ["Worker", "TaskCoordinator"],
  "Parallel summaries": ["SummaryWorker", "SummaryCoordinator"],
  "Task coordinator": ["WorkerTask", "TaskCoordinator", "TaskFailure"],
  "Join order": ["JoinWorker", "JoinCoordinator"],
  "Interruptible worker": ["InterruptibleWorker"],
  "Graceful shutdown": ["Producer", "Consumer", "ShutdownCoordinator"],
  "Safe counter": ["SafeCounter", "CounterWorker"],
  "Ticket seller": ["TicketOffice", "TicketSeller"],
  "Bank transfer concurrency": ["BankAccount", "TransferTask", "TransferCoordinator"],
  "Buffered console": ["ConsoleLineReader"],
  "Text statistics file": ["TextStatistics", "TextFileService"],
  "Streaming transformer": ["LineTransformer", "StreamingService"],
  "File copier": ["BinaryFileCopier"],
  "Checksum copier": ["ChecksumFileCopier"],
  "Binary archive": ["ArchiveRecord", "BinaryArchive"],
  "File inspector": ["FileInspector"],
  "Directory report": ["DirectoryReporter"],
  "Safe organizer": ["MovePlan", "FileOrganizer"],
  "Primitive record": ["PrimitiveRecord", "RecordDataStore"],
  "Indexed records": ["FixedRecord", "IndexedRecordStore"],
  "Versioned store": ["StoreHeader", "StoredRecord", "VersionedStore"],
  "Save one object": ["Student", "StudentStore"],
  "Catalogue snapshot": ["CatalogueItem", "Catalogue", "CatalogueStore"],
  "Compatible persistence": ["PersistentRecord", "PersistenceService"],
  "Class refactor": ["Student", "StudentRepository", "StudentService", "StudentReport"],
  "Domain design": ["Customer", "Product", "Order", "OrderService"],
  "Change-resistant model": ["Order", "PricingPolicy", "OrderService"],
  "Single registry": ["Configuration"],
  "Thread-safe singleton": ["Configuration"],
  "Replaceable configuration": ["Configuration", "GlobalConfiguration", "FakeConfiguration"],
  "Shape factory": ["Shape", "Circle", "Rectangle", "ShapeFactory"],
  "Account factory": ["Account", "SavingsAccount", "CurrentAccount", "AccountFactory"],
  "Plugin loader": ["Importer", "CsvImporter", "JsonImporter", "ImporterFactory"],
  "Discount strategy": ["DiscountStrategy", "RegularDiscount", "StudentDiscount", "PricingEngine"],
  "Route strategy": ["Route", "RouteStrategy", "ShortestRoute", "FastestRoute", "CheapestRoute"],
  "Pricing engine": ["PricingStrategy", "MemberDiscount", "BulkDiscount", "TaxStrategy", "PricingEngine"],
  "Score listener": ["ScoreSubject", "ScoreObserver", "ScoreDisplay"],
  "Stock alerts": ["ProductSubject", "ProductObserver", "EmailAlert", "AppAlert"],
  "Reliable event hub": ["Event", "EventObserver", "EventHub"],
  "Legacy adapter": ["Printable", "LegacyPrinter", "LegacyPrinterAdapter"],
  "Report template": ["ReportTemplate", "HtmlReport", "TextReport"],
  "Import framework": ["RecordSource", "CsvAdapter", "LegacyAdapter", "ImportTemplate"],
};

function inferredTypeNames(context: SpecContext) {
  if (explicitTypes[`${context.conceptId}:${context.title}`]) return explicitTypes[`${context.conceptId}:${context.title}`];
  if (explicitTypes[context.title]) return explicitTypes[context.title];
  const text = `${context.brief} ${context.rules.join(" ")}`;
  const names = text.match(/\b[A-Z][A-Za-z0-9]*(?:[A-Z][A-Za-z0-9]*)*\b/g) ?? [];
  return [...new Set(names.filter((name) => !ignoredCapitalized.has(name) && !/^[A-Z]{2,}$/.test(name)))].slice(0, 5);
}

function mainContract(methods: string[]): JavaTypeContract {
  const exactMethods = methods.map((method) => method.includes("...") ? "static String solve(String input)" : method);
  return {
    name: "Main",
    kind: "class",
    purpose: "Owns the console entry point. It reads the specified input, creates the required objects, calls their public methods and prints the final result. It must not duplicate domain rules.",
    fields: ["No mutable application state is required in Main."],
    constructors: ["No constructor is required."],
    methods: exactMethods,
    collaboration: "Main is the coordinator only; calculations and state changes belong in the helper or domain types described below.",
  };
}

const interfaceNames = new Set(["Drivable", "Payable", "Switchable", "Networked", "Measurable", "Importer", "DiscountStrategy", "RouteStrategy", "PricingStrategy", "ScoreObserver", "ProductObserver", "EventObserver", "Printable", "RecordSource", "PricingPolicy", "Repository"]);
const abstractNames = new Set(["Shape", "Element", "DocumentProcessor", "ReportTemplate", "ImportTemplate", "Asset", "Transport", "Account"]);

type ConcreteTypeDetails = Pick<JavaTypeContract, "fields" | "constructors" | "methods">;

const concreteTypes: Record<string, ConcreteTypeDetails> = {
  Rectangle: { fields: ["private final double width", "private final double height"], constructors: ["Rectangle(double width, double height)"], methods: ["double area()", "double perimeter()", "double getWidth()", "double getHeight()"] },
  Product: { fields: ["private final String id", "private String name", "private double price", "private int quantity"], constructors: ["Product(String id, String name, double price, int quantity)"], methods: ["double inventoryValue()", "String getId()", "String getName()", "double getPrice()", "int getQuantity()"] },
  Student: { fields: ["private final String id", "private String name", "private double marks"], constructors: ["Student(String id, String name, double marks)"], methods: ["boolean hasPassed()", "String getId()", "String getName()", "double getMarks()"] },
  BankAccount: { fields: ["private final String accountNumber", "private String owner", "private double balance"], constructors: ["BankAccount()", "BankAccount(String accountNumber, String owner, double openingBalance)"], methods: ["boolean deposit(double amount)", "boolean withdraw(double amount)", "double getBalance()", "String getAccountNumber()"] },
  Room: { fields: ["private final String roomId", "private final int capacity"], constructors: ["Room(String roomId, int capacity)"], methods: ["String getRoomId()", "int getCapacity()"] },
  Guest: { fields: ["private final String guestId", "private final String name"], constructors: ["Guest(String guestId, String name)"], methods: ["String getGuestId()", "String getName()"] },
  Reservation: { fields: ["private final String reservationId", "private final Room room", "private final Guest guest", "private final int nights"], constructors: ["Reservation(String reservationId, Room room, Guest guest, int nights)"], methods: ["String getReservationId()", "Room getRoom()", "Guest getGuest()", "int getNights()"] },
  MealCard: { fields: ["private final String cardId", "private int balance", "private boolean active"], constructors: ["MealCard(String cardId)", "MealCard(String cardId, int openingPoints)"], methods: ["boolean purchase(int points)", "void addPoints(int points)", "int getBalance()", "boolean isActive()"] },
  Time: { fields: ["private int hour", "private int minute", "private int second"], constructors: ["Time(int hour)", "Time(int hour, int minute)", "Time(int hour, int minute, int second)"], methods: ["String format()", "int getHour()", "int getMinute()", "int getSecond()"] },
  Order: { fields: ["private final String orderId", "private final String customerId", "private final int itemCount", "private final String deliveryAddress"], constructors: ["Order(String orderId, int itemCount)", "Order(String orderId, String customerId, int itemCount)", "Order(String orderId, String customerId, int itemCount, String deliveryAddress)"], methods: ["String getOrderId()", "int getItemCount()", "boolean requiresDelivery()", "String getDeliveryAddress()"] },
  Counter: { fields: ["private int value"], constructors: ["Counter()", "Counter(int initialValue)"], methods: ["void increment()", "int getValue()"] },
  Point: { fields: ["private double x", "private double y"], constructors: ["Point(double x, double y)"], methods: ["double distanceTo(Point other)", "void translate(double dx, double dy)", "double getX()", "double getY()"] },
  Employee: { fields: ["private final String employeeId", "private String name", "private double salary"], constructors: ["Employee(String employeeId, String name, double salary)"], methods: ["double calculateBonus()", "String getEmployeeId()", "String getName()", "double getSalary()"] },
  Company: { fields: ["private final String name", "private final List<Employee> employees"], constructors: ["Company(String name)"], methods: ["boolean addEmployee(Employee employee)", "Employee findEmployee(String employeeId)", "double totalPayroll()"] },
  Player: { fields: ["private final String playerId", "private final String name", "private int score"], constructors: ["Player(String playerId, String name)"], methods: ["void addPoints(int points)", "int getScore()", "String getPlayerId()", "String getName()"] },
  Vehicle: { fields: ["private final String registration", "private final String type"], constructors: ["Vehicle(String registration, String type)"], methods: ["String getRegistration()", "String getType()"] },
  Account: { fields: ["private final String accountId", "private final String owner", "protected double balance"], constructors: ["Account(String accountId, String owner, double openingBalance)"], methods: ["boolean deposit(double amount)", "boolean withdraw(double amount)", "double getBalance()", "String getAccountId()"] },
  Shape: { fields: ["private final String name"], constructors: ["protected Shape(String name)"], methods: ["public abstract double area()", "String getName()"] },
  Animal: { fields: ["private final String name"], constructors: ["Animal(String name)"], methods: ["public void sound()", "String getName()"] },
  Configuration: { fields: ["private static volatile Configuration instance", "private final Map<String, String> values"], constructors: ["private Configuration()"], methods: ["static Configuration getInstance()", "String get(String key)", "void set(String key, String value)"] },
  Event: { fields: ["private final String type", "private final String message"], constructors: ["Event(String type, String message)"], methods: ["String getType()", "String getMessage()"] },
  EventHub: { fields: ["private final List<EventObserver> observers", "private final List<RuntimeException> notificationFailures"], constructors: ["EventHub()"], methods: ["boolean subscribe(EventObserver observer)", "boolean unsubscribe(EventObserver observer)", "void publish(Event event)", "int subscriberCount()", "List<RuntimeException> getNotificationFailures()"] },
};

function inferredContract(name: string, context: SpecContext): JavaTypeContract {
  const isInterface = interfaceNames.has(name) || name.endsWith("Strategy") || name.endsWith("Observer") || (name === "Configuration" && context.title === "Replaceable configuration");
  const isAbstract = abstractNames.has(name);
  const concrete = concreteTypes[name];
  const interfaceMethod = name.endsWith("Observer") ? "void update(Event event)" : name.endsWith("Strategy") || name === "PricingPolicy" ? "double apply(double value)" : name === "Printable" ? "void print(String text)" : name === "Importer" || name === "RecordSource" ? "List<Record> read(String source)" : "void execute(String command)";
  const fallback: ConcreteTypeDetails = isInterface
    ? { fields: ["No instance fields."], constructors: ["No constructor."], methods: [interfaceMethod] }
    : { fields: ["private final String id", "private String name"], constructors: [`${name}(String id, String name)`], methods: ["String getId()", "String getName()", "void setName(String name)"] };
  return {
    name,
    kind: isInterface ? "interface" : isAbstract ? "abstract class" : "class",
    purpose: `${name} represents the ${name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()} role in ${context.title}. It owns the data and operations described in the problem statement instead of exposing them as unrelated variables in Main.`,
    fields: (concrete ?? fallback).fields,
    constructors: (concrete ?? fallback).constructors,
    methods: (concrete ?? fallback).methods,
    collaboration: `${name} may collaborate only with the other required types listed for this question. Pass complete objects when one type needs another type's state.`,
  };
}

function parkingContracts(): JavaTypeContract[] {
  return [
    mainContract(["public static void main(String[] args)", "static int parseTime(String hhmm)"]),
    { name: "Vehicle", kind: "class", purpose: "Represents one vehicle that can enter the parking lot.", fields: ["private final String registration", "private final String type"], constructors: ["Vehicle(String registration, String type)"], methods: ["String getRegistration()", "String getType()"], collaboration: "ParkingLot stores Vehicle objects through their ParkingTicket." },
    { name: "ParkingTicket", kind: "class", purpose: "Records one active parking stay from entry until a successful exit.", fields: ["private final int ticketNumber", "private final Vehicle vehicle", "private final int arrivalMinutes"], constructors: ["ParkingTicket(int ticketNumber, Vehicle vehicle, int arrivalMinutes)"], methods: ["int getTicketNumber()", "Vehicle getVehicle()", "int getArrivalMinutes()"], collaboration: "Created only by ParkingLot after an ENTER request passes every validation." },
    { name: "ParkingLot", kind: "class", purpose: "Owns capacity, active tickets and all entry, exit and fee rules.", fields: ["private static final double FEE_PER_UNIT = 20.0", "private final int capacity", "private final Map<String, ParkingTicket> activeTickets", "private int nextTicketNumber"], constructors: ["ParkingLot(int capacity)"], methods: ["ParkingTicket enter(Vehicle vehicle, int arrivalMinutes) - returns null when rejected", "double exit(String registration, int exitMinutes) - returns -1.0 when rejected", "int getOccupiedCount()", "int getCapacity()"], collaboration: "Uses registration as the unique active-parking key. It removes a ticket only after EXIT validation and fee calculation succeed." },
  ];
}

function buildContracts(context: SpecContext): JavaTypeContract[] {
  if (context.conceptId === "class-basics" && context.difficulty === "hard") return parkingContracts();
  const helpers = helperSignatures[context.conceptId] ?? ["public static void main(String[] args)"];
  const main = mainContract(helpers);
  if (!oopConcepts.has(context.conceptId) && context.week < 9) return [main];
  const names = inferredTypeNames(context);
  if (context.week === 9 || context.week === 10) {
    const viewName = names[0] ?? `${context.title.replace(/[^A-Za-z0-9]/g, "")}Frame`;
    return [
      main,
      { name: viewName, kind: "class", purpose: "Creates the AWT controls, arranges them and translates user events into model operations.", fields: ["private final Frame frame", "private final Panel contentPanel", "private final Label statusLabel", ...(names[1] ? [`private final ${names[1]} model`] : [])], constructors: [`${viewName}(${names[1] ? `${names[1]} model` : ""})`], methods: ["void show()", "private void buildInterface()", "private void registerListeners()", "private void refreshView()"], collaboration: "The view reads controls and displays results; calculation and validation remain in the model or service." },
      ...names.slice(1).map((name) => inferredContract(name, context)),
    ];
  }
  return [main, ...names.map((name) => inferredContract(name, context))];
}

function describeInput(context: SpecContext) {
  if (context.inputLabel.includes("user actions")) return ["Perform the user actions in the exact order shown in the worked example.", "Each button, menu item, selection, key or mouse action must be connected to the behavior named in Program flow."];
  if (context.inputLabel.includes("setup / actions")) return ["Create the initial objects described by the setup lines, then perform each action line in order.", "Words written in uppercase are command names; the remaining tokens are their arguments in the order documented by the rules."];
  const lines = context.sampleInput.split("\n");
  const describedLines = lines.map((line, index) => {
    const kind = /^-?\d+$/.test(line.trim()) ? "integer" : /^-?\d+(\.\d+)?(?:[eE][+-]?\d+)?$/.test(line.trim()) ? "decimal number" : /^[A-Z]+(?:\s|$)/.test(line.trim()) ? "command record" : "text record";
    return `Line ${index + 1}: ${kind}; worked-example value is '${line}'.`;
  });
  return [
    `Read ${lines.length === 1 ? "the value" : `${lines.length} lines or command records`} shown by the worked example in the same order.`,
    context.conceptId === "arguments" ? "The text after 'Command line:' is supplied through String[] args, not Scanner." : "Whitespace-separated values are tokens; names or descriptions containing spaces must be read as complete lines.",
    "Do not hard-code the sample values. The same format must work for other valid values.",
    ...describedLines,
  ];
}

function describeOutput(context: SpecContext) {
  const lines = context.sampleOutput.split("\n");
  return [
    `Print ${lines.length === 1 ? "the required result" : "each required result on its own line"} in the order shown by the worked example.`,
    "Keep the displayed labels exactly as specified. Use printf when the example fixes decimal places or column alignment.",
    "For rejected input, print the stated error and continue or stop exactly as required by the rules; never print a Java stack trace as normal program output.",
  ];
}

function flowFor(context: SpecContext, contracts: JavaTypeContract[]) {
  const domainNames = contracts.filter((item) => item.name !== "Main").map((item) => item.name);
  return [
    `Read and validate the ${context.inputLabel.toLowerCase()} before performing the requested operation.`,
    domainNames.length ? `Create and connect the required ${domainNames.join(", ")} ${domainNames.length === 1 ? "object" : "objects"}.` : "Store the input in variables or collections with types that preserve the required range and precision.",
    `Perform the behavior for ${context.title} through the required method contracts.`,
    "Change stored state only after every rule for that operation has passed.",
    `Print the ${context.outputLabel.toLowerCase()} from calculated values and resulting object state.`,
  ];
}

export function buildChallengeSpec(context: SpecContext): ChallengeSpec {
  const contracts = buildContracts(context);
  const requiredFiles = contracts.map((item) => `${item.name}.java`);
  const firstRule = context.rules[0] ?? context.brief;
  const secondRule = context.rules[1] ?? context.principle;
  const spec: ChallengeSpec = {
    objective: `Practise ${context.concept.toLowerCase()} by completing ${context.title}. ${context.principle}`,
    problemStatement: [
      `${context.brief} The finished program must solve the complete scenario for any input that follows the format below, rather than reproducing only the worked example.`,
      `${firstRule} ${secondRule} Treat these statements as part of the program contract: the output and stored state must agree with them after every operation.`,
      context.difficulty === "hard" ? "This is an exam-level extension. Several objects or operations must cooperate, but each rule still belongs to one clearly named type. Main should coordinate the scenario and should not contain duplicated business logic." : "Implement the program incrementally: make the required types compile first, add one operation at a time, and compare each stage with the stated output contract.",
    ],
    requiredFiles,
    contracts,
    programFlow: flowFor(context, contracts),
    rules: context.rules,
    inputFormat: describeInput(context),
    outputFormat: describeOutput(context),
    exampleExplanation: `The sample follows the stated input order, applies the rules for ${context.title}, and then prints the resulting values or object state. Use it to verify formatting; your implementation must also handle the completion tests below.`,
    completionTests: [
      "Worked example: reproduce the supplied output from the supplied input.",
      context.difficulty === "easy" ? "Boundary case: use zero, an empty value, or the smallest allowed value named by the contract." : "Boundary case: test the smallest and largest accepted values or capacity limits described by the contract.",
      context.difficulty === "hard" ? "Atomic-failure case: force a rejected operation and verify that every object and collection retains its previous state." : "Invalid case: supply one rejected value and verify the required error response.",
      context.difficulty === "easy" ? "Different valid case: change every sample value and confirm that the result is calculated rather than hard-coded." : "Sequence case: perform at least three valid and invalid operations in one run and verify their order-dependent result.",
    ],
    hints: [
      context.principle,
      `Start with the public signatures in ${contracts.map((item) => item.name).join(", ")}. Make each method work for one normal case before connecting it to Main.`,
      `Trace the worked example by hand. Before every state-changing method, list the rules that must pass; assign fields or update collections only after those checks succeed.`,
    ],
  };
  if (context.conceptId === "class-basics" && context.difficulty === "hard") {
    spec.objective = "Practise class fundamentals by building a parking system in which Vehicle, ParkingTicket and ParkingLot objects collaborate without exposing or duplicating their state.";
    spec.problemStatement = [
      "A small parking lot needs a console program that records vehicles entering and leaving. The lot is created with a fixed positive capacity. Before commands begin, the program reads the vehicles that may be referenced by later ENTER commands; every vehicle has a type and a unique registration number.",
      "When a vehicle enters, ParkingLot checks that a registered vehicle exists, the lot still has space and the same registration is not already parked. Only then does it create a ParkingTicket containing the next ticket number, the Vehicle object and the arrival time. A rejected entry must not increment the ticket number or change the active-ticket map.",
      "When a vehicle exits, ParkingLot finds its active ticket and checks that the exit time is not earlier than the arrival time. The stay is charged in started 30-minute units at 20.00 per unit. The ticket is removed only after the fee has been calculated successfully. Main reads commands until the input ends and prints the outcome after each operation.",
    ];
    spec.programFlow = [
      "Read a positive integer capacity and construct one ParkingLot.",
      "Read exactly capacity vehicle records. Each record contains CAR or BIKE followed by a unique registration, and creates one Vehicle available to later commands.",
      "For ENTER <registration> <HH:mm>, locate the registered Vehicle, convert the time to minutes after midnight and call ParkingLot.enter(...).",
      "For EXIT <registration> <HH:mm>, convert the time, call ParkingLot.exit(...), and print the parked duration, fee and updated occupancy only when the call succeeds.",
      "Continue processing command lines until end of input. Print a clear rejection for an unknown vehicle, duplicate ENTER, full lot, missing active ticket, malformed time or exit before arrival.",
    ];
    spec.rules = [
      "Capacity must be greater than zero. Vehicle type must be CAR or BIKE, registration must be nonblank, and registered registrations must be unique.",
      "ENTER succeeds only for a registered vehicle that is not currently parked and while occupied spaces are below capacity.",
      "Ticket numbers start at 1 and increase only after successful ENTER operations.",
      "Times use 24-hour HH:mm format from 00:00 through 23:59 and are converted to minutes after midnight.",
      "EXIT succeeds only for a currently parked registration and an exit time greater than or equal to its arrival time.",
      "Fee units equal ceil(parkedMinutes / 30.0). Each unit costs 20.00; a zero-minute stay costs 0.00.",
      "Any rejected command leaves capacity, active tickets, ticket numbering and occupancy unchanged.",
    ];
    spec.inputFormat = [
      "Line 1: one positive integer capacity.",
      "Next capacity lines: <CAR|BIKE> <registration>. Registrations contain no spaces.",
      "Remaining lines until end of input: ENTER <registration> <HH:mm> or EXIT <registration> <HH:mm>.",
      "Example: ENTER KA01AB1234 09:00 requests entry for that registered vehicle at 9:00 AM.",
    ];
    spec.outputFormat = [
      "Successful ENTER: Ticket <number> issued to <registration>.",
      "Successful EXIT: print '<registration> parked <minutes> minutes', then 'Fee: <amount>' with two decimals, then 'Occupied: <used>/<capacity>'.",
      "Rejected command: print 'Rejected: <reason>' and do not print success lines for that command.",
    ];
    spec.exampleExplanation = "The lot capacity is 2. Two vehicles are registered, and both ENTER successfully, producing tickets 1 and 2. The car exits 150 minutes after arrival: ceil(150 / 30) gives 5 fee units, so the fee is 5 × 20.00 = 100.00. Removing that ticket leaves one of two spaces occupied.";
    spec.completionTests = [
      "Worked example: confirm ticket numbers 1 and 2, a 150-minute stay, a 100.00 fee and final occupancy 1/2.",
      "Boundary: ENTER and EXIT at the same time; the stay is 0 minutes and the fee is 0.00.",
      "Rounding: park for 31 minutes; the fee uses two started units and equals 40.00.",
      "Rejection: try a duplicate ENTER and an ENTER while full; occupancy and the next ticket number must remain unchanged.",
      "Rejection: EXIT an absent registration or use an exit before arrival; the active ticket must remain stored.",
    ];
    spec.hints = [
      "Store active tickets in a Map keyed by registration so duplicate entry and ticket lookup are direct operations.",
      "Convert HH:mm to hour * 60 + minute once in Main. ParkingLot should work only with integer minute values.",
      "In enter and exit, finish every validation before calling put, remove or incrementing nextTicketNumber.",
    ];
  }
  return spec;
}

export function validateChallengeSpecs(challenges: Array<{ id: string; spec: ChallengeSpec }>) {
  if (challenges.length !== 249) throw new Error(`Expected 249 challenges, found ${challenges.length}.`);
  const ids = new Set(challenges.map((item) => item.id));
  if (ids.size !== challenges.length) throw new Error("Challenge IDs must be unique.");
  for (const challenge of challenges) {
    const spec = challenge.spec;
    if (!spec.objective || spec.problemStatement.length < 2 || spec.contracts.length === 0 || spec.programFlow.length === 0 || spec.rules.length === 0 || spec.inputFormat.length === 0 || spec.outputFormat.length === 0 || spec.completionTests.length < 3 || spec.hints.some((hint) => !hint)) {
      throw new Error(`Incomplete question specification: ${challenge.id}`);
    }
  }
}

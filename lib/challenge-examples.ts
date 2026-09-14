export type ChallengeExample = {
  input: string;
  output: string;
};

const e = (input: string, output: string): ChallengeExample => ({ input, output });

// Each concept has one worked example for Easy, Moderate and Hard, in that order.
// These are examples for understanding the contract, not hidden tests.
export const challengeExamples: Record<string, [ChallengeExample, ChallengeExample, ChallengeExample]> = {
  "program-structure": [
    e("Aarav", "Hello, Aarav!"),
    e("Aarav Mehta\n20260123\nCSE", "Name   : Aarav Mehta\nID     : 20260123\nBranch : CSE"),
    e("SUM 4 12 -3 8 5", "REPORT: SUM\nValues: 4\nResult: 22"),
  ],
  "primitive-types": [
    e("No keyboard input", "byte=12\nshort=32000\nint=200000\nlong=9000000000\nfloat=3.5\ndouble=8.125\nchar=J\nboolean=true"),
    e("42 98.625 A true", "count=42\nreading=98.625\ngrade=A\nverified=true"),
    e("3\n2147483640\n20\n-15", "Count: 3\nSafe total: 2147483645\nAverage: 715827881.67"),
  ],
  "scanner-input": [
    e("21\nAnanya Rao", "Age: 21\nName: Ananya Rao"),
    e("2026042\nRiya Sharma\n8.75\nObject Oriented Programming", "ID: 2026042\nName: Riya Sharma\nCGPA: 8.75\nCourse: Object Oriented Programming"),
    e("Kabir Singh\ntwenty\n20\nBengaluru, Karnataka\nnone", "Invalid age. Enter an integer.\nApplication accepted for Kabir Singh (20)\nAddress: Bengaluru, Karnataka\nNote: none"),
  ],
  conversion: [
    e("25", "Fahrenheit: 77.00"),
    e("1.75", "Centimetres: 175.00\nMetres: 1.75\nFeet: 5.74\nInches: 68.90"),
    e("3\n199.99\n49.50\n0.10", "Subtotal: 249.59\nTax (18%): 44.93\nTotal: 294.52"),
  ],
  "math-formatting": [
    e("2.5", "Area: 19.63\nCircumference: 15.71"),
    e("2\nMercury 2439.7 3.70\nEarth 6371.0 9.81", "PLANET      RADIUS      GRAVITY\nMercury     2439.70         3.70\nEarth       6371.00         9.81"),
    e("3\n1.0\n1.0E154\n1.0E-154", "x=1.000e+00 direct=1.414e+00 stable=1.414e+00\nx=1.000e+154 direct=OVERFLOW stable=1.414e+154\nx=1.000e-154 direct=1.414e-154 stable=1.414e-154"),
  ],
  arguments: [
    e("Command line: 17 25", "42"),
    e("Command line: ctof 25", "77.00 F"),
    e("Command line: stats 4 9 bad 16 25", "Ignored: bad\nCount: 4\nMin: 4\nMax: 25\nAverage: 13.50"),
  ],
  conditionals: [
    e("-8", "negative even"),
    e("87\n8.2\n650000", "Eligible: score and CGPA requirements met"),
    e("34\nairport\nyes\nyes", "Base fare: 500.00\nPeak surcharge: 100.00\nMember discount: -60.00\nFinal fare: 540.00"),
  ],
  switch: [
    e("6", "Saturday"),
    e("rectangle\n4 6\nquit", "Area: 24.00\nPerimeter: 20.00\nGoodbye"),
    e("ADD 7 4\nPOW 2 5\nDIV 9 0\nQUIT", "11\n32\nERROR: division by zero\nGoodbye"),
  ],
  "while-loops": [
    e("5029", "16"),
    e("12321", "Reverse: 12321\nDigits: 5\nPalindrome: yes"),
    e("1000\ndeposit 250\nwithdraw 1400\nwithdraw 300\nbalance\nquit", "Balance: 1250.00\nRejected: insufficient funds\nBalance: 950.00\nBalance: 950.00"),
  ],
  "for-loops": [
    e("6", "0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120\n6! = 720"),
    e("4", "1\n1 2\n1 2 3\n1 2 3 4"),
    e("fib 100", "0 1 1 2 3 5 8 13 21 34 55 89\nTerms: 12\nStopped before exceeding 100"),
  ],
  "nested-control": [
    e("3 4", "    1   2   3   4\n1   1   2   3   4\n2   2   4   6   8\n3   3   6   9  12"),
    e("3 3\n1 2 3\n4 5 6\n7 8 9", "11 19 13\n23 40 27\n17 31 19"),
    e("3 4\nBOOK A2\nBOOK A3\nBOOKGROUP 2\nCANCEL A2\nSUMMARY", "Booked A2\nBooked A3\nBooked B1,B2\nCancelled A2\nOccupied: 3/12\nFree adjacent pairs: 3"),
  ],
  "break-continue": [
    e("1 20 3 14", "1 2 4 5 7 8 10 11 13\nStopped at 14"),
    e("2 3\n4 7 2\n9 7 1\n7", "Found at row 1, column 2"),
    e("10 12", "Accepted: a=3 b=4 c=5\nRejected candidates: 59\nSearch stopped after first solution"),
  ],
  "class-basics": [
    e("3 4\n5 2", "Rectangle 1 area: 12.00\nRectangle 2 area: 10.00\nLarger: Rectangle 1"),
    e("3\nP10 Pen 20.0 5\nP20 Book 75.0 2\nP30 Bag 900.0 1", "P10 Pen value=100.00\nP20 Book value=150.00\nP30 Bag value=900.00\nInventory value: 1150.00"),
    e("2\nCAR KA01AB1234\nBIKE KA02XY4444\nENTER KA01AB1234 09:00\nENTER KA02XY4444 09:10\nEXIT KA01AB1234 11:30", "Ticket 1 issued to KA01AB1234\nTicket 2 issued to KA02XY4444\nKA01AB1234 parked 150 minutes\nFee: 100.00\nOccupied: 1/2"),
  ],
  constructors: [
    e("202601 Ravi 72", "Student{id=202601, name=Ravi, marks=72}\nResult: PASS"),
    e("default\ncustom A102 1500\ncustom A103 -20", "Account A001 opened with 0.00\nAccount A102 opened with 1500.00\nRejected A103: opening balance cannot be negative"),
    e("ROOM R12 2\nGUEST G7 Mira\nBOOK B1 R12 G7 3\nBOOK B2 R12 G7 0", "Reservation B1 confirmed: R12, Mira, 3 nights\nReservation B2 rejected: nights must be positive\nActive reservations: 1"),
  ],
  "overloaded-constructors": [
    e("default S1\ncustom S2 500", "S1 balance=100.00\nS2 balance=500.00"),
    e("9\n14 30\n23 75 90", "09:00:00\n14:30:00\n00:16:30"),
    e("WALKIN O1 2\nREGISTERED O2 C7 3\nDELIVERY O3 C8 4 MGROAD", "O1 type=WALKIN items=2\nO2 type=REGISTERED customer=C7 items=3\nO3 type=DELIVERY customer=C8 items=4 address=MGROAD"),
  ],
  references: [
    e("Create Counter c1=0; assign c2=c1; increment c2", "c1=1\nc2=1\nSame object: true"),
    e("a=Point(1,2), b=Point(8,9); call swap(a,b); mutate(a)", "After swap call: a=(1,2), b=(8,9)\nAfter mutating a: a=(2,3), alias sees (2,3)"),
    e("ADD U1 R1\nSHARE U1 U2 R1\nUPDATE U2 R1 draft2\nREAD U1 R1", "R1 shared with U2\nR1 updated to draft2\nU1 reads draft2\nOwners: U1,U2"),
  ],
  methods: [
    e("Mira 76 68 81", "Average: 75.00\nResult: PASS"),
    e("divide 18 4", "4.50"),
    e("2\nAsha 10 8 6\nDev 7 10 9", "Asha total=24\nDev total=26\nWinner: Dev"),
  ],
  encapsulation: [
    e("E1 Neha 50000\nsetSalary -10", "Employee E1: Neha, 50000.00\nRejected salary: must be positive\nSalary remains 50000.00"),
    e("P1 River 12000", "Painting: River\nPrice: 12000.00\nCommission: 2400.00"),
    e("ADD S1 a@x.com BASIC\nADD S2 a@x.com PRO\nUPGRADE S1 PRO", "S1 added at 199.00\nS2 rejected: email already registered\nS1 upgraded; price=499.00"),
  ],
  "static-members": [
    e("Create 3 valid objects and 1 invalid object", "Created objects: 3"),
    e("OPEN 1000\nOPEN 500\nSET_FEE 25\nCHARGE_ALL", "Accounts: A1001,A1002\nFee policy: 25.00\nBalances: A1001=975.00 A1002=475.00"),
    e("CREATE STUDENT\nCREATE COURSE\nCREATE STUDENT\nSTATS", "STU-0001\nCRS-0001\nSTU-0002\nStudents=2 Courses=1 IDs unique=true"),
  ],
  "object-parameters": [
    e("1 2\n4 6", "Distance: 5.00"),
    e("A1 800\nA2 200\nTRANSFER A1 A2 250", "Transfer successful\nA1=550.00\nA2=450.00"),
    e("DRIVER D1 3 AVAILABLE\nDRIVER D2 8 AVAILABLE\nORDER O1 5\nDISPATCH O1", "O1 assigned to D2\nD1 remains AVAILABLE\nD2 status=BUSY"),
  ],
  "returning-objects": [
    e("Asha 17\nDev 14", "Winner: Asha"),
    e("3\nC1 8.1 2\nC2 9.0 0\nC3 8.7 3", "Best eligible candidate: C3"),
    e("4\nA B 5\nB C 3\nA C 12\nC D 4\nA D", "Route: A -> B -> C -> D\nDistance: 12"),
  ],
  composition: [
    e("CAR C1\nSTART\nSTOP", "Engine started\nCar C1 is moving\nEngine stopped"),
    e("BOOK B1 1\nMEMBER M1\nBORROW M1 B1\nBORROW M1 B1", "Loan created: M1-B1\nRejected: no copy available"),
    e("ROOM R1 2\nALLOCATE S1 R1 5000\nALLOCATE S2 R1 5000\nALLOCATE S3 R1 5000", "S1 allocated R1; payment recorded\nS2 allocated R1; payment recorded\nS3 rejected: room full; no payment recorded"),
  ],
  responsibilities: [
    e("COMPANY Acme\nEMP E1 50000 4\nEMP E2 60000 2", "E1 bonus=5000.00\nE2 bonus=3000.00\nCompany bonus total=8000.00"),
    e("PRODUCT P1 40\nADD P1 3\nADD P1 2\nREMOVE P1 1", "P1 quantity=4 subtotal=160.00\nCart total=160.00"),
    e("ACCOUNT S1 300\nCARD C1 S1\nBUY C1 MEAL 120\nBUY C1 SNACK 250\nHISTORY C1", "Purchase P1 approved; balance=180.00\nPurchase rejected: insufficient balance\nP1 MEAL 120.00 APPROVED"),
  ],
  "this-keyword": [
    e("P1 Mira\nrename Meera\ncity Pune", "Profile{id=P1, name=Meera, city=Pune}\nChaining returned same object: true"),
    e("I1\ncustomer C7\nadd Pen 2 20\nadd Book 1 80", "Invoice I1 for C7\nPen x2 = 40.00\nBook x1 = 80.00\nTotal = 120.00"),
    e("CONFIG\nhost localhost\nport 8080\ntimeout 30\nbuild", "Configuration{host=localhost, port=8080, timeout=30}\nValid: true"),
  ],
  "method-overloading": [
    e("square 4\nrectangle 4 6\ncircle 2", "16.00\n24.00\n12.57"),
    e("SEND hello\nSEND hello 10:30\nSEND hello HIGH", "Sent now: hello\nScheduled 10:30: hello\nSent HIGH priority: hello"),
    e("SEARCH java\nSEARCH java title\nSEARCH java title 5", "All fields: 8 matches\nTitle only: 3 matches\nTitle only, limit 5: 3 matches"),
  ],
  "varargs-nesting": [
    e("average(2,4,6,8)\naverage()", "5.00\nNo values"),
    e("REPORT Sales\nSECTION North 10 20\nSECTION South 7 9 11", "Sales\nNorth: count=2 total=30\nSouth: count=3 total=27"),
    e("RUN add 4 7 2\nRUN multiply 3 5\nRUN divide 9 0", "add => 13\nmultiply => 15\ndivide => ERROR: zero divisor"),
  ],
  extends: [
    e("Vehicle speed=80; Car model=City", "Vehicle speed: 80\nCar model: City"),
    e("STUDENT S1 Riya CSE\nINSTRUCTOR I1 Sen Java", "Riya (S1), student of CSE\nSen (I1), teaches Java"),
    e("4\nVEHICLE V1 800000\nFURNITURE F1 12000\nMEDIA M1 700\nAPPLIANCE A1 40000", "Assets: 4\nTotal value: 852700.00\nDepreciable: V1,A1"),
  ],
  "super-access": [
    e("Parent name=base; Child name=derived", "this.name=derived\nsuper.name=base"),
    e("Manager 50000 10", "Base salary: 50000.00\nManager allowance: 5000.00\nPay: 55000.00"),
    e("PREMIUM P1 1000\nCLAIM P1 400", "Base validation: passed\nPremium policy rule: passed\nApproved amount: 400.00"),
  ],
  "constructor-chains": [
    e("Person Mira 20; Student 202601", "Person constructed: Mira,20\nStudent constructed: 202601"),
    e("DEVICE D1 1000\nPHONE P1 2000 Android\nSMARTPHONE S1 3000 Android 5G", "D1 Device 1000.00\nP1 Phone Android 2000.00\nS1 Smartphone Android/5G 3000.00"),
    e("SAVINGS A1 Mira 1000 4.5\nCURRENT A2 Dev 500 2000", "A1 owner=Mira balance=1000.00 interest=4.5%\nA2 owner=Dev balance=500.00 overdraft=2000.00"),
  ],
  overriding: [
    e("Dog\nCat", "Dog says woof\nCat says meow"),
    e("3\nSALARIED S1 50000\nHOURLY H1 160 400\nCOMMISSION C1 200000 0.05", "S1 pay=50000.00\nH1 pay=64000.00\nC1 pay=10000.00\nTotal payroll=124000.00"),
    e("BUS B1 30\nTAXI T1 12.5 8\nMETRO M1 4", "B1 fare=30.00 eligible=true\nT1 fare=100.00 eligible=true\nM1 fare=40.00 eligible=false"),
  ],
  "abstract-classes": [
    e("CIRCLE 2\nRECTANGLE 3 5", "Circle area=12.57\nRectangle area=15.00"),
    e("METAL Iron 7.87 conductor\nNONMETAL Oxygen gas", "Iron: metal, density=7.87, conductor\nOxygen: nonmetal, state=gas"),
    e("PDF report.pdf\nTEXT notes.txt", "OPEN report.pdf\nVALIDATE PDF\nPROCESS 12 pages\nCLOSE report.pdf\nOPEN notes.txt\nVALIDATE TEXT\nPROCESS 420 words\nCLOSE notes.txt"),
  ],
  interfaces: [
    e("Car C1 start drive stop", "Machine started\nC1 drove 10 km\nMachine stopped"),
    e("INVOICE I1 1200\nEMPLOYEE E1 5000", "I1 payable=1200.00\nE1 payable=5000.00\nTotal=6200.00"),
    e("LIGHT L1 Switchable Dimmable\nCAMERA C1 Switchable Recordable\nLOCK K1 Switchable Lockable", "L1: ON brightness=60\nC1: ON recording=true\nK1: ON locked=true"),
  ],
  packages: [
    e("academic.Student S1 Mira; academic.Course CSF213", "S1 Mira enrolled in CSF213"),
    e("model.Product P1; service.CatalogueService.add(P1)", "Catalogue contains P1\nMain accessed only public service operations"),
    e("app imports service; service imports model; model imports nothing", "Build successful\nIllegal reverse dependencies: 0"),
  ],
  "array-basics": [
    e("5\n4 18 7 18 3", "Largest: 18\nFirst index: 1"),
    e("6\n4 -2 9 9 0 5", "Min: -2\nMax: 9\nMean: 4.17\nPositive: 4\nZero: 1\nNegative: 1"),
    e("8 3 12\n4 5 3 7 1 8 2 6", "Windows with sum <= 12:\n[4,5,3]\n[3,7,1]\n[1,8,2]\nBest sum: 12"),
  ],
  "array-methods": [
    e("4\n2 3 5 7\n3", "6 9 15 21"),
    e("4\n10 20 30 40", "Normalized copy: 0.00 0.33 0.67 1.00\nOriginal: 10 20 30 40"),
    e("5\n-4 2 2 9 15", "After in-place clamp: 0 2 2 9 10\nSorted copy: 0 2 2 9 10\nOriginal reference unchanged by sort: true"),
  ],
  "two-dimensional": [
    e("3\n1 2 3\n4 5 6\n7 8 9", "Rows: 6 15 24\nColumns: 12 15 18\nMain diagonal: 15\nOther diagonal: 15"),
    e("3\n2 80 90\n3 60 70 80\n1 100", "Student 1 average=85.00\nStudent 2 average=70.00\nStudent 3 average=100.00"),
    e("3 4 1\n0 1 0 0\n1 1 0 0\n0 0 0 1", "Next grid:\n1 1 0 0\n1 1 0 0\n0 0 0 0"),
  ],
  "object-arrays": [
    e("3\nS1 Mira 82 true\nS2 Dev 91 false\nS3 Tara 88 true", "Best eligible student: S3 Tara 88"),
    e("CAPACITY 3\nADD B1 Mira\nADD B2 Dev\nUPDATE B1 Meera\nREMOVE B2\nLIST", "B1 Meera\nOccupied: 1/3"),
    e("2\nVEHICLE V1 4\nVEHICLE V2 8\nREQUEST R1 6\nREQUEST R2 4", "R1 -> V2\nR2 -> V1\nDuplicate assignments: 0"),
  ],
  "array-list": [
    e("ADD Dune\nADD Java\nADD Dune\nREMOVE Java\nLIST", "Duplicate ignored: Dune\n1. Dune"),
    e("ADD T1 Write HIGH\nADD T2 Test MEDIUM\nDONE T1\nFILTER OPEN", "T2 Test MEDIUM OPEN"),
    e("CAPACITY 2\nJOIN A\nJOIN B\nJOIN C\nCANCEL A\nCAPACITY 3", "Admitted: A,B\nWaiting: C\nA cancelled; C promoted\nAdmitted: B,C\nWaiting: empty"),
  ],
  maps: [
    e("Java java OOP, java!", "java=3\noop=1"),
    e("PUT S1 Mira\nPUT S2 Dev\nPUT S1 Riya\nGET S1\nDELETE S2", "Updated S1\nS1 Riya\nRecords: 1"),
    e("ADD P1 10\nSELL P1 4\nSELL P1 8\nRETURN P1 1\nREPORT", "P1 added; stock=10\nSale approved; stock=6\nSale rejected; stock=6\nReturn approved; stock=7\nP1 7"),
  ],
  iteration: [
    e("Vector: red green blue", "red\ngreen\nblue"),
    e("A active\nB expired\nC expired\nD active", "Removed: B,C\nRemaining: A,D"),
    e("Legacy Hashtable: S1=Mira, S2=Dev\nFIND S2\nADD S3 Tara", "S2 Dev\nModern service size: 3\nLegacy collection hidden from caller: true"),
  ],
  "string-basics": [
    e("  aNANYA   rAO  ", "Ananya Rao"),
    e("Java 11 is fun!", "Characters: 15\nLetters: 9\nDigits: 2\nWords: 4\nLongest word: Java"),
    e("  Café\u0301   \ud83d\ude0a  JAVA  ", "café \ud83d\ude0a java\nCode points: 11"),
  ],
  comparison: [
    e("stored=Java123\nentered=Java123", "Authenticated: true\nCompared by content"),
    e("5\nJava\n java \nOOP\noOp\nStrings", "Unique normalized values: java, oop, strings\nDuplicates: 2"),
    e("START\n start \nStop\nSTATUS\nunknown", "START -> START\n start  -> START\nStop -> STOP\nSTATUS -> STATUS\nunknown -> UNKNOWN"),
  ],
  "builder-buffer": [
    e("Object Lab", "baL tcejbO"),
    e("3\nNorth 12\nSouth 9\nWest 14", "REGION | SCORE\nNorth  | 12\nSouth  | 9\nWest   | 14\nTOTAL  | 35"),
    e("Thread A appends A1,A2; Thread B appends B1,B2", "Four complete log records are present\nNo record contains interleaved characters"),
  ],
  tokenization: [
    e("S1,Mira,82", "ID=S1\nName=Mira\nMarks=82"),
    e("SEND \"Mira Rao\" \"Exam at 10\"", "Command: SEND\nRecipient: Mira Rao\nMessage: Exam at 10"),
    e("# app config\nhost = localhost\nport = 8080\nhost = backup\npath = C:\\\\temp\\#data", "host=backup\nport=8080\npath=C:\\temp#data\nWarning line 4: duplicate key host"),
  ],
  "regex-validation": [
    e("CSF213", "VALID"),
    e("mira@example.com\n+91-98765-43210", "Email: VALID\nPhone: VALID"),
    e("ID=S102;EMAIL=bad@;PHONE=123;PIN=560001", "REJECTED\nemail: invalid format\nphone: invalid format"),
  ],
  "regex-extraction": [
    e("Items -4, 10 and +7; code A2", "Integers: -4,10,7,2\nSum: 15"),
    e("2026-09-14 10:20:00 INFO Started\nbad line\n2026-09-14 10:21:00 ERROR Failed", "INFO=1 ERROR=1\nMalformed=1\nFirst error: 2026-09-14 10:21:00 Failed"),
    e("Hello {{user.name}}, course={{course|Unknown}}.\nuser.name=Mira", "Hello Mira, course=Unknown.\nResolved: 2\nMissing keys: course"),
  ],
  "lambda-syntax": [
    e("12 4\noperations: add subtract multiply divide", "add=16\nsubtract=8\nmultiply=48\ndivide=3.00"),
    e("  Object Oriented Java  \ntransformations: trim lower mask", "trim => Object Oriented Java\nlower => object oriented java\nmask => O***** O******* J***"),
    e("RULE positive\nRULE even\nCHECK 8\nCHECK -3", "8: positive=PASS even=PASS overall=PASS\n-3: positive=FAIL even=FAIL overall=FAIL"),
  ],
  "block-lambdas": [
    e("-2\n0\n7\n22", "-2 => negative\n0 => zero\n7 => small\n22 => large"),
    e("1200\nmember=true\ncategory=books", "Subtotal: 1200.00\nDiscount: 180.00\nTax: 51.00\nFinal: 1071.00"),
    e("3\nS1 80 2\nS2 75 5\nS3 92 1\npolicy=balanced", "S1 score=84\nS2 score=85\nS3 score=94\nWinner: S3"),
  ],
  "functional-interfaces": [
    e("42\nconverter: int-to-hex", "2A"),
    e("3\nP1 Book 500\nP2 Pen 20\nP3 Bag 900\nfilter: price>=500", "P1 Book 500.00\nP3 Bag 900.00"),
    e("record=S1,Mira,82\nsteps=validate,normalize,notify", "VALIDATE PASS\nNORMALIZE S1|Mira|82\nNOTIFY Student S1 processed\nWorkflow: SUCCESS"),
  ],
  "passing-lambdas": [
    e("6\n1 2 3 4 5 6\npredicate=even", "2 4 6"),
    e("3\nS1 Mira 82\nS2 Dev 91\nS3 Tara 75\nfilter=marks>=80 sort=marks-desc", "S2 Dev 91\nS1 Mira 82"),
    e("T1 1000\npolicies=positive,limit:5000,fee:2%", "Validation: PASS\nFee: 20.00\nNet amount: 980.00\nTransaction T1 committed"),
  ],
  capture: [
    e("threshold=10\nvalues=4 10 11 18", "11 18"),
    e("prefix=EVEN\nvalues=1 2 3 4 5 6", "EVEN values: 2 4 6\nMatched: 3\nSum: 12"),
    e("1 2 3 4 5 6 7 8\nparallel square-and-sum", "Squares: 1 4 9 16 25 36 49 64\nSum: 204\nShared mutable captures: 0"),
  ],
  "method-references": [
    e("Mira\nDev", "Mira\nDev"),
    e(" 42 \n 17 \nbad", "Parsed values: 42,17\nRejected: bad\nObjects created: 2"),
    e("upper java\nlength object\nreverse lab\nunknown text", "JAVA\n6\nbal\nERROR: unknown command"),
  ],
  frames: [
    e("Launch application", "A 320x180 frame titled 'Hello OOP' appears with a centred label 'Welcome'. Closing the window ends the program."),
    e("Enter ID S1, name Mira Rao, branch CSE; click Save", "The form shows 'Saved S1 — Mira Rao (CSE)' and clears the input fields."),
    e("Open app; switch from Dashboard to Students; resize window", "Navigation remains visible, the Students panel replaces Dashboard, and controls resize without overlapping."),
  ],
  layouts: [
    e("Launch the frame", "Five panels labelled NORTH, SOUTH, EAST, WEST and CENTER occupy their BorderLayout regions."),
    e("Resize calculator from 320x420 to 600x500", "Display stays above a 4x4 button grid; every button grows evenly and no label is clipped."),
    e("Resize dashboard; add and remove one status card", "Header and sidebar stay fixed; cards wrap into available columns; the footer remains below the content."),
  ],
  controls: [
    e("ID=S1, Course=CS F213; click Submit", "Result label: 'S1 selected CS F213'."),
    e("Item=Notebook, Quantity=0; click Add; then Quantity=2", "First click: 'Quantity must be at least 1'. Second click: 'Added 2 × Notebook'; fields reset."),
    e("Choose Country=India, State=Karnataka; change Country=Japan", "State choices initially include Karnataka. After the country change, only Japanese prefectures remain and no invalid old value is selected."),
  ],
  "menus-dialogs": [
    e("Choose File > New, then File > Exit", "New resets the document. Exit closes the frame through the same shutdown method as the window close button."),
    e("Open Preferences; change font size 14 to 18; press Cancel; reopen and press Apply", "Cancel keeps 14. Apply changes the main view to 18 and stores the new preference."),
    e("Edit document; choose Open; answer Cancel, then Discard", "Cancel leaves the edited document untouched. Discard opens the selected document and clears the dirty flag."),
  ],
  graphics: [
    e("Launch canvas", "Canvas paints a blue rectangle, red circle and the label 'Shapes' from its paint method."),
    e("Values: 10,20,5; resize canvas to twice its width", "Three proportional bars remain inside the canvas; 20 is tallest and labels stay readable after resize."),
    e("Click to add two circles; drag one; resize window", "The moved circle follows the stored position, both circles repaint after resize, and old drawings do not remain on screen."),
  ],
  "ui-architecture": [
    e("Click + twice, then Reset", "Labels show 1, then 2, then 0. Counter arithmetic works in a separate model with no AWT imports."),
    e("Marks 80,70,90; click Calculate", "Average: 80.00, Grade: A. The grade service can be tested without constructing the form."),
    e("Create booking B1 for room R2; attempt conflicting B2; open summary", "B1 appears in the model and summary. B2 shows a conflict error and is absent from both views."),
  ],
  "action-listeners": [
    e("Click Count three times", "Label changes to 'Count: 3'. One listener was registered."),
    e("Enter 12 and 4; click +, ×, ÷", "Result changes to 16, 48 and 3.00. Buttons delegate to shared calculator methods."),
    e("Click Save, Undo, Redo and an unknown toolbar command", "Each known command runs its command object once; unknown command is disabled or reports a controlled error."),
  ],
  adapters: [
    e("Click the window close button", "Resources are released and the application terminates cleanly."),
    e("Press at (10,10), drag to (45,30), release", "Status shows 'start=(10,10), end=(45,30), distance=40.31'."),
    e("Press Ctrl, drag an item, release outside canvas, then close", "Modifier state, drag state and cancellation reset correctly; shutdown runs once."),
  ],
  "input-events": [
    e("Press the A key", "Label: 'Key=A, code=65'."),
    e("Canvas 200x100; press Right 25 times and Down 4 times", "Object stops at the right and bottom boundaries and never paints outside the canvas."),
    e("Bind Ctrl+S to save and Ctrl+Shift+S to save-as; hold S while a text field is focused", "The correct shortcut fires once per press; normal typing remains available in editable fields."),
  ],
  "event-state": [
    e("Click Toggle three times", "State sequence: ON, OFF, ON."),
    e("Answer Q1 incorrectly, retry correctly, move to Q2", "Current question=2, attempts=2, score=1. Revisiting Q1 does not add score again."),
    e("Create B1; select B1; edit date; undo; cancel B1; undo", "Selection never points to a deleted object, undo restores exact prior state, and no partial edit is visible."),
  ],
  "event-design": [
    e("Enter 0 Celsius; click Convert", "Result: 32.00 °F. The event handler calls a separately testable converter."),
    e("Enter SKU P1 and quantity 5; click Add; then enter -2", "Stock becomes 5. The invalid update shows an error and stock remains 5."),
    e("Edit booking B1 in editor window; click Save; close summary and reopen it", "Summary receives the domain change and shows B1; reopening reconstructs from model state rather than old widget references."),
  ],
  "try-catch": [
    e("12 0\ntwelve 3\n12 4", "Cannot divide by zero\nInvalid integer input\nResult: 3.00"),
    e("S1,Mira,82\nbad row\nS2,Dev,ninety\nS3,Tara,75", "Imported: S1,S3\nLine 2: expected 3 fields\nLine 3: marks is not an integer\nSuccess=2 Failed=2"),
    e("ADD 4 2\nGET 9\nDIV 5 0\nUNKNOWN\nQUIT", "6\nERROR: index 9 out of range\nERROR: division by zero\nERROR: unknown command\nSession completed"),
  ],
  "multiple-catch": [
    e("Arguments: 12 x 4", "Argument 2 is not an integer: x"),
    e("OPEN missing.txt\nOPEN malformed.txt\nCOMMAND erase", "missing.txt: file not found\nmalformed.txt: invalid record at line 2\nerase: unsupported command"),
    e("Repository times out while loading B1", "Application error: booking service is temporarily unavailable\nCause retained: SocketTimeoutException\nRetryable: true"),
  ],
  "throw-throws": [
    e("-1\n20", "Rejected: age must be from 0 to 120\nAccepted age: 20"),
    e("A1=500 A2=100\ntransfer 700\ntransfer 200", "Rejected: insufficient funds; A1=500 A2=100\nApproved; A1=300 A2=300"),
    e("LOAD B1", "Repository throws IOException\nService throws BookingUnavailableException with cause\nMain reports 'Booking data unavailable'"),
  ],
  propagation: [
    e("Main -> process -> parse with value 'abc'", "Main caught NumberFormatException from parse\nProgram continues"),
    e("Book room R1 for unavailable date", "AvailabilityException propagates Room -> BookingService -> Main\nMain: 'R1 is unavailable on 2026-09-20'"),
    e("Debit A, reserve item, credit B; credit step fails", "Transaction failed at credit step\nA balance restored\nItem reservation released\nB unchanged"),
  ],
  "custom-exceptions": [
    e("balance=300 withdraw=450", "InsufficientFundsException: requested=450.00 available=300.00\nBalance remains 300.00"),
    e("Enroll S1 in CS2 twice; enroll S2 without CS1; fill CS2 and enroll S3", "DuplicateEnrollmentException for S1\nPrerequisiteException for S2: CS1 required\nCourseFullException for S3"),
    e("Reserve R1 on blocked date; reserve R2 when service is offline", "R1: PermanentReservationException, do not retry\nR2: RetryableReservationException, retry later"),
  ],
  "finally-assertions": [
    e("Run once successfully and once with an exception", "SUCCESS path\nfinally: cleanup\nFAILURE path\nfinally: cleanup"),
    e("Open resource; operation returns early on validation failure", "Validation failed\nResource close count: 1\nResource open: false"),
    e("Transfer keeps total balance constant; run with -ea", "Valid transfer completed\nAssertion detects deliberately corrupted total in test mode\nCleanup completed in both cases"),
  ],
  "thread-creation": [
    e("Start Worker-A for 1..3 and Worker-B for A..C", "Each worker prints its three values with its thread name\nMain prints DONE only after both finish"),
    e("Sections: [1,2,3], [10,20], [4,5]", "Worker totals: 6,30,9\nCombined total: 45"),
    e("4 tasks; task 3 throws; maximum 2 workers", "Completed: 1,2,4\nFailed: 3 — simulated failure\nAll worker threads terminated\nCoordinator status: PARTIAL_FAILURE"),
  ],
  "thread-lifecycle": [
    e("Start workers of different durations; join all", "Worker completion order may vary\nFinal line is always: ALL WORK COMPLETE"),
    e("Start prime-search worker; interrupt after bounded work", "Worker noticed interruption\nWorker cleaned up\nMain sees interrupted task as cancelled"),
    e("Start 2 producers and 2 consumers; cancel after 20 items", "Produced=20 Consumed=20\nQueue empty=true\nAll workers stopped=true\nNo thread remains blocked"),
  ],
  synchronization: [
    e("4 threads × 10000 increments", "Expected: 40000\nUnsafe result: may be lower\nSynchronized result: 40000"),
    e("Tickets=5; three sellers each request 3", "Exactly 5 tickets sold\nRemaining: 0\nOversold: false"),
    e("A=1000 B=1000; run 100 concurrent A↔B transfers", "Final total: 2000.00\nNo negative balance\nDeadlock: false\nAll transfers accounted for"),
  ],
  "keyboard-streams": [
    e("Java\nOOP\nEND", "1: Java\n2: OOP\nLines: 2"),
    e("File input.txt:\nJava is fun\nOOP is useful", "File summary.txt:\nLines: 2\nWords: 7\nCharacters: 25"),
    e("A large UTF-8 file containing mixed blank and data lines", "Output contains each nonblank line uppercased\nProcessed line count is printed\nMemory use does not grow with file size"),
  ],
  "byte-streams": [
    e("Source: image.bin (5237 bytes)", "Copied 5237 bytes to image-copy.bin\nFiles have equal length"),
    e("Source bytes: 41 42 43 44", "Copied bytes: 4\nSource checksum: DB1720A5\nDestination checksum: DB1720A5\nVerified: true"),
    e("Records: [id=1,length=3,data=ABC], [id=2,length=2,data=XY]", "Archive header valid\nRecord 1: ABC\nRecord 2: XY\nCorrupt length test: detected at byte 18"),
  ],
  "file-api": [
    e("Path: notes.txt", "Name: notes.txt\nType: file\nExists: true\nReadable: true\nSize: 128 bytes"),
    e("Directory contains b.java, a.java, readme.md, c.java", "a.java 120\nb.java 90\nc.java 150\nMatched files: 3\nTotal bytes: 360"),
    e("Files: photo.jpg, photo-copy.jpg, report.pdf; categories Images and Documents", "PLAN\nphoto.jpg -> Images/photo.jpg\nphoto-copy.jpg -> Images/photo-copy.jpg\nreport.pdf -> Documents/report.pdf\nConflicts: 0\nMoved: 3"),
  ],
  "random-data-io": [
    e("Write id=7, name=Mira, score=82.5", "Read id=7\nRead name=Mira\nRead score=82.5\nValues match: true"),
    e("Records R1=50, R2=60, R3=70; update R2 to 95", "R1=50\nR2=95\nR3=70\nOnly record 2 bytes changed"),
    e("Open version-2 store with 3 indexed records; corrupt record 2 length", "Version: 2\nRecord 1: valid\nRecord 2: CORRUPT at offset 64\nRecord 3: reachable through index\nStore opened read-only with warning"),
  ],
  serialization: [
    e("Student{id=S1,name=Mira,marks=82}", "Restored Student{id=S1,name=Mira,marks=82}\nEqual data: true"),
    e("Catalogue with 2 products and derived total=900", "Restored products: 2\nTransient cached total after restore: 0\nRecalculated total: 900.00"),
    e("Load version-1 snapshot into version-2 Student with new email field", "Old snapshot loaded\nemail defaults to unknown\nInvalid restored mark 140 is rejected\nCorrupt snapshot reports a controlled error"),
  ],
  "responsibility-design": [
    e("Original StudentManager stores students, calculates grades and prints reports", "StudentRepository stores records\nGradeService calculates grades\nStudentReport formats output\nMain coordinates them"),
    e("ORDER O1 C1\nADD P1 2\nPAY CARD\nSHIP", "Order O1 total calculated by Order\nPayment approved by PaymentService\nShipment created by ShippingService\nStatus: SHIPPED"),
    e("Existing pricing supports regular and member orders; add festival pricing", "FestivalPricing is added as one new policy class\nOrder and checkout classes are unchanged\nAll three policies pass the same contract tests"),
  ],
  singleton: [
    e("Call Configuration.getInstance() three times", "One Configuration constructed\nAll references identical: true"),
    e("100 threads call getInstance() simultaneously", "Instances constructed: 1\nDistinct identity values observed: 1"),
    e("Production uses GlobalConfiguration; test injects FakeConfiguration", "Production value: timeout=30\nTest value: timeout=1\nConsumer depends only on Configuration interface"),
  ],
  factory: [
    e("circle 2\nrectangle 3 4\ntriangle 3 4", "Circle area=12.57\nRectangle area=12.00\nERROR: unsupported shape triangle"),
    e("SAVINGS A1 Mira 1000\nCURRENT A2 Dev 500 2000", "Created SavingsAccount A1\nCreated CurrentAccount A2\nMain called AccountFactory, not constructors"),
    e("REGISTER csv CsvImporter\nREGISTER json JsonImporter\nCREATE json", "Registered: csv,json\nCreated JsonImporter\nCentral factory switch statements: 0"),
  ],
  strategy: [
    e("amount=1000 strategy=student", "Discount: 150.00\nFinal: 850.00"),
    e("Routes: A(distance=10,time=30,cost=80), B(14,20,60)\nstrategies=shortest,fastest,cheapest", "Shortest: A\nFastest: B\nCheapest: B"),
    e("base=1200\nstrategies=member10,bulk5,tax18\ninvalid negative base test", "Member discount: -120.00\nBulk discount: -54.00\nTax: 184.68\nFinal: 1210.68\nAudit entries: 3\nNegative base rejected before strategies run"),
  ],
  observer: [
    e("Subscribe ConsoleDisplay; set score 10 then 15", "ConsoleDisplay: score changed 0 -> 10\nConsoleDisplay: score changed 10 -> 15"),
    e("Subscribe EmailAlert at price<50 and AppAlert for all changes; update 80 then 45; unsubscribe app", "AppAlert: price=80\nAppAlert: price=45\nEmailAlert: price below 50\nSubscribers after unsubscribe: 1"),
    e("Observers A, B, C; B unsubscribes itself; C throws during notification", "A notified\nB notified and removed\nC failed; failure recorded\nRemaining observers: A,C\nSubject state update completed"),
  ],
  "adapter-template": [
    e("New client calls print('Hello') through LegacyPrinterAdapter", "LegacyPrinter.printText received: Hello\nClient used Printable only"),
    e("Generate HTML and text reports for the same sales data", "Both run: load -> validate -> format -> deliver\nHTML uses tags\nText uses aligned columns"),
    e("Import CSV and legacy fixed-width records", "CSV adapter produced 2 StandardRecords\nLegacy adapter produced 2 StandardRecords\nTemplate validated, transformed and saved 4 records\nRejected records: 0"),
  ],
};

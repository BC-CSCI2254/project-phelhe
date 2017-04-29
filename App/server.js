// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

//get descriptions

//use express
var express = require('express');
//create app
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 8150, listen); //8150 -- phelpsh@cslab1.bc.edu with Eagle ID as pw

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

//list of colors
let colors =["Aqua","Aquamarine","Blue","BlueViolet","Chartreuse","CornflowerBlue","Crimson","Cyan","DeepPink","DeepSkyBlue","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gold","GoldenRod","Green","GreenYellow","HotPink","Indigo","Khaki","LawnGreen","LightBlue","LightCoral","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGreen","PaleTurquoise","PaleVioletRed","Pink","Plum","PowderBlue","Purple","Red","RoyalBlue","Salmon","SeaGreen","SkyBlue","SlateBlue","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Yellow","YellowGreen"];

let colors2 = ["#7AD334", "#88aaff", "#F0A000", "#DAD320", "#dd9999", "#ffaa88", "#ddaacc", "#62f79b", "#304bff"];

//list of majors
let majors = ["Computer Science B.A.", "Computer Science B.S.", "Economics"];

//major trees
let csciBSCore = new csciBS();
let csciBACore = new csciBA();
let economicsCore = new econCore();
//****************************

//major classlists
let csciClassesBS = [{name: "Calculus I", taken: 0}, {name: "Computer Science 1", taken: 0},{name: "Computer Science 2", taken: 0},{name: "Technology and Culture", taken:0},{name: "Calculus II", taken: 0}, {name: "Computer Organization", taken: 0}, {name: "Computer Systems", taken: 0},{name: "Logic and Computation", taken: 0},{name: "Randomness and Computation", taken: 0}, {name: "Linear Algebra", taken:0}, {name: "Computer Architecture", taken:0},{name: "Multivariable Calculus", taken:0},{name: "Algorithms", taken: 0}];
let csciClassesBA = [{name: "Calculus I", taken: 0}, {name: "Computer Science 1", taken: 0},{name: "Computer Science 2", taken: 0},{name: "Calculus II", taken: 0}, {name: "Computer Organization", taken: 0}, {name: "Computer Systems", taken: 0},{name: "Logic and Computation", taken: 0},{name: "Randomness and Computation", taken: 0}, {name: "Algorithms", taken: 0}];
let econClasses = [{name: "Principles of Economics", taken: 0}, {name: "Calculus I", taken: 0},{name: "Economic Statistics", taken: 0},{name: "Econometrics", taken: 0}, {name: "Macroeconomic Theory", taken: 0}, {name: "Microeconomic Theory", taken:0}];
//****************************

let CSCId = new CSCIdescriptions();

//new itp-networked-media
let computerScienceBA = {name: "Computer Science B.A.", classes: csciClassesBA, tree:csciBACore, descriptions:CSCId};
let computerScienceBS = {name: "Computer Science B.S.", classes: csciClassesBS, tree:csciBSCore, descriptions:CSCId};
let Economics = {name: "Economics", classes: econClasses, tree: economicsCore};

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id); //USE THIS SOCKET ID TO EMIT A MESSAGE BACK!!

    //socket.broadcast.to(socket.id).emit('chooseMajor', 'hello');
    io.to(socket.id).emit('chooseMajor', majors);

    //should emit the choosmajor event to the client!!!

    //need to figure out how to submit to just one user

    //should emit chooseMajor to the client
    //should be recieved when the user goes back from the class choice part
    socket.on('chooseMaj',
      function() {
        console.log("choose major page");
        io.to(socket.id).emit('chooseMajor', majors); //send them back to the choose major page
    });

    //should emit displayClasses to the client
    //should be recieved when the user clicks submit on their major
    socket.on('chooseClasses',
      function(major) {
        console.log(socket.id + " chose: " + major);
        switch (major) {
          case "Computer Science B.S.":
            io.to(socket.id).emit('receivedClasses', computerScienceBS);
            break;
          case "Computer Science B.A.":
            io.to(socket.id).emit('receivedClasses', computerScienceBA);
            break;
          case "Economics":
            io.to(socket.id).emit('receivedClasses', Economics);
            break;
          default:

        }
      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);


//class tree functions

function chooseColor(){
  //console.log("choosing a color...");
  var index = Math.floor(Math.random()*colors2.length);
  var choice = colors2[index];
  //colors.splice(index,1);
  //console.log(choice);
  return choice;
}

function classNode(name, code, prereqs, level){
  this.name = name;
  this.code = code;
  this.prereqs = prereqs;
  this.taken = 0;
  this.visited = 0;
  this.level = level;
  this.color = chooseColor();
  //colors[Math.floor(Math.random()*colors.length)];
  //'#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

function econCore(){
  this.ECON1131 = new classNode("Principles of Macroeconomics", "ECON1131", [], 1000);
  this.ECON1132 = new classNode("Principles of Microeconomics", "ECON1131", [], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
  this.ECON1151 = new classNode("Economic Statistics", "ECON1151", [], 1000);
  this.ECON2201 = new classNode("Microeconomic Theory", "ECON2201", [this.ECON1131, this.MATH1100], 2000);
  this.ECON2202 = new classNode("Macroeconomic Theory", "ECON2202", [this.ECON1132, this.MATH1100], 2000);
  this.ECON2228 = new classNode("Econometrics", "ECON2228", [this.ECON1151, this.MATH1100], 2000);
  this.core = new classNode("Core", "ECON complete", [this.ECON2201, this.ECON2202, this.ECON2228], 3000);
  //electives
  this.electives = new classNode("Electives", "Econ Electives", []);
}

function csciBA(){ //just has CSCI elective requirements
  this.CSCI1101 = new classNode("Computer Science I", "CSCI1101", [], 1000);
  this.CSCI1102 = new classNode("Computer Science II", "CSCI1102", [this.CSCI1101], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
  this.CSCI2272 = new classNode("Computer Organization", "CSCI2272", [this.CSCI1102], 2000);
  this.CSCI2271 = new classNode("Computer Systems", "CSCI2271", [this.CSCI1102], 2000);
  this.CSCI2243 = new classNode("Logic and Computation", "CSCI2243", [this.CSCI1101], 2000);
  this.CSCI2244 = new classNode("Randomness and Computation", "CSCI2244", [this.CSCI1101, this.MATH1100], 2000);
  this.MATH1101 = new classNode("Calculus II", "MATH1101", [this.MATH1100], 2000);
  this.CSCI3383 = new classNode("Algorithms", "CSCI3383", [this.CSCI2243, this.CSCI2244], 3000);
  this.core = new classNode("Core", "CSCIBA complete", [this.CSCI3383, this.MATH1101, this.CSCI2272, this.CSCI2271], 4000);

  //electives1000
  this.CSCI1021 = new classNode("Computers in Management", "CSCI1021", []);
  this.CSCI1074 = new classNode("The Digital World", "CSCI1074", []);
  this.CSCI1075 = new classNode("The Digital World of Robots", "CSCI1075", []);
  this.CSCI1154 = new classNode("Intro to Programming and Web Apps", "CSCI1154", []);
  this.electives1000 = new classNode("Electives", "CS Electives 1000", [this.CSCI1021, this.CSCI1074, this.CSCI1075, this.CSCI1154]);

  //electives2000
  this.CSCI2201 = new classNode("Computer Security", "CSCI2201", []);
  this.CSCI2227 = new classNode("Intro to Scientific Computation", "CSCI2227", [this.MATH1101]);
  this.CSCI2254 = new classNode("Web Application Development", "CSCI2254", [this.CSCI1101]);
  this.CSCI2257 = new classNode("Database Systems and Applications", "CSCI2257", [this.CSCI1101]);
  this.CSCI2258 = new classNode("Systems and Analysis and Design", "CSCI2258", [this.CSCI1101]);
  this.CSCI2267 = new classNode("Technology and Culture", "CSCI2267", []);
  this.electives2000 = new classNode("Electives", "CS Electives 2000", [this.CSCI2201, this.CSCI2227, this.CSCI2254, this.CSCI2257, this.CSCI2258,this.CSCI2267]);
  //electives3000
  this.CSCI3333 = new classNode("Computer Graphics", "CSCI3333", [this.CSCI1102]);
  this.CSCI3335 = new classNode("Principles of Multimedia Systems", "CSCI3335", []);
  this.CSCI3341 = new classNode("Artificial Intelligence", "CSCI3341", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3343 = new classNode("Computer Vision", "CSCI3343", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3344 = new classNode("Mobile Application Development", "CSCI3344", [this.CSCI1102]);
  this.CSCI3345 = new classNode("Machine Learning", "CSCI3345", [this.CSCI1101, this.CSCI2244]);
  this.CSCI3346 = new classNode("Data Mining", "CSCI3346", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3347 = new classNode("Robotics", "CSCI3347", [this.CSCI1101]);
  this.CSCI3353 = new classNode("Object Oriented Design", "CSCI3353", [this.CSCI1102]);
  this.CSCI3356 = new classNode("Software Engineering", "CSCI3356", [this.CSCI3353]);
  this.CSCI3357 = new classNode("Database System Implementation", "CSCI3357", [this.CSCI1101]);
  this.CSCI3359 = new classNode("Distributed Systems", "CSCI3359", [this.CSCI1102]);
  this.CSCI3362 = new classNode("Operating Systems", "CSCI3362", [this.CSCI2271]);
  this.CSCI3363 = new classNode("Computer Networks", "CSCI3363", [this.CSCI2271]);
  this.CSCI3366 = new classNode("Principles of Programming Languages", "CSCI3366", [this.CSCI2271]);
  this.CSCI3367 = new classNode("Compilers", "CSCI3367", [this.CSCI2271]);
  this.CSCI3381 = new classNode("Cryptography", "CSCI3381", [this.CSCI2243]);
  this.electives3000 = new classNode("Electives", "CS Electives 3000", [this.CSCI3341,this.CSCI3333, this.CSCI3335, this.CSCI3343, this.CSCI3344, this.CSCI3345, this.CSCI3346, this.CSCI3347, this.CSCI3353, this.CSCI3356, this.CSCI3357, this.CSCI3359, this.CSCI3362, this.CSCI3363, this.CSCI3366, this.CSCI3367, this.CSCI3381]);
}

function csciBS(){ //has math33xx elective requirement as well as CSCI elective requirements and thesis? can do 3397 thesis research in place of 33xx level elective
  this.CSCI1101 = new classNode("Computer Science I", "CSCI1101", [], 1000);
  this.CSCI1102 = new classNode("Computer Science II", "CSCI1102", [this.CSCI1101], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
  this.CSCI2267 = new classNode("Technology and Culture", "CSCI2267", [], 1000);
  this.CSCI2272 = new classNode("Computer Organization", "CSCI2272", [this.CSCI1102], 2000);
  this.CSCI2271 = new classNode("Computer Systems", "CSCI2271", [this.CSCI1102], 2000);
  this.CSCI2243 = new classNode("Logic and Computation", "CSCI2243", [this.CSCI1101], 2000);
  this.CSCI2244 = new classNode("Randomness and Computation", "CSCI2244", [this.CSCI1101, this.MATH1100], 2000);
  this.MATH1101 = new classNode("Calculus II", "MATH1101", [this.MATH1100], 2000);
  this.MATH2202 = new classNode("Multivariable Calculus", "MATH2202", [this.MATH1101], 3000);
  this.MATH2210 = new classNode("Linear Algebra", "MATH2210", [], 2000);
  this.CSCI2267 = new classNode("Technology and Culture", "CSCI2267", [], 2000);
  this.CSCI3383 = new classNode("Algorithms", "CSCI3383", [this.CSCI2243, this.CSCI2244], 3000);
  this.CSCI3372 = new classNode("Computer Architecture", "CSCI3372", [this.CSCI2272], 3000);
  this.core = new classNode("Core", "CSCIBA complete", [this.CSCI3383, this.MATH2202, this.MATH2210, this.CSCI3372, this.CSCI2272, this.CSCI2271, this.CSCI2267], 4000);

  //electives1000
  this.CSCI1021 = new classNode("Computers in Management", "CSCI1021", []);
  this.CSCI1074 = new classNode("The Digital World", "CSCI1074", []);
  this.CSCI1075 = new classNode("The Digital World of Robots", "CSCI1075", []);
  this.CSCI1154 = new classNode("Intro to Programming and Web Apps", "CSCI1154", []);
  this.electives1000 = new classNode("Electives", "CS Electives 1000", [this.CSCI1021, this.CSCI1074, this.CSCI1075, this.CSCI1154]);

  //electives2000
  this.CSCI2201 = new classNode("Computer Security", "CSCI2201", []);
  this.CSCI2227 = new classNode("Intro to Scientific Computation", "CSCI2227", [this.MATH1101]);
  this.CSCI2254 = new classNode("Web Application Development", "CSCI2254", [this.CSCI1101]);
  this.CSCI2257 = new classNode("Database Systems and Applications", "CSCI2257", [this.CSCI1101]);
  this.CSCI2258 = new classNode("Systems and Analysis and Design", "CSCI2258", [this.CSCI1101]);
  this.electives2000 = new classNode("Electives", "CS Electives 2000", [this.CSCI2201, this.CSCI2227, this.CSCI2254, this.CSCI2257, this.CSCI2258]);

  //electives 3000
  this.CSCI3333 = new classNode("Computer Graphics", "CSCI3333", [this.CSCI1102]);
  this.CSCI3335 = new classNode("Principles of Multimedia Systems", "CSCI3335", []);
  this.CSCI3341 = new classNode("Artificial Intelligence", "CSCI3341", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3343 = new classNode("Computer Vision", "CSCI3343", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3344 = new classNode("Mobile Application Development", "CSCI3344", [this.CSCI1102]);
  this.CSCI3345 = new classNode("Machine Learning", "CSCI3345", [this.CSCI1101, this.CSCI2244]);
  this.CSCI3346 = new classNode("Data Mining", "CSCI3346", [this.CSCI1102, this.CSCI2244]);
  this.CSCI3347 = new classNode("Robotics", "CSCI3347", [this.CSCI1101]);
  this.CSCI3353 = new classNode("Object Oriented Design", "CSCI3353", [this.CSCI1102]);
  this.CSCI3356 = new classNode("Software Engineering", "CSCI3356", [this.CSCI3353]);
  this.CSCI3357 = new classNode("Database System Implementation", "CSCI3357", [this.CSCI1101]);
  this.CSCI3359 = new classNode("Distributed Systems", "CSCI3359", [this.CSCI1102]);
  this.CSCI3362 = new classNode("Operating Systems", "CSCI3362", [this.CSCI2271]);
  this.CSCI3363 = new classNode("Computer Networks", "CSCI3363", [this.CSCI2271]);
  this.CSCI3366 = new classNode("Principles of Programming Languages", "CSCI3366", [this.CSCI2271]);
  this.CSCI3367 = new classNode("Compilers", "CSCI3367", [this.CSCI2271]);
  this.CSCI3381 = new classNode("Cryptography", "CSCI3381", [this.CSCI2243]);
  this.electives3000 = new classNode("Electives", "CS Electives", [this.CSCI3341,this.CSCI3333, this.CSCI3335, this.CSCI3343, this.CSCI3344, this.CSCI3345, this.CSCI3346, this.CSCI3347, this.CSCI3353, this.CSCI3356, this.CSCI3357, this.CSCI3359, this.CSCI3362, this.CSCI3363, this.CSCI3366, this.CSCI3367, this.CSCI3381]);
}


function CSCIdescriptions(){
  return [
  {
    name: "Computer Science I",
    code: "CSCI1101",
    desc: " This course is an introduction to the art and science of computer programming and to some of the fundamental concepts of computer science. Students will write programs in the Python programming language. Good program design methodology will be stressed throughout. There will also be a study of some of the basic notions of computer science, including computer systems organization, files and some algorithms of fundamental importance."
  },

  {
    name: "Computer Science II",
    code: "CSCI1102",
    desc:"  In this course the student will write programs that employ more sophisticated and efficient means of representing and manipulating information. Part of the course is devoted to a continued study of programming. The principal emphasis, however, is on the study of the fundamental data structures of computer science (lists, stacks, queues, trees, etc.). Both their abstract properties and their implementations in computer programs and the study of the fundamental algorithms for manipulating these structures. Students will use Java for programming."
  },

  {
    name: "Logic and Computation",
    code: "CSCI2243",
    desc: " A course in the mathematical foundations of Computer Science, illustrated throughout with applications such as sets and functions, propositional and predicate logic, induction and recursion, basic number theory and mathematical models of computation such as formal languages, finite state machines, and Turing machines."
  },

  {
    name: "Randomness and Computation",
    code: "CSCI 2244",
    desc: " This course presents the mathematical and computational tools needed to solve problems that involve randomness. For example, an understanding of random variables allows us to efficiently generate the enormous prime numbers needed for information security, and to quantify the expected performance of a machine learning algorithm beyond a small data sample. An understanding of covariance allows high quality compression of audio and video. Topics include combinatorics and counting, random experiments and probability, random variables and distributions, computational modeling of randomness, Bayes' rule, laws of large numbers, vectors and matrices, covariance and principal axes, and Markov chains."
  },

  {
    name: "Computer Systems",
    code: "CSCI2271",
    desc: " This course is concerned with machine-level program and data representation on modern computer systems and on some of the trade-offs that must be considered when selecting one representation (or programming paradigm) over another. We consider how various representations can affect the efficiency, reliability, and security of computing systems. This is a hands-on course; programming will be comped in the procedural language C with comparisons to object-oriented languages such as Java."
  },

  {
    name: "Computer Organization",
    code: "CSCI2272",
    desc: " This course studies the internal organization of computers and the processing of machine instructions. Topics include computer representation of numbers, combinational circuit design (decoders, multiplexers), sequential circuit design and analysis, memory design (registers and main memory), and simple processors including datapaths, instruction formats, and control units. In the laboratory-based portion of course students design and build digital circuits related to lecture. Exercises include hardware description languages, combinational and sequential circuits, arithmetic and logic units, and simple datapath and control units."
  },

  {
    name: "Algorithms",
    code: "CSCI3383",
    desc: " This course is a study of algorithms for, among other things, sorting, searching, pattern matching, and manipulation of graphs and trees. Emphasis is placed on the mathematical analysis of the time and memory requirements of such algorithms and on general techniques for improving their performance."
  },

  {
    name: "Computer Architecture",
    code: "CSCI3372",
    desc: ""
  },

  {
    name: "Calculus I",
    code: "MATH1100",
    desc: " MATH1100 is a first course in the calculus of one variable intended for biology, computer science, economics, management, and premedical students. It is open to others who are qualified and desire a more rigorous mathematics course at the core level. Topics include a brief review of polynomials and trigonometric, exponential, and logarithmic functions, followed by discussion of limits, derivatives, and applications of differential calculus to real-world problem areas. The course concludes with an introduction to integration."
  },

  {
    name: "Calculus II",
    code: "MATH1101",
    desc: " MATH1101 is a second course in the calculus of one variable intended for biology, computer science, economics, management, and premedical students. It is open to others who are qualified and desire a more rigorous mathematics course at the core level. Topics include an overview of integration, basic techniques for integration, a variety of applications of integration, and an introduction to (systems of) differential equations."
  },

  {
    name: "Linear Algebra",
    code: "MATH2210",
    desc: " This course is an introduction to the techniques of linear algebra in Euclidean space. Topics covered include matrices, determinants, systems of linear equations, vectors in n-dimensional space, complex numbers, and eigenvalues. The course is required of mathematics majors but is also suitable for students in the social sciences, natural sciences, and management."
  },

  {
    name: "Multivariable Calculus",
    code: "MATH2202",
    desc: " Topics in this course include vectors in two and three dimensions, analytic geometry of three dimensions, parametric curves, partial derivatives, the gradient, optimization in several variables, multiple integration with change of variables across different coordinate systems, line integrals, and Green's Theorem."
  },

  // electives
  {
    name: "Distributed Systems",
    code: "CSCI3359",
    desc: " Students will learn the major paradigms of distributed computing including client-server and peer-to-peer models. Topics studied in these models include communication, synchronization, performance, fault-tolerance and security. Students will learn how to analyze the correctness of distributed protocols and will be required to build distributed applications."
  },

  {
    name: "Topics in Computer Science",
    code: "CSCI3390",
    desc: " Everyone should know how to think Parallel. Even a laptop or cellphone has multiple CPU cores at our disposal these days. In this hands-on, project oriented class you will learn the main ideas of parallel computing with GPU. Our focus will be on the CUDA programming language. You will learn about GPU architectures, about parallel algorithms, CUDA libraries and GPU computing applications. The prerequisite for this class are C programming language, multivariate calculus, linear algebra and algorithms and randomness and computation. If you do not have all of these prerequisites and want to take the class, please talk with me. There is a limited number of spots available."
  },

  {
    name: "Technology and Culture",
    code: "CSCI2267",
    desc: " This interdisciplinary course will first investigate the social, political, psychological, ethical, and spiritual aspects of the Western cultural development with a special emphasis on scientific and technological metaphors and narratives. We will then focus on the contemporary world, examining the impact of our various technological creations on cultural directions, democratic process, the world of work, quality of life, and especially on the emergent meanings for the terms citizen and ethics in contemporary society. Students will explore technologies in four broad and interrelated domains: (1) computer, media, communications, and information technologies, (2) biotechnology, (3) globalization, and (4) environmental issues."
  },

  {
    name: "Database Systems and Applications",
    code: "CSCI2257",
    desc: " This course provides in-depth coverage of database systems and their uses. Topics include database architecture, design strategies, SQL queries, security, performance, and using database tools and scripting languages to create sophisticated forms and applications, including web applications. The goal of the course is to give students the knowledge and skills to use databases effectively in any business situation."
  },

  {
    name: "Computer Security",
    code: "CSCI2201",
    desc: " In a world of ever-increasing dependence on technology, news stories about data breaches and other types of cyber attacks seem to happen on a daily basis. These breaches have real consequences that can cost a company millions of dollars and damage to its reputation. Today's business system managers need to understand these threats and know how to protect their digital assets. This course provides a strong starting foundation for understanding the complex threats system managers face today and what they need to do to harden their systems against attack. Students in this course will look at computer security through a variety of lenses. Specific topics will include: the drivers for information security, how hackers hack, how to build a security plan for your organization, how to protect the physical infrastructure, tools used by security professionals, system design considerations, and the various laws, regulations and standards related to information security."
  },

  {
    name: "Artificial Intelligence",
    code: "CSCI3341",
    desc: " This course covers the basic ideas developed in computer science to model an intelligent agent. We will discuss perception and action, knowledge and reasoning, learning and planning. Topics include: adversarial search, computational game theory, logical inference, Bayesian inference, Hidden Markov Models, and various clustering and classification algorithms."
  },

  {
    name: "Operating Systems",
    code: "CSCI3362",
    desc: " This course will provide a broad introduction to software systems with emphasis on operating system design and implementation. Its objective is to introduce students to operating systems with main focus on resource management and interfacing issues with hardware layers. Particular emphasis will be given to process management (processes, threads, CPU scheduling, synchronization, and deadlock), (virtual) memory management (segmentation, paging, swapping, caching) with focus on the interplay between architectural components and software layers. If there is time, we will investigate and discuss these same issues for distributed systems. The course programming assignments will be in Java/C."
  },

  {
    name: "Computer Networks",
    code: "CSCI3363",
    desc: " This course studies computer networks and the services built on top of them. Topics include packet-switch and multi-access networks, routing and flow control, congestion control and quality-of-service, resource sharing, Internet protocols (IP, TCP, BGP), the client-server model and RPC, elements of distributed systems (naming, security, caching, consistency) and the design of network services (peer-to-peer networks, file and web servers, content distribution networks). Coursework involves a significant amount of Java/C programming."
  }];
}


/*function CSCIdescriptions(){
   this.CSCI1101D = {
    name: "Computer Science I",
    code: "CSCI1101",
    desc: "This course is an introduction to the art and science of computer programming and to some of the fundamental concepts of computer science. Students will write programs in the Python programming language. Good program design methodology will be stressed throughout. There will also be a study of some of the basic notions of computer science, including computer systems organization, files and some algorithms of fundamental importance."
  });

   this.CSCI1102D = {
    name: "Computer Science II",
    code: "CSCI1102",
    desc:"In this course the student will write programs that employ more sophisticated and efficient means of representing and manipulating information. Part of the course is devoted to a continued study of programming. The principal emphasis, however, is on the study of the fundamental data structures of computer science (lists, stacks, queues, trees, etc.). Both their abstract properties and their implementations in computer programs and the study of the fundamental algorithms for manipulating these structures. Students will use Java for programming."
  });

   this.CSCI2243D = {
    name: "Logic and Computation",
    code: "CSCI2243",
    desc: "A course in the mathematical foundations of Computer Science, illustrated throughout with applications such as sets and functions, propositional and predicate logic, induction and recursion, basic number theory and mathematical models of computation such as formal languages, finite state machines, and Turing machines."
  });

   this.CSCI2244D = {
    name: "Randomness and Computation",
    code: "CSCI 2244",
    desc: "This course presents the mathematical and computational tools needed to solve problems that involve randomness. For example, an understanding of random variables allows us to efficiently generate the enormous prime numbers needed for information security, and to quantify the expected performance of a machine learning algorithm beyond a small data sample. An understanding of covariance allows high quality compression of audio and video. Topics include combinatorics and counting, random experiments and probability, random variables and distributions, computational modeling of randomness, Bayes' rule, laws of large numbers, vectors and matrices, covariance and principal axes, and Markov chains."
  });

   this.CSCI2271D = {
    name: "Computer Systems",
    code: "CSCI2271",
    desc: "This course is concerned with machine-level program and data representation on modern computer systems and on some of the trade-offs that must be considered when selecting one representation (or programming paradigm) over another. We consider how various representations can affect the efficiency, reliability, and security of computing systems. This is a hands-on course; programming will be comped in the procedural language C with comparisons to object-oriented languages such as Java."
  });

   this.CSCI2272D = {
    name: "Computer Organization and Lab",
    code: "CSCI2272",
    desc: "This course studies the internal organization of computers and the processing of machine instructions. Topics include computer representation of numbers, combinational circuit design (decoders, multiplexers), sequential circuit design and analysis, memory design (registers and main memory), and simple processors including datapaths, instruction formats, and control units. In the laboratory-based portion of course students design and build digital circuits related to lecture. Exercises include hardware description languages, combinational and sequential circuits, arithmetic and logic units, and simple datapath and control units."
  });

   this.CSCI3383D = {
    name: "Algorithms",
    code: "CSCI3383",
    desc: "This course is a study of algorithms for, among other things, sorting, searching, pattern matching, and manipulation of graphs and trees. Emphasis is placed on the mathematical analysis of the time and memory requirements of such algorithms and on general techniques for improving their performance."
  });

   this.CSCI3372D = {
    name: "Computer Architecture and Lab",
    code: "CSCI3372",
    desc: ""
  });

   this.MATH1100D = {
    name: "Calculus I",
    code: "MATH1100",
    desc: "MATH1100 is a first course in the calculus of one variable intended for biology, computer science, economics, management, and premedical students. It is open to others who are qualified and desire a more rigorous mathematics course at the core level. Topics include a brief review of polynomials and trigonometric, exponential, and logarithmic functions, followed by discussion of limits, derivatives, and applications of differential calculus to real-world problem areas. The course concludes with an introduction to integration."
  });

   this.MATH1101D = {
    name: "Calculus II",
    code: "MATH1101",
    desc: "MATH1101 is a second course in the calculus of one variable intended for biology, computer science, economics, management, and premedical students. It is open to others who are qualified and desire a more rigorous mathematics course at the core level. Topics include an overview of integration, basic techniques for integration, a variety of applications of integration, and an introduction to (systems of) differential equations."
  });

   this.MATH2210D = {
    name: "Linear Algebra",
    code: "MATH2210",
    desc: "This course is an introduction to the techniques of linear algebra in Euclidean space. Topics covered include matrices, determinants, systems of linear equations, vectors in n-dimensional space, complex numbers, and eigenvalues. The course is required of mathematics majors but is also suitable for students in the social sciences, natural sciences, and management."
  });

   this.MATH2202D = {
    name: "Multivariable Calculus",
    code: "MATH2202",
    desc: "Topics in this course include vectors in two and three dimensions, analytic geometry of three dimensions, parametric curves, partial derivatives, the gradient, optimization in several variables, multiple integration with change of variables across different coordinate systems, line integrals, and Green's Theorem."
  });

  // electives
   this.CSCI3359D = {
    name: "Distributed Systems",
    code: "CSCI3359",
    desc: "Students will learn the major paradigms of distributed computing including client-server and peer-to-peer models. Topics studied in these models include communication, synchronization, performance, fault-tolerance and security. Students will learn how to analyze the correctness of distributed protocols and will be required to build distributed applications."
  });

   this.CSCI3390D = {
    name: "Topics in Computer Science",
    code: "CSCI3390",
    desc: "Everyone should know how to think Parallel. Even a laptop or cellphone has multiple CPU cores at our disposal these days. In this hands-on, project oriented class you will learn the main ideas of parallel computing with GPU. Our focus will be on the CUDA programming language. You will learn about GPU architectures, about parallel algorithms, CUDA libraries and GPU computing applications. The prerequisite for this class are C programming language, multivariate calculus, linear algebra and algorithms and randomness and computation. If you do not have all of these prerequisites and want to take the class, please talk with me. There is a limited number of spots available."
  });

   this.CSCI2267D = {
    name: "Technology and Culture",
    code: "CSCI2267",
    desc: "This interdisciplinary course will first investigate the social, political, psychological, ethical, and spiritual aspects of the Western cultural development with a special emphasis on scientific and technological metaphors and narratives. We will then focus on the contemporary world, examining the impact of our various technological creations on cultural directions, democratic process, the world of work, quality of life, and especially on the emergent meanings for the terms citizen and ethics in contemporary society. Students will explore technologies in four broad and interrelated domains: (1) computer, media, communications, and information technologies, (2) biotechnology, (3) globalization, and (4) environmental issues."
  });

   this.CSCI2257D = {
    name: "Database Systems and Applications",
    code: "CSCI2257",
    desc: "This course provides in-depth coverage of database systems and their uses. Topics include database architecture, design strategies, SQL queries, security, performance, and using database tools and scripting languages to create sophisticated forms and applications, including web applications. The goal of the course is to give students the knowledge and skills to use databases effectively in any business situation."
  });

   this.CSCI2201D = {
    name: "Computer Security",
    code: "CSCI2201",
    desc: "In a world of ever-increasing dependence on technology, news stories about data breaches and other types of cyber attacks seem to happen on a daily basis. These breaches have real consequences that can cost a company millions of dollars and damage to its reputation. Today's business system managers need to understand these threats and know how to protect their digital assets. This course provides a strong starting foundation for understanding the complex threats system managers face today and what they need to do to harden their systems against attack. Students in this course will look at computer security through a variety of lenses. Specific topics will include: the drivers for information security, how hackers hack, how to build a security plan for your organization, how to protect the physical infrastructure, tools used by security professionals, system design considerations, and the various laws, regulations and standards related to information security."
  });

   this.CSCI3341D = {
    name: "Artificial Intelligence",
    code: "CSCI3341",
    desc: "This course covers the basic ideas developed in computer science to model an intelligent agent. We will discuss perception and action, knowledge and reasoning, learning and planning. Topics include: adversarial search, computational game theory, logical inference, Bayesian inference, Hidden Markov Models, and various clustering and classification algorithms."
  });

   this.CSCI3362D = {
    name: "Operating Systems",
    code: "CSCI3362",
    desc: "This course will provide a broad introduction to software systems with emphasis on operating system design and implementation. Its objective is to introduce students to operating systems with main focus on resource management and interfacing issues with hardware layers. Particular emphasis will be given to process management (processes, threads, CPU scheduling, synchronization, and deadlock), (virtual) memory management (segmentation, paging, swapping, caching) with focus on the interplay between architectural components and software layers. If there is time, we will investigate and discuss these same issues for distributed systems. The course programming assignments will be in Java/C."
  });

   this.CSCI3363D = {
    name: "Computer Networks",
    code: "CSCI3363",
    desc: "This course studies computer networks and the services built on top of them. Topics include packet-switch and multi-access networks, routing and flow control, congestion control and quality-of-service, resource sharing, Internet protocols (IP, TCP, BGP), the client-server model and RPC, elements of distributed systems (naming, security, caching, consistency) and the design of network services (peer-to-peer networks, file and web servers, content distribution networks). Coursework involves a significant amount of Java/C programming."
  });
}
*/

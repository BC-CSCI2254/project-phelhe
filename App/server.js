// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

//use express
var express = require('express');
//create app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

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

let colors2 = ["#7AD334", "#88aaff", "#F0A000", "#DAD320", "#dd9999", "#11ddbb", "#ffaa88", "#ddaacc", "#62f79b", "#304bff"];

//list of majors
let majors = ["Computer Science B.A.", "Computer Science B.S.", "Economics"];

//major trees
let csciBSCore = new csciBS();
let csciBACore = new csciBA();
let economicsCore = new econCore();
//****************************

//major classlists
let csciClassesBS = [{name: "Calculus I", taken: 0}, {name: "Computer Science 1", taken: 0},{name: "Computer Science 2", taken: 0},{name: "Calculus II", taken: 0}, {name: "Computer Organization", taken: 0}, {name: "Computer Systems", taken: 0},{name: "Logic and Computation", taken: 0},{name: "Randomness and Computation", taken: 0}, {name: "Linear Algebra", taken:0}, {name: "Computer Architecture", taken:0},{name: "Multivariable Calculus", taken:0},{name: "Algorithms", taken: 0}];
let csciClassesBA = [{name: "Calculus I", taken: 0}, {name: "Computer Science 1", taken: 0},{name: "Computer Science 2", taken: 0},{name: "Calculus II", taken: 0}, {name: "Computer Organization", taken: 0}, {name: "Computer Systems", taken: 0},{name: "Logic and Computation", taken: 0},{name: "Randomness and Computation", taken: 0}, {name: "Algorithms", taken: 0}];
let econClasses = [{name: "Principles of Economics", taken: 0}, {name: "Calculus I", taken: 0},{name: "Economic Statistics", taken: 0},{name: "Econometrics", taken: 0}, {name: "Macroeconomic Theory", taken: 0}, {name: "Microeconomic Theory", taken:0}];
//****************************

//new itp-networked-media
let computerScienceBA = {name: "Computer Science B.A.", classes: csciClassesBA, tree:csciBACore};
let computerScienceBS = {name: "Computer Science B.S.", classes: csciClassesBS, tree:csciBSCore};
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
  this.ECON1131 = new classNode("Principles of Economics", "ECON1131", [], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
  this.ECON1151 = new classNode("Economic Statistics", "ECON1151", [], 1000);
  this.ECON2201 = new classNode("Microeconomic Theory", "ECON2201", [this.ECON1131, this.MATH1100], 2000);
  this.ECON2202 = new classNode("Macroeconomic Theory", "ECON2202", [this.ECON1131, this.MATH1100], 2000);
  this.ECON2228 = new classNode("Econometrics", "ECON2228", [this.ECON1151, this.MATH1100], 2000);
  this.core = new classNode("Core", "ECON complete", [this.ECON2201, this.ECON2202, this.ECON2228], 3000);
}

function csciBA(){ //just has CSCI elective requirements
  this.CSCI1101 = new classNode("Computer Science 1", "CSCI1101", [], 1000);
  this.CSCI1102 = new classNode("Computer Science 2", "CSCI1102", [this.CSCI1101], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
  this.CSCI2272 = new classNode("Computer Organization", "CSCI2272", [this.CSCI1102], 2000);
  this.CSCI2271 = new classNode("Computer Systems", "CSCI2271", [this.CSCI1102], 2000);
  this.CSCI2243 = new classNode("Logic and Computation", "CSCI2243", [this.CSCI1101], 2000);
  this.CSCI2244 = new classNode("Randomness and Computation", "CSCI2244", [this.CSCI1101, this.MATH1100], 2000);
  this.MATH1101 = new classNode("Calculus II", "MATH1101", [this.MATH1100], 2000);
  this.CSCI3383 = new classNode("Algorithms", "CSCI3383", [this.CSCI2243, this.CSCI2244], 3000);
  this.core = new classNode("Core", "CSCIBA complete", [this.CSCI3383, this.MATH1101, this.CSCI2272, this.CSCI2271], 4000);
}

function csciBS(){ //has math33xx elective requirement as well as CSCI elective requirements and thesis? can do 3397 thesis research in place of 33xx level elective
  this.CSCI1101 = new classNode("Computer Science 1", "CSCI1101", [], 1000);
  this.CSCI1102 = new classNode("Computer Science 2", "CSCI1102", [this.CSCI1101], 1000);
  this.MATH1100 = new classNode("Calculus I", "MATH1100", [], 1000);
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
  this.core = new classNode("Core", "CSCIBA complete", [this.CSCI3383, this.MATH2202, this.MATH2210, this.CSCI3372, this.CSCI2272, this.CSCI2271], 4000);
}

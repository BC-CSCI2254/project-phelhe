
//http://fperucic.github.io/treant-js/

//if we add the ability to save classes make it so that if you save under the same eagle id twice it just overwrites, doesnt make a new one


//maybe make it choose a color scheme or soemthing so it doesnt look as bad
  //such as blues, cool colors, warm colors, reds, etc....
let colors = ["Aqua","Aquamarine","Blue","BlueViolet","Chartreuse","CornflowerBlue","Crimson","Cyan", "DeepPink","DeepSkyBlue","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gold","GoldenRod","Green","GreenYellow","HotPink","Indigo","Khaki","LawnGreen","LightBlue","LightCoral","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue", "Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGreen","PaleTurquoise","PaleVioletRed","Pink","Plum","PowderBlue","Purple","Red","RoyalBlue","Salmon","SeaGreen","SkyBlue","SlateBlue","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Yellow","YellowGreen"];

function chooseColor(){
  var index = Math.floor(Math.random()*colors.length);
  var choice = colors[index];
  colors.splice(index,1);
  return choice;
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
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
  this.CSCI22XX = new classNode("2000 Level Elective", "CSCI22XX", [], 2000);
//electives
  this.CSCI33XX = new classNode("3000 Level Elective", "CSCI33XX", [], 3000);
  this.MATH33XX = new classNode("3000 Level Math Elective", "MATH33XX", [], 3000);
  this.electives = new classNode("Electives", "Electives", [this.CSCI22XX, this.CSCI33XX, this.MATH33XX], 4000);
}


//******tree traversal**********

//breadth first search that takes a function
function bfs(fn, node){
  var q = [];
  q.push(node);
  while(q.length!=0){
    node = q.pop();
    fn(node);
    node.prereqs.forEach(function(item){
      if(item.visited == 0){
        item.visited = 1;
        q.unshift(item);
      }
    });
  }
}
//************

//*******************

// HELPER FUNCTION
//marks a class as taken
function markTaken(classname, node){
  var q = [];
  q.push(node);
  while(q.length!=0){
    node = q.pop();
    if(node.name == classname){
      node.taken = 1;
      node.prereqs.forEach(function(item){markTaken(item.name, item);});
    }
    node.prereqs.forEach(function(item){
      q.unshift(item);
    });
  }
}

//marks all taken classes in the tree and returns that new tree
//takes a list of taken classes (just strings), and a tree of classes
function determineRemaining(taken, core){
  taken.forEach(function(item){
    markTaken(item, core.core);
  });
  return core
}

//********************************

//**** displaying the tree *****

let divs = [];


//takes a tree of classes and places nodes into the view
function generateTree(tree){
  let container = document.getElementById('container');
  let treeHolder = document.createElement('div');
  let level1 = document.createElement('div');
  let level2 = document.createElement('div');
  let level3 = document.createElement('div');
  level1.classList.add('level');
  level2.classList.add('level');
  level3.classList.add('level');
  level1.style.background = '#292f36';
  level2.style.background = '#292f36'
  level3.style.background = '#292f36';
  treeHolder.classList.add('treeHolder');
  container.appendChild(treeHolder);
  let fn = function(node){ //creates a new div to represent the class and pushes it to the correct level
    if(node.taken == 0 && node.name!="Core"){
      //console.log(node.level);
      var item = document.createElement('div');
      item.classList.add("node");
      item.innerHTML = node.name;

      item.addEventListener("click", function(event){
        console.log(node.name);
        if(node.prereqs.every(function(item){
          return item.taken == 1;
        }) == false){ //maybe animate prereqs to flash red or something
          console.log("You must complete the prerequisite classe(s)");
          alert("You must complete the prerequisites first.")
        }
        else{
          console.log("take this class");
          node.taken = 1;
          //console.log(node);
          //var myNode = document.getElementById("foo");
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          generateTree(tree);
          generateOffsets();
          connectClasses(tree);
        }
      });

      item.addEventListener("mouseover", function(event){
        item.style.border = "solid 4px " + shadeColor(node.color, -100);
      });

      item.addEventListener("mouseout", function(event){
        item.style.border = "solid 4px " + node.color;
        //console.log("back");
      });

      //item.style.background = node.color;
      item.style.background = node.color;
      item.style.color = 'black';
      item.style.border = 'solid 4px ' + node.color;
      if(node.level == 1000){level1.appendChild(item);}
      else if(node.level == 2000){level2.appendChild(item);}
      else{level3.appendChild(item);}
      //container.appendChild(item);
      divs.push({name: node.name, div:item});
    }
  }
  var q = [];
  q.push(tree.core);
  while(q.length!=0){
    node = q.pop();
    fn(node);
    node.prereqs.forEach(function(item){
      if(item.visited == 0){
        item.visited = 1;
        q.unshift(item);
      }
    });
  }
  treeHolder.appendChild(level3);
  treeHolder.appendChild(level2);
  treeHolder.appendChild(level1);
  unvisit(tree);
}

//takes a tree of classes and connects all requirements
function connectClasses(tree){
  let off1 = null;
  let off2 = null;
  //connects the current node to all of its prereqs
  let fn = function(node){
    if(node.taken == 0 && node.name!="Core" && node.prereqs.length != 0){
      for(let i = 0; i < divs.length; i++){
        if(divs[i].name == node.name){off1 = divs[i].off;}
      }
      //console.log("div1:");
      //console.log(div1);
      //console.log("div2s:")
      //console.log(node.name);
      //console.log(node.prereqs);
      //console.log("-----");
      node.prereqs.forEach(function(item){
        //console.log(item);
        if(item.taken == 0){
          for(let j = 0; j < divs.length; j++){
            if(divs[j].name == item.name){off2 = divs[j].off;}
          }
          //console.log(div2);
          //if(div1 != null && div2 != null){
            //console.log("connecting...");
            connect(off1,off2,item.color,'3');
          //}
        }
      });
    }
  }
  //breadth first traversal of the tree
  var q = [];
  q.push(tree.core);
  while(q.length!=0){
    node = q.pop();
    fn(node);
    node.prereqs.forEach(function(item){
      if(item.visited == 0){
        item.visited = 1;
        q.unshift(item);
      }
    });
  }
  unvisit(tree); //reset all the visited nodes -- maybe just do tree.prototype.visited = 0???
}


//makes all the nodes of the tree 'unvisited'
function unvisit(tree){
  let root = tree.core;
  var q = [];
  q.push(root);
  while(q.length!=0){
    //console.log("WHILIN");
    curr = q.pop();
    curr.visited = 0;
    curr.prereqs.forEach(function(item){
      q.unshift(item);
    });
  }
}

//***** line connecting? ******

function getOffset( el ) {
    //console.log(el);
    let rect = el.getBoundingClientRect();
    //console.log("rect:");
    //console.log(rect);
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function generateOffsets(){ //adds offset fields to each div
  divs.forEach(function(item){
    item.off = getOffset(item.div);
    //console.log(item.off);
  });
}

//takes two offsets (aka two divs), a color, and a thickness, and connects them
function connect(off1, off2, color, thickness) { // draw a line connecting elements http://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs
    let container = document.getElementById('container');
    //var off1 = getOffset(div1);

    //var off2 = getOffset(div2);

    // bottom right
    var x1 = off1.left;
    var y1 = off1.top + off1.height/2;
    // top left
    var x2 = off2.left + off1.width;
    var y2 = off2.top + off2.height/2;

    if(off1.left == off2.left){
      x2 = off2.left + off1.width/2;
      x1 = off1.left + off1.width/2;
      y2 = off2.top;
      y1 = off1.top+off1.height;
    }
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //container.innerHTML += htmlLine;
    //document.body.innerHTML += htmlLine;
    container.insertAdjacentHTML('beforeend', htmlLine);
    //container.innterHTML+=htmlLine;
    //console.log('drawn!');
    //var htmlLine = null;
}

function displayTree(taken, major){
  let tree = null;
  switch (major) {
    case "economics":
      tree = new econCore();
      break;
    case "computer science ba":
      tree = new csciBA();
      break;
    case "computer science bs":
      tree = new csciBS();
      break;
  }
  determineRemaining(taken,tree);
  generateTree(tree);
  generateOffsets();
  connectClasses(tree);
}

//*********

let log = function(item){console.log(item.name + ": " + item.taken);}


//********TESTING***********

let taken1 = [];//["Computer Architecture"];//["Linear Algebra", "Randomness and Computation", "Calculus II", "Computer Organization"]//["Principles of Economics", "Economic Statistics"];

let taken2 = ["Computer Science 1", "Computer Systems", "Logic and Computation"];


displayTree(taken1, "computer science bs");


//make it so when you click a node, it sets a global var to that nodes name
// then when you click on a semester, it places that node and calls markTaken on that nodes name and then generates the tree again
//make it so elements in the schedule can be put back in the tree by clicking an x or something, it should also have to go through
// and put back any classes that require it
// wait... for prerequesites you have to make sure they arent being taken at the same time, too

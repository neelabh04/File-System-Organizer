#!/usr/bin/env node
/*
    The above line is a shebang syntax for node js.
    It always comes at the starting of the program.
*/

/* 
    Takes the input from the command line and slices from 2nd index
    at first index we have the "node" and second index "main.js" (file name).
*/
let inputArray = process.argv.slice(2);





// At first index of input array we will have the command that needs to be executed.
let command = inputArray[0];

// Acquiring the objects for the command implementation
let helpObj = require("./Commands/help");
let treeObj = require("./Commands/tree");
let organizeObj = require("./Commands/organize");

// Checking from the predefined cases.
switch(command){
    case "tree":
        treeObj.treeKey(inputArray[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArray[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default: console.log("Please enter the correct command.");
        break;        
}










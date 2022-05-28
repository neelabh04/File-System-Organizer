// For file system module in node.js
let fs = require("fs");
let path = require("path");

// Function for implementing the tree command
function treeFn(dirPath){

    // Check whether the path is provided or not
    if(dirPath == undefined){
        // find the path of the current directory
        treeHelper(process.cwd(), "");       
    } else{
        // Check whether the dir path exists or not
        let doesExist = fs.existsSync(dirPath, "");
        if(doesExist == true){
            treeHelper(dirPath);
        } else{
            console.log("Please give correct directory path.");
            return;
        }
    }
}

// Function for showing the Tree Structure
function treeHelper(dirPath, indent){

    // Checks whether it is a file or folder
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName)
    } else{
        // Comes to this part when it is a folder
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        
        // Acquiring the subfolder present in the current folder
        let children = fs.readdirSync(dirPath);

        // Creating the recursion for forming the tree structure
        for(let i = 0; i < children.length; i++){

            // Creating the path for subfolder in order to go deep in the recursion
            let childPath = path.join(dirPath, children[i]);
            
            // Recursion call for tree
            treeHelper(childPath, indent + "\t");
        }

    }
}

module.exports = {
    treeKey: treeFn
}
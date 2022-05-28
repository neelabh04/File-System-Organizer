let types = require("./utility");

// For file system module in node.js
let fs = require("fs");
let path = require("path");

// Function to implement the organize command
function organizeFn(dirPath){
    let destPath;
    // Check whether the path is provided or not
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
        
    } else{
        // Check whether the dir path exists or not
        let doesExist = fs.existsSync(dirPath);
        if(doesExist == true){
            // Create a directory organized file
            destPath = path.join(dirPath, "organized_files");

            // Check whether organized files directory already exists or not
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
            
        } else{
            console.log("Please give correct directory path.");
            return;
        }
    }
    // whom to organize, where to organize paths are provided as the arguments in the given function
    organizeHelper(dirPath, destPath);
}

// Identify the files and folders according to their types
function organizeHelper(src, dest){

    // Acquires the file names present in the source folder 
    let childNames = fs.readdirSync(src);

    // Traversing through the files present in the src folder
    for(let i = 0; i < childNames.length; i++){

        // creating the total path for the files present in the src folder
        let childAddress = path.join(src, childNames[i]);

        // check whether it is a file or a folder
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile == true){
            // Checks the category of the files
            let category = getCategory(childNames[i]);

            // Copy/Cut the files from the folder and paste it into the organized folder
            sendFiles(childAddress, dest, category);
        }
    }
    
}

// Function for the checking the extension type
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);

    // travesing through the types object
    for(let type in types){

        // acquiring the individual type array of types 
        let currTypeArr = types[type];

        // traversing through each extension for finding the extension
        for(let i = 0; i < currTypeArr.length; i++){

            // checking whether extension type is present in the object types or not
            if(ext == currTypeArr[i]){
                return type;
            }
        }

        // extension type not present in the types object
        return "others";
    }
}

// Function for implementing the sending files from unorganized folder -> organized folder (According to their category/ extension type) 
function sendFiles(srcFilePath, dest, category){
    // Creating the category path for the incoming file
    let categoryPath = path.join(dest, category);

    // Checking whether category path already exists in the organized folder or not
    if(fs.existsSync(categoryPath) == false){

        // Create a folder according to the extension/category type
        fs.mkdirSync(categoryPath);
    }

    // Used for creating a file with same name
    let fileName = path.basename(srcFilePath);
    
    // Creating an address to put the replica
    let destFilePath = path.join(categoryPath, fileName);
    
    //Copies the files from source path to destination path 
    fs.copyFileSync(srcFilePath, destFilePath);

    // Removes the original files from the source folder (Cut function)
    // fs.unlinkSync(srcFilePath);

    console.log(fileName, "copied to ", category);
}

module.exports = {
    organizeKey: organizeFn
}
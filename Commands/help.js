// Function for implementing the help command
function helpFn(){
    console.log(`
        List of all the commands available:
                    node main.js tree command.    
                    node main.js help command.    
                    node main.js organize command.    
    `);
}

module.exports = {
    helpKey: helpFn
}
const EventEmitter= require("events")
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m'
};

class Logger extends EventEmitter{ 
    constructor(){
        super()
        this.on("logInfo", (Tag, message) => {
            console.log(`${colors.green} ${Tag}: ${message} ${colors.reset}`);
        })
        this.on("logError", (Tag, message) => {
            console.error(`${colors.red} ${Tag}: ${message} ${colors.reset}`);
        })
    }
}

module.exports= Logger
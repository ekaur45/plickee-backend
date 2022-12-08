const fs = require("fs");
module.exports = {
    log: (error) => {
        const logFileName = process.env.EX_LOG_FILE || "logs/api.exception.log";
        if(!fs.existsSync(logFileName)) fs.mkdirSync("logs/");
        fs.appendFileSync(logFileName, "==========================================\n");
        fs.appendFileSync(logFileName, new Date().toDateString());
        fs.appendFileSync(logFileName, "\n");
        fs.appendFileSync(logFileName, JSON.stringify(error));
        // fs.appendFileSync(logFileName, error.name);
        // fs.appendFileSync(logFileName, ":\nMessage:\n");
        // fs.appendFileSync(logFileName, error.message);
        // fs.appendFileSync(logFileName, "\nDetails:\n");
        // fs.appendFileSync(logFileName, error.stack);
        fs.appendFileSync(logFileName, "\n\n");
    }
}
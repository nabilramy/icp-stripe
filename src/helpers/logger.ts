import fs from 'fs';
import path from 'path';

const logsDirectory = path.join(__dirname, '../../logs');
const logFilePath = path.join(__dirname, '../../logs/app.log');

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const log = (message: string): void => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;

    console.log(logMessage);
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error(`Error writing to log file: ${err}`);
        }
    });
}

export default log;
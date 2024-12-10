const fs = require("fs");

module.exports.readJSONFile = async (day) => {
    try {
        const data = fs.readFileSync(`./src/input/${day}.txt`, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${day}: ${error}`);
        return {};
    }
}

module.exports.readTextFile = readTextFile;

async function readTextFile(day) {
    try {
        const data = fs.readFileSync(`./src/input/${day}.txt`, 'utf8');
        return data;
    } catch (error) {
        console.error(`Error reading ${day}: ${error}`);
        return '';
    }
}

module.exports.loadInput = async (dayNum) => {
    const text = await readTextFile(dayNum);
    return text;
}
const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

const regex = /mul\((\d+),(\d+)\)/g

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    var sequences = extractSequences(data, false);
    var sum = 0;
    for(let i=0; i<sequences.length; i++) {
        var tokens = sequences[i].split(',');
        var num1 = +(tokens[0].replace('mul(', ''));
        var num2 = +(tokens[1].replace(')', ''));
        sum += num1 * num2;
    }
    return sum;
}

function extractSequences(input, withdoanddont) {
    const result = [];
    let i = 0; 
    while (i + 4 < input.length) {
        if (withdoanddont && input.substring(i, i + 4) === "do()") {
            result.push('do');
        } else if (withdoanddont && input.substring(i, i + 7) === `don't()`) {
            result.push('dont');
        }
        if (input.substring(i, i + 4) === "mul(") { 
            const start = i;
            const end = input.indexOf(")", start); 
            if (end !== -1) { 
                const sequence = input.substring(start, end + 1); 
                if (isValidSequence(sequence)) { 
                    result.push(sequence);
                    i = end + 1; 
                } else {
                    i++;
                }
            } else {
                break; 
            }
        } else { 
            i++; 
        }
    }
    return result; 
}

function isValidSequence(sequence) { 
    if (sequence.startsWith("mul(") && sequence.endsWith(")")) { 
        const params = sequence.substring(4, sequence.length - 1).split(","); 
        if(params.length === 2 && !isNaN(params[0]) && !isNaN(params[1])) {
            return true;
        }
    }
    return false;
}

async function part1_(dayNum) {
    const data = await filereader.loadInput(dayNum);
    var sum = 0;
    let matches;
    var count = 0;
    while ((matches = regex.exec(data)) !== null) {
        count++;
        sum += matches[1] * matches[2];
    }
    console.log('sequence count', count);
    return sum;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    var sequences = extractSequences(data, true);
    var sum = 0;
    var currentlyDoing = true;
    for(let i=0; i<sequences.length; i++) {
        if (sequences[i] === 'do') {
            currentlyDoing = true;
        } else if (sequences[i] === 'dont') {
            currentlyDoing = false;
        } else {
            if (!currentlyDoing) {
                continue;
            }
            var tokens = sequences[i].split(',');
            var num1 = +(tokens[0].replace('mul(', ''));
            var num2 = +(tokens[1].replace(')', ''));
            sum += num1 * num2;
        }
    }
    return sum;
}
const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var leftArray = [], rightArray = [];
    for (let i=0; i<lines.length; i++) {
        const tokens = lines[i].split(' ');
        var leftAdded = false;
        for(let j=0; j<tokens.length; j++) {
            if (tokens[j] === '') {
                continue;
            } else {
                const num = +tokens[j];
                if (!leftAdded) {
                    leftAdded = true;
                    leftArray.push(num);
                } else{
                    rightArray.push(num);
                }
            }
        }
    }
    leftArray.sort(function(a, b){return a-b});
    rightArray.sort(function(a, b){return a-b});
    var totalDistance = 0;
    for(let i=0; i<leftArray.length; i++) {
        totalDistance += Math.abs(leftArray[i]-rightArray[i]);
    }
    return totalDistance;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var leftArray = [], rightArray = [];
    for (let i=0; i<lines.length; i++) {
        const tokens = lines[i].split(' ');
        var leftAdded = false;
        for(let j=0; j<tokens.length; j++) {
            if (tokens[j] === '') {
                continue;
            } else {
                const num = +tokens[j];
                if (!leftAdded) {
                    leftAdded = true;
                    leftArray.push(num);
                } else{
                    rightArray.push(num);
                }
            }
        }
    }
    leftArray.sort(function(a, b){return a-b});
    rightArray.sort(function(a, b){return a-b});
    var totalSimilarityScore = 0;
    var leftArrayObject = {}, rightArrayObject = {};
    for(let i=0; i<leftArray.length; i++) {
        if (!leftArrayObject[`${leftArray[i]}`]) {
            leftArrayObject[`${leftArray[i]}`] = 1;
        } else {
            leftArrayObject[`${leftArray[i]}`]++;
        }
        
        if (!rightArrayObject[`${rightArray[i]}`]) {
            rightArrayObject[`${rightArray[i]}`] = 1;
        } else {
            rightArrayObject[`${rightArray[i]}`]++;
        }
    }

    for (var key in leftArrayObject) {
        if (leftArrayObject.hasOwnProperty(key)) {
            if (rightArrayObject[key]) {
                totalSimilarityScore += (+key) * (rightArrayObject[key]) * (leftArrayObject[key]);
            }
        }
    }
    return totalSimilarityScore;
}
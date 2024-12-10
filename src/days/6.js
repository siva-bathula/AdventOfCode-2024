const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var currentPosition = findCurrentPosition(lines);
    return traverseLab(lines, currentPosition);
}

function rotateRight(currentDirection) {
    if (currentDirection === 'N') {
        return 'E';
    } else if (currentDirection === 'E') {
        return 'S';
    } else if (currentDirection === 'S') {
        return 'W';
    } else if (currentDirection === 'W') {
        return 'N';
    }
}

function traverseLab(lines, currentPosition) {
    let currentDirection = 'N';
    let distinctPositions = 1;
    var visitedPositions = {};
    while(true) {
        let newPosition = {x: currentPosition.x, y: currentPosition.y};
        if (currentDirection === 'N') {
            newPosition.y = newPosition.y - 1;
        } else if (currentDirection === 'E') {
            newPosition.x = newPosition.x + 1;
        } else if (currentDirection === 'S') {
            newPosition.y = newPosition.y + 1;
        } else if (currentDirection === 'W') {
            newPosition.x = newPosition.x - 1;
        }

        if (newPosition.x < 0 || newPosition.x >= lines[0].length || newPosition.y < 0 || newPosition.y >= lines.length) {
            break;
        } else if (lines[newPosition.y][newPosition.x] === '#') {
            currentDirection = rotateRight(currentDirection);
            continue;
        }

        if (lines[newPosition.y][newPosition.x] === '.') {
            let key = newPosition.x + ',' + newPosition.y;
            if (!visitedPositions[key]) {
                distinctPositions++;
                visitedPositions[key] = true;
            }
        }
        currentPosition = newPosition;
    }

    return distinctPositions;
}

function traverseLabWithExtraObstruction(lines, currentPosition, newObstruction) {
    let currentDirection = 'N';
    var obstructions = {};
    var isLooping = false;
    while(true) {
        let newPosition = {x: currentPosition.x, y: currentPosition.y};
        if (currentDirection === 'N') {
            newPosition.y = newPosition.y - 1;
        } else if (currentDirection === 'E') {
            newPosition.x = newPosition.x + 1;
        } else if (currentDirection === 'S') {
            newPosition.y = newPosition.y + 1;
        } else if (currentDirection === 'W') {
            newPosition.x = newPosition.x - 1;
        }

        if (newPosition.x < 0 || newPosition.x >= lines[0].length || newPosition.y < 0 || newPosition.y >= lines.length) {
            break;
        } else if (lines[newPosition.y][newPosition.x] === '#') {
            var key = newPosition.x + ',' + newPosition.y;
            if (obstructions[key]) {
                if (obstructions[key]['directions'][`${currentDirection}`] === 1) {
                    isLooping = true;
                    break;
                } else {
                    obstructions[key]['directions'][`${currentDirection}`] = 1;
                }
            } else {
                obstructions[key] = { 'directions': {} };
                obstructions[key]['directions'][`${currentDirection}`] = 1;
            }
            currentDirection = rotateRight(currentDirection);
            continue;
        }

        currentPosition = newPosition;
    }
    return isLooping;
}

function findCurrentPosition(lines) {
    for(let i=0; i<lines.length; i++) {
        for(let j=0; j<lines[i].length; j++) {
            if (lines[i][j] === '^') {
                return {
                    x: j,
                    y: i
                }
            }
        }
    }
}

function replaceAt(string, index) {
    return string.substring(0, index) + '#' + string.substring(index + 1);
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var distinctPositions = 0;
    var currentPosition = findCurrentPosition(lines);
    for(let i=0; i<lines.length; i++) {
        for(let j=0; j<lines[i].length; j++) {
            if (lines[i][j] !== '^' && lines[i][j] !== '#') {
                var startPosition = {x: currentPosition.x, y: currentPosition.y};
                var modifiedLines = lines.map(function(arr) {
                    return arr.slice();
                });
                modifiedLines[i] = replaceAt(modifiedLines[i], j);
                if (traverseLabWithExtraObstruction(modifiedLines, startPosition, {x: j, y: i})) {
                    distinctPositions++;
                }
            }
        }
    }
    return distinctPositions;
}
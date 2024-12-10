const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var frequencies = {};
    for(let i=0; i<lines.length; i++) {
        lines[i] = lines[i].replaceAll(' ', '').replaceAll('\r', '');
        for (let j=0; j<lines[i].length; j++) {
            var frequency = lines[i][j];
            if (lines[i][j] !== '.') {
                if (frequencies[frequency]) {
                    frequencies[frequency].push({x:i, y: j});
                } else {
                    frequencies[frequency] = [{x:i, y: j}];
                }
            }
        }
    }
    const maxX = lines[1].length - 1, maxY = lines.length - 1;
    var antiNodes = {};
    Object.keys(frequencies).forEach((value) => {
        if (frequencies[value].length > 1) {
            for(let i=0; i<frequencies[value].length; i++) {
                for(let j=i+1; j<frequencies[value].length; j++) {
                    const location1 = frequencies[value][i];
                    const location2 = frequencies[value][j];
                    const possibleAntiNode1 = { x: 2*location1.x - location2.x, y: 2*location1.y - location2.y };
                    if (possibleAntiNode1.x >= 0 && possibleAntiNode1.x <= maxX && possibleAntiNode1.y >= 0 && possibleAntiNode1.y <= maxY) {
                        var key = possibleAntiNode1.x + '-' + possibleAntiNode1.y;
                        if (!antiNodes[key]) {
                            antiNodes[key] = 1;
                        } else {
                            antiNodes[key]++;
                        }
                    }
                    const possibleAntiNode2 = { x: 2*location2.x - location1.x, y: 2*location2.y - location1.y };
                    if (possibleAntiNode2.x >= 0 && possibleAntiNode2.x <= maxX && possibleAntiNode2.y >= 0 && possibleAntiNode2.y <= maxY) {
                        var key = possibleAntiNode2.x + '-' + possibleAntiNode2.y;
                        if (!antiNodes[key]) {
                            antiNodes[key] = 1;
                        } else {
                            antiNodes[key]++;
                        }
                    }
                }
            }
        }
    });
    return Object.keys(antiNodes).length;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var frequencies = {};
    for(let i=0; i<lines.length; i++) {
        lines[i] = lines[i].replaceAll(' ', '').replaceAll('\r', '');
        for (let j=0; j<lines[i].length; j++) {
            var frequency = lines[i][j];
            if (lines[i][j] !== '.') {
                if (frequencies[frequency]) {
                    frequencies[frequency].push({x:i, y: j});
                } else {
                    frequencies[frequency] = [{x:i, y: j}];
                }
            }
        }
    }
    const maxX = lines[1].length - 1, maxY = lines.length - 1;
    var antiNodes = {};
    const findPossibleAntiNodes = (node1, node2, isType1) => {
        const possibleAntiNode = isType1 ? { x: 2*node1.x - node2.x, y: 2*node1.y - node2.y } : { x: 2*node2.x - node1.x, y: 2*node2.y - node1.y };
        if (possibleAntiNode.x >= 0 && possibleAntiNode.x <= maxX && possibleAntiNode.y >= 0 && possibleAntiNode.y <= maxY) {
            var key = possibleAntiNode.x + '-' + possibleAntiNode.y;
            if (!antiNodes[key]) {
                antiNodes[key] = 1;
            } else {
                antiNodes[key]++;
            }
            if (isType1) {
                findPossibleAntiNodes({x: possibleAntiNode.x, y: possibleAntiNode.y}, {x: node1.x, y:node1.y}, true);
            } else {
                findPossibleAntiNodes({x: node2.x, y:node2.y}, {x: possibleAntiNode.x, y: possibleAntiNode.y}, false);                                
            }
        } else {
            return;
        }
    };
    Object.keys(frequencies).forEach((value) => {
        if (frequencies[value].length > 1) {
            for(let i=0; i<frequencies[value].length; i++) {
                for(let j=i+1; j<frequencies[value].length; j++) {  
                    findPossibleAntiNodes(frequencies[value][i], frequencies[value][j], true);
                    findPossibleAntiNodes(frequencies[value][i], frequencies[value][j], false);
                }
            }
        }
    });
    var possibleAntennaAntiNodes = 0
    Object.keys(frequencies).forEach((value) => {
        if (frequencies[value].length > 1) {
            for(let i=0; i<frequencies[value].length; i++) {
                var key = frequencies[value][i].x + '-' + frequencies[value][i].y;
                if (antiNodes[key]) {
                    antiNodes[key]++;
                } else {
                    possibleAntennaAntiNodes++;
                    antiNodes[key] = 1;
                }
            }
        }
    });
    return Object.keys(antiNodes).length;
}
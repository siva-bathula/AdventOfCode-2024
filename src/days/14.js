const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');

module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = (await filereader.loadInput(dayNum)).trim();
    const grid = data.split('\n').map((row) => row.trim());
    const robots = moveRobots(101, 103, grid, 100, false);
    var q1 = 0, q2 = 0, q3 = 0, q4 = 0;
    for (let i=0; i< robots.length; i++) {
        //lt 50 gt 50
        //lt 51 gt 51
        if (robots[i].posx > 50 && robots[i].posy > 51) {
            q4++;
        } else if (robots[i].posx < 50 && robots[i].posy > 51) {
            q3++;
        } else if (robots[i].posx > 50 && robots[i].posy < 51) {
            q2++;
        } else if (robots[i].posx < 50 && robots[i].posy < 51) {
            q1++;
        }
    }

    return q1 * q2 * q3 * q4;
}

function moveRobots(w, t, data, moves, print) {
    var robots = [];
    for (let i=0; i<data.length; i++) {
        var tokens = data[i].split(' v=');
        var positionTokens = tokens[0].split('p=')[1].split(',');
        var velocityTokens = tokens[1].split(',');
        robots.push({
            posx: +positionTokens[0],
            posy: +positionTokens[1],
            vx: +velocityTokens[0],
            vy: +velocityTokens[1]
        });
    }

    var numberOfSeconds = 0;
    for (let i=0; i<moves; i++) {
        for (let j=0; j<robots.length; j++) {
            var posx = (robots[j].posx + robots[j].vx);
            var posy = (robots[j].posy + robots[j].vy);
            if (posx < 0) {
                posx += w;
            }
            posx %= w;
            if (posy < 0) {
                posy += t;
            }
            posy %= t;
            robots[j].posx = posx;
            robots[j].posy = posy;
        }
        var unique = {}, isUnique = true;
        for (let i=0; i<robots.length; i++) {
            const key = robots[i].posx + '-' + robots[i].posy;
            if (unique[key]) {
                isUnique = false;
                break;
            } else {
                unique[key] = true;
            }
        }
        if (isUnique) {
            numberOfSeconds = i + 1;
            break;
        }
    }
    if (print) {
        var robotGrid = [];
        for (let i=0; i<t;i++) {
            var row = ''
            for (let j=0; j<w; j++) {
                row += 'c';
            }
            robotGrid.push(row);
        }
        for (let i=0; i<robots.length; i++) {
            var row = robotGrid[robots[i].posy];
            row = replaceAt(row, robots[i].posx);
            robotGrid[robots[i].posy] = row;
        }
        console.log(robotGrid);
    }

    return numberOfSeconds;
}

function replaceAt(string, index) {
    return string.substring(0, index) + '#' + string.substring(index + 1);
}

module.exports.part2 = async function (dayNum) {
    const data = (await filereader.loadInput(dayNum)).trim();
    const grid = data.split('\n').map((row) => row.trim());
    return moveRobots(101, 103, grid, 100000, true);
}
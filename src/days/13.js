const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');

module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = (await filereader.loadInput(dayNum)).trim();
    const grid = data.split('\n').map((row) => row.trim());
    return fewestTokens(grid, 0);
}

function fewestTokens(grid, delta = 0) {
    var tokens = 0;
    let a1=0,a2=0,b1=0,b2=0,c1=0,c2=0;
    for(let i=0; i<grid.length; i++) {
        if (grid[i].startsWith('Button A:')) {
            var aTokens = grid[i].split('+');
            a1 = +(aTokens[1].split(',')[0]);
            a2 = +aTokens[2];
        } else if (grid[i].startsWith('Button B:')) {
            var bTokens = grid[i].split('+');
            b1 = +(bTokens[1].split(',')[0]);
            b2 = +bTokens[2];
        } else if (grid[i].startsWith('Prize')) {
            var prizeTokens = grid[i].split('=');
            c1 = delta + (+(prizeTokens[1].split(',')[0]));
            c2 = delta + (+prizeTokens[2]);
            var a1b2 = a1*b2, a2b1 = a2*b1;
            if (a1b2 !== a2b1) {
                var A = ((c1*b2) - (c2*b1)) / ((a1b2) - (a2b1));
                var B = ((c1*a2) - (c2*a1)) / ((a2b1) - (a1b2));
                if (A % 1 === 0 && B % 1 === 0) {
                    tokens += (A * 3) + B;
                }
            }
        }
    }

    return tokens;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const grid = data.split('\n').map((row) => row.trim());
    return fewestTokens(grid, 10000000000000);
}
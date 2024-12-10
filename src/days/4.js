const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    let xmasCount = 0;
    for(let i=0;i<lines.length; i++) {
        for(let j=0; j<lines[i].length; j++) {
            if (lines[i][j] === 'X') {
                //eastwards
                if (j + 1 < lines[i].length && lines[i][j+1] === 'M') {
                    if (j + 2 < lines[i].length && lines[i][j+2] === 'A') {
                        if (j + 3 < lines[i].length && lines[i][j+3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //westwards
                if (j - 1 > -1 && lines[i][j-1] === 'M') {
                    if (j - 2 > -1 && lines[i][j-2] === 'A') {
                        if (j - 3 > -1 && lines[i][j-3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //southwards
                if (i + 1 < lines.length && lines[i+1][j] === 'M') {
                    if (i + 2 < lines.length && lines[i+2][j] === 'A') {
                        if (i + 3 < lines.length && lines[i+3][j] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //northwards
                if (i - 1 > -1 && lines[i-1][j] === 'M') {
                    if (i - 2 > -1 && lines[i-2][j] === 'A') {
                        if (i - 3 > -1 && lines[i-3][j] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //southeastwards
                if (j + 1 < lines[i].length && i + 1 < lines.length && lines[i+1][j+1] === 'M') {
                    if (j + 2 < lines[i].length && i + 2 < lines.length && lines[i+2][j+2] === 'A') {
                        if (j + 3 < lines[i].length && i + 3 < lines.length && lines[i+3][j+3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //southwestwards
                if (j - 1 > -1 && i + 1 < lines.length && lines[i+1][j-1] === 'M') {
                    if (j - 2 > -1 && i + 2 < lines.length && lines[i+2][j-2] === 'A') {
                        if (j - 3 > -1 && i + 3 < lines.length && lines[i+3][j-3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //northeastwards
                if (j + 1 < lines[i].length && i - 1 > -1 && lines[i-1][j+1] === 'M') {
                    if (j + 2 < lines[i].length && i - 2 > -1 && lines[i-2][j+2] === 'A') {
                        if (j + 3 < lines[i].length && i - 3 > -1 && lines[i-3][j+3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //northwestwards
                if (j - 1 > -1 && i - 1 > -1 && lines[i-1][j-1] === 'M') {
                    if (j - 2 > -1 && i - 2 > -1 && lines[i-2][j-2] === 'A') {
                        if (j - 3 > -1 && i - 3 > -1 && lines[i-3][j-3] === 'S') {
                            xmasCount++;
                        }
                    }
                }
            }
        }
    }
    return xmasCount;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    let xmasCount = 0;
    for(let i=0;i<lines.length; i++) {
        for(let j=0; j<lines[i].length; j++) {
            //horizontal
            if (lines[i][j] === 'M' && j+2 < lines[i].length && lines[i][j+2] === 'M') {
                //north
                if (i-1 > -1 && j+1 < lines[i].length && lines[i-1][j+1] === 'A') {
                    if (i-2 > -1 && j+2 < lines[i].length && lines[i-2][j+2] === 'S') {
                        if (lines[i-2][j] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //south
                if (i+1 < lines.length && j+1 < lines[i].length && lines[i+1][j+1] === 'A') {
                    if (i+2 < lines.length && j+2 < lines[i].length && lines[i+2][j+2] === 'S') {
                        if (lines[i+2][j] === 'S') {
                            xmasCount++;
                        }
                    }
                }
            }
            //vertical
            if (lines[i][j] === 'M' && i + 2 < lines.length && lines[i+2][j] === 'M') {
                //east
                if (j+1 < lines[i].length && i+1 < lines.length && lines[i+1][j+1] === 'A') {
                    if (j+2 < lines[i].length && i+2 < lines.length && lines[i+2][j+2] === 'S') {
                        if (lines[i][j+2] === 'S') {
                            xmasCount++;
                        }
                    }
                }
                //west
                if (j-1 > -1 && i+1 < lines.length && lines[i+1][j-1] === 'A') {
                    if (j-2 > -1 && i+2 < lines.length && lines[i+2][j-2] === 'S') {
                        if (lines[i][j-2] === 'S') {
                            xmasCount++;
                        }
                    }
                }
            }
        }
    }
    return xmasCount;
}

/*

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
S.M
.A.
S.M

*/

//part 1
//+east 206
//+west 435
//+south 644
//+north 875
//+southeastwards 1289
//+southwestwards 1693
//+northeastwards 2154
//+northwestwards 2644

//part2
//horizontal
    //+north 554
    //+south 1028
//vertical
    //+east 1493
    //+west 1952
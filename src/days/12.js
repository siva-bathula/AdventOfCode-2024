const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');

module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = (await filereader.loadInput(dayNum)).trim();
    const grid = data.split('\n').map((row) => row.trim());
    return findPriceOfFencing(grid);
}

function findPriceOfFencing(grid) {
    var rows = grid.length;
    var cols = grid[0].length;
    var visited = {};
    var totalPrice = 0;
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    function isValid(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }
    var calculateRegion = (startR, startC) => {
        var queue = [[startR, startC]];
        const farmType = grid[startR][startC];
        var visitedInRegion = new Set();
        var perimeter = 0;
        while (queue.length > 0) {
            const [r, c] = queue.shift();
            var key = r + '-' + c;
            if (visitedInRegion.has(key)) continue;

            visitedInRegion.add(key);
            visited[key] = true;
            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;
                if (isNaN(newC)) {
                    continue;
                }
                if (!isValid(newR, newC)) {
                    perimeter++;
                    continue;
                }
                if (farmType === grid[newR][newC]) {
                    queue.push([newR, newC]);
                } else {
                    perimeter++;
                }
            }
        }
        return perimeter * visitedInRegion.size;
    };
    for (let i=0; i<rows; i++) {
        for (let j=0; j< cols; j++) {
            var key = i + '-' + j;
            if (visited[key]) {
                continue;
            } else {
                totalPrice += calculateRegion(i, j);
            }
        }
    }
    return totalPrice;
}

function findPriceOfFencingWithEdges(grid) {
  var rows = grid.length;
  var cols = grid[0].length;
  var visited = {};
  var totalPrice = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  function isValid(r, c) {
      return r >= 0 && r < rows && c >= 0 && c < cols;
  }
  function getNeighbors(point) {
    const [x, y] = point;
    const ns = [];
    for (const vect of directions) {
      let x1 = x + vect[0];
      let y1 = y + vect[1];
      ns.push([x1, y1]);
    }
    return ns;
  }
  var calculateRegion = (startR, startC) => {
      var queue = [[startR, startC]];
      const farmType = grid[startR][startC];
      let edges = new Set();
      let edgeCount = 0;
      let plotArea = 0;
      while (queue.length > 0) {
          const [r, c] = queue.shift();
          var key = r + '-' + c;
          if (visited[key]) continue;

          plotArea++;
          visited[key] = true;
          let neighbors = getNeighbors([r, c]);
          for(let polarity = 0; polarity < neighbors.length; polarity++){
              let neighbor = neighbors[polarity];
              if (!isValid(neighbor[0], neighbor[1]) || farmType !== grid[neighbor[0]][neighbor[1]]) {
                  edgeCount += 1;
                  edges.add(`${polarity},${neighbor[0]},${neighbor[1]}`);
                  for(const n2 of getNeighbors(neighbor)){
                      if(edges.has(`${polarity},${n2[0]},${n2[1]}`)){
                          edgeCount -= 1;
                      }
                  }
              } else {
                  queue.push(neighbor);
              }
          }
      }
      return edgeCount * plotArea;
  };
  for (let i=0; i<rows; i++) {
      for (let j=0; j< cols; j++) {
          var key = i + '-' + j;
          if (visited[key]) {
              continue;
          } else {
              totalPrice += calculateRegion(i, j);
          }
      }
  }
  return totalPrice;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const grid = data.split('\n').map((row) => row.trim());
    return findPriceOfFencingWithEdges(grid);
}
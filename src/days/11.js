const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');

module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    var stonesArray = data.split(' ');
    var stones = {};
    for(let i=0; i<stonesArray.length; i++) {
      const stone = +stonesArray[i];
      if (stones[stone]) {
        stones[stone]++;
      } else {
        stones[stone] = 1;
      }
    }

    stones = blink(stones, 25);

    var stoneCount = 0;
    Object.keys(stones).forEach(key => { 
      stoneCount += stones[key];
    });

    return stoneCount;
}

function blink(stones, blinks) {
    var newStones = {};
    const cache = new Map();
    for (let i=0; i<blinks; i++) {
      Object.keys(stones).forEach(key => {
        let transformed = [];
        if (cache.has(key)) {
          transformed = cache.get(key);
        } else {
          if (key === '0') {
            transformed = [1];
          } else if (key.toString().length %2 === 0 ) {
            let str = key.toString();
            const mid = str.length / 2;
            const left = +str.slice(0, mid);
            const right = +str.slice(mid);
            transformed = [left, right];
          } else {
            transformed = [(+key) * 2024];
          }
          cache.set(key, transformed);
        }
        for(let i=0; i<transformed.length; i++) {
          if (newStones[transformed[i]]) {
            newStones[transformed[i]] += stones[key];
          } else {
            newStones[transformed[i]] = stones[key];
          }
        }
      });
      stones = {...newStones};
      newStones = {};
    }
    return stones;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    var stonesArray = data.split(' ');
    var stones = {};
    for(let i=0; i<stonesArray.length; i++) {
      const stone = +stonesArray[i];
      if (stones[stone]) {
        stones[stone]++;
      } else {
        stones[stone] = 1;
      }
    }

    stones = blink(stones, 75);

    var stoneCount = 0;
    Object.keys(stones).forEach(key => { 
      stoneCount += stones[key];
    });

    return stoneCount;
}
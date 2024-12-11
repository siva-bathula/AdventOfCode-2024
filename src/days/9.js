const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');

module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const numbers = parseInput(data);
    const disk = createDiskMap(numbers);
    const compactedDisk = compactDisk([...disk]);
    return calculateChecksum(compactedDisk);
}

function parseInput(input) {
    return input.trim().split("").map(Number);
}
  
function createDiskMap(numbers) {
    let disk = [];
    let fileId = 0;

    for (let i = 0; i < numbers.length; i++) {
        const length = numbers[i];

        if (i % 2 === 0) {
            for (let j = 0; j < length; j++) {
                disk.push(fileId);
            }
            fileId++;
        } else {
            for (let j = 0; j < length; j++) {
                disk.push(".");
            }
        }
    }

    return disk;
}
  
function compactDisk(disk) {
    while (true) {
        const firstGap = disk.indexOf(".");
        if (firstGap === -1) break;

        let lastFilePos = disk.length - 1;
        while (lastFilePos >= 0 && disk[lastFilePos] === ".") {
            lastFilePos--;
        }

        if (lastFilePos <= firstGap) break;

        disk[firstGap] = disk[lastFilePos];
        disk[lastFilePos] = ".";
    }

    return disk;
}
  
function calculateChecksum(disk) {
    return disk.reduce((sum, fileId, pos) => {
        if (fileId === ".") return sum;
        return sum + pos * fileId;
    }, 0);
}

function compactDisk2(disk) {
    const files = findFiles(disk);
    files.sort((a, b) => b.id - a.id);

    for (const file of files) {
        const newPos = findFreeSpace(disk, file.start, file.length);
        if (newPos !== -1) {
            moveFile(disk, file, newPos);
        }
    }

    return disk;
}
  
function findFiles(disk) {
    const files = new Map();

    for (let i = 0; i < disk.length; i++) {
        const id = disk[i];
        if (id === ".") continue;

        if (!files.has(id)) {
            files.set(id, {
                id,
                start: i,
                length: 1,
            });
        } else {
            files.get(id).length++;
        }
    }

    return Array.from(files.values());
}

function findFreeSpace(disk, start, length) {
    let currentLength = 0;
    let currentStart = -1;

    for (let i = 0; i < start; i++) {
        if (disk[i] === ".") {
            if (currentStart === -1) currentStart = i;
            currentLength++;

            if (currentLength === length) {
                return currentStart;
            }
        } else {
            currentLength = 0;
            currentStart = -1;
        }
    }

    return -1;
}

function moveFile(disk, file, newStart) {
    for (let i = file.start; i < file.start + file.length; i++) {
        disk[i] = ".";
    }

    for (let i = 0; i < file.length; i++) {
        disk[newStart + i] = file.id;
    }
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const numbers = parseInput(data);
    const disk = createDiskMap(numbers);
    const compactedDisk = compactDisk2([...disk]);
    return calculateChecksum(compactedDisk);
}
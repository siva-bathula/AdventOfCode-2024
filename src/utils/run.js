const run = async (dayNum, part, module) => {
    part = +part;
    dayNum = +dayNum;
    if (part === 1) {
        return module.part1(dayNum);
    } else {
        return module.part2(dayNum);
    }
};
module.exports = run;
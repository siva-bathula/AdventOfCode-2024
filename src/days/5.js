const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var rules = [];
    var updates = [];
    for(let i=0;i<lines.length;i++) {
        if (lines[i] && lines[i].indexOf('|') > -1) {
            lines[i] = lines[i].replace('\r', '');
            var tokens = lines[i].split('|');
            var rule = {
                left: tokens[0],
                right: tokens[1]
            }
            rules.push(rule);
        } else if (lines[i]) {
            updates.push(lines[i])
        }
    }
    var middlePageNumberSum = 0;

    for(let i=0;i<updates.length;i++) {
        updates[i] = updates[i].replace('\r', '');
        var pages = updates[i].split(',');
        if (isUpdateValid(pages, rules)) {
            middlePageNumberSum += pages.length % 2 === 0 ? +pages[pages.length/2] : +pages[(pages.length - 1) / 2];
        }
    }

    return middlePageNumberSum;
}

var isUpdateValid = function(pages, rules) {
    if (pages.length > 0) {
        var isValidUpdate = true;
        for(let i=0; i<pages.length; i++) {
            for(let j=i+1; j<pages.length; j++) {
                var leftPage = pages[i];
                var rightPage = pages[j];
                for(let k=0;k<rules.length;k++) {
                    var rule = rules[k];
                    if (leftPage === rule.right && rightPage === rule.left) {
                        isValidUpdate = false;
                        break;
                    }
                }
                if (!isValidUpdate) {
                    break;
                }
            }
            if (!isValidUpdate) {
                break;
            }
        }
        return isValidUpdate;
    }
    return false;
};

var getBreakingRules = function(pages, rules) {
    if (pages.length > 0) {
        var isValidUpdate = true;
        var breakingRules = [];
        for(let i=0; i<pages.length; i++) {
            for(let j=i+1; j<pages.length; j++) {
                var leftPage = pages[i];
                var rightPage = pages[j];
                for(let k=0;k<rules.length;k++) {
                    var rule = rules[k];
                    if (leftPage === rule.right && rightPage === rule.left) {
                        isValidUpdate = false;
                        breakingRules.push(rule);
                    } 
                }
            }
        }
        if (isValidUpdate) {
            return null;
        } else {
            return breakingRules;
        }
    }
    return null;
};

var rectifyUpdate = function(update, breakingRules) {
    var pages = update.split(',');
    for (let i=0; i< breakingRules.length; i++) {
        var left = breakingRules[i].left;
        var right = breakingRules[i].right;
        var brokenRulesForRight = [];
        for (let j=0; j< breakingRules.length; j++) {
            if (breakingRules[j].right === right) {
                brokenRulesForRight.push(breakingRules[j]);
            }
        }

        let minIndex = -1;
        for (let j=0; j<brokenRulesForRight.length; j++) {
            var left = brokenRulesForRight[j].left;
            var leftPageIndex = pages.indexOf(left);
            minIndex = Math.max(minIndex, leftPageIndex);
        }
        var rightPageIndex = pages.indexOf(right);
        pages.splice(rightPageIndex, 1);
        pages.splice(minIndex, 0, right);
        break;
    }
    return pages.join(',');
};

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var rules = [];
    var updates = [];
    for(let i=0;i<lines.length;i++) {
        if (lines[i] && lines[i].indexOf('|') > -1) {
            lines[i] = lines[i].replace('\r', '');
            var tokens = lines[i].split('|');
            var rule = {
                left: tokens[0],
                right: tokens[1]
            }
            rules.push(rule);
        } else if (lines[i]) {
            updates.push(lines[i])
        }
    }
    var middlePageNumberSum = 0;

    var invalidUpdates = [];
    for(let i=0;i<updates.length;i++) {
        updates[i] = updates[i].replace('\r', '');
        if (!isUpdateValid(updates[i].split(','), rules)) {
            invalidUpdates.push(updates[i]);
        }
    }

    for(let i=0; i<invalidUpdates.length; i++) {
        var pages = invalidUpdates[i].split(',');
        var breakingRules = getBreakingRules(pages, rules);
        if (breakingRules && breakingRules.length > 0) {
            invalidUpdates[i] = rectifyUpdate(invalidUpdates[i], breakingRules);
            i--;
        } else {
            middlePageNumberSum += pages.length % 2 === 0 ? +pages[pages.length/2] : +pages[(pages.length - 1) / 2];
        }
    }

    return middlePageNumberSum;
}
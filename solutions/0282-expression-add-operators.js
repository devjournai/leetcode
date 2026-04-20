/**
 * Expression Add Operators
 * Time Complexity: O(N * 4^N)
 * Space Complexity: O(N * 4^N)
*/
var addOperators = function (num, target) {
    const finalExpressions = [];

    function findExpressions(currentExpressionString, currentTotal, lastOperandValue, segmentStartIdx) {
        if (segmentStartIdx === num.length) {
            if (currentTotal === target) {
                finalExpressions.push(currentExpressionString);
            }
            return;
        }

        let currentNumberSegmentString = '';
        for (let currentSegmentEndIdx = segmentStartIdx; currentSegmentEndIdx < num.length; currentSegmentEndIdx++) {
            currentNumberSegmentString += num[currentSegmentEndIdx];

            if (currentNumberSegmentString.length > 1 && currentNumberSegmentString[0] === '0') {
                return;
            }

            const currentNumberSegmentValue = Number(currentNumberSegmentString);

            if (segmentStartIdx === 0) {
                findExpressions(currentNumberSegmentString, currentNumberSegmentValue, currentNumberSegmentValue, currentSegmentEndIdx + 1);
            } else {
                findExpressions(currentExpressionString + '+' + currentNumberSegmentString, currentTotal + currentNumberSegmentValue, currentNumberSegmentValue, currentSegmentEndIdx + 1);
                findExpressions(currentExpressionString + '-' + currentNumberSegmentString, currentTotal - currentNumberSegmentValue, -currentNumberSegmentValue, currentSegmentEndIdx + 1);
                findExpressions(currentExpressionString + '*' + currentNumberSegmentString, currentTotal - lastOperandValue + (lastOperandValue * currentNumberSegmentValue), lastOperandValue * currentNumberSegmentValue, currentSegmentEndIdx + 1);
            }
        }
    }

    findExpressions('', 0, 0, 0);
    return finalExpressions;
};
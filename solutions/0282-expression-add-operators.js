/**
 * Expression Add Operators
 * Intuition: Every split of the digit string is a number; between numbers insert +, -, or * (with * needing the previous operand undone so multiplication binds tighter).
 * Approach: 1. DFS from segmentStartIdx, grow the current number (reject leading zeros). 2. First segment starts the expression with no operator. 3. Later: recurse on +, -, and * using currentTotal - lastOperand + lastOperand * value. 4. When the string is consumed and total equals target, keep the expression.
 * Dry Run: num="123", target=6.
 *   - "1+2+3" totals 6; "1*2*3" uses * update (1*2 then 2*3) and totals 6.
 *   - Return ["1+2+3","1*2*3"].
 * Time Complexity: O(N * 4^N)
 * Space Complexity: O(N * 4^N)
 */
var addOperators = function (num, target) {
  const finalExpressions = [];

  function findExpressions(
    currentExpressionString,
    currentTotal,
    lastOperandValue,
    segmentStartIdx
  ) {
    if (segmentStartIdx === num.length) {
      if (currentTotal === target) {
        finalExpressions.push(currentExpressionString);
      }
      return;
    }

    let currentNumberSegmentString = "";
    for (
      let currentSegmentEndIdx = segmentStartIdx;
      currentSegmentEndIdx < num.length;
      currentSegmentEndIdx++
    ) {
      currentNumberSegmentString += num[currentSegmentEndIdx];

      if (
        currentNumberSegmentString.length > 1 &&
        currentNumberSegmentString[0] === "0"
      ) {
        return;
      }

      const currentNumberSegmentValue = Number(currentNumberSegmentString);

      if (segmentStartIdx === 0) {
        findExpressions(
          currentNumberSegmentString,
          currentNumberSegmentValue,
          currentNumberSegmentValue,
          currentSegmentEndIdx + 1
        );
      } else {
        findExpressions(
          currentExpressionString + "+" + currentNumberSegmentString,
          currentTotal + currentNumberSegmentValue,
          currentNumberSegmentValue,
          currentSegmentEndIdx + 1
        );
        findExpressions(
          currentExpressionString + "-" + currentNumberSegmentString,
          currentTotal - currentNumberSegmentValue,
          -currentNumberSegmentValue,
          currentSegmentEndIdx + 1
        );
        findExpressions(
          currentExpressionString + "*" + currentNumberSegmentString,
          currentTotal -
            lastOperandValue +
            lastOperandValue * currentNumberSegmentValue,
          lastOperandValue * currentNumberSegmentValue,
          currentSegmentEndIdx + 1
        );
      }
    }
  }

  findExpressions("", 0, 0, 0);
  return finalExpressions;
};

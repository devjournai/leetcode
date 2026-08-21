/**
 * Different Ways To Add Parentheses
 * Intuition: Every operator is a split point: fully parenthesize the left substring, fully parenthesize the right, then combine every pair with that operator. A substring with no operator is a single integer.
 * Approach: 1. Scan the expression for `+`, `-`, or `*`. 2. Recurse on the left and right segments around that operator. 3. For each left/right pair, apply the operator and push the result. 4. If no operator was found, return `[parseInt(expression)]`. 5. No memoization — overlapping subexpressions are recomputed.
 * Dry Run: expression = "2-1-1".
 *   - Split at first `-`: left [2], right ways of "1-1" → [0] → 2-0=2.
 *   - Split at second `-`: left ways of "2-1" → [1], right [1] → 1-1=0. Return [2, 0].
 * Time Complexity: O(k^N)
 * Space Complexity: O(k^N)
 */
var diffWaysToCompute = function (expression) {
  const computedResults = [];

  let scanIndex = 0;
  const inputLength = expression.length;

  for (scanIndex = 0; scanIndex < inputLength; scanIndex++) {
    const currentSymbol = expression[scanIndex];

    if (
      currentSymbol === "+" ||
      currentSymbol === "-" ||
      currentSymbol === "*"
    ) {
      const leftExpressionSegment = expression.substring(0, scanIndex);
      const rightExpressionSegment = expression.substring(scanIndex + 1);

      const leftComponentOutcomes = diffWaysToCompute(leftExpressionSegment);
      const rightComponentOutcomes = diffWaysToCompute(rightExpressionSegment);

      let firstLoopIterator = 0;
      const leftOutcomesCount = leftComponentOutcomes.length;

      while (firstLoopIterator < leftOutcomesCount) {
        const valueFromLeft = leftComponentOutcomes[firstLoopIterator];

        let secondLoopIterator = 0;
        const rightOutcomesCount = rightComponentOutcomes.length;

        while (secondLoopIterator < rightOutcomesCount) {
          const valueFromRight = rightComponentOutcomes[secondLoopIterator];
          let operationResult;

          if (currentSymbol === "+") {
            operationResult = valueFromLeft + valueFromRight;
          } else if (currentSymbol === "-") {
            operationResult = valueFromLeft - valueFromRight;
          } else {
            operationResult = valueFromLeft * valueFromRight;
          }
          computedResults.push(operationResult);
          secondLoopIterator++;
        }
        firstLoopIterator++;
      }
    }
  }

  if (computedResults.length === 0) {
    const singleNumericValue = parseInt(expression, 10);
    return [singleNumericValue];
  } else {
    return computedResults;
  }
};

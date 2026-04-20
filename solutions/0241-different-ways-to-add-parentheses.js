/**
 * Different Ways To Add Parentheses
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

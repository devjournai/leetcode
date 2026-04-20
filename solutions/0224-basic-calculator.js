/**
 * Basic Calculator
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var calculate = function (s) {
  const inputExpression = s;
  const expressionLength = inputExpression.length;
  const processingStack = [];
  let currentCalculationTotal = 0;
  let currentEvaluationSign = 1;
  let stringTraversalIndex = 0;

  while (stringTraversalIndex < expressionLength) {
    const characterAtPointer = inputExpression[stringTraversalIndex];

    if (characterAtPointer === " ") {
      stringTraversalIndex++;
      continue;
    }

    if (characterAtPointer >= "0" && characterAtPointer <= "9") {
      let parsedNumericalValue = 0;
      while (
        stringTraversalIndex < expressionLength &&
        inputExpression[stringTraversalIndex] >= "0" &&
        inputExpression[stringTraversalIndex] <= "9"
      ) {
        parsedNumericalValue =
          parsedNumericalValue * 10 +
          (inputExpression[stringTraversalIndex] - "0");
        stringTraversalIndex++;
      }
      currentCalculationTotal += parsedNumericalValue * currentEvaluationSign;
      continue;
    } else if (characterAtPointer === "+") {
      currentEvaluationSign = 1;
    } else if (characterAtPointer === "-") {
      currentEvaluationSign = -1;
    } else if (characterAtPointer === "(") {
      processingStack.push(currentCalculationTotal);
      processingStack.push(currentEvaluationSign);
      currentCalculationTotal = 0;
      currentEvaluationSign = 1;
    } else if (characterAtPointer === ")") {
      const previousSignFromStack = processingStack.pop();
      const previousTotalFromStack = processingStack.pop();
      currentCalculationTotal =
        previousTotalFromStack +
        currentCalculationTotal * previousSignFromStack;
    }
    stringTraversalIndex++;
  }

  return currentCalculationTotal;
};

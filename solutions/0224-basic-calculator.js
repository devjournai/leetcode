/**
 * Basic Calculator
 * Intuition: A running total and a current sign handle + and -. Parentheses snapshot the outer total and sign on a stack, evaluate the inside, then combine.
 * Approach: 1. Skip spaces. 2. Parse multi-digit numbers and add number * sign to the total. 3. '+' / '-' update the sign. 4. '(' push total and sign, reset both. 5. ')' pop sign and outer total; total = outer + inner * sign.
 * Dry Run: s = "1+(2-3)".
 *   - '1' → total=1; '+'; '(' push 1 then +1, reset total=0 sign=+.
 *   - '2' → total=2; '-' → sign=-1; '3' → total=-1.
 *   - ')' → 1 + (-1)*1 = 0. Return 0.
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

/**
 * Minimum Cost To Change The Final Value Of Expression
 * Intuition: Parse with a stack. Each subexpression stores [value, min cost to flip]. Combine AND/OR using operand-flip costs and a possible operator flip (cost 1).
 * Approach: 1. Push '0'/'1' as [bit,1], operators and '('. 2. On ')', evaluate left-to-right with `calculateResultAndCost`. 3. After the scan, fold remaining stack ops. 4. Return the final flip cost.
 * Dry Run: expression="1&(0|1)". Value is 1; cheapest flip is change '&' to '|' or similar → cost 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minOperationsToFlip = function (expressionString) {
  const calculateResultAndCost = (operandOne, operatorChar, operandTwo) => {
    const valueOne = operandOne[0];
    const costOneToFlip = operandOne[1];
    const valueTwo = operandTwo[0];
    const costTwoToFlip = operandTwo[1];

    let resultValue;
    let resultFlipCost;

    if (operatorChar === "&") {
      if (valueOne === 1 && valueTwo === 1) {
        resultValue = 1;
        resultFlipCost = Math.min(costOneToFlip, costTwoToFlip);
      } else if (valueOne === 0 && valueTwo === 0) {
        resultValue = 0;
        resultFlipCost = Math.min(costOneToFlip + 1, costTwoToFlip + 1);
      } else {
        resultValue = 0;
        resultFlipCost = Math.min(costOneToFlip + costTwoToFlip, 1);
      }
    } else {
      if (valueOne === 1 && valueTwo === 1) {
        resultValue = 1;
        resultFlipCost = Math.min(costOneToFlip + 1, costTwoToFlip + 1);
      } else if (valueOne === 0 && valueTwo === 0) {
        resultValue = 0;
        resultFlipCost = Math.min(costOneToFlip, costTwoToFlip);
      } else {
        resultValue = 1;
        resultFlipCost = Math.min(costOneToFlip + costTwoToFlip, 1);
      }
    }
    return [resultValue, resultFlipCost];
  };

  const processingStack = [];

  for (const symbolInExpression of expressionString) {
    if (symbolInExpression === ")") {
      const elementsWithinParentheses = [];
      while (
        processingStack.length > 0 &&
        processingStack[processingStack.length - 1][0] !== "("
      ) {
        elementsWithinParentheses.push(processingStack.pop());
      }
      processingStack.pop();
      let currentOperandA = elementsWithinParentheses.pop();

      while (elementsWithinParentheses.length > 0) {
        const operatorToken = elementsWithinParentheses.pop();
        const currentOperandB = elementsWithinParentheses.pop();
        currentOperandA = calculateResultAndCost(
          currentOperandA,
          operatorToken[0],
          currentOperandB
        );
      }
      processingStack.push(currentOperandA);
    } else if (symbolInExpression === "1") {
      processingStack.push([1, 1]);
    } else if (symbolInExpression === "0") {
      processingStack.push([0, 1]);
    } else {
      processingStack.push([symbolInExpression]);
    }
  }

  const finalEvaluationElements = [];
  while (processingStack.length > 0) {
    finalEvaluationElements.push(processingStack.pop());
  }

  let aggregatedResult = finalEvaluationElements.pop();

  while (finalEvaluationElements.length > 0) {
    const binaryOperator = finalEvaluationElements.pop();
    const secondaryOperand = finalEvaluationElements.pop();
    aggregatedResult = calculateResultAndCost(
      aggregatedResult,
      binaryOperator[0],
      secondaryOperand
    );
  }

  const finalCostToFlip = aggregatedResult[1];
  return finalCostToFlip;
};

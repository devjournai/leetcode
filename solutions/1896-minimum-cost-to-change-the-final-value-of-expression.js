/**
 * Minimum Cost To Change The Final Value Of Expression
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minOperationsToFlip = function (expressionString) {
  // Helper function to apply a binary operation and calculate costs
  const calculateResultAndCost = (operandOne, operatorChar, operandTwo) => {
    const valueOne = operandOne[0];
    const costOneToFlip = operandOne[1];
    const valueTwo = operandTwo[0];
    const costTwoToFlip = operandTwo[1];

    let resultValue;
    let resultFlipCost;

    if (operatorChar === "&") {
      // Bitwise AND
      if (valueOne === 1 && valueTwo === 1) {
        resultValue = 1;
        // Current value is 1. To make it 0, flip one of the '1's to '0'.
        resultFlipCost = Math.min(costOneToFlip, costTwoToFlip);
      } else if (valueOne === 0 && valueTwo === 0) {
        resultValue = 0;
        // Current value is 0. To make it 1, need '1 & 1' or '1 | 0'.
        // min(flip_one_operand_and_operator, flip_other_operand_and_operator)
        // (costOneToFlip + 1) -> flip valueOne to 1, flip '&' to '|', result 1|0 = 1
        // (costTwoToFlip + 1) -> flip valueTwo to 1, flip '&' to '|', result 0|1 = 1
        resultFlipCost = Math.min(costOneToFlip + 1, costTwoToFlip + 1);
      } else {
        // One is 0, one is 1 (e.g., 1 & 0 = 0)
        resultValue = 0;
        // Current value is 0. To make it 1, flip '&' to '|' (cost 1).
        // Or flip the 0 to 1 AND flip '&' to '|'. Example: (1&0) -> 1 | (0->1) -> 1|1 = 1.
        // The term `costOneToFlip + costTwoToFlip` represents changing both operands,
        // (1->0)&(0->1) -> 0&1 = 0, which does not flip the final result.
        // However, since `costOneToFlip` and `costTwoToFlip` are always >=1,
        // `costOneToFlip + costTwoToFlip >= 2`.
        // So `Math.min(costOneToFlip + costTwoToFlip, 1)` always resolves to 1,
        // representing the cost of flipping the operator directly.
        resultFlipCost = Math.min(costOneToFlip + costTwoToFlip, 1);
      }
    } else {
      // operatorChar === '|' (Bitwise OR)
      if (valueOne === 1 && valueTwo === 1) {
        resultValue = 1;
        // Current value is 1. To make it 0, need '0 | 0' or '0 & 1'.
        // min(flip_one_operand_and_operator, flip_other_operand_and_operator)
        // (costOneToFlip + 1) -> flip valueOne to 0, flip '|' to '&', result 0&1 = 0
        // (costTwoToFlip + 1) -> flip valueTwo to 0, flip '|' to '&', result 1&0 = 0
        resultFlipCost = Math.min(costOneToFlip + 1, costTwoToFlip + 1);
      } else if (valueOne === 0 && valueTwo === 0) {
        resultValue = 0;
        // Current value is 0. To make it 1, flip one of the '0's to '1'.
        resultFlipCost = Math.min(costOneToFlip, costTwoToFlip);
      } else {
        // One is 0, one is 1 (e.g., 1 | 0 = 1)
        resultValue = 1;
        // Current value is 1. To make it 0, flip '|' to '&' (cost 1).
        // Similar to the '&' case above, `costOneToFlip + costTwoToFlip` will be >=2.
        // So `Math.min(costOneToFlip + costTwoToFlip, 1)` always resolves to 1.
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
      processingStack.pop(); // Pop the '('

      // elementsWithinParentheses will be in reverse order: [operand2, operator, operand1]
      let currentOperandA = elementsWithinParentheses.pop(); // This is operand1: [value, cost]

      // Evaluate multiple operations within parentheses (due to left-to-right evaluation)
      while (elementsWithinParentheses.length > 0) {
        const operatorToken = elementsWithinParentheses.pop(); // Operator: [char]
        const currentOperandB = elementsWithinParentheses.pop(); // This is operand2: [value, cost]
        currentOperandA = calculateResultAndCost(
          currentOperandA,
          operatorToken[0],
          currentOperandB,
        );
      }
      processingStack.push(currentOperandA); // Push the result of the entire parenthesized expression
    } else if (symbolInExpression === "1") {
      processingStack.push([1, 1]); // Value 1, cost to flip to 0 is 1
    } else if (symbolInExpression === "0") {
      processingStack.push([0, 1]); // Value 0, cost to flip to 1 is 1
    } else {
      // Operator ('&', '|', '(')
      processingStack.push([symbolInExpression]);
    }
  }

  // After iterating through the expression, evaluate any remaining operations on the stack.
  // The stack may contain [operand, operator, operand, ...]
  const finalEvaluationElements = [];
  while (processingStack.length > 0) {
    finalEvaluationElements.push(processingStack.pop());
  }

  // finalEvaluationElements will be in reverse order: [operand_N, operator_N-1, ..., operand_1]
  let aggregatedResult = finalEvaluationElements.pop(); // First operand [value, cost]

  while (finalEvaluationElements.length > 0) {
    const binaryOperator = finalEvaluationElements.pop(); // Operator [char]
    const secondaryOperand = finalEvaluationElements.pop(); // Second operand [value, cost]
    aggregatedResult = calculateResultAndCost(
      aggregatedResult,
      binaryOperator[0],
      secondaryOperand,
    );
  }

  // The final cost is the cost to flip the final aggregated value.
  const finalCostToFlip = aggregatedResult[1];
  return finalCostToFlip;
};

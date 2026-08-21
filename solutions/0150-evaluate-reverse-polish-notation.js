/**
 * Evaluate Reverse Polish Notation
 * Intuition: RPN applies an operator to the two most recent values. A stack stores numbers; an operator pops two operands, applies the map, and pushes the result.
 * Approach: 1. Define `arithmeticOperators` for +, -, *, / using `Math.trunc` for division toward zero. 2. For each token, if it is an operator, pop `operandTwo` then `operandOne`, push the mapped result. 3. Otherwise parse `Number(currentExpressionUnit)` and push. 4. Return the last stack value.
 * Dry Run: tokens = ["2","1","+","3","*"]
 * Stack: [2] → [2,1] → + → [3] → [3,3] → * → [9]
 * Result: 9
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var evalRPN = function (tokens) {
  const calculationStack = [];
  const arithmeticOperators = {
    "+": (firstVal, secondVal) => firstVal + secondVal,
    "-": (firstVal, secondVal) => firstVal - secondVal,
    "*": (firstVal, secondVal) => firstVal * secondVal,
    "/": (firstVal, secondVal) => Math.trunc(firstVal / secondVal),
  };

  for (const currentExpressionUnit of tokens) {
    if (arithmeticOperators[currentExpressionUnit]) {
      const operandTwo = calculationStack.pop();
      const operandOne = calculationStack.pop();
      const operationResult = arithmeticOperators[currentExpressionUnit](
        operandOne,
        operandTwo
      );
      calculationStack.push(operationResult);
    } else {
      const numericTerm = Number(currentExpressionUnit);
      calculationStack.push(numericTerm);
    }
  }

  return calculationStack.pop();
};

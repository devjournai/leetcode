/**
 * Evaluate Reverse Polish Notation
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var evalRPN = function (tokens) {
  const calculationStack = [];
  const arithmeticOperators = {
    '+': (firstVal, secondVal) => firstVal + secondVal,
    '-': (firstVal, secondVal) => firstVal - secondVal,
    '*': (firstVal, secondVal) => firstVal * secondVal,
    '/': (firstVal, secondVal) => Math.trunc(firstVal / secondVal),
  };

  for (const currentExpressionUnit of tokens) {
    if (arithmeticOperators[currentExpressionUnit]) {
      const operandTwo = calculationStack.pop();
      const operandOne = calculationStack.pop();
      const operationResult = arithmeticOperators[currentExpressionUnit](operandOne, operandTwo);
      calculationStack.push(operationResult);
    } else {
      const numericTerm = Number(currentExpressionUnit);
      calculationStack.push(numericTerm);
    }
  }

  return calculationStack.pop();
};
/**
 * Ternary Expression Parser
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var parseTernary = function (expression) {
  let currentIter = expression.length - 1;
  const evalStack = [];

  while (currentIter >= 0) {
    const charValue = expression[currentIter];

    if (charValue === '?') {
      const conditionCharacter = expression[currentIter - 1];
      const trueBranchResult = evalStack.pop();
      const falseBranchResult = evalStack.pop();

      const finalOutcome = (conditionCharacter === 'T') ? trueBranchResult : falseBranchResult;
      evalStack.push(finalOutcome);
      currentIter--;
    } else if (charValue !== ':') {
      evalStack.push(charValue);
    }
    currentIter--;
  }

  return evalStack[0];
};
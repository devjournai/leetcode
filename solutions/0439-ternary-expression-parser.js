/**
 * Ternary Expression Parser
 * Intuition: Nested `T?a:b` expressions resolve from the right. A stack holds values; a `?` pops false then true and keeps one based on the condition char immediately before `?`.
 * Approach: 1. Scan `expression` from the end. 2. On `?`, read `expression[i-1]` as T/F, pop true then false from `evalStack`, push the chosen branch, skip the condition with an extra decrement. 3. Skip `:`. 4. Push other characters. 5. Return `evalStack[0]`.
 * Dry Run: "T?T?F:5:3". Push 3,5,F; inner `?` (T) keeps F over 5; skip that T; outer `?` (T) keeps F over 3. Return "F".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var parseTernary = function (expression) {
  let currentIter = expression.length - 1;
  const evalStack = [];

  while (currentIter >= 0) {
    const charValue = expression[currentIter];

    if (charValue === "?") {
      const conditionCharacter = expression[currentIter - 1];
      const trueBranchResult = evalStack.pop();
      const falseBranchResult = evalStack.pop();

      const finalOutcome =
        conditionCharacter === "T" ? trueBranchResult : falseBranchResult;
      evalStack.push(finalOutcome);
      currentIter--;
    } else if (charValue !== ":") {
      evalStack.push(charValue);
    }
    currentIter--;
  }

  return evalStack[0];
};

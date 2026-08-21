/**
 * Longest Valid Parentheses
 * Intuition: A stack of indices starts with sentinel `-1`. `'('` pushes its index; `')'` pops, then either pushes the current index as a new base if the stack is empty or updates `maxValidLength` with `iterator - currentStackTop`.
 * Approach: 1. Return 0 on empty string. 2. `trackingStack = [-1]`. 3. On `'('` push `iterator`. 4. On `')'` pop; if empty push `iterator`, else take span from the new top. 5. Return `maxValidLength`.
 * Dry Run: inputString = ")()".
 *   - i=0 ')': pop -1, stack empty, push 0. i=1 '(': push 1. i=2 ')': pop 1, top=0, span=2. Return 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var longestValidParentheses = function (inputString) {
  if (inputString.length === 0) {
    return 0;
  }

  const trackingStack = [-1];
  let maxValidLength = 0;

  for (let iterator = 0; iterator < inputString.length; iterator++) {
    const currentChar = inputString[iterator];

    if (currentChar === "(") {
      trackingStack.push(iterator);
    } else {
      trackingStack.pop();
      if (trackingStack.length === 0) {
        trackingStack.push(iterator);
      } else {
        const currentStackTop = trackingStack[trackingStack.length - 1];
        const calculatedSpan = iterator - currentStackTop;
        maxValidLength = Math.max(maxValidLength, calculatedSpan);
      }
    }
  }

  return maxValidLength;
};

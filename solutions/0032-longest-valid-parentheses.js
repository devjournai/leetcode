/**
 * Longest Valid Parentheses
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

    if (currentChar === '(') {
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
/**
 * Maximum Width Ramp
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxWidthRamp = function (nums) {
  const monotonicDecreasingStack = [];
  let largestRampWidth = 0;

  for (
    let forwardIterIndex = 0;
    forwardIterIndex < nums.length;
    forwardIterIndex++
  ) {
    if (
      monotonicDecreasingStack.length === 0 ||
      nums[monotonicDecreasingStack[monotonicDecreasingStack.length - 1]] >
        nums[forwardIterIndex]
    ) {
      monotonicDecreasingStack.push(forwardIterIndex);
    }
  }

  for (
    let backwardIterIndex = nums.length - 1;
    backwardIterIndex >= 0;
    backwardIterIndex--
  ) {
    while (
      monotonicDecreasingStack.length > 0 &&
      nums[monotonicDecreasingStack[monotonicDecreasingStack.length - 1]] <=
        nums[backwardIterIndex]
    ) {
      const candidateLeftBoundIndex = monotonicDecreasingStack.pop();
      const currentCalculatedWidth =
        backwardIterIndex - candidateLeftBoundIndex;
      largestRampWidth = Math.max(largestRampWidth, currentCalculatedWidth);
    }
  }

  return largestRampWidth;
};

/**
 * Maximum Width Ramp
 * Intuition: Candidate left indices form a decreasing stack of values. From the right, pop every stack top ≤ `nums[i]` because i is the farthest right partner for that left index.
 * Approach: 1. Push `forwardIterIndex` when the stack is empty or `nums[top] > nums[i]`. 2. Scan `backwardIterIndex` from n-1 to 0. 3. While stack top value ≤ current, pop and update `largestRampWidth`. 4. Return the max width.
 * Dry Run: nums = [6,0,8,2,1,5]. Decreasing stack [0] (6 then 0). From right, 5≥0 → width 4 (index 5-1). Answer 4.
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

/**
 * Count Non-Decreasing Subarrays After K Operations
 * Intuition: Work right-to-left. A deque of (value, runLength) stores the non-increasing "ceiling" the current window would become. Raising a smaller run up to the new left value costs (new-old)*count. Shrink from the right while cost > k.
 * Approach: 1. i from n-1 to 0, merge deque tail while tail value < nums[i], paying the raise cost. 2. While cost > k, peel one rightmost element. 3. All windows nums[i..j] are feasible; add j-i+1.
 * Dry Run: nums = [6,3,1,2,2], k=4. From the right, raising 1,2,2 toward 3 costs 1+0+0 then toward 6 as needed, counted windows stay within budget 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var countNonDecreasingSubarrays = function (nums, k) {
  let validSubarrayCount = 0;
  let raiseCost = 0;
  const ceilingRuns = [];
  let runHead = 0;
  let rightIndex = nums.length - 1;

  for (let leftIndex = nums.length - 1; leftIndex >= 0; leftIndex--) {
    const currentValue = nums[leftIndex];
    let runLength = 1;

    while (
      runHead < ceilingRuns.length &&
      ceilingRuns[ceilingRuns.length - 1][0] < currentValue
    ) {
      const [nextValue, nextCount] = ceilingRuns.pop();
      runLength += nextCount;
      raiseCost += (currentValue - nextValue) * nextCount;
    }
    ceilingRuns.push([currentValue, runLength]);

    while (raiseCost > k) {
      const [rightmostValue, rightmostCount] = ceilingRuns[runHead++];
      raiseCost -= rightmostValue - nums[rightIndex];
      rightIndex--;
      if (rightmostCount > 1) {
        runHead--;
        ceilingRuns[runHead] = [rightmostValue, rightmostCount - 1];
      }
    }

    validSubarrayCount += rightIndex - leftIndex + 1;
  }

  return validSubarrayCount;
};

/**
 * Longest Arithmetic Subsequence
 * Intuition: dp[i][diff] = longest arithmetic sequence ending at i with that difference. Transition from every earlier j.
 * Approach: 1. Array of maps, one per index. 2. For i>j, diff=nums[i]-nums[j], length = (dp[j][diff]||1)+1. 3. Store at dp[i][diff] and track the global max (at least 2).
 * Dry Run: nums = [3,6,9,12].
 *   - 6-3=3 length 2; 9-6=3 length 3; 12-9=3 length 4. Answer 4.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var longestArithSeqLength = function (nums) {
  const dynamicProgramState = new Array(nums.length)
    .fill()
    .map(() => new Map());
  let overallMaxLength = 2;

  for (let currentPoint = 1; currentPoint < nums.length; currentPoint++) {
    for (let previousPoint = 0; previousPoint < currentPoint; previousPoint++) {
      const arithmeticDifference = nums[currentPoint] - nums[previousPoint];
      const lengthFromPreceding =
        dynamicProgramState[previousPoint].get(arithmeticDifference) || 1;
      const currentSequenceLength = lengthFromPreceding + 1;
      dynamicProgramState[currentPoint].set(
        arithmeticDifference,
        currentSequenceLength
      );
      overallMaxLength = Math.max(overallMaxLength, currentSequenceLength);
    }
  }

  return overallMaxLength;
};

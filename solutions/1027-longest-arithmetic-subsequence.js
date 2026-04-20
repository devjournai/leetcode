/**
 * Longest Arithmetic Subsequence
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
        currentSequenceLength,
      );
      overallMaxLength = Math.max(overallMaxLength, currentSequenceLength);
    }
  }

  return overallMaxLength;
};

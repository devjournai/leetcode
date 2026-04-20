/**
 * Maximum Xor For Each Query
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getMaximumXor = function (nums, maximumBit) {
  const answerList = [];
  let aggregateXorValue = 0;
  const maximalBitValue = (1 << maximumBit) - 1;

  for (const currentNumber of nums) {
    aggregateXorValue ^= currentNumber;
  }

  const initialLength = nums.length;
  for (
    let processingIndex = initialLength - 1;
    processingIndex >= 0;
    --processingIndex
  ) {
    const optimalKeyCandidate = aggregateXorValue ^ maximalBitValue;
    answerList.push(optimalKeyCandidate);
    aggregateXorValue ^= nums[processingIndex];
  }

  answerList.reverse();

  return answerList;
};

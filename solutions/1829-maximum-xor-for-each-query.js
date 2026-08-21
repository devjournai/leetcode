/**
 * Maximum Xor For Each Query
 * Intuition: For XOR of the current prefix, the k in [0, 2^maximumBit) that maximizes prefix^k is prefix XOR ((1<<maximumBit)-1). Queries drop nums from the back, so maintain the full XOR and peel off the last element each step.
 * Approach: 1. XOR all nums into `aggregateXorValue`. 2. From the end, push `aggregateXorValue ^ maximalBitValue`, then XOR out nums[i]. 3. Reverse `answerList` to match the code’s final order. 4. Return it.
 * Dry Run: nums = [0,1,1,3], maximumBit = 2.
 *   - Full XOR 3, mask 3. Loop pushes 0,3,2,3 then reverse → [3,2,3,0].
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

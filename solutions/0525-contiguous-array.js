/**
 * Contiguous Array
 * Intuition: Treat 1 as +1 and 0 as -1. A balanced subarray has running-sum 0 relative to an earlier prefix with the same sum; the first index of each sum gives the longest span.
 * Approach: 1. Map sum 0 → -1. 2. For each index, increment or decrement `runningSumValue`. 3. If that sum was seen, update `maxOverallLength` with `i - priorIndex`; else store the first index.
 * Dry Run: nums = [0, 1].
 *   - i=0: sum=-1, store. i=1: sum=0, seen at -1, length 2. Return 2.
 * Time Complexity: O(nums.length)
 * Space Complexity: O(nums.length)
 */
var findMaxLength = function (nums) {
  const balanceTracker = new Map();
  balanceTracker.set(0, -1);

  let maxOverallLength = 0;
  let runningSumValue = 0;

  for (
    let currentElementIndex = 0;
    currentElementIndex < nums.length;
    currentElementIndex++
  ) {
    const valueFromNums = nums[currentElementIndex];

    if (valueFromNums === 1) {
      runningSumValue++;
    } else {
      runningSumValue--;
    }

    if (balanceTracker.has(runningSumValue)) {
      const priorIndex = balanceTracker.get(runningSumValue);
      const potentialCandidateLength = currentElementIndex - priorIndex;
      maxOverallLength = Math.max(maxOverallLength, potentialCandidateLength);
    } else {
      balanceTracker.set(runningSumValue, currentElementIndex);
    }
  }

  return maxOverallLength;
};

/**
 * Contiguous Array
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

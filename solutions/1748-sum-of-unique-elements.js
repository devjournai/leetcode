/**
 * Sum Of Unique Elements
 * Intuition: Sum values whose frequency is exactly one.
 * Approach: 1. Count in `frequencyCounter`. 2. Add `elementKey` when `elementCount === 1`. 3. Return `cumulativeSum`.
 * Dry Run: nums = [1,2,3,2]
 * unique 1 and 3 → 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var sumOfUnique = function (nums) {
  const frequencyCounter = new Map();

  nums.forEach(function (currentValue) {
    const previousOccurrence = frequencyCounter.get(currentValue) || 0;
    frequencyCounter.set(currentValue, previousOccurrence + 1);
  });

  let cumulativeSum = 0;
  for (const [elementKey, elementCount] of frequencyCounter.entries()) {
    if (elementCount === 1) {
      cumulativeSum += elementKey;
    }
  }

  return cumulativeSum;
};

/**
 * Make Two Arrays Equal By Reversing Sub Arrays
 * Intuition: Any subarray reverse means the arrays can match iff they are permutations of each other, i.e. the same multiset.
 * Approach: 1. Count target values in a Map. 2. Decrement for each arr value. 3. If a value has no remaining count, return false. 4. Otherwise return true.
 * Dry Run: target = [1,2,3,4], arr = [2,4,1,3]
 *   - counts {1:1,2:1,3:1,4:1}
 *   - each arr value decrements successfully. Return true.
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var canBeEqual = function (target, arr) {
  const elementFrequencies = new Map();

  for (const targetValue of target) {
    const currentAmount = elementFrequencies.get(targetValue) || 0;
    const newAmount = currentAmount + 1;
    elementFrequencies.set(targetValue, newAmount);
  }

  for (const sourceValue of arr) {
    const availableAmount = elementFrequencies.get(sourceValue) || 0;

    if (availableAmount === 0) {
      return false;
    }

    const decreasedAmount = availableAmount - 1;
    elementFrequencies.set(sourceValue, decreasedAmount);
  }

  return true;
};

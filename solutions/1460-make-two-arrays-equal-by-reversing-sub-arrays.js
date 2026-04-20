/**
 * Make Two Arrays Equal By Reversing Sub Arrays
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

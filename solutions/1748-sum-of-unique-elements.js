/**
 * Sum Of Unique Elements
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

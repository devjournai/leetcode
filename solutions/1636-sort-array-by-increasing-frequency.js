/**
 * Sort Array By Increasing Frequency
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var frequencySort = function (nums) {
  const frequencyCounter = new Map();

  nums.forEach((currentNumber) => {
    const existingFrequency = frequencyCounter.get(currentNumber) || 0;
    const updatedFrequency = existingFrequency + 1;
    frequencyCounter.set(currentNumber, updatedFrequency);
  });

  nums.sort((firstElement, secondElement) => {
    const frequencyOfFirst = frequencyCounter.get(firstElement);
    const frequencyOfSecond = frequencyCounter.get(secondElement);

    if (frequencyOfFirst === frequencyOfSecond) {
      return secondElement - firstElement;
    } else {
      return frequencyOfFirst - frequencyOfSecond;
    }
  });

  return nums;
};

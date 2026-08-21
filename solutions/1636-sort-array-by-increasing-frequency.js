/**
 * Sort Array By Increasing Frequency
 * Intuition: Count frequencies, then sort by ascending count and, on ties, descending value.
 * Approach: 1. Build a frequency map. 2. Sort nums with a comparator: freq(a)-freq(b), else b-a. 3. Return the mutated array.
 * Dry Run: [1,1,2,2,2,3] → freqs 1:2, 2:3, 3:1 → [3,1,1,2,2,2].
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

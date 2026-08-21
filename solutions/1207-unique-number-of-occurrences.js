/**
 * Unique Number Of Occurrences
 * Intuition: Frequencies are unique iff the number of distinct frequencies equals the number of distinct values.
 * Approach: 1. Count each value. 2. Put the counts in a Set. 3. Compare Set size to the number of keys.
 * Dry Run: arr = [1,2,2,1,1,3] → freqs 1:3, 2:2, 3:1 → three distinct counts → true.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var uniqueOccurrences = function (arr) {
  const frequencyMap = new Map();

  for (let elementIndex = 0; elementIndex < arr.length; elementIndex++) {
    const currentNumber = arr[elementIndex];
    const existingCount = frequencyMap.get(currentNumber) || 0;
    const updatedCount = existingCount + 1;
    frequencyMap.set(currentNumber, updatedCount);
  }

  const allFrequencies = Array.from(frequencyMap.values());
  const distinctFrequencySet = new Set(allFrequencies);

  const allFrequenciesSize = allFrequencies.length;
  const distinctFrequencySetSize = distinctFrequencySet.size;

  return allFrequenciesSize === distinctFrequencySetSize;
};

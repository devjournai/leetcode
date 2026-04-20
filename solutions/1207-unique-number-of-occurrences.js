/**
 * Unique Number Of Occurrences
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

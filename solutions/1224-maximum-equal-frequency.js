/**
 * Maximum Equal Frequency
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxEqualFreq = function (nums) {
  const numFrequency = new Map();
  const frequencyCount = new Map();
  let maxLength = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const currentValue = nums[currentIndex];
    const previousCount = numFrequency.get(currentValue) || 0;
    const currentCount = previousCount + 1;

    numFrequency.set(currentValue, currentCount);

    if (previousCount > 0) {
      frequencyCount.set(
        previousCount,
        (frequencyCount.get(previousCount) || 0) - 1,
      );
      if (frequencyCount.get(previousCount) === 0) {
        frequencyCount.delete(previousCount);
      }
    }
    frequencyCount.set(
      currentCount,
      (frequencyCount.get(currentCount) || 0) + 1,
    );

    const currentFreqMapSize = frequencyCount.size;

    if (currentFreqMapSize === 1) {
      const [[singleFrequency, frequencyInstances]] = frequencyCount.entries();
      if (singleFrequency === 1 || frequencyInstances === 1) {
        maxLength = currentIndex + 1;
      }
    } else if (currentFreqMapSize === 2) {
      const distinctFrequencies = [...frequencyCount.keys()].sort(
        (valA, valB) => valA - valB,
      );
      const lowerFrequency = distinctFrequencies[0];
      const higherFrequency = distinctFrequencies[1];

      const lowerFreqOccurrences = frequencyCount.get(lowerFrequency);
      const higherFreqOccurrences = frequencyCount.get(higherFrequency);

      if (lowerFrequency === 1 && lowerFreqOccurrences === 1) {
        maxLength = currentIndex + 1;
      } else if (
        higherFrequency === lowerFrequency + 1 &&
        higherFreqOccurrences === 1
      ) {
        maxLength = currentIndex + 1;
      }
    }
  }

  return maxLength;
};

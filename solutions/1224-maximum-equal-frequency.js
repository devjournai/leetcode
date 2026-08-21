/**
 * Maximum Equal Frequency
 * Intuition: After one deletion, remaining frequencies should all be equal: either one extra occurrence, or one unique element of frequency 1, or all frequencies 1.
 * Approach: 1. Maintain value→freq and freq→how-many-values. 2. After each prefix, if 1 distinct freq (all 1s or one value) or 2 freqs (a lone 1, or one value at max=min+1), record the prefix length.
 * Dry Run: nums=[2,2,1,1,5,3,3,5]. Prefix length 7 can be made equal-freq → 7.
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
        (frequencyCount.get(previousCount) || 0) - 1
      );
      if (frequencyCount.get(previousCount) === 0) {
        frequencyCount.delete(previousCount);
      }
    }
    frequencyCount.set(
      currentCount,
      (frequencyCount.get(currentCount) || 0) + 1
    );

    const currentFreqMapSize = frequencyCount.size;

    if (currentFreqMapSize === 1) {
      const [[singleFrequency, frequencyInstances]] = frequencyCount.entries();
      if (singleFrequency === 1 || frequencyInstances === 1) {
        maxLength = currentIndex + 1;
      }
    } else if (currentFreqMapSize === 2) {
      const distinctFrequencies = [...frequencyCount.keys()].sort(
        (valA, valB) => valA - valB
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

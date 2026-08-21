/**
 * Minimum Deletions To Make Character Frequencies Unique
 * Intuition: After counting, greedily lower any frequency that collides with an already used one until it is unique or zero.
 * Approach: 1. Count 26 letters. 2. Sort frequencies descending. 3. Keep a set of used frequencies. 4. While freq is in the set and > 0, decrement it (each step is a deletion). 5. Add the remaining freq if > 0.
 * Dry Run: "aaabbbcc" → freqs 3,3,2; second 3 becomes 1 after two deletions → 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minDeletions = function (s) {
  const alphabetFrequencies = new Array(26).fill(0);

  for (const charUnit of s) {
    const charCodeValue = charUnit.charCodeAt(0);
    const arrayIndexPosition = charCodeValue - 97;
    alphabetFrequencies[arrayIndexPosition]++;
  }

  alphabetFrequencies.sort((freqA, freqB) => freqB - freqA);

  let totalRequiredDeletions = 0;
  const existingFrequenciesSet = new Set();

  for (
    let currentFreqIndex = 0;
    currentFreqIndex < alphabetFrequencies.length;
    currentFreqIndex++
  ) {
    let currentCharacterFrequency = alphabetFrequencies[currentFreqIndex];

    if (currentCharacterFrequency === 0) {
      break;
    }

    while (
      existingFrequenciesSet.has(currentCharacterFrequency) &&
      currentCharacterFrequency > 0
    ) {
      currentCharacterFrequency--;
      totalRequiredDeletions++;
    }

    if (currentCharacterFrequency > 0) {
      existingFrequenciesSet.add(currentCharacterFrequency);
    }
  }

  return totalRequiredDeletions;
};

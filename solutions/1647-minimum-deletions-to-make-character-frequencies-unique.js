/**
 * Minimum Deletions To Make Character Frequencies Unique
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

/**
 * Minimum Deletions To Make String K Special
 * Intuition: The problem requires making character frequencies 'k-special', meaning the difference between any two frequencies is at most 'k'. This implies that if the minimum frequency is 'minF', then all other frequencies must fall within the range [minF, minF + k]. We can iterate through each distinct character frequency present in the string, treating it as the 'minF', and calculate the total deletions needed.
 * Approach: 1. Count the frequency of each character in the given word. 2. Filter out zero frequencies and store the non-zero frequencies in a list, then sort this list in ascending order. 3. Initialize minimum deletions to infinity. 4. Iterate through each frequency in the sorted list, considering it as the potential minimum allowed frequency ('currentMinFreq'). For each 'currentMinFreq': a. Calculate deletions for frequencies smaller than 'currentMinFreq': these must be deleted entirely. b. Calculate deletions for frequencies larger than 'currentMinFreq + k': these must be reduced to 'currentMinFreq + k'. c. Update the overall minimum deletions with the current total deletions. 5. Return the overall minimum deletions.
 * Dry Run: word = "aabcc", k = 1
 * 1. charFrequencies = [2, 1, 2, 0, ..., 0] (a:2, b:1, c:2)
 * 2. distinctFrequencies = [1, 2, 2] (sorted non-zero frequencies)
 * 3. overallMinDeletions = Infinity
 *
 * 4. Loop (firstPointer):
 *    - firstPointer = 0: currentMinAllowedFrequency = distinctFrequencies[0] = 1. currentIterationDeletions = 0.
 *      - Loop (secondPointer): No iterations (0 to -1).
 *      - Loop (thirdPointer): From 0 to 2. maxAllowedFrequency = 1 + 1 = 2.
 *        - thirdPointer = 0: currentFrequencyValue = 1. 1 <= 2. No deletions.
 *        - thirdPointer = 1: currentFrequencyValue = 2. 2 <= 2. No deletions.
 *        - thirdPointer = 2: currentFrequencyValue = 2. 2 <= 2. No deletions.
 *      - currentIterationDeletions = 0. overallMinDeletions = min(Infinity, 0) = 0.
 *
 *    - firstPointer = 1: currentMinAllowedFrequency = distinctFrequencies[1] = 2. currentIterationDeletions = 0.
 *      - Loop (secondPointer): From 0 to 0.
 *        - secondPointer = 0: currentIterationDeletions += distinctFrequencies[0] (1). currentIterationDeletions = 1.
 *      - Loop (thirdPointer): From 1 to 2. maxAllowedFrequency = 2 + 1 = 3.
 *        - thirdPointer = 1: currentFrequencyValue = 2. 2 <= 3. No deletions.
 *        - thirdPointer = 2: currentFrequencyValue = 2. 2 <= 3. No deletions.
 *      - currentIterationDeletions = 1. overallMinDeletions = min(0, 1) = 0.
 *
 *    - firstPointer = 2: currentMinAllowedFrequency = distinctFrequencies[2] = 2. currentIterationDeletions = 0.
 *      - Loop (secondPointer): From 0 to 1.
 *        - secondPointer = 0: currentIterationDeletions += distinctFrequencies[0] (1). currentIterationDeletions = 1.
 *        - secondPointer = 1: currentIterationDeletions += distinctFrequencies[1] (2). currentIterationDeletions = 3.
 *      - Loop (thirdPointer): From 2 to 2. maxAllowedFrequency = 2 + 1 = 3.
 *        - thirdPointer = 2: currentFrequencyValue = 2. 2 <= 3. No deletions.
 *      - currentIterationDeletions = 3. overallMinDeletions = min(0, 3) = 0.
 *
 * 5. Return 0.
 * Time Complexity: O(L + C^2)
 * Space Complexity: O(C)
 */
var minimumDeletions = function (word, k) {
  const charFrequencies = new Array(26).fill(0);

  for (const singleCharacter of word) {
    charFrequencies[singleCharacter.charCodeAt(0) - 97]++;
  }

  const distinctFrequencies = [];
  for (const frequencyItem of charFrequencies) {
    if (frequencyItem > 0) {
      distinctFrequencies.push(frequencyItem);
    }
  }

  distinctFrequencies.sort((valA, valB) => valA - valB);

  let overallMinDeletions = Infinity;

  for (
    let firstPointer = 0;
    firstPointer < distinctFrequencies.length;
    firstPointer++
  ) {
    let currentIterationDeletions = 0;
    const currentMinAllowedFrequency = distinctFrequencies[firstPointer];
    const maxAllowedFrequencyForCurrentMin = currentMinAllowedFrequency + k;

    for (let secondPointer = 0; secondPointer < firstPointer; secondPointer++) {
      currentIterationDeletions += distinctFrequencies[secondPointer];
    }

    for (
      let thirdPointer = firstPointer;
      thirdPointer < distinctFrequencies.length;
      thirdPointer++
    ) {
      const actualFrequencyValue = distinctFrequencies[thirdPointer];
      if (actualFrequencyValue > maxAllowedFrequencyForCurrentMin) {
        currentIterationDeletions +=
          actualFrequencyValue - maxAllowedFrequencyForCurrentMin;
      }
    }
    overallMinDeletions = Math.min(
      overallMinDeletions,
      currentIterationDeletions,
    );
  }

  return overallMinDeletions;
};

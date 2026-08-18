/**
 * Apply Operations To Make String Empty
 * Intuition: Each operation removes one occurrence of every distinct character present. The string right before the last operation contains the characters that were present for the maximum number of operations. These are precisely the characters that had the highest frequency in the original string. To reconstruct this string, we need to find these high-frequency characters while preserving their relative order from the original string, specifically considering their last appearances. Iterating backward through the original string allows us to pick the rightmost (and thus latest-appearing) instances of these maximum-frequency characters, ensuring their correct relative order in the final result.
 * Approach: 1. Count character frequencies and determine the maximum frequency. 2. Iterate backward through the original string, collecting characters whose frequency matches the maximum frequency.
 * Dry Run: inputString = "aabcbbca"
 * 1. Frequency Calculation:
 *    - Initialize characterFrequencyCounts = [0, ..., 0] (length 26), highestFrequencyValue = 0.
 *    - Loop through inputString:
 *      - 'a' (at index 0): characterFrequencyCounts[0] = 1, highestFrequencyValue = 1.
 *      - 'a' (at index 1): characterFrequencyCounts[0] = 2, highestFrequencyValue = 2.
 *      - 'b' (at index 2): characterFrequencyCounts[1] = 1, highestFrequencyValue = 2.
 *      - 'c' (at index 3): characterFrequencyCounts[2] = 1, highestFrequencyValue = 2.
 *      - 'b' (at index 4): characterFrequencyCounts[1] = 2, highestFrequencyValue = 2.
 *      - 'b' (at index 5): characterFrequencyCounts[1] = 3, highestFrequencyValue = 3.
 *      - 'c' (at index 6): characterFrequencyCounts[2] = 2, highestFrequencyValue = 3.
 *      - 'a' (at index 7): characterFrequencyCounts[0] = 3, highestFrequencyValue = 3.
 *    - After first pass: characterFrequencyCounts = ['a':3, 'b':3, 'c':2, ...], highestFrequencyValue = 3.
 * 2. Result Construction:
 *    - Initialize finalString = "".
 *    - Loop through inputString from positionIndex = 7 down to 0:
 *      - positionIndex = 7 (char = 'a'): alphabetPosition = 0. characterFrequencyCounts[0] (3) === highestFrequencyValue (3). Prepend 'a' to finalString -> "a". Decrement characterFrequencyCounts[0] to 2.
 *      - positionIndex = 6 (char = 'c'): alphabetPosition = 2. characterFrequencyCounts[2] (2) !== highestFrequencyValue (3). Skip.
 *      - positionIndex = 5 (char = 'b'): alphabetPosition = 1. characterFrequencyCounts[1] (3) === highestFrequencyValue (3). Prepend 'b' to finalString -> "ba". Decrement characterFrequencyCounts[1] to 2.
 *      - positionIndex = 4 (char = 'b'): alphabetPosition = 1. characterFrequencyCounts[1] (2) !== highestFrequencyValue (3). Skip.
 *      - positionIndex = 3 (char = 'c'): alphabetPosition = 2. characterFrequencyCounts[2] (2) !== highestFrequencyValue (3). Skip.
 *      - positionIndex = 2 (char = 'b'): alphabetPosition = 1. characterFrequencyCounts[1] (2) !== highestFrequencyValue (3). Skip.
 *      - positionIndex = 1 (char = 'a'): alphabetPosition = 0. characterFrequencyCounts[0] (2) !== highestFrequencyValue (3). Skip.
 *      - positionIndex = 0 (char = 'a'): alphabetPosition = 0. characterFrequencyCounts[0] (2) !== highestFrequencyValue (3). Skip.
 *    - Loop ends.
 *    - Return finalString = "ba".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lastNonEmptyString = function (s) {
  const characterFrequencyCounts = new Array(26).fill(0);
  let highestFrequencyValue = 0;

  for (const currentCharacter of s) {
    const charAlphabetIndex = currentCharacter.charCodeAt(0) - 97;
    characterFrequencyCounts[charAlphabetIndex]++;
    if (characterFrequencyCounts[charAlphabetIndex] > highestFrequencyValue) {
      highestFrequencyValue = characterFrequencyCounts[charAlphabetIndex];
    }
  }

  let finalString = "";
  for (let stringIndex = s.length - 1; stringIndex >= 0; stringIndex--) {
    const alphabetPosition = s.charCodeAt(stringIndex) - 97;
    if (characterFrequencyCounts[alphabetPosition] === highestFrequencyValue) {
      finalString = s[stringIndex] + finalString;
      characterFrequencyCounts[alphabetPosition]--;
    }
  }

  return finalString;
};

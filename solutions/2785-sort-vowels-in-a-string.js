/**
 * Sort Vowels In A String
 * Intuition: Consonants must retain their positions, while vowels need to be extracted, sorted, and then placed back into the string's original vowel positions in their new sorted order.
 * Approach: 1. Initialize a set to efficiently check for vowels (both cases). 2. Iterate through the input string to identify and collect all vowel characters into a separate list. 3. Sort this collected list of vowels in non-decreasing ASCII order. 4. Convert the input string into a mutable character array. 5. Iterate through this character array; if an element at the current index is a vowel, replace it with the next character from the sorted vowel list. 6. Join the characters in the modified array to form the final result string.
 * Dry Run: s = "lEetcOde"
 * 1. vowelSet = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}
 * 2. collectedVowels = []
 *    - 'l': consonant
 *    - 'E': vowel -> collectedVowels = ['E']
 *    - 'e': vowel -> collectedVowels = ['E', 'e']
 *    - 't': consonant
 *    - 'c': consonant
 *    - 'O': vowel -> collectedVowels = ['E', 'e', 'O']
 *    - 'd': consonant
 *    - 'e': vowel -> collectedVowels = ['E', 'e', 'O', 'e']
 * 3. collectedVowels.sort() -> ['E', 'O', 'e', 'e'] (ASCII values: E=69, O=79, e=101)
 * 4. outputChars = ['l', 'E', 'e', 't', 'c', 'O', 'd', 'e'] (from s)
 *    currentVowelIndex = 0
 * 5. Iterate outputChars:
 *    - index = 0, outputChars[0] = 'l' (consonant) -> no change
 *    - index = 1, outputChars[1] = 'E' (vowel) -> outputChars[1] = collectedVowels[0] = 'E', currentVowelIndex = 1
 *    - index = 2, outputChars[2] = 'e' (vowel) -> outputChars[2] = collectedVowels[1] = 'O', currentVowelIndex = 2
 *    - index = 3, outputChars[3] = 't' (consonant) -> no change
 *    - index = 4, outputChars[4] = 'c' (consonant) -> no change
 *    - index = 5, outputChars[5] = 'O' (vowel) -> outputChars[5] = collectedVowels[2] = 'e', currentVowelIndex = 3
 *    - index = 6, outputChars[6] = 'd' (consonant) -> no change
 *    - index = 7, outputChars[7] = 'e' (vowel) -> outputChars[7] = collectedVowels[3] = 'e', currentVowelIndex = 4
 *    Resulting outputChars = ['l', 'E', 'O', 't', 'c', 'e', 'd', 'e']
 * 6. outputChars.join('') -> "lEOtcede"
 * Time Complexity: O(N log K)
 * Space Complexity: O(N)
 */
var sortVowels = function (s) {
  const vowelChecker = new Set([
    "a",
    "e",
    "i",
    "o",
    "u",
    "A",
    "E",
    "I",
    "O",
    "U",
  ]);
  const foundVowels = [];

  for (const charItem of s) {
    if (vowelChecker.has(charItem)) {
      foundVowels.push(charItem);
    }
  }

  foundVowels.sort();

  const stringElements = [...s];
  let sortedVowelIndex = 0;

  for (let charPosition = 0; charPosition < s.length; charPosition++) {
    if (vowelChecker.has(s[charPosition])) {
      stringElements[charPosition] = foundVowels[sortedVowelIndex++];
    }
  }

  return stringElements.join("");
};

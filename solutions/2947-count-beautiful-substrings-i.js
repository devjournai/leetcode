/**
 * Count Beautiful Substrings I
 * Intuition: To identify all beautiful substrings, we must examine every possible contiguous substring within the given string. For each substring, we determine its vowel and consonant counts and then check if it satisfies the defined beauty criteria.
 * Approach: 1. Initialize a set of vowel characters for efficient lookup. 2. Initialize a counter for beautiful substrings to zero. 3. Iterate with an outer loop to define the starting position of each substring. 4. Within the outer loop, iterate with an inner loop to define the ending position, expanding the current substring character by character. 5. For each character added to the current substring, update its respective vowel or consonant count. 6. After updating counts, check if the current substring meets both conditions: equal vowel and consonant counts, and their product is divisible by k. 7. If both conditions are met, increment the beautiful substrings counter. 8. Return the final count.
 * Dry Run: s = "aba", k = 1
 *   - vowelCharacters = {'a', 'e', 'i', 'o', 'u'}
 *   - beautifulSubstringsCount = 0
 *   - stringLength = 3
 *
 *   - startingPosition = 0:
 *     - currentVowelTally = 0, currentConsonantTally = 0
 *     - endingPosition = 0: currentChar = 'a' (vowel)
 *       - currentVowelTally = 1, currentConsonantTally = 0. Conditions (1==0) false.
 *     - endingPosition = 1: currentChar = 'b' (consonant)
 *       - currentVowelTally = 1, currentConsonantTally = 1. Conditions (1==1) true, (1*1)%1 == 0 true.
 *       - beautifulSubstringsCount becomes 1. (Substring "ab")
 *     - endingPosition = 2: currentChar = 'a' (vowel)
 *       - currentVowelTally = 2, currentConsonantTally = 1. Conditions (2==1) false.
 *
 *   - startingPosition = 1:
 *     - currentVowelTally = 0, currentConsonantTally = 0
 *     - endingPosition = 1: currentChar = 'b' (consonant)
 *       - currentVowelTally = 0, currentConsonantTally = 1. Conditions (0==1) false.
 *     - endingPosition = 2: currentChar = 'a' (vowel)
 *       - currentVowelTally = 1, currentConsonantTally = 1. Conditions (1==1) true, (1*1)%1 == 0 true.
 *       - beautifulSubstringsCount becomes 2. (Substring "ba")
 *
 *   - startingPosition = 2:
 *     - currentVowelTally = 0, currentConsonantTally = 0
 *     - endingPosition = 2: currentChar = 'a' (vowel)
 *       - currentVowelTally = 1, currentConsonantTally = 0. Conditions (1==0) false.
 *
 *   - Final beautifulSubstringsCount = 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var beautifulSubstrings = function (s, k) {
  const vowelCharacters = new Set(["a", "e", "i", "o", "u"]);
  let beautifulSubstringsCount = 0;
  const stringLength = s.length;

  for (
    let startingPosition = 0;
    startingPosition < stringLength;
    startingPosition++
  ) {
    let currentVowelTally = 0;
    let currentConsonantTally = 0;

    for (
      let endingPosition = startingPosition;
      endingPosition < stringLength;
      endingPosition++
    ) {
      const currentChar = s[endingPosition];
      if (vowelCharacters.has(currentChar)) {
        currentVowelTally++;
      } else {
        currentConsonantTally++;
      }

      if (
        currentVowelTally === currentConsonantTally &&
        (currentVowelTally * currentConsonantTally) % k === 0
      ) {
        beautifulSubstringsCount++;
      }
    }
  }

  return beautifulSubstringsCount;
};

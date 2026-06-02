/**
 * Minimum Number Of Steps To Make Two Strings Anagram Ii
 * Intuition: To make two strings anagrams with minimum steps, we need to balance the character frequencies across both strings. For each character, we determine the maximum count it should have in the final anagram. The difference between this maximum count and the character's current count in each string represents the number of characters that need to be appended to that string. Summing these differences for all characters across both strings gives the total minimum steps. This can be efficiently calculated by tracking the net difference of character counts between the two input strings.
 * Approach: 1. Initialize an array to store the frequency difference for each character ('a' through 'z'). 2. Iterate through the first string, incrementing the count for each character in the frequency difference array. 3. Iterate through the second string, decrementing the count for each character in the frequency difference array. 4. After processing both strings, the absolute value of each entry in the frequency difference array represents the number of characters needed to be appended (either to the first or second string) for that specific character to balance the counts. Sum these absolute values to get the total minimum steps.
 * Dry Run: s = "bab", t = "aba"
 * 1. `charBaseCode` = 97 (ASCII for 'a').
 * 2. `characterCounts` = `[0, 0, ..., 0]` (26 elements).
 * 3. Process `s = "bab"`:
 *    - 'b': `firstCharIndex` = 1. `characterCounts[1]` becomes 1.
 *    - 'a': `firstCharIndex` = 0. `characterCounts[0]` becomes 1.
 *    - 'b': `firstCharIndex` = 1. `characterCounts[1]` becomes 2.
 *    `characterCounts` after `s`: `[1, 2, 0, ..., 0]` (a:1, b:2)
 * 4. Process `t = "aba"`:
 *    - 'a': `secondCharIndex` = 0. `characterCounts[0]` was 1, becomes 0.
 *    - 'b': `secondCharIndex` = 1. `characterCounts[1]` was 2, becomes 1.
 *    - 'a': `secondCharIndex` = 0. `characterCounts[0]` was 0, becomes -1.
 *    `characterCounts` after `t`: `[-1, 1, 0, ..., 0]` (a:-1, b:1)
 * 5. Calculate `totalModificationSteps`:
 *    `totalModificationSteps` = 0.
 *    - `currentCountEntry` = `characterCounts[0]` (-1). `totalModificationSteps` += `Math.abs(-1)` (1). `totalModificationSteps` = 1.
 *    - `currentCountEntry` = `characterCounts[1]` (1). `totalModificationSteps` += `Math.abs(1)` (1). `totalModificationSteps` = 2.
 *    - Other entries are 0, contributing 0.
 * 6. Return `totalModificationSteps` = 2.
 *    (Correct: 's' needs an 'a' (1 step), 't' needs a 'b' (1 step) to make both "baba")
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var minSteps = function (s, t) {
  const charBaseCode = "a".charCodeAt(0);
  const characterCounts = new Array(26).fill(0);

  for (const firstStringChar of s) {
    const firstCharIndex = firstStringChar.charCodeAt(0) - charBaseCode;
    characterCounts[firstCharIndex]++;
  }

  for (const secondStringChar of t) {
    const secondCharIndex = secondStringChar.charCodeAt(0) - charBaseCode;
    characterCounts[secondCharIndex]--;
  }

  let totalModificationSteps = 0;
  for (const currentCountEntry of characterCounts) {
    totalModificationSteps += Math.abs(currentCountEntry);
  }

  return totalModificationSteps;
};

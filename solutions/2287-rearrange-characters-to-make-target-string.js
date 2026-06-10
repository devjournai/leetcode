/**
 * Rearrange Characters To Make Target String
 * Intuition: To form multiple copies of the target string, the availability of each character in the source string must meet the cumulative requirement for that character across all copies. The maximum number of copies is limited by the character that is most scarce relative to its requirement in the target string.
 * Approach: 1. Create a frequency map for characters in the source string 's'. 2. Create another frequency map for characters in the target string 'target'. 3. Iterate through all possible lowercase English characters. For each character present in the target string, calculate how many full copies of the target string could be made based solely on the availability of that character in 's'. 4. The minimum of these calculated counts across all required characters will be the maximum number of target string copies achievable.
 * Dry Run: s = "iloveleetcode", target = "lc"
 * 1. `charFreqS` initialization: `new Array(26).fill(0)`
 *    Populating `charFreqS` from `s`:
 *    'i' -> `charFreqS[8]` = 1
 *    'l' -> `charFreqS[11]` = 1 -> 2
 *    'o' -> `charFreqS[14]` = 1 -> 2 -> 3
 *    'v' -> `charFreqS[21]` = 1
 *    'e' -> `charFreqS[4]` = 1 -> 2 -> 3 -> 4
 *    't' -> `charFreqS[19]` = 1
 *    'c' -> `charFreqS[2]` = 1
 *    'd' -> `charFreqS[3]` = 1
 *    Resulting `charFreqS`: ['c':1, 'd':1, 'e':4, 'i':1, 'l':2, 'o':3, 't':1, 'v':1] (others 0)
 *
 * 2. `charFreqTarget` initialization: `new Array(26).fill(0)`
 *    Populating `charFreqTarget` from `target`:
 *    'l' -> `charFreqTarget[11]` = 1
 *    'c' -> `charFreqTarget[2]` = 1
 *    Resulting `charFreqTarget`: ['c':1, 'l':1] (others 0)
 *
 * 3. `maxPossibleCopies` = `Infinity`
 *    Iterate `charIdx` from 0 to 25:
 *    - `charIdx = 2` (for 'c'):
 *      `targetRequiredCount` = `charFreqTarget[2]` = 1 ( > 0)
 *      `sourceAvailableCount` = `charFreqS[2]` = 1
 *      `currentLetterCopies` = `Math.floor(1 / 1)` = 1
 *      `maxPossibleCopies` = `Math.min(Infinity, 1)` = 1
 *    - `charIdx = 11` (for 'l'):
 *      `targetRequiredCount` = `charFreqTarget[11]` = 1 ( > 0)
 *      `sourceAvailableCount` = `charFreqS[11]` = 2
 *      `currentLetterCopies` = `Math.floor(2 / 1)` = 2
 *      `maxPossibleCopies` = `Math.min(1, 2)` = 1
 *    - Other `charIdx` values where `charFreqTarget[charIdx]` is 0 are skipped.
 *
 * 4. Return `maxPossibleCopies` = 1.
 * Time Complexity: O(S + T)
 * Space Complexity: O(1)
 */
var rearrangeCharacters = function (s, target) {
  const charCodeA = "a".charCodeAt(0);
  const sourceCharacterCounts = new Array(26).fill(0);
  const targetCharacterRequirements = new Array(26).fill(0);

  for (let currentSIndex = 0; currentSIndex < s.length; currentSIndex++) {
    const charValue = s[currentSIndex];
    const asciiPosition = charValue.charCodeAt(0) - charCodeA;
    sourceCharacterCounts[asciiPosition]++;
  }

  for (const targetLetter of target) {
    const charPosition = targetLetter.charCodeAt(0) - charCodeA;
    targetCharacterRequirements[charPosition]++;
  }

  let maximumPossibleCopies = Infinity;
  for (let charIndex = 0; charIndex < 26; charIndex++) {
    const requiredTargetCount = targetCharacterRequirements[charIndex];
    if (requiredTargetCount > 0) {
      const availableSourceCount = sourceCharacterCounts[charIndex];
      const potentialCopiesForChar = Math.floor(
        availableSourceCount / requiredTargetCount,
      );
      maximumPossibleCopies = Math.min(
        maximumPossibleCopies,
        potentialCopiesForChar,
      );
    }
  }

  return maximumPossibleCopies;
};

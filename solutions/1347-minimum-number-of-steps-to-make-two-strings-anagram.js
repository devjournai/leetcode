/**
 * Minimum Number Of Steps To Make Two Strings Anagram
 * Intuition: Steps equal how many letters in s are extra vs t (or missing in t). Count diffs over 26 letters.
 * Approach: 1. For each index increment s's letter and decrement t's. 2. Sum positive leftover counts. 3. Return that sum.
 * Dry Run: s="bab", t="aba". One extra b and missing a → 1 step.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSteps = function (s, t) {
  const alphabetSize = 26;
  const frequencyDifference = new Array(alphabetSize).fill(0);
  let cumulativeSteps = 0;

  let stringTraversalIndex = 0;
  const inputStringLength = s.length;

  while (stringTraversalIndex < inputStringLength) {
    const charCodeS = s.charCodeAt(stringTraversalIndex) - 97;
    const charCodeT = t.charCodeAt(stringTraversalIndex) - 97;

    frequencyDifference[charCodeS]++;
    frequencyDifference[charCodeT]--;

    stringTraversalIndex++;
  }

  for (const currentCharacterCount of frequencyDifference) {
    if (currentCharacterCount > 0) {
      cumulativeSteps += currentCharacterCount;
    }
  }

  return cumulativeSteps;
};

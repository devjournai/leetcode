/**
 * Count Substrings With Only One Distinct Letter
 * Intuition: A run of length L of the same letter contains L*(L+1)/2 single-letter substrings. Sum over runs.
 * Approach: 1. Two pointers over equal-character runs. 2. For a run of length L add L*(L+1)/2. 3. Jump the start to the end of the run.
 * Dry Run: s = "aaaba".
 *   - "aaa" contributes 6, "b" contributes 1, "a" contributes 1. Total 8.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countLetters = function (s) {
  let totalSubstrings = 0;
  let mainPointer = 0;

  while (mainPointer < s.length) {
    let characterValue = s[mainPointer];
    let currentRunCount = 0;
    let scanPointer = mainPointer;

    while (scanPointer < s.length && s[scanPointer] === characterValue) {
      currentRunCount++;
      scanPointer++;
    }

    totalSubstrings += (currentRunCount * (currentRunCount + 1)) / 2;

    mainPointer = scanPointer;
  }

  return totalSubstrings;
};

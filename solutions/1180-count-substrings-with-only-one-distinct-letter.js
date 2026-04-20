/**
 * Count Substrings With Only One Distinct Letter
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

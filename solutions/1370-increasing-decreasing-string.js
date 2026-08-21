/**
 * Increasing Decreasing String
 * Intuition: Use letter frequencies and repeatedly append unused letters in increasing then decreasing alphabetical order.
 * Approach: 1. Count 'a'..'z'. 2. While the result is shorter than s: scan 0→25 appending one of each remaining letter, then 25→0 the same way.
 * Dry Run: s = "aaaabbbbcccc".
 *   - Up: "abc", down: "cba", up: "abc", down: "cba". Result "abccbaabccba".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var sortString = function (s) {
  const alphabetFrequencies = new Array(26).fill(0);
  for (let characterIndex = 0; characterIndex < s.length; characterIndex++) {
    const charCode = s.charCodeAt(characterIndex);
    const alphabetPosition = charCode - 97;
    alphabetFrequencies[alphabetPosition]++;
  }

  let finalResult = "";
  while (finalResult.length < s.length) {
    for (
      let currentLetterCode = 0;
      currentLetterCode < 26;
      currentLetterCode++
    ) {
      if (alphabetFrequencies[currentLetterCode] > 0) {
        finalResult += String.fromCharCode(currentLetterCode + 97);
        alphabetFrequencies[currentLetterCode]--;
      }
    }
    for (
      let reverseLetterCode = 25;
      reverseLetterCode >= 0;
      reverseLetterCode--
    ) {
      if (alphabetFrequencies[reverseLetterCode] > 0) {
        finalResult += String.fromCharCode(reverseLetterCode + 97);
        alphabetFrequencies[reverseLetterCode]--;
      }
    }
  }

  return finalResult;
};

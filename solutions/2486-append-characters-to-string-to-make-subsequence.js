/**
 * Append Characters To String To Make Subsequence
 * Intuition: To minimize appended characters, maximize the prefix of 't' that can be formed as a subsequence from 's'. This is a classic two-pointer matching problem.
 * Approach: 1. Initialize two pointers, `stringScanIndex` for string 's' and `subsequenceMatchIndex` for string 't', both to zero. 2. Iterate `stringScanIndex` through 's'. 3. In each iteration, if the character `s[stringScanIndex]` matches `t[subsequenceMatchIndex]`, increment `subsequenceMatchIndex`, indicating a successful match for a character in 't'. 4. If `subsequenceMatchIndex` reaches the length of 't', it means all characters of 't' have been found as a subsequence in 's', so we can stop early. 5. After the loop, the value of `subsequenceMatchIndex` represents the length of the longest prefix of 't' that is a subsequence of 's'. 6. The minimum characters to append is `t.length - subsequenceMatchIndex`.
 * Dry Run: s = "abcde", t = "ace"
 *   - stringScanIndex = 0, subsequenceMatchIndex = 0, targetStringLength = 3
 *   - Loop (stringScanIndex = 0): `s[0]` ('a') === `t[0]` ('a'). Increment `subsequenceMatchIndex` to 1.
 *   - Loop (stringScanIndex = 1): `s[1]` ('b') !== `t[1]` ('c'). `subsequenceMatchIndex` remains 1.
 *   - Loop (stringScanIndex = 2): `s[2]` ('c') === `t[1]` ('c'). Increment `subsequenceMatchIndex` to 2.
 *   - Loop (stringScanIndex = 3): `s[3]` ('d') !== `t[2]` ('e'). `subsequenceMatchIndex` remains 2.
 *   - Loop (stringScanIndex = 4): `s[4]` ('e') === `t[2]` ('e'). Increment `subsequenceMatchIndex` to 3.
 *   - Loop ends (stringScanIndex becomes 5, which is not < s.length).
 *   - Return `targetStringLength` (3) - `subsequenceMatchIndex` (3) = 0.
 * Time Complexity: O(s.length + t.length)
 * Space Complexity: O(1)
 */
var appendCharacters = function (s, t) {
  let stringScanIndex = 0;
  let subsequenceMatchIndex = 0;
  let sourceStringLength = s.length;
  let targetStringLength = t.length;

  for (
    stringScanIndex = 0;
    stringScanIndex < sourceStringLength;
    stringScanIndex++
  ) {
    if (subsequenceMatchIndex === targetStringLength) {
      break;
    }
    if (s[stringScanIndex] === t[subsequenceMatchIndex]) {
      subsequenceMatchIndex++;
    }
  }

  return targetStringLength - subsequenceMatchIndex;
};

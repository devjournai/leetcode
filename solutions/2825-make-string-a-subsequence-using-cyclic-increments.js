/**
 * Make String A Subsequence Using Cyclic Increments
 * Intuition: To determine if stringB can be formed as a subsequence of stringA (with optional cyclic character increments), we can use a greedy two-pointer approach. We try to match each character of stringB sequentially by finding the earliest possible character in stringA that either matches directly or can become a match after a single cyclic increment ('z' to 'a', 'a' to 'b', etc.).
 * Approach: 1. Initialize two integer pointers: `scanIndexStr1` to traverse `str1` and `matchIndexStr2` to track the progress of matching `str2`.
 * 2. Store `str2.length` in a variable `str2TargetLength` for clarity and efficiency.
 * 3. Begin an iterative loop (a `for` loop in this case) that continues as long as `scanIndexStr1` is within the bounds of `str1` and `matchIndexStr2` has not yet reached `str2TargetLength`. The `scanIndexStr1` pointer is incremented automatically by the `for` loop in each iteration.
 * 4. Inside the loop, retrieve the ASCII code of `str1[scanIndexStr1]`. Calculate the ASCII code of its cyclically incremented version (e.g., 'a' -> 'b', 'z' -> 'a'). Convert this incremented ASCII code back to a character.
 * 5. Compare the current character `str1[scanIndexStr1]` with `str2[matchIndexStr2]`. If they match, or if the cyclically incremented version of `str1[scanIndexStr1]` matches `str2[matchIndexStr2]`, then `str2[matchIndexStr2]` has been found.
 * 6. If a match is found, increment `matchIndexStr2` to move to the next character required for `str2`.
 * 7. After the loop terminates, check if `matchIndexStr2` is equal to `str2TargetLength`. If true, it means all characters of `str2` were successfully found as a subsequence, so return `true`. Otherwise, return `false`.
 * Dry Run: str1 = "abc", str2 = "ad"
 * - Initialize `scanIndexStr1 = 0`, `matchIndexStr2 = 0`, `str2TargetLength = 2`.
 * - Loop (0 < 3 && 0 < 2):
 *   - `scanIndexStr1 = 0`, `str1[0] = 'a'`, `str2[0] = 'a'`.
 *   - `charOneAscii = 97`. `charOneNextAscii = 98` ('b'). `charOneModified = 'b'`.
 *   - ('a' === 'a') is true. `matchIndexStr2` becomes 1.
 *   - `scanIndexStr1` becomes 1.
 * - Loop (1 < 3 && 1 < 2):
 *   - `scanIndexStr1 = 1`, `str1[1] = 'b'`, `str2[1] = 'd'`.
 *   - `charOneAscii = 98`. `charOneNextAscii = 99` ('c'). `charOneModified = 'c'`.
 *   - ('b' === 'd') is false. ('c' === 'd') is false. No match.
 *   - `matchIndexStr2` remains 1.
 *   - `scanIndexStr1` becomes 2.
 * - Loop (2 < 3 && 1 < 2):
 *   - `scanIndexStr1 = 2`, `str1[2] = 'c'`, `str2[1] = 'd'`.
 *   - `charOneAscii = 99`. `charOneNextAscii = 100` ('d'). `charOneModified = 'd'`.
 *   - ('c' === 'd') is false. ('d' === 'd') is true. Match.
 *   - `matchIndexStr2` becomes 2.
 *   - `scanIndexStr1` becomes 3.
 * - Loop (3 < 3 && 2 < 2): Condition (false && false) is false. Loop terminates.
 * - Return `matchIndexStr2 === str2TargetLength` (2 === 2) which is `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var canMakeSubsequence = function (str1, str2) {
  let scanIndexStr1 = 0;
  let matchIndexStr2 = 0;
  const str2TargetLength = str2.length;

  for (
    scanIndexStr1 = 0;
    scanIndexStr1 < str1.length && matchIndexStr2 < str2TargetLength;
    scanIndexStr1++
  ) {
    const charOneAscii = str1.charCodeAt(scanIndexStr1);
    const charOneNextAscii = charOneAscii === 122 ? 97 : charOneAscii + 1;
    const charOneModified = String.fromCharCode(charOneNextAscii);

    if (
      str1[scanIndexStr1] === str2[matchIndexStr2] ||
      charOneModified === str2[matchIndexStr2]
    ) {
      matchIndexStr2++;
    }
  }

  return matchIndexStr2 === str2TargetLength;
};

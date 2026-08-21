/**
 * Find The Difference
 * Intuition: `t` is `s` plus one extra character, so XOR-ing every code point in both strings cancels pairs and leaves only the extra character in `xorAccumulator`.
 * Approach: 1. Start `xorAccumulator` at 0. 2. XOR `charCodeAt(0)` of every character in `s`. 3. XOR every character in `t` the same way. 4. Return `String.fromCharCode(xorAccumulator)`.
 * Dry Run: s = "abcd", t = "abcde".
 *   - s: 0^a^b^c^d.
 *   - t: that value ^a^b^c^d^e → only e remains. Return "e".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findTheDifference = function (s, t) {
  let xorAccumulator = 0;

  for (let currentSChar of s) {
    xorAccumulator ^= currentSChar.charCodeAt(0);
  }

  for (let currentTChar of t) {
    xorAccumulator ^= currentTChar.charCodeAt(0);
  }

  return String.fromCharCode(xorAccumulator);
};

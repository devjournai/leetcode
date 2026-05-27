/**
 * Count the Number of Special Characters II
 * Intuition: To determine if a character 'c' is special, we must satisfy two conditions: it appears both in lowercase and uppercase, and all its lowercase occurrences must precede its first uppercase occurrence. This implies we need to track the latest index of each lowercase letter and the earliest index of each uppercase letter.
 * Approach:
 * 1. Initialize two arrays, `lastLowerIndex` and `firstUpperIndex`, both of size 26 (one for each letter 'a' through 'z').
 *    - `lastLowerIndex[j]` will store the index of the last occurrence of the j-th lowercase letter. Initialize with -1 (indicating not seen).
 *    - `firstUpperIndex[j]` will store the index of the first occurrence of the j-th uppercase letter. Initialize with `Infinity` (indicating not seen).
 * 2. Iterate through the input string `word` from left to right, using an index `i`.
 *    a. Get the character `char = word[i]`.
 *    b. Determine if `char` is lowercase or uppercase. This can be done by comparing its character code to the known ranges for 'a'-'z' and 'A'-'Z'.
 *    c. If `char` is a lowercase letter:
 *       Calculate its 0-indexed position `j` (e.g., 'a' -> 0, 'b' -> 1).
 *       Update `lastLowerIndex[j] = i`. Since we iterate left-to-right, this will always store the latest index.
 *    d. If `char` is an uppercase letter:
 *       Calculate its 0-indexed position `j` (e.g., 'A' -> 0, 'B' -> 1).
 *       If `firstUpperIndex[j]` is still `Infinity`, it means this is the first time we've encountered this uppercase letter. Set `firstUpperIndex[j] = i`.
 * 3. Initialize a counter `specialCharCount = 0`.
 * 4. Iterate from `j = 0` to `25` (representing each letter 'a' through 'z').
 *    a. Check if `lastLowerIndex[j]` is not -1 (meaning the lowercase form exists in `word`).
 *    b. Check if `firstUpperIndex[j]` is not `Infinity` (meaning the uppercase form exists in `word`).
 *    c. If both of the above conditions are true, then check if `lastLowerIndex[j] < firstUpperIndex[j]`. This verifies that all lowercase occurrences appeared before the first uppercase occurrence.
 *    d. If all three conditions are true, increment `specialCharCount`.
 * 5. Return `specialCharCount`.
 * Dry Run: word = "aaAbcBC"
 * Initialize:
 *   `lastLowerIndex` = `[-1, -1, ..., -1]` (26 elements)
 *   `firstUpperIndex` = `[Infinity, Infinity, ..., Infinity]` (26 elements)
 *   `specialCharCount` = 0
 *
 * Loop through word:
 * - `i = 0`, `char = 'a'`: `idx = 0`. `lastLowerIndex[0] = 0`.
 * - `i = 1`, `char = 'a'`: `idx = 0`. `lastLowerIndex[0] = 1`.
 * - `i = 2`, `char = 'A'`: `idx = 0`. `firstUpperIndex[0]` is Infinity, so `firstUpperIndex[0] = 2`.
 * - `i = 3`, `char = 'b'`: `idx = 1`. `lastLowerIndex[1] = 3`.
 * - `i = 4`, `char = 'c'`: `idx = 2`. `lastLowerIndex[2] = 4`.
 * - `i = 5`, `char = 'B'`: `idx = 1`. `firstUpperIndex[1]` is Infinity, so `firstUpperIndex[1] = 5`.
 * - `i = 6`, `char = 'C'`: `idx = 2`. `firstUpperIndex[2]` is Infinity, so `firstUpperIndex[2] = 6`.
 *
 * After first pass:
 * `lastLowerIndex` = `[1, 3, 4, -1, ..., -1]`
 * `firstUpperIndex` = `[2, 5, 6, Infinity, ..., Infinity]`
 *
 * Loop 'a' through 'z' (j = 0 to 25):
 * - `j = 0` (for 'a'): `lastLowerIndex[0]` (1) != -1. `firstUpperIndex[0]` (2) != Infinity. `1 < 2` is true. `specialCharCount = 1`.
 * - `j = 1` (for 'b'): `lastLowerIndex[1]` (3) != -1. `firstUpperIndex[1]` (5) != Infinity. `3 < 5` is true. `specialCharCount = 2`.
 * - `j = 2` (for 'c'): `lastLowerIndex[2]` (4) != -1. `firstUpperIndex[2]` (6) != Infinity. `4 < 6` is true. `specialCharCount = 3`.
 * - `j = 3` to `25`: `lastLowerIndex[j]` is -1, so conditions are not met.
 *
 * Return `specialCharCount = 3`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSpecialChars = function (word) {
  const lastLowerIndex = Array(26).fill(-1);
  const firstUpperIndex = Array(26).fill(Infinity);

  const aCharCode = "a".charCodeAt(0);
  const ACharCode = "A".charCodeAt(0);

  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i);

    if (charCode >= aCharCode && charCode <= aCharCode + 25) {
      const idx = charCode - aCharCode;
      lastLowerIndex[idx] = i;
    } else if (charCode >= ACharCode && charCode <= ACharCode + 25) {
      const idx = charCode - ACharCode;
      if (firstUpperIndex[idx] === Infinity) {
        firstUpperIndex[idx] = i;
      }
    }
  }

  let specialCharCount = 0;
  for (let j = 0; j < 26; j++) {
    if (lastLowerIndex[j] !== -1 && firstUpperIndex[j] !== Infinity) {
      if (lastLowerIndex[j] < firstUpperIndex[j]) {
        specialCharCount++;
      }
    }
  }

  return specialCharCount;
};

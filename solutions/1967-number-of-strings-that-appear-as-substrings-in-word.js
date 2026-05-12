/**
 * Number Of Strings That Appear As Substrings In Word
 * Intuition: The problem requires checking if each string from a given list exists as a substring within a larger word. Javascript's `String.prototype.includes()` method provides a direct and efficient way to perform this check.
 * Approach: 1. Initialize a counter variable to keep track of the number of matching substrings. 2. Iterate through each string in the `patterns` array. 3. For each pattern, use `word.includes(pattern)` to determine if it is present in `word`. 4. If `word.includes(pattern)` returns `true`, increment the counter. 5. After checking all patterns, return the final value of the counter.
 * Dry Run: patterns = ["a", "abc", "bc", "d"], word = "abc"
 * 1. `countFound = 0`
 * 2. Loop through `patterns`:
 *    - `currentPattern = "a"`: `word.includes("a")` is `true`. `countFound` becomes `1`.
 *    - `currentPattern = "abc"`: `word.includes("abc")` is `true`. `countFound` becomes `2`.
 *    - `currentPattern = "bc"`: `word.includes("bc")` is `true`. `countFound` becomes `3`.
 *    - `currentPattern = "d"`: `word.includes("d")` is `false`. `countFound` remains `3`.
 * 3. Loop finishes.
 * 4. Return `countFound` (which is `3`).
 * Time Complexity: O(N * L_word * L_max_pattern)
 * Space Complexity: O(1)
 */
var numOfStrings = function (patterns, word) {
  let countFound = 0;

  for (const currentPattern of patterns) {
    if (word.includes(currentPattern)) {
      countFound++;
    }
  }

  return countFound;
};

/**
 * Find Special Substring of Length K
 * Intuition: A special substring is a run of the same character whose length is exactly `k` (not longer, so neighbors differ or we hit the ends).
 * Approach: 1. Walk `s` and count consecutive equal characters. 2. When the character changes, if the finished run length equals `k`, return true. 3. After the loop, check the final run.
 * Dry Run: s = "aaabaaa", k = 3. Runs: "aaa" (3) → true. s = "abc", k = 2. Runs of 1 → false.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var hasSpecialSubstring = function (s, k) {
  let runLength = 1;

  for (let index = 1; index < s.length; index++) {
    if (s[index] === s[index - 1]) {
      runLength++;
    } else if (runLength === k) {
      return true;
    } else {
      runLength = 1;
    }
  }

  return runLength === k;
};

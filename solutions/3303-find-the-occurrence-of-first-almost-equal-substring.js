/**
 * Find the Occurrence of First Almost Equal Substring
 * Intuition: A window of `pattern` is almost equal if prefix and suffix matches together cover all but at most one index. Z-function on `pattern+s` and on the reversed pair gives those match lengths in linear time.
 * Approach: 1. Build z1 = Z(pattern + s) and z2 = Z(reversed(pattern) + reversed(s)). 2. For each start i, prefix match is z1[pattern.length + i] and suffix match is z2[s.length - i]. 3. If their sum is at least pattern.length - 1, return i. 4. Otherwise return -1.
 * Dry Run: s = "abcdefg", pattern = "bcdffg"
 *   - Window i=1 "bcdefg": prefix "bcd" and suffix "fg" cover 5 of 6 chars (one mismatch at 'e' vs 'f') → return 1
 * Time Complexity: O(|s| + |pattern|)
 * Space Complexity: O(|s| + |pattern|)
 */
var minStartingIndex = function (s, pattern) {
  const zFunction = (str) => {
    const n = str.length;
    const z = Array(n).fill(0);
    let l = 0;
    let r = 0;
    for (let i = 1; i < n; i++) {
      if (i < r) {
        z[i] = Math.min(r - i, z[i - l]);
      }
      while (i + z[i] < n && str[z[i]] === str[i + z[i]]) {
        z[i]++;
      }
      if (i + z[i] > r) {
        l = i;
        r = i + z[i];
      }
    }
    return z;
  };

  const reverse = (str) => str.split("").reverse().join("");
  const z1 = zFunction(pattern + s);
  const z2 = zFunction(reverse(pattern) + reverse(s));

  for (let i = 0; i <= s.length - pattern.length; i++) {
    if (z1[pattern.length + i] + z2[s.length - i] >= pattern.length - 1) {
      return i;
    }
  }

  return -1;
};

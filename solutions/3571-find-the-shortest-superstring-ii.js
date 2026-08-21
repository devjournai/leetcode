/**
 * Find the Shortest Superstring II
 * Intuition: The shortest string containing both s1 and s2 as substrings is whichever string contains the other, otherwise the concatenation with the largest prefix/suffix overlap.
 * Approach: 1. If one string contains the other, return the longer. 2. Compute max overlap of suffix(s1)/prefix(s2) and suffix(s2)/prefix(s1). 3. Return the shorter merge.
 * Dry Run: s1 = "aba", s2 = "bab". Overlap 2 both ways: "abab" and "baba", length 4. Return either, e.g. "abab".
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var shortestSuperstring = function (s1, s2) {
  const overlap = (a, b) => {
    const max = Math.min(a.length, b.length);
    for (let len = max; len > 0; len--) {
      if (a.slice(-len) === b.slice(0, len)) {
        return len;
      }
    }
    return 0;
  };

  if (s1.includes(s2)) {
    return s1;
  }
  if (s2.includes(s1)) {
    return s2;
  }

  const left = s1 + s2.slice(overlap(s1, s2));
  const right = s2 + s1.slice(overlap(s2, s1));
  return left.length <= right.length ? left : right;
};

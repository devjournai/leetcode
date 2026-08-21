/**
 * Lexicographically Smallest String After Reverse
 * Intuition: One reverse of a prefix or suffix is allowed. Trying every length k and keeping the min of reverse(prefix k) and reverse(suffix k) covers the search space.
 * Approach: For k = 1..n compare s, reverse(s[0..k)) + s[k..], and s[0..n-k] + reverse(s[n-k..]).
 * Dry Run: The best among all those candidates is the answer.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var lexSmallest = function (s) {
  let smallest = s;
  const n = s.length;
  for (let k = 1; k <= n; k++) {
    const prefixReversed =
      s.slice(0, k).split("").reverse().join("") + s.slice(k);
    const suffixReversed =
      s.slice(0, n - k) +
      s
        .slice(n - k)
        .split("")
        .reverse()
        .join("");
    if (prefixReversed < smallest) {
      smallest = prefixReversed;
    }
    if (suffixReversed < smallest) {
      smallest = suffixReversed;
    }
  }
  return smallest;
};

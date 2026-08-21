/**
 * Minimum Flips to Make Binary String Coherent
 * Intuition: Forbidden subsequences 011 and 110 mean the string may be all 0s, all 1s, contain exactly one 1, or match 10*1.
 * Approach: 1. Cost to all-0 / all-1. 2. Cost to keep exactly one 1. 3. Cost to 1 + zeros + 1. 4. Return the min.
 * Dry Run: Input: s = 1010. Output: 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minFlips = function (s) {
  const n = s.length;
  let ones = 0;
  for (const c of s) if (c === "1") ones++;
  let ans = Math.min(ones, n - ones);
  for (let i = 0; i < n; i++) {
    ans = Math.min(ans, ones - (s[i] === "1" ? 1 : 0) + (s[i] === "0" ? 1 : 0));
  }
  if (n >= 2) {
    let midOnes = ones - (s[0] === "1") - (s[n - 1] === "1");
    ans = Math.min(
      ans,
      (s[0] === "1" ? 0 : 1) + (s[n - 1] === "1" ? 0 : 1) + midOnes
    );
  }
  return ans;
};

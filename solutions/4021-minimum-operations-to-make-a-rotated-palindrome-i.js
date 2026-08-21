/**
 * Minimum Operations to Make a Rotated Palindrome I
 * Intuition: We enumerate the number of left rotations k (0 leq k < n), which costs k operations. After k left rotations, index i in the new string corresponds to index (i + k) bmod n in the original string.
 * Approach: We enumerate the number of left rotations k (0 leq k < n), which costs k operations. After k left rotations, index i in the new string corresponds to index (i + k) bmod n in the original string. For each pair of symmetric positions, we need to make the two characters the same by increment operations. Since we can only increment forward ('z' wraps to 'a'), the minimum number of increments to make two letters equal is the shorter arc length on the letter ring, i.e., min(d, 26 - d), where d is the absolute difference of their letter indices. The optimal target letter is always one of the two letters. We take the minimum over all k.
 * Dry Run: Input: s = "abc". Output: 2.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var minOperations = function (s) {
  const n = s.length;
  let ans = Infinity;

  for (let k = 0; k < n; k++) {
    let t = k;
    let i = 0;
    let j = n - 1;

    while (i < j) {
      const x = s.charCodeAt((i + k) % n) - 97;
      const y = s.charCodeAt((j + k) % n) - 97;

      const d = Math.abs(x - y);
      t += Math.min(d, 26 - d);

      i++;
      j--;
    }

    ans = Math.min(ans, t);
  }

  return ans;
};

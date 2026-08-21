/**
 * Lexicographically Smallest Negated Permutation that Sums to Target
 * Intuition: Absolute values must be 1..n, so the sum S = n(n+1)/2 and target have the same parity (each sign flip of x changes the sum by -2x). To be lex-smallest, place the largest unused magnitude as a negative as far left as possible.
 * Approach: 1. If |target| > S or (target-S) is odd, return []. 2. Greedily from n down to 1: put -i on the left if the remaining numbers can still reach target after that choice; otherwise put +i on the right.
 * Dry Run: n = 3, target = 0. S = 6. Place -3 first (remaining can make 3), then +1 and +2 on the right -> [-3,1,2].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var lexSmallestNegatedPerm = function (n, target) {
  const count = (x) => ((x + 1) * x) / 2;
  const total = count(n);
  if (Math.abs(target) > total || (target - total) % 2 !== 0) {
    return [];
  }
  const result = Array(n).fill(0);
  let left = 0;
  let right = n - 1;
  for (let i = n; i >= 1; i--) {
    if (target - -i <= count(i - 1)) {
      target -= -i;
      result[left++] = -i;
    } else {
      target -= i;
      result[right--] = i;
    }
  }
  return result;
};

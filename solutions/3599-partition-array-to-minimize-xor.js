/**
 * Partition Array to Minimize XOR
 * Intuition: Split into exactly k non-empty contiguous parts, minimizing the maximum XOR of any part. Prefix XOR plus DP over last-cut positions.
 * Approach: 1. g[i] = XOR of the first i elements. 2. f[i][j] = min possible max-xor using j parts on prefix i. 3. f[i][j] = min over h of max(f[h][j-1], g[i]^g[h]).
 * Dry Run: nums = [1, 2, 3], k = 2. Split [1]|[2,3] → max(1,1)=1. Best 1.
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N * K)
 */
var minXor = function (nums, k) {
  const n = nums.length;
  const g = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    g[i] = g[i - 1] ^ nums[i - 1];
  }

  const INF = Number.MAX_SAFE_INTEGER;
  const f = Array.from({ length: n + 1 }, () => Array(k + 1).fill(INF));
  f[0][0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      for (let h = j - 1; h < i; h++) {
        f[i][j] = Math.min(f[i][j], Math.max(f[h][j - 1], g[i] ^ g[h]));
      }
    }
  }

  return f[n][k];
};

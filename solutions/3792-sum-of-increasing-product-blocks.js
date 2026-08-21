/**
 * Sum of Increasing Product Blocks
 * Intuition: We can directly simulate the product of each block and accumulate it to the answer. Note that since the product can be very large, we need to take the modulo at each step of the calculation.
 * Approach: The time complexity is O(n^2), and the space complexity is O(1).
 * Dry Run: Input n = 3. Output 127.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var sumOfBlocks = function (n) {
  const mod = 1000000007;
  let k = 1;
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    let x = 1;
    for (let j = k; j < k + i; j++) {
      x = (x * j) % mod;
    }
    ans = (ans + x) % mod;
    k += i;
  }
  return ans;
};

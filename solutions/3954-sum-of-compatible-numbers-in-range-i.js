/**
 * Sum of Compatible Numbers in Range I
 * Intuition: We iterate through x within the range [max(1, n - k), n + k]. If the bitwise AND result of n and x is 0, we accumulate x into the answer.
 * Approach: We iterate through x within the range [max(1, n - k), n + k]. If the bitwise AND result of n and x is 0, we accumulate x into the answer. After the iteration ends, simply return the answer.
 * Dry Run: Input: n = 2, k = 3. Output: 10.
 * Time Complexity: O(k)
 * Space Complexity: O(1)
 */
var sumOfGoodIntegers = function (n, k) {
  let ans = 0;
  const start = Math.max(1, n - k);
  const end = n + k;
  for (let x = start; x <= end; x++) {
    if ((n & x) === 0) {
      ans += x;
    }
  }
  return ans;
};

/**
 * Smallest All-Ones Multiple
 * Intuition: First, if k is even, there is no valid n that satisfies the condition, so we directly return -1.
 * Approach: Next, we can simulate the process of constructing an all-ones number n while taking the modulo with k to determine whether a valid n exists. We loop k times to check whether there exists an all-ones number n divisible by k within these k iterations. In each iteration, we multiply the current remainder by 10, add 1, and then take the modulo with k. If the remainder becomes 0 in some iteration, it means we have found a valid n, and we return the current iteration count (i.e., the number of digits in the all-ones number). If no valid n is found after the loop ends, we return -1. The time complexity is O(k), and the space complexity is O(1).
 * Dry Run: Input k = 3. Output 3.
 * Time Complexity: O(k)
 * Space Complexity: O(1)
 */
var minAllOneMultiple = function (k) {
  if ((k & 1) === 0) {
    return -1;
  }

  let x = 1 % k;
  let ans = 1;

  for (let i = 0; i < k; i++) {
    x = (x * 10 + 1) % k;
    ans++;
    if (x === 0) {
      return ans;
    }
  }

  return -1;
};

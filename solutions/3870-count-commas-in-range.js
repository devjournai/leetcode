/**
 * Count Commas in Range
 * Intuition: Numbers from 1 to 999 contain no commas, so when $n$ is less than or equal to 999, the answer is 0. Since the range of $n$ is $[1, 10^5]$, when $n$ is greater than or equal to 1000, each number contains exactly one comma, so the answer is $n - 999$. Therefore, the answer is $\max(0, n - 999)$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Approach: Numbers from 1 to 999 contain no commas, so when $n$ is less than or equal to 999, the answer is 0. Since the range of $n$ is $[1, 10^5]$, when $n$ is greater than or equal to 1000, each number contains exactly one comma, so the answer is $n - 999$. Therefore, the answer is $\max(0, n - 999)$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Dry Run: Input: n = 1002 => Output: 3
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var countCommas = function (n) {
  return Math.max(0, n - 999);
};

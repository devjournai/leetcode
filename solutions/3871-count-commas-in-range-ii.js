/**
 * Count Commas in Range II
 * Intuition: Based on the problem description, we can observe the following pattern: - Numbers in the range [1, 999] contain no commas; - Numbers in the range [1,000, 999,999] contain one comma; - Numbers in the range [1,000,000, 999,999,999] contain two commas; - And so on. Therefore, we can start from $x = 1000$ and multiply $x$ by 1000 each time until $x$ exceeds $n$. In each iteration, there are $n - x + 1$ numbers that newly gain one comma, and we accumulate their count into the answer. The time complexity is $O(\log n)$, and the space complexity is $O(1)$.
 * Approach: Based on the problem description, we can observe the following pattern: - Numbers in the range [1, 999] contain no commas; - Numbers in the range [1,000, 999,999] contain one comma; - Numbers in the range [1,000,000, 999,999,999] contain two commas; - And so on. Therefore, we can start from $x = 1000$ and multiply $x$ by 1000 each time until $x$ exceeds $n$. In each iteration, there are $n - x + 1$ numbers that newly gain one comma, and we accumulate their count into the answer. The time complexity is $O(\log n)$, and the space complexity is $O(1)$.
 * Dry Run: Input: n = 1002 => Output: 3
 * Time Complexity: O(O(log n))
 * Space Complexity: O(O(1))
 */
var countCommas = function (n) {
  let ans = 0;
  for (let x = 1000; x <= n; x *= 1000) {
    ans += n - x + 1;
  }
  return ans;
};

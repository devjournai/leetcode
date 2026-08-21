/**
 * Count Monobit Integers
 * Intuition: According to the problem description, a Monobit integer is either $0$, or its binary representation consists of all $1$s. Therefore, we first include $0$ in the answer, then starting from $1$, we sequentially generate integers whose binary representations consist of all $1$s, until the integer exceeds $n$. The time complexity is $O(\log n)$ and the space complexity is $O(1)$.
 * Approach: According to the problem description, a Monobit integer is either $0$, or its binary representation consists of all $1$s. Therefore, we first include $0$ in the answer, then starting from $1$, we sequentially generate integers whose binary representations consist of all $1$s, until the integer exceeds $n$. The time complexity is $O(\log n)$ and the space complexity is $O(1)$.
 * Dry Run: Input: n = 1 => Output: 2
 * Time Complexity: O(O(log n))
 * Space Complexity: O(O(1))
 */
var countMonobit = function (n) {
  let ans = 1;
  for (let i = 1, x = 1; x <= n; ++i) {
    ++ans;
    x += 1 << i;
  }
  return ans;
};

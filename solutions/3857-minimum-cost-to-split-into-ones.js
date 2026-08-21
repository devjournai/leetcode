/**
 * Minimum Cost to Split into Ones
 * Intuition: To minimize the total cost, we first split $n$ into $1$ and $n-1$, with a cost of $1 \cdot (n-1) = n-1$. Next, we split $n-1$ into $1$ and $n-2$, with a cost of $1 \cdot (n-2) = n-2$. We continue this process until we split $2$ into $1$ and $1$, with a cost of $1 \cdot 1 = 1$. Therefore, the total cost is $(n-1) + (n-2) + \ldots + 2 + 1 = \frac{n(n-1)}{2}$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Approach: To minimize the total cost, we first split $n$ into $1$ and $n-1$, with a cost of $1 \cdot (n-1) = n-1$. Next, we split $n-1$ into $1$ and $n-2$, with a cost of $1 \cdot (n-2) = n-2$. We continue this process until we split $2$ into $1$ and $1$, with a cost of $1 \cdot 1 = 1$. Therefore, the total cost is $(n-1) + (n-2) + \ldots + 2 + 1 = \frac{n(n-1)}{2}$. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Dry Run: Input: n = 3 => Output: 3
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var minCost = function (n) {
  return (n * (n - 1)) >> 1;
};

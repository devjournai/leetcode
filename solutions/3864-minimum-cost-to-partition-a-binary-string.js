/**
 * Minimum Cost to Partition a Binary String
 * Intuition: We define a function $\text{dfs}(l, r)$ that represents the minimum cost for the interval $[l, r)$ of string $s$. We can use the prefix sum array $\text{pre}$ to calculate the number of sensitive elements $x$ in the interval $[l, r)$, thereby computing the cost without splitting. The calculation process of function $\text{dfs}(l, r)$ is as follows: 1. Calculate the number of sensitive elements $x$ in the interval $[l, r)$. 2. Calculate the cost without splitting: if $x > 0$, the cost is $(r - l) \cdot x \cdot \text{encCost}$; if $x = 0$, the cost is $\text{flatCost}$. 3. If the interval length is even, we can try to split it into two consecutive segments of equal length, and calculate the cost after splitting as $\text{dfs}(l, m) + \text{dfs}(m, r)$, where $m = \frac{l + r}{2}$. Finally, return the smaller of the two values. The answer is $\text{dfs}(0, n)$, where $n$ is the length of st...
 * Approach: We define a function $\text{dfs}(l, r)$ that represents the minimum cost for the interval $[l, r)$ of string $s$. We can use the prefix sum array $\text{pre}$ to calculate the number of sensitive elements $x$ in the interval $[l, r)$, thereby computing the cost without splitting. The calculation process of function $\text{dfs}(l, r)$ is as follows: 1. Calculate the number of sensitive elements $x$ in the interval $[l, r)$. 2. Calculate the cost without splitting: if $x > 0$, the cost is $(r - l) \cdot x \cdot \text{encCost}$; if $x = 0$, the cost is $\text{flatCost}$. 3. If the interval length is even, we can try to split it into two consecutive segments of equal length, and calculate the cost after splitting as $\text{dfs}(l, m) + \text{dfs}(m, r)$, where $m = \frac{l + r}{2}$. Finally, return the smaller of the two values. The answer is $\text{dfs}(0, n)$, where $n$ is the length of st...
 * Dry Run: Input: s = &quot;1010&quot;, encCost = 2, flatCost = 1 => Output: 6
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var minCost = function (s, encCost, flatCost) {
    const n = s.length;
    const pre = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        pre[i] = pre[i - 1] + Number(s[i - 1]);
    }

    const dfs = (l, r) => {
        const x = pre[r] - pre[l];
        let res = x ? (r - l) * x * encCost ;

        if ((r - l) % 2 === 0) {
            const m = (l + r) >> 1;
            res = Math.min(res, dfs(l, m) + dfs(m, r));
        }

        return res;
    };

    return dfs(0, n);
}

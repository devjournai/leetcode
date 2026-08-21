/**
 * Count Sequences to K
 * Intuition: We define a function $\text{dfs}(i, p, q)$ that represents the number of different choice sequences when processing at index $i$ with the current rational value being $\frac{p}{q}$. Initially, $\text{dfs}(0, 1, 1)$ represents starting from the initial value of $1$. For each index $i$, we have three choices: 1. Keep it unchanged, i.e., $\text{dfs}(i + 1, p, q)$. 2. Multiply by $nums[i]$, i.e., $\text{dfs}(i + 1, p \cdot nums[i], q)$. 3. Divide by $nums[i]$, i.e., $\text{dfs}(i + 1, p, q \cdot nums[i])$. To avoid excessively large numbers, we simplify the numerator and denominator after each multiplication or division. Finally, when $i$ equals $n$, if $\frac{p}{q}$ exactly equals $k$, we return $1$; otherwise, we return $0$. The time complexity is $O(n^4 + \log k)$, and the space complexity is $O(n^4)$, where $n$ is the length of the array $\textit{nums}$.
 * Approach: We define a function $\text{dfs}(i, p, q)$ that represents the number of different choice sequences when processing at index $i$ with the current rational value being $\frac{p}{q}$. Initially, $\text{dfs}(0, 1, 1)$ represents starting from the initial value of $1$. For each index $i$, we have three choices: 1. Keep it unchanged, i.e., $\text{dfs}(i + 1, p, q)$. 2. Multiply by $nums[i]$, i.e., $\text{dfs}(i + 1, p \cdot nums[i], q)$. 3. Divide by $nums[i]$, i.e., $\text{dfs}(i + 1, p, q \cdot nums[i])$. To avoid excessively large numbers, we simplify the numerator and denominator after each multiplication or division. Finally, when $i$ equals $n$, if $\frac{p}{q}$ exactly equals $k$, we return $1$; otherwise, we return $0$. The time complexity is $O(n^4 + \log k)$, and the space complexity is $O(n^4)$, where $n$ is the length of the array $\textit{nums}$.
 * Dry Run: Input: nums = [2,3,2], k = 6 => Output: 2
 * Time Complexity: O(O(n^4 + log k))
 * Space Complexity: O(O(n^4))
 */
var countSequences = function (nums, k) {
  const n = nums.length;
  const f = new Map();

  function gcd(a, b) {
    while (b !== 0) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a;
  }

  function dfs(i, p, q) {
    if (i === n) {
      return p === k && q === 1 ? 1 : 0;
    }

    const key = `${i},${p},${q}`;
    if (f.has(key)) return f.get(key);

    let res = dfs(i + 1, p, q);

    const x = nums[i];

    const g1 = gcd(p * x, q);
    res += dfs(i + 1, (p * x) / g1, q / g1);

    const g2 = gcd(p, q * x);
    res += dfs(i + 1, p / g2, (q * x) / g2);

    f.set(key, res);
    return res;
  }

  return dfs(0, 1, 1);
};

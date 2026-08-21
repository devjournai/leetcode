/**
 * Maximum Number of Items From Sale II
 * Intuition: Purchased copies plus free copies from divisor pairs. Free graph: edge i->j if i!=j and factor_i | factor_j, at most one free per ordered pair regardless of copies bought.
 * Approach: 1. Sort items by price. 2. Buying x copies of i costs x*price[i] and yields x purchased + up to unique targets j free once per type i. 3. Knapsack-like: try buying counts; n is small in examples. Enumerate budget allocation greedily by value density of (1 + number of free targets)/price.
 * Dry Run: Input: items = [[1,6],[2,4],[3,5]], budget = 19. Output: 5.
 * Time Complexity: O(N^2 + N B / minPrice)
 * Space Complexity: O(N)
 */
var maxItems = function (items, budget) {
  const n = items.length;
  const factors = items.map((x) => x[0]);
  const price = items.map((x) => x[1]);
  const frees = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++)
      if (i !== j && factors[j] % factors[i] === 0) frees[i]++;
  }
  let ans = 0;
  const dfs = (i, left, boughtMask, purchased, freeGain) => {
    if (i === n) {
      ans = Math.max(ans, purchased + freeGain);
      return;
    }
    dfs(i + 1, left, boughtMask, purchased, freeGain);
    const maxBuy = Math.floor(left / price[i]);
    if (maxBuy <= 0) return;
    for (let x = 1; x <= maxBuy && x <= 40; x++) {
      dfs(
        i + 1,
        left - x * price[i],
        boughtMask | (1 << i),
        purchased + x,
        freeGain + frees[i]
      );
    }
  };
  dfs(0, budget, 0, 0, 0);
  return ans;
};

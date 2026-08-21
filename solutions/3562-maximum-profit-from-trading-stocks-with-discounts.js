/**
 * Maximum Profit from Trading Stocks with Discounts
 * Intuition: The company is a tree. Buying a manager at a discount for children (half price) if the parent also buys. Tree DP knapsacks merge children's budgets; each node has buy/not-buy under a parent-discount flag.
 * Approach: 1. Build the tree from hierarchy (1-indexed boss). 2. dfs(u) returns f[budget][parentBought]. 3. Merge children knapsacks, then decide whether to buy u at full or half cost, which unlocks the discounted child table. 4. Answer dfs(1)[budget][0].
 * Dry Run: n = 2, present = [1,2], future = [4,3], hierarchy = [[1,2]], budget = 3. Buy both (2 gets half cost 1): profit (4-1)+(3-1)=5.
 * Time Complexity: O(N * Budget^2)
 * Space Complexity: O(N * Budget)
 */
var maxProfit = function (n, present, future, hierarchy, budget) {
  const children = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of hierarchy) {
    children[u].push(v);
  }

  const merge = (dpA, dpB) => {
    const size = dpA.length;
    const merged = Array.from({ length: size }, () => [0, 0]);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j + i < size; j++) {
        for (let pre = 0; pre < 2; pre++) {
          merged[i + j][pre] = Math.max(
            merged[i + j][pre],
            dpA[i][pre] + dpB[j][pre]
          );
        }
      }
    }
    return merged;
  };

  const dfs = (u) => {
    let childDp = Array.from({ length: budget + 1 }, () => [0, 0]);
    for (const v of children[u]) {
      childDp = merge(childDp, dfs(v));
    }

    const f = Array.from({ length: budget + 1 }, () => [0, 0]);
    for (let b = 0; b <= budget; b++) {
      for (let parentBought = 0; parentBought < 2; parentBought++) {
        const cost = Math.floor(present[u - 1] / (parentBought + 1));
        const skip = childDp[b][0];
        let buy = skip;
        if (b >= cost) {
          buy = childDp[b - cost][1] + (future[u - 1] - cost);
        }
        f[b][parentBought] = Math.max(skip, buy);
      }
    }
    return f;
  };

  return dfs(1)[budget][0];
};

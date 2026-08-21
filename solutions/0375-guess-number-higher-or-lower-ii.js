/**
 * Guess Number Higher Or Lower II
 * Intuition: The worst-case cost of a range is min over guess g of `g + max(cost(left), cost(right))`, because we pay g and then the harder remaining side. DP fills by increasing interval length.
 * Approach: 1. `minCostMatrix[i][j]` = min money for range i..j (0 for length 1). 2. For length 2..n, for each start, end = start+len-1. 3. Try each split < end: cost = split + max(dp[start][split-1], dp[split+1][end]). 4. Store the min; answer is dp[1][n].
 * Dry Run: n = 2. Only length 2, split 1: 1 + max(0,0) = 1 → dp[1][2] = 1.
 * Time Complexity: O(n^3)
 * Space Complexity: O(n^2)
 */
var getMoneyAmount = function (n) {
  const minCostMatrix = new Array(n + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0));

  for (let currentLength = 2; currentLength <= n; currentLength++) {
    for (
      let initialIndex = 1;
      initialIndex <= n - currentLength + 1;
      initialIndex++
    ) {
      const finalIndex = initialIndex + currentLength - 1;
      let minimumPayment = Infinity;

      for (
        let splitPoint = initialIndex;
        splitPoint < finalIndex;
        splitPoint++
      ) {
        const costConsidered =
          splitPoint +
          Math.max(
            minCostMatrix[initialIndex][splitPoint - 1],
            minCostMatrix[splitPoint + 1][finalIndex]
          );
        minimumPayment = Math.min(minimumPayment, costConsidered);
      }
      minCostMatrix[initialIndex][finalIndex] = minimumPayment;
    }
  }

  return minCostMatrix[1][n];
};

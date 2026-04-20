/**
 * Guess Number Higher Or Lower II
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
            minCostMatrix[splitPoint + 1][finalIndex],
          );
        minimumPayment = Math.min(minimumPayment, costConsidered);
      }
      minCostMatrix[initialIndex][finalIndex] = minimumPayment;
    }
  }

  return minCostMatrix[1][n];
};

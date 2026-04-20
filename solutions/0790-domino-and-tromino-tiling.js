/**
 * Domino And Tromino Tiling
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numTilings = function (n) {
  const moduloCeiling = 1_000_000_007;

  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n === 3) {
    return 5;
  }

  const tilingCounts = new Array(n + 1);
  tilingCounts[1] = 1;
  tilingCounts[2] = 2;
  tilingCounts[3] = 5;

  let currentDimension = 4;
  while (currentDimension <= n) {
    const waysForPreviousThree = tilingCounts[currentDimension - 3];
    const waysForPreviousOne = tilingCounts[currentDimension - 1];
    let calculatedTotalWays =
      (2 * waysForPreviousOne + waysForPreviousThree) % moduloCeiling;
    tilingCounts[currentDimension] = calculatedTotalWays;
    currentDimension++;
  }

  return tilingCounts[n];
};

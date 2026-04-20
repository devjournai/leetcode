/**
 * Minimum Time To Make Rope Colorful
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minCost = function (colors, neededTime) {
  let totalRemovalCost = 0;
  let lastKeptBalloonIndex = 0;

  for (
    let currentBalloonIndex = 1;
    currentBalloonIndex < colors.length;
    currentBalloonIndex++
  ) {
    if (colors[currentBalloonIndex] === colors[lastKeptBalloonIndex]) {
      if (neededTime[currentBalloonIndex] < neededTime[lastKeptBalloonIndex]) {
        totalRemovalCost += neededTime[currentBalloonIndex];
      } else {
        totalRemovalCost += neededTime[lastKeptBalloonIndex];
        lastKeptBalloonIndex = currentBalloonIndex;
      }
    } else {
      lastKeptBalloonIndex = currentBalloonIndex;
    }
  }

  return totalRemovalCost;
};

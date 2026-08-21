/**
 * Minimum Time To Make Rope Colorful
 * Intuition: In a run of the same color keep the max neededTime and remove the rest.
 * Approach: 1. lastKept=0. 2. Same color: add min(time[i], time[kept]) and keep the costlier. 3. Else advance kept.
 * Dry Run: colors = "abaac", neededTime = [1,2,3,4,5].
 *   - Two adjacent a's; remove the cheaper (3) → 3.
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

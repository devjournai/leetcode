/**
 * Minimum Number Of Arrows To Burst Balloons
 * Intuition: Sort balloons by end. One arrow at the current end bursts every later balloon whose start is still ≤ that point; then start a new arrow.
 * Approach: 1. Empty → 0. 2. Sort by `points[i][1]`. 3. Increment `totalArrowsShot`, set `arrowImpactPosition` to this balloon’s end, skip while `points[j][0] <= arrowImpactPosition`. 4. Repeat until the array is consumed.
 * Dry Run: [[10,16],[2,8],[1,6],[7,12]]. Sorted ends 6,8,12,16. Arrow at 6 bursts [1,6] and [2,8]; next [7,12] arrow at 12 also bursts [10,16]. Return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var findMinArrowShots = function (points) {
  if (points.length === 0) {
    return 0;
  }

  points.sort(
    (firstBalloonItem, secondBalloonItem) =>
      firstBalloonItem[1] - secondBalloonItem[1]
  );

  let totalArrowsShot = 0;
  let currentBalloonIndex = 0;

  for (currentBalloonIndex = 0; currentBalloonIndex < points.length;) {
    totalArrowsShot++;

    let arrowImpactPosition = points[currentBalloonIndex][1];

    currentBalloonIndex++;

    while (
      currentBalloonIndex < points.length &&
      points[currentBalloonIndex][0] <= arrowImpactPosition
    ) {
      currentBalloonIndex++;
    }
  }

  return totalArrowsShot;
};

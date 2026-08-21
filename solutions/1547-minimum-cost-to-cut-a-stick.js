/**
 * Minimum Cost To Cut A Stick
 * Intuition: Cost of cutting [L,R] is (R-L) plus the best first cut. DP over sorted 0,cuts,n.
 * Approach: 1. Sort points [0,...cuts,n]. 2. dp[i][j]=min over k of (points[j]-points[i])+dp[i][k]+dp[k][j] for length≥2. 3. Return dp[0][m-1].
 * Dry Run: n = 7, cuts = [1,3,4,5].
 *   - Optimal cut order costs 16.
 * Time Complexity: O(M^3)
 * Space Complexity: O(M^2)
 */
var minCost = function (n, cuts) {
  let allPoints = [0, n, ...cuts];
  allPoints.sort((firstPoint, secondPoint) => firstPoint - secondPoint);

  const numPoints = allPoints.length;
  const dpTable = Array(numPoints)
    .fill(null)
    .map(() => Array(numPoints).fill(0));

  for (
    let currentSegmentLength = 2;
    currentSegmentLength < numPoints;
    currentSegmentLength++
  ) {
    for (
      let startBoundIndex = 0;
      startBoundIndex < numPoints - currentSegmentLength;
      startBoundIndex++
    ) {
      let endBoundIndex = startBoundIndex + currentSegmentLength;
      let currentMinimumSegmentCost = Infinity;

      for (
        let splitPointIndex = startBoundIndex + 1;
        splitPointIndex < endBoundIndex;
        splitPointIndex++
      ) {
        const segmentSpan =
          allPoints[endBoundIndex] - allPoints[startBoundIndex];
        const totalSplitCost =
          segmentSpan +
          dpTable[startBoundIndex][splitPointIndex] +
          dpTable[splitPointIndex][endBoundIndex];
        currentMinimumSegmentCost = Math.min(
          currentMinimumSegmentCost,
          totalSplitCost
        );
      }
      dpTable[startBoundIndex][endBoundIndex] = currentMinimumSegmentCost;
    }
  }

  return dpTable[0][numPoints - 1];
};

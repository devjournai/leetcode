/**
 * Paint House
 * Intuition: Adjacent houses cannot share a color. The min cost to paint house i red is that house’s red cost plus the cheaper of blue/green on house i-1 (and cyclic for the other colors). Keep only the previous house’s three answers.
 * Approach: 1. Empty → 0. 2. Seed `previousHouseMinCosts` from house 0. 3. For each later house, compute red/blue/green as cost[i][c] + min of the other two previous costs. 4. Replace the previous triple. 5. Return the min of the three.
 * Dry Run: costs = [[17,2,17],[16,16,5],[14,3,19]].
 *   - After house 1: red 18, blue 33, green 7. After house 2: red 21, blue 10, green 37. Min 10.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minCost = function (costs) {
  if (!costs || costs.length === 0) {
    return 0;
  }

  let previousHouseMinCosts = [...costs[0]];

  let totalHouses = costs.length;
  for (
    let currentHouseIndex = 1;
    currentHouseIndex < totalHouses;
    currentHouseIndex++
  ) {
    let currentHouseRedCost =
      costs[currentHouseIndex][0] +
      Math.min(previousHouseMinCosts[1], previousHouseMinCosts[2]);
    let currentHouseBlueCost =
      costs[currentHouseIndex][1] +
      Math.min(previousHouseMinCosts[0], previousHouseMinCosts[2]);
    let currentHouseGreenCost =
      costs[currentHouseIndex][2] +
      Math.min(previousHouseMinCosts[0], previousHouseMinCosts[1]);

    previousHouseMinCosts = [
      currentHouseRedCost,
      currentHouseBlueCost,
      currentHouseGreenCost,
    ];
  }

  return Math.min(
    previousHouseMinCosts[0],
    previousHouseMinCosts[1],
    previousHouseMinCosts[2]
  );
};

/**
 * Paint House II
 * Intuition: Same adjacency rule as Paint House with k colors. For house i, color c costs `costs[i][c]` plus the previous house’s cheapest color unless that cheapest used c, in which case use the second cheapest. Track those two minima in O(k) per house.
 * Approach: 1. Empty houses or colors → 0. 2. Seed `minimumCostsBefore` from house 0. 3. For each later house, scan previous costs for smallest and second-smallest (and the min’s index). 4. New cost[c] = paint[c] + (c===minIdx ? second : first). 5. After the last house, return the min of `minimumCostsBefore`.
 * Dry Run: costs = [[1,5,3],[2,9,4]].
 *   - House 0 mins: 1 at color 0, second 3. House 1: color0=2+3=5, color1=9+1=10, color2=4+1=5. Overall min 5.
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
var minCostII = function (initialCosts) {
  const totalHouses = initialCosts.length;
  if (totalHouses === 0) {
    return 0;
  }

  const totalColors = initialCosts[0].length;
  if (totalColors === 0) {
    return 0;
  }

  let minimumCostsBefore = [...initialCosts[0]];

  for (let houseIter = 1; houseIter < totalHouses; houseIter++) {
    let primaryMinVal = Infinity;
    let secondaryMinVal = Infinity;
    let primaryMinIdx = -1;

    let colorScanIndex = 0;
    while (colorScanIndex < totalColors) {
      let previousCostValue = minimumCostsBefore[colorScanIndex];
      if (previousCostValue < primaryMinVal) {
        secondaryMinVal = primaryMinVal;
        primaryMinVal = previousCostValue;
        primaryMinIdx = colorScanIndex;
      } else if (previousCostValue < secondaryMinVal) {
        secondaryMinVal = previousCostValue;
      }
      colorScanIndex++;
    }

    let minimumCostsAfterCurrentHouse = new Array(totalColors);
    let currentHouseColorIndex = 0;
    for (
      currentHouseColorIndex = 0;
      currentHouseColorIndex < totalColors;
      currentHouseColorIndex++
    ) {
      let paintingCostForCurrentColor =
        initialCosts[houseIter][currentHouseColorIndex];
      let costFromPreviousLayer;

      if (currentHouseColorIndex === primaryMinIdx) {
        costFromPreviousLayer = secondaryMinVal;
      } else {
        costFromPreviousLayer = primaryMinVal;
      }
      minimumCostsAfterCurrentHouse[currentHouseColorIndex] =
        paintingCostForCurrentColor + costFromPreviousLayer;
    }
    minimumCostsBefore = minimumCostsAfterCurrentHouse;
  }

  let overallMinimum = Infinity;
  let finalScanIndex = 0;
  while (finalScanIndex < totalColors) {
    if (minimumCostsBefore[finalScanIndex] < overallMinimum) {
      overallMinimum = minimumCostsBefore[finalScanIndex];
    }
    finalScanIndex++;
  }

  return overallMinimum;
};

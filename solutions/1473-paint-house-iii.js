/**
 * Paint House III
 * Intuition: DP on (houseIndex, previousColor, neighborhoodsUsed). Painted houses are fixed; unpainted ones try colors 1..n, starting a new neighborhood when color changes. Exceeding target neighborhoods is impossible.
 * Approach: 1. Memoize by house:prevColor:groups. 2. If groups > target return Infinity; if past last house return 0 iff groups==target. 3. If house already colored, recurse with updated group count. 4. Else try each paint cost + recurse; return -1 if Infinity.
 * Dry Run: houses=[0,0,0,0,0], m=5, n=2, target=3 with given costs
 *   - must form exactly 3 color groups while minimizing paint cost
 *   - DP finds the sample minimum 9
 * Time Complexity: O(m * n^2 * target)
 * Space Complexity: O(m * n * target)
 */
var minCost = function (houses, cost, m, n, target) {
  const memoStorage = new Map();

  const calculateMinimumPaintCost = (
    houseIndex,
    previousHouseColor,
    currentNeighborhoodCount
  ) => {
    if (currentNeighborhoodCount > target) {
      return Infinity;
    }
    if (houseIndex === m) {
      return currentNeighborhoodCount === target ? 0 : Infinity;
    }

    const memoKey = `${houseIndex}:${previousHouseColor}:${currentNeighborhoodCount}`;
    if (memoStorage.has(memoKey)) {
      return memoStorage.get(memoKey);
    }

    let minimumCostSoFar = Infinity;
    const currentHouseColorValue = houses[houseIndex];

    if (currentHouseColorValue !== 0) {
      const updatedNeighborhoodCount =
        previousHouseColor === currentHouseColorValue
          ? currentNeighborhoodCount
          : currentNeighborhoodCount + 1;
      minimumCostSoFar = calculateMinimumPaintCost(
        houseIndex + 1,
        currentHouseColorValue,
        updatedNeighborhoodCount
      );
    } else {
      for (let paintOption = 1; paintOption <= n; paintOption++) {
        const updatedNeighborhoodCount =
          previousHouseColor === paintOption
            ? currentNeighborhoodCount
            : currentNeighborhoodCount + 1;
        const costForCurrentOption =
          cost[houseIndex][paintOption - 1] +
          calculateMinimumPaintCost(
            houseIndex + 1,
            paintOption,
            updatedNeighborhoodCount
          );
        minimumCostSoFar = Math.min(minimumCostSoFar, costForCurrentOption);
      }
    }

    memoStorage.set(memoKey, minimumCostSoFar);
    return minimumCostSoFar;
  };

  const finalOutcome = calculateMinimumPaintCost(0, 0, 0); // Start at house 0, with a 'virtual' previous color 0, and 0 neighborhoods.
  return finalOutcome === Infinity ? -1 : finalOutcome;
};

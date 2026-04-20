/**
 * Paint House III
 * Time Complexity: O(m * n^2 * target)
 * Space Complexity: O(m * n * target)
 */
var minCost = function (houses, cost, m, n, target) {
  const memoStorage = new Map();

  const calculateMinimumPaintCost = (
    houseIndex,
    previousHouseColor,
    currentNeighborhoodCount,
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
        updatedNeighborhoodCount,
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
            updatedNeighborhoodCount,
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

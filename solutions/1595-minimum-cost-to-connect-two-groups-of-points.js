/**
 * Minimum Cost To Connect Two Groups Of Points
 * Time Complexity: O(size1 * size2 * 2^size2)
 * Space Complexity: O(size1 * 2^size2)
 */
var connectTwoGroups = function (cost) {
  const firstGroupCount = cost.length;
  const secondGroupCount = cost[0].length;

  const minimumCostForSecondGroupPoint = new Array(secondGroupCount).fill(
    Infinity,
  );
  for (
    let firstOuterLoopIndex = 0;
    firstOuterLoopIndex < secondGroupCount;
    firstOuterLoopIndex++
  ) {
    for (
      let firstInnerLoopIndex = 0;
      firstInnerLoopIndex < firstGroupCount;
      firstInnerLoopIndex++
    ) {
      minimumCostForSecondGroupPoint[firstOuterLoopIndex] = Math.min(
        minimumCostForSecondGroupPoint[firstOuterLoopIndex],
        cost[firstInnerLoopIndex][firstOuterLoopIndex],
      );
    }
  }

  const memoizationTable = new Array(firstGroupCount)
    .fill(null)
    .map(() => new Array(1 << secondGroupCount).fill(-1));

  function findMinimumTotalCost(firstGroupCurrentIndex, connectionMask) {
    if (firstGroupCurrentIndex === firstGroupCount) {
      let remainingUnconnectedCost = 0;
      for (
        let secondGroupIterationIndex = 0;
        secondGroupIterationIndex < secondGroupCount;
        secondGroupIterationIndex++
      ) {
        if ((connectionMask & (1 << secondGroupIterationIndex)) === 0) {
          remainingUnconnectedCost +=
            minimumCostForSecondGroupPoint[secondGroupIterationIndex];
        }
      }
      return remainingUnconnectedCost;
    }

    const valueIfMemoized =
      memoizationTable[firstGroupCurrentIndex][connectionMask];
    if (valueIfMemoized !== -1) {
      return valueIfMemoized;
    }

    let minimumTotalCost = Infinity;

    for (
      let secondGroupConnectionIndex = 0;
      secondGroupConnectionIndex < secondGroupCount;
      secondGroupConnectionIndex++
    ) {
      minimumTotalCost = Math.min(
        minimumTotalCost,
        cost[firstGroupCurrentIndex][secondGroupConnectionIndex] +
          findMinimumTotalCost(
            firstGroupCurrentIndex + 1,
            connectionMask | (1 << secondGroupConnectionIndex),
          ),
      );
    }

    memoizationTable[firstGroupCurrentIndex][connectionMask] = minimumTotalCost;
    return minimumTotalCost;
  }

  return findMinimumTotalCost(0, 0);
};

/**
 * Find K Th Smallest Pair Distance
 * Time Complexity: O(N log N + N log(max_val - min_val))
 * Space Complexity: O(N)
 */
var smallestDistancePair = function (inputNumbers, targetKth) {
  inputNumbers.sort(
    (firstElementVal, secondElementVal) => firstElementVal - secondElementVal,
  );

  const dataLength = inputNumbers.length;
  let searchLowerBound = 0;
  let searchUpperBound = inputNumbers[dataLength - 1] - inputNumbers[0];

  const calculatePairsCount = (maxDistanceTarget) => {
    let currentPairsTotal = 0;
    let advancingPointer = 0;

    for (let basePointer = 0; basePointer < dataLength; basePointer++) {
      while (
        advancingPointer < dataLength &&
        inputNumbers[advancingPointer] - inputNumbers[basePointer] <=
          maxDistanceTarget
      ) {
        advancingPointer++;
      }
      currentPairsTotal += advancingPointer - basePointer - 1;
    }
    return currentPairsTotal;
  };

  while (searchLowerBound < searchUpperBound) {
    const potentialDistance = Math.floor(
      (searchLowerBound + searchUpperBound) / 2,
    );
    const pairsFoundForDistance = calculatePairsCount(potentialDistance);

    if (pairsFoundForDistance < targetKth) {
      searchLowerBound = potentialDistance + 1;
    } else {
      searchUpperBound = potentialDistance;
    }
  }

  return searchLowerBound;
};

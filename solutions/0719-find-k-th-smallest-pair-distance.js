/**
 * Find K Th Smallest Pair Distance
 * Intuition: After sorting, the k-th pair distance is the smallest `d` such that at least `targetKth` pairs have difference ≤ `d`. Binary search `d` and count pairs with a two-pointer window.
 * Approach: 1. Sort `inputNumbers`. 2. Binary search `searchLowerBound`..`searchUpperBound` (0 to max-min). 3. `calculatePairsCount` advances `advancingPointer` so each `basePointer` contributes `advancingPointer - basePointer - 1` pairs. 4. If the count is `< targetKth`, raise the lower bound; else shrink the upper bound. Return the lower bound.
 * Dry Run: [1,3,1], k=1. Sorted [1,1,3]. Distances 0,2,2. Smallest d with ≥1 pair is 0.
 * Time Complexity: O(N log N + N log(max_val - min_val))
 * Space Complexity: O(N)
 */
var smallestDistancePair = function (inputNumbers, targetKth) {
  inputNumbers.sort(
    (firstElementVal, secondElementVal) => firstElementVal - secondElementVal
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
      (searchLowerBound + searchUpperBound) / 2
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

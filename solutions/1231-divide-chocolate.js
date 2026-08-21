/**
 * Divide Chocolate
 * Intuition: Maximize the minimum chunk sweetness with k cuts (k+1 pieces) by binary-searching that minimum and greedily packing prefix sums.
 * Approach: 1. Lo=min bar, hi=total. 2. Mid is feasible if we can form ≥ k+1 pieces each summing to ≥ mid. 3. Raise lo on success, else lower hi.
 * Dry Run: sweetness=[1,2,3,4,5,6,7,8,9], k=5. Feasible min 6 → 6.
 * Time Complexity: O(N * log(S_total))
 * Space Complexity: O(1)
 */
var maximizeSweetness = function (sweetness, k) {
  let initialMinChunkSweetness = Infinity;
  for (let i = 0; i < sweetness.length; i++) {
    if (sweetness[i] < initialMinChunkSweetness) {
      initialMinChunkSweetness = sweetness[i];
    }
  }

  let overallTotalSweetness = 0;
  for (let j = 0; j < sweetness.length; j++) {
    overallTotalSweetness += sweetness[j];
  }

  let sweetnessRangeStart = initialMinChunkSweetness;
  let sweetnessRangeEnd = overallTotalSweetness;
  let optimalMinimumSweetness = initialMinChunkSweetness;

  while (sweetnessRangeStart <= sweetnessRangeEnd) {
    const currentSweetnessCandidate = Math.floor(
      (sweetnessRangeStart + sweetnessRangeEnd) / 2
    );

    if (canAchieveMinSweetness(currentSweetnessCandidate)) {
      optimalMinimumSweetness = currentSweetnessCandidate;
      sweetnessRangeStart = currentSweetnessCandidate + 1;
    } else {
      sweetnessRangeEnd = currentSweetnessCandidate - 1;
    }
  }

  return optimalMinimumSweetness;

  function canAchieveMinSweetness(requiredMinSweetness) {
    let achievedPiecesCount = 0;
    let currentPieceAggregate = 0;

    for (const individualSweetnessValue of sweetness) {
      currentPieceAggregate += individualSweetnessValue;
      if (currentPieceAggregate >= requiredMinSweetness) {
        achievedPiecesCount++;
        currentPieceAggregate = 0;
      }
    }

    return achievedPiecesCount >= k + 1;
  }
};

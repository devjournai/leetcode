/**
 * Divide Chocolate
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
      (sweetnessRangeStart + sweetnessRangeEnd) / 2,
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

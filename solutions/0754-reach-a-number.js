/**
 * Reach A Number
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var reachNumber = function (target) {
  const absoluteTargetMagnitude = Math.abs(target);
  let totalMovesCount = 0;

  let initialMovesEstimate = Math.floor(Math.sqrt(2 * absoluteTargetMagnitude));
  totalMovesCount = initialMovesEstimate;

  while (true) {
    let currentStepSum = (totalMovesCount * (totalMovesCount + 1)) / 2;

    if (currentStepSum >= absoluteTargetMagnitude) {
      let parityDifference = currentStepSum - absoluteTargetMagnitude;
      if (parityDifference % 2 === 0) {
        return totalMovesCount;
      }
    }
    totalMovesCount++;
  }
};

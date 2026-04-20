/**
 * Maximum Points You Can Obtain From Cards
 * Time Complexity: O(k)
 * Space Complexity: O(k)
 */
var maxScore = function (cardPoints, k) {
  const totalCardCount = cardPoints.length;

  const leftCumulativeSums = new Array(k + 1).fill(0);
  for (let currentLeftIndex = 0; currentLeftIndex < k; currentLeftIndex++) {
    leftCumulativeSums[currentLeftIndex + 1] =
      leftCumulativeSums[currentLeftIndex] + cardPoints[currentLeftIndex];
  }

  const rightCumulativeSums = new Array(k + 1).fill(0);
  for (let currentRightIndex = 0; currentRightIndex < k; currentRightIndex++) {
    rightCumulativeSums[currentRightIndex + 1] =
      rightCumulativeSums[currentRightIndex] +
      cardPoints[totalCardCount - 1 - currentRightIndex];
  }

  let maximumAchievedScore = 0;

  for (let leftCardsTaken = 0; leftCardsTaken <= k; leftCardsTaken++) {
    const rightCardsTaken = k - leftCardsTaken;
    const currentScoreAttempt =
      leftCumulativeSums[leftCardsTaken] + rightCumulativeSums[rightCardsTaken];
    if (currentScoreAttempt > maximumAchievedScore) {
      maximumAchievedScore = currentScoreAttempt;
    }
  }

  return maximumAchievedScore;
};

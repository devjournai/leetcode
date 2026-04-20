/**
 * New 21 Game
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var new21Game = function (n, k, maxPts) {
  if (k === 0 || n >= k + maxPts - 1) {
    return 1.0;
  }

  const probabilityArray = new Array(n + 1).fill(0);
  probabilityArray[0] = 1.0;

  let currentProbabilitySumWindow = 1.0;
  let currentScoreValue = 1;

  while (currentScoreValue <= n) {
    probabilityArray[currentScoreValue] = currentProbabilitySumWindow / maxPts;

    if (currentScoreValue < k) {
      currentProbabilitySumWindow += probabilityArray[currentScoreValue];
    }

    if (currentScoreValue - maxPts >= 0) {
      currentProbabilitySumWindow -=
        probabilityArray[currentScoreValue - maxPts];
    }
    currentScoreValue++;
  }

  let overallSuccessProbability = 0;
  let finalScoreValue = k;

  while (finalScoreValue <= n) {
    overallSuccessProbability += probabilityArray[finalScoreValue];
    finalScoreValue++;
  }

  return overallSuccessProbability;
};

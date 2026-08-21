/**
 * New 21 Game
 * Intuition: Alice stops at score ≥ k. `P(i)` is the chance of reaching i while still drawing. `P(i) = windowSum / maxPts` where the window is the last `maxPts` probabilities of scores that still draw (i-maxPts … min(i-1, k-1)).
 * Approach: 1. If k=0 or n ≥ k+maxPts-1 return 1. 2. `probabilityArray[0]=1`, window=1. 3. For score 1..n, set P[score]=window/maxPts; add P[score] to the window if score < k; subtract P[score-maxPts] if that index ≥ 0. 4. Sum P[k]..P[n].
 * Dry Run: n=6, k=1, maxPts=10. Not the early-1 case. P[1]=1/10. Scores 1..6 never add back into the draw window (all ≥ k). Sum P[1]..P[6]=0.6.
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

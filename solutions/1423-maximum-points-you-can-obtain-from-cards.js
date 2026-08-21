/**
 * Maximum Points You Can Obtain From Cards
 * Intuition: Taking k cards from the ends means some prefix of the left plus the complementary suffix of the right. Prefix sums of both ends let every split be scored in constant time.
 * Approach: 1. Build leftCumulativeSums[0..k] from the first k cards. 2. Build rightCumulativeSums[0..k] from the last k cards. 3. For leftCardsTaken from 0 to k, add left prefix and right prefix of k - leftCardsTaken. 4. Keep the maximum score.
 * Dry Run: cardPoints = [1,2,3,4,5,6,1], k = 3
 *   - left prefixes: [0,1,3,6]
 *   - right prefixes: [0,1,7,13]
 *   - 0 left + 3 right = 13; 1+2 right = 8; 2+1 right = 4; 3+0 right = 6. Return 13.
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

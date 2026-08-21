/**
 * Bag Of Tokens
 * Intuition: Score is maximized by buying cheap tokens (face-up) and, when broke, selling the most expensive remaining token (face-down) only if another buy is still possible.
 * Approach: 1. Sort tokens. 2. Two pointers: if power ≥ left token, spend it and score++ (track max). 3. Else if score>0 and left<right, gain right token and score--. 4. Else break. Return `maximumScore`.
 * Dry Run: tokens=[100,200,300,400], power=200. Buy 100 score=1 power=100; sell 400 power=500 score=0; buy 200 score=1; buy 300 score=2. Max 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var bagOfTokensScore = function (tokens, power) {
  tokens.sort((firstElement, secondElement) => firstElement - secondElement);

  let currentPower = power;
  let currentScore = 0;
  let maximumScore = 0;
  let leftBoundary = 0;
  let rightBoundary = tokens.length - 1;

  while (leftBoundary <= rightBoundary) {
    if (currentPower >= tokens[leftBoundary]) {
      currentPower -= tokens[leftBoundary];
      currentScore++;
      leftBoundary++;
      maximumScore = Math.max(maximumScore, currentScore);
    } else if (currentScore > 0 && leftBoundary < rightBoundary) {
      currentPower += tokens[rightBoundary];
      currentScore--;
      rightBoundary--;
    } else {
      break;
    }
  }

  return maximumScore;
};

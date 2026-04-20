/**
 * Bag Of Tokens
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

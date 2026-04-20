/**
 * Score Of Parentheses
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var scoreOfParentheses = function (s) {
  let depthLevel = 0;
  let accumulatedScore = 0;
  const inputLength = s.length;

  for (
    let iteratorPosition = 0;
    iteratorPosition < inputLength;
    iteratorPosition++
  ) {
    const currentSymbol = s[iteratorPosition];
    if (currentSymbol === "(") {
      depthLevel++;
    } else {
      depthLevel--;
      if (s[iteratorPosition - 1] === "(") {
        accumulatedScore += Math.pow(2, depthLevel);
      }
    }
  }

  return accumulatedScore;
};

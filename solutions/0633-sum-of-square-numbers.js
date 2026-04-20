/**
 * Sum Of Square Numbers
 * Time Complexity: O(sqrt(c))
 * Space Complexity: O(1)
 */
var judgeSquareSum = function (c) {
  let maximumFirstTerm = Math.floor(Math.sqrt(c));

  for (
    let currentFirstTerm = 0;
    currentFirstTerm <= maximumFirstTerm;
    currentFirstTerm++
  ) {
    let firstSquareValue = currentFirstTerm * currentFirstTerm;
    let desiredSecondSquare = c - firstSquareValue;

    let secondRootCandidate = Math.sqrt(desiredSecondSquare);

    if (secondRootCandidate === Math.floor(secondRootCandidate)) {
      return true;
    }
  }

  return false;
};

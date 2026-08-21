/**
 * Sum Of Square Numbers
 * Intuition: If c = a² + b², then for each a in 0..floor(sqrt(c)), b² = c - a² must be a perfect square.
 * Approach: 1. Set `maximumFirstTerm` to floor(sqrt(c)). 2. For `currentFirstTerm` from 0 through that bound, compute `desiredSecondSquare = c - currentFirstTerm²`. 3. If `Math.sqrt` of that is an integer, return true. 4. Otherwise return false.
 * Dry Run: c = 5.
 *   - a=0: 5 is not a square. a=1: 5-1=4, sqrt=2 integer → true (1²+2²).
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

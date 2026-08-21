/**
 * Score Of Parentheses
 * Intuition: Each "()" at depth d contributes 2^d. Nested pairs multiply by 2 via extra depth; adjacent pairs add. Track depth; score only on a close that immediately follows an open.
 * Approach: 1. Scan: '(' increment `depthLevel`. 2. On ')': decrement; if previous char is '(', add `2^depthLevel`. 3. Return `accumulatedScore`.
 * Dry Run: "(()(()))". () at depth 1 → +2; inner () at depth 2 → +4; total 6.
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

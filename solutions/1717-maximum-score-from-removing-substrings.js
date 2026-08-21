/**
 * Maximum Score From Removing Substrings
 * Intuition: Non-overlapping "ab"/"ba" removals: always remove the higher-scoring pair first with a stack, then the other pair on the leftover.
 * Approach: 1. If `x>=y` first pair is "ab" else "ba". 2. Scan `s` with `processingStack`, popping a match for `firstPair` and adding `firstScore`. 3. Repeat on the remainder for `secondPair`. 4. Return `totalScore`.
 * Dry Run: s = "cdbcbbaa", x = 4, y = 5
 * Prefer "ba": remove ba twice (positions in "cbbaa" etc.) score 10, leftover no "ab" → 10.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumGain = function (s, x, y) {
  let totalScore = 0;

  let firstPair;
  let secondPair;
  let firstScore;
  let secondScore;

  if (x >= y) {
    firstPair = "ab";
    firstScore = x;
    secondPair = "ba";
    secondScore = y;
  } else {
    firstPair = "ba";
    firstScore = y;
    secondPair = "ab";
    secondScore = x;
  }

  const processingStack = [];
  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];
    if (
      processingStack.length > 0 &&
      processingStack[processingStack.length - 1] === firstPair[0] &&
      currentChar === firstPair[1]
    ) {
      processingStack.pop();
      totalScore += firstScore;
    } else {
      processingStack.push(currentChar);
    }
  }

  const remainingStack = [];
  let index = 0;
  while (index < processingStack.length) {
    const currentRemainingChar = processingStack[index];
    index++;
    if (
      remainingStack.length > 0 &&
      remainingStack[remainingStack.length - 1] === secondPair[0] &&
      currentRemainingChar === secondPair[1]
    ) {
      remainingStack.pop();
      totalScore += secondScore;
    } else {
      remainingStack.push(currentRemainingChar);
    }
  }

  return totalScore;
};

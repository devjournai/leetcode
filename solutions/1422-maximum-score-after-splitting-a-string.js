/**
 * Maximum Score After Splitting A String
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxScore = function (s) {
  let leftPartZeroCount = 0;
  let rightPartOneCount = 0;
  let overallMaxScore = -Infinity;

  for (let charPointer = 0; charPointer < s.length; charPointer++) {
    if (s[charPointer] === "1") {
      rightPartOneCount++;
    }
  }

  for (let splitIndex = 0; splitIndex < s.length - 1; splitIndex++) {
    if (s[splitIndex] === "0") {
      leftPartZeroCount++;
    } else {
      rightPartOneCount--;
    }
    let currentSplitScore = leftPartZeroCount + rightPartOneCount;
    overallMaxScore = Math.max(overallMaxScore, currentSplitScore);
  }

  return overallMaxScore;
};

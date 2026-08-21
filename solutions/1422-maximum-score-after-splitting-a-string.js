/**
 * Maximum Score After Splitting A String
 * Intuition: Score is zeros on the left plus ones on the right. Count all ones first, then walk every valid split and move each character from right to left, updating the two counts in O(1).
 * Approach: 1. Count ones in the whole string as the initial right-side ones. 2. Scan splitIndex from 0 to n-2. 3. If s[splitIndex] is '0', increment left zeros; otherwise decrement right ones. 4. Track the max of left zeros + right ones. 5. Return that maximum.
 * Dry Run: s = "011101"
 *   - ones on the right initially = 4
 *   - split after 0: leftZeros=1, rightOnes=4, score=5
 *   - split after 01: leftZeros=1, rightOnes=3, score=4
 *   - split after 011: leftZeros=1, rightOnes=2, score=3
 *   - later splits stay <= 5. Return 5.
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

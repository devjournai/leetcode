/**
 * Height Checker
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var heightChecker = function (heights) {
  const heightsCopy = [...heights];
  const sortedExpected = heightsCopy.sort(
    (heightOne, heightTwo) => heightOne - heightTwo,
  );

  let unmatchedPairs = 0;
  const arrayLength = heights.length;

  for (let indexTracker = 0; indexTracker < arrayLength; indexTracker++) {
    if (heights[indexTracker] !== sortedExpected[indexTracker]) {
      unmatchedPairs++;
    }
  }

  return unmatchedPairs;
};

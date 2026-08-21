/**
 * Height Checker
 * Intuition: Expected order is the sorted heights. Count indices that differ from that sorted copy.
 * Approach: 1. Copy and sort. 2. Compare each index to the original. 3. Return the mismatch count.
 * Dry Run: heights = [1,1,4,2,1,3].
 *   - Sorted [1,1,1,2,3,4]. Mismatches at indices 2,4,5. Count 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var heightChecker = function (heights) {
  const heightsCopy = [...heights];
  const sortedExpected = heightsCopy.sort(
    (heightOne, heightTwo) => heightOne - heightTwo
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

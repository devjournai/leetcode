/**
 * Check If All The Integers In A Range Are Covered
 * Intuition: Mark every integer covered by any range, then verify [left, right] is fully marked.
 * Approach: 1. `coveredStatus` size 51. 2. For each range, set true from start to end. 3. If any checkTarget in [left,right] is false, return false.
 * Dry Run: ranges=[[1,2],[3,4],[5,6]], left=2, right=5. All marked. Return true.
 * Time Complexity: O(N * M)
 * Space Complexity: O(M)
 */
var isCovered = function (ranges, left, right) {
  const coveredStatus = new Array(51).fill(false);

  for (const currentRange of ranges) {
    const rangeStart = currentRange[0];
    const rangeEnd = currentRange[1];
    for (
      let numberIterator = rangeStart;
      numberIterator <= rangeEnd;
      numberIterator++
    ) {
      coveredStatus[numberIterator] = true;
    }
  }

  for (let checkTarget = left; checkTarget <= right; checkTarget++) {
    if (!coveredStatus[checkTarget]) {
      return false;
    }
  }

  return true;
};

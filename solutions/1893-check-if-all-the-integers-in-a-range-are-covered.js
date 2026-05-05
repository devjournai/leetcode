/**
 * Check If All The Integers In A Range Are Covered
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

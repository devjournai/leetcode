/**
 * Find Latest Group Of Size M
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findLatestStep = function (arr, m) {
  const groupBoundaryLengths = new Array(arr.length + 2).fill(0);

  const sizeCounts = new Map();

  let lastMatchingStep = -1;

  for (let idx = 0; idx < arr.length; idx++) {
    const activatedIndex = arr[idx];

    const leftGroupLen = groupBoundaryLengths[activatedIndex - 1];
    const rightGroupLen = groupBoundaryLengths[activatedIndex + 1];

    const mergedGroupLen = leftGroupLen + rightGroupLen + 1;

    groupBoundaryLengths[activatedIndex - leftGroupLen] = mergedGroupLen;
    groupBoundaryLengths[activatedIndex + rightGroupLen] = mergedGroupLen;
    groupBoundaryLengths[activatedIndex] = mergedGroupLen;

    if (leftGroupLen > 0) {
      const currentLeftCount = sizeCounts.get(leftGroupLen) || 0;
      sizeCounts.set(leftGroupLen, currentLeftCount - 1);
    }
    if (rightGroupLen > 0) {
      const currentRightCount = sizeCounts.get(rightGroupLen) || 0;
      sizeCounts.set(rightGroupLen, currentRightCount - 1);
    }

    const currentMergedCount = sizeCounts.get(mergedGroupLen) || 0;
    sizeCounts.set(mergedGroupLen, currentMergedCount + 1);
    if (sizeCounts.get(m) > 0) {
      lastMatchingStep = idx + 1;
    }
  }

  return lastMatchingStep;
};

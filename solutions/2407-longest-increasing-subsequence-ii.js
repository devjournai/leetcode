/**
 * Longest Increasing Subsequence Ii
 * Intuition: A segment tree can efficiently store and query the maximum LIS length for numbers within a range. By processing numbers in order, we can find the best predecessor to extend an LIS, and update the current number's LIS length.
 * Approach: 1. Determine the maximum value in `nums` to define the segment tree's range. 2. Initialize a segment tree to hold max LIS lengths, all set to 0. 3. For each number in `nums`, query the segment tree for the maximum LIS length from `max(1, currentNum - k)` up to `currentNum - 1`. 4. Update the segment tree at `currentNum` with (queried length + 1). 5. Finally, query the entire segment tree range to get the overall maximum LIS length.
 * Dry Run:
 * nums = [4, 2, 1, 4, 3, 4, 5, 8, 15], k = 3
 * maximumElementValue = 15. segmentTreeData initialized to all zeros.
 *
 * 1. processedNumber = 4:
 *    minimumAllowedPrevious = Math.max(1, 4 - 3) = 1
 *    maximumAllowedPrevious = 4 - 1 = 3
 *    previousSubsequenceLength = queryMaximumLength(..., 1, 3) -> returns 0 (tree is empty)
 *    updateTreeValue(..., 4, 0 + 1) -> segmentTreeData updates: value 4 gets length 1.
 *
 * 2. processedNumber = 2:
 *    minimumAllowedPrevious = Math.max(1, 2 - 3) = 1
 *    maximumAllowedPrevious = 2 - 1 = 1
 *    previousSubsequenceLength = queryMaximumLength(..., 1, 1) -> returns 0
 *    updateTreeValue(..., 2, 0 + 1) -> segmentTreeData updates: value 2 gets length 1.
 *
 * 3. processedNumber = 1:
 *    minimumAllowedPrevious = Math.max(1, 1 - 3) = 1
 *    maximumAllowedPrevious = 1 - 1 = 0
 *    previousSubsequenceLength = 0 (range 1 to 0 is invalid)
 *    updateTreeValue(..., 1, 0 + 1) -> segmentTreeData updates: value 1 gets length 1.
 *
 * 4. processedNumber = 4:
 *    minimumAllowedPrevious = Math.max(1, 4 - 3) = 1
 *    maximumAllowedPrevious = 4 - 1 = 3
 *    previousSubsequenceLength = queryMaximumLength(..., 1, 3) -> max length in [1,3] is 1 (from value 1 or 2).
 *    updateTreeValue(..., 4, 1 + 1) -> segmentTreeData updates: value 4 gets max(current 1, new 2) = 2.
 *
 * 5. processedNumber = 3:
 *    minimumAllowedPrevious = Math.max(1, 3 - 3) = 1
 *    maximumAllowedPrevious = 3 - 1 = 2
 *    previousSubsequenceLength = queryMaximumLength(..., 1, 2) -> max length in [1,2] is 1 (from value 1 or 2).
 *    updateTreeValue(..., 3, 1 + 1) -> segmentTreeData updates: value 3 gets length 2.
 *
 * 6. processedNumber = 4:
 *    minimumAllowedPrevious = Math.max(1, 4 - 3) = 1
 *    maximumAllowedPrevious = 4 - 1 = 3
 *    previousSubsequenceLength = queryMaximumLength(..., 1, 3) -> max length in [1,3] is 2 (from value 3).
 *    updateTreeValue(..., 4, 2 + 1) -> segmentTreeData updates: value 4 gets max(current 2, new 3) = 3.
 *
 * 7. processedNumber = 5:
 *    minimumAllowedPrevious = Math.max(1, 5 - 3) = 2
 *    maximumAllowedPrevious = 5 - 1 = 4
 *    previousSubsequenceLength = queryMaximumLength(..., 2, 4) -> max length in [2,4] is 3 (from value 4).
 *    updateTreeValue(..., 5, 3 + 1) -> segmentTreeData updates: value 5 gets length 4.
 *
 * 8. processedNumber = 8:
 *    minimumAllowedPrevious = Math.max(1, 8 - 3) = 5
 *    maximumAllowedPrevious = 8 - 1 = 7
 *    previousSubsequenceLength = queryMaximumLength(..., 5, 7) -> max length in [5,7] is 4 (from value 5).
 *    updateTreeValue(..., 8, 4 + 1) -> segmentTreeData updates: value 8 gets length 5.
 *
 * 9. processedNumber = 15:
 *    minimumAllowedPrevious = Math.max(1, 15 - 3) = 12
 *    maximumAllowedPrevious = 15 - 1 = 14
 *    previousSubsequenceLength = queryMaximumLength(..., 12, 14) -> returns 0.
 *    updateTreeValue(..., 15, 0 + 1) -> segmentTreeData updates: value 15 gets length 1.
 *
 * Final Result: queryMaximumLength(..., 1, 15) -> Returns 5.
 * Time Complexity: O(N log(MaxVal))
 * Space Complexity: O(MaxVal)
 */
var lengthOfLIS = function (nums, k) {
  const maximumElementValue = Math.max(...nums);
  const segmentTreeData = new Array(4 * maximumElementValue).fill(0);

  function updateTreeValue(
    treeNodeIndex,
    segmentStartRange,
    segmentEndRange,
    targetPosition,
    newSubsequenceLength
  ) {
    if (segmentStartRange === segmentEndRange) {
      segmentTreeData[treeNodeIndex] = Math.max(
        segmentTreeData[treeNodeIndex],
        newSubsequenceLength
      );
    } else {
      const segmentMidpoint = Math.floor(
        (segmentStartRange + segmentEndRange) / 2
      );
      const leftChildIdentifier = 2 * treeNodeIndex;
      const rightChildIdentifier = 2 * treeNodeIndex + 1;

      if (targetPosition <= segmentMidpoint) {
        updateTreeValue(
          leftChildIdentifier,
          segmentStartRange,
          segmentMidpoint,
          targetPosition,
          newSubsequenceLength
        );
      } else {
        updateTreeValue(
          rightChildIdentifier,
          segmentMidpoint + 1,
          segmentEndRange,
          targetPosition,
          newSubsequenceLength
        );
      }
      segmentTreeData[treeNodeIndex] = Math.max(
        segmentTreeData[leftChildIdentifier],
        segmentTreeData[rightChildIdentifier]
      );
    }
  }

  function queryMaximumLength(
    queryNodeIndex,
    nodeRangeStart,
    nodeRangeEnd,
    requestStartValue,
    requestEndValue
  ) {
    if (requestEndValue < nodeRangeStart || nodeRangeEnd < requestStartValue) {
      return 0;
    }
    if (
      requestStartValue <= nodeRangeStart &&
      nodeRangeEnd <= requestEndValue
    ) {
      return segmentTreeData[queryNodeIndex];
    }
    const queryMidpoint = Math.floor((nodeRangeStart + nodeRangeEnd) / 2);
    const leftSubtreeResult = queryMaximumLength(
      2 * queryNodeIndex,
      nodeRangeStart,
      queryMidpoint,
      requestStartValue,
      requestEndValue
    );
    const rightSubtreeResult = queryMaximumLength(
      2 * queryNodeIndex + 1,
      queryMidpoint + 1,
      nodeRangeEnd,
      requestStartValue,
      requestEndValue
    );
    return Math.max(leftSubtreeResult, rightSubtreeResult);
  }

  for (const processedNumber of nums) {
    const minimumAllowedPrevious = Math.max(1, processedNumber - k);
    const maximumAllowedPrevious = processedNumber - 1;

    let previousSubsequenceLength = 0;
    if (maximumAllowedPrevious >= minimumAllowedPrevious) {
      previousSubsequenceLength = queryMaximumLength(
        1,
        1,
        maximumElementValue,
        minimumAllowedPrevious,
        maximumAllowedPrevious
      );
    }
    updateTreeValue(
      1,
      1,
      maximumElementValue,
      processedNumber,
      previousSubsequenceLength + 1
    );
  }

  return queryMaximumLength(1, 1, maximumElementValue, 1, maximumElementValue);
};

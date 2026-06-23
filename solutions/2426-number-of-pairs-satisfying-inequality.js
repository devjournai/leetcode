/**
 * Number Of Pairs Satisfying Inequality
 * Intuition: The inequality `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff` can be transformed into `(nums1[i] - nums2[i]) <= (nums1[j] - nums2[j]) + diff`. By defining a new array `transformedArray[k] = nums1[k] - nums2[k]`, the problem reduces to finding pairs (i, j) with `i < j` such that `transformedArray[i] <= transformedArray[j] + diff`. This is a classic counting problem solvable with a modified merge sort. As we merge two sorted sub-arrays, for each element from the left sub-array, we can efficiently count elements in the right sub-array that satisfy the condition using a two-pointer approach, due to the sorted nature of the sub-arrays. The merge sort structure naturally preserves the `i < j` condition as elements from the left sub-array always precede elements from the right sub-array in terms of original indices.
 * Approach: 1. Create a `transformedArray` where `transformedArray[k] = nums1[k] - nums2[k]` for each index `k`. 2. Implement a recursive `countAndSortSegments` function that performs a modified merge sort on `transformedArray`. 3. The base case for `countAndSortSegments` is a sub-array of size 0 or 1. 4. Recursively call `countAndSortSegments` on the left half `[start, mid)` and the right half `[mid, end)`. 5. After the recursive calls, perform a counting phase: Initialize two pointers, `leftIterator` at `start` and `rightIterator` at `mid`. Iterate `leftIterator` through the left half. For each `transformedArray[leftIterator]`, advance `rightIterator` until `transformedArray[leftIterator] <= transformedArray[rightIterator] + diff` is true. All elements from `transformedArray[rightIterator]` to `transformedArray[end - 1]` will satisfy the condition with `transformedArray[leftIterator]`. Add `(end - rightIterator)` to a global `totalSatisfyingPairs` counter. 6. After the counting phase, perform a standard merge phase: Merge the two sorted halves `[start, mid)` and `[mid, end)` into a `temporaryBuffer` and then copy the sorted elements back into `transformedArray` within the `[start, end)` range. This ensures the array remains sorted for higher-level merges. 7. Initialize `totalSatisfyingPairs` to 0, call `countAndSortSegments(0, n)`, and return `totalSatisfyingPairs`.
 * Dry Run: nums1 = [3,2,5], nums2 = [2,2,1], diff = 1
 * 1. transformedArray = [1, 0, 4] (3-2, 2-2, 5-1). totalSatisfyingPairs = 0.
 * 2. countAndSortSegments(0, 3):
 *    - midPoint = 1.
 *    - countAndSortSegments(0, 1): Base case. Returns. transformedArray = [1, 0, 4].
 *    - countAndSortSegments(1, 3):
 *      - midPoint = 2.
 *      - countAndSortSegments(1, 2): Base case. Returns. transformedArray = [1, 0, 4].
 *      - countAndSortSegments(2, 3): Base case. Returns. transformedArray = [1, 0, 4].
 *      - COUNTING (subArrayStart=1, midPoint=2, subArrayEnd=3):
 *        - left half: [transformedArray[1]=0]. right half: [transformedArray[2]=4].
 *        - leftIterator=1, rightIterator=2.
 *        - transformedArray[1] (0) <= transformedArray[2] (4) + 1 (True).
 *        - totalSatisfyingPairs += (3 - 2) = 1. totalSatisfyingPairs = 1.
 *        - leftIterator becomes 2. Loop ends.
 *      - MERGING (subArrayStart=1, midPoint=2, subArrayEnd=3):
 *        - temporaryBuffer = [0, 4]. transformedArray = [1, 0, 4]. (The original [1] and [2] are sorted as [0,4])
 *    - COUNTING (subArrayStart=0, midPoint=1, subArrayEnd=3):
 *      - left half: [transformedArray[0]=1]. right half: [transformedArray[1]=0, transformedArray[2]=4] (sorted from previous merge).
 *      - leftIterator=0, rightIterator=1.
 *      - transformedArray[0] (1) <= transformedArray[1] (0) + 1 (True).
 *      - totalSatisfyingPairs += (3 - 1) = 2. totalSatisfyingPairs = 1 + 2 = 3.
 *      - leftIterator becomes 1. Loop ends.
 *    - MERGING (subArrayStart=0, midPoint=1, subArrayEnd=3):
 *      - temporaryBuffer = [0, 1, 4]. transformedArray = [0, 1, 4].
 * 3. Returns totalSatisfyingPairs = 3.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numberOfPairs = function (nums1, nums2, diff) {
  const totalElementsCount = nums1.length;
  const computedDifferences = new Array(totalElementsCount);

  for (
    let currentElementIndex = 0;
    currentElementIndex < totalElementsCount;
    currentElementIndex++
  ) {
    computedDifferences[currentElementIndex] =
      nums1[currentElementIndex] - nums2[currentElementIndex];
  }

  let totalSatisfyingPairs = 0;

  const countAndSortSegments = (segmentStartBoundary, segmentEndBoundary) => {
    if (segmentEndBoundary - segmentStartBoundary <= 1) {
      return;
    }

    const middlePointIndex = Math.floor(
      (segmentStartBoundary + segmentEndBoundary) / 2,
    );
    countAndSortSegments(segmentStartBoundary, middlePointIndex);
    countAndSortSegments(middlePointIndex, segmentEndBoundary);

    let leftHalfReadPointer = segmentStartBoundary;
    let rightHalfReadPointer = middlePointIndex;

    while (
      leftHalfReadPointer < middlePointIndex &&
      rightHalfReadPointer < segmentEndBoundary
    ) {
      if (
        computedDifferences[leftHalfReadPointer] <=
        computedDifferences[rightHalfReadPointer] + diff
      ) {
        totalSatisfyingPairs += segmentEndBoundary - rightHalfReadPointer;
        leftHalfReadPointer++;
      } else {
        rightHalfReadPointer++;
      }
    }

    const temporaryBuffer = new Array(
      segmentEndBoundary - segmentStartBoundary,
    );
    let temporaryBufferIndex = 0;
    let mergeLeftSegmentPointer = segmentStartBoundary;
    let mergeRightSegmentPointer = middlePointIndex;

    while (
      mergeLeftSegmentPointer < middlePointIndex &&
      mergeRightSegmentPointer < segmentEndBoundary
    ) {
      if (
        computedDifferences[mergeLeftSegmentPointer] <=
        computedDifferences[mergeRightSegmentPointer]
      ) {
        temporaryBuffer[temporaryBufferIndex++] =
          computedDifferences[mergeLeftSegmentPointer++];
      } else {
        temporaryBuffer[temporaryBufferIndex++] =
          computedDifferences[mergeRightSegmentPointer++];
      }
    }

    while (mergeLeftSegmentPointer < middlePointIndex) {
      temporaryBuffer[temporaryBufferIndex++] =
        computedDifferences[mergeLeftSegmentPointer++];
    }

    while (mergeRightSegmentPointer < segmentEndBoundary) {
      temporaryBuffer[temporaryBufferIndex++] =
        computedDifferences[mergeRightSegmentPointer++];
    }

    for (
      let copyBackIndex = 0;
      copyBackIndex < temporaryBuffer.length;
      copyBackIndex++
    ) {
      computedDifferences[segmentStartBoundary + copyBackIndex] =
        temporaryBuffer[copyBackIndex];
    }
  };

  countAndSortSegments(0, totalElementsCount);
  return totalSatisfyingPairs;
};

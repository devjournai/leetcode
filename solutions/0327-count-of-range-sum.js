/**
 * Count Of Range Sum
 * Intuition: Range sum nums[i..j] is prefix[j+1] - prefix[i]. Count pairs of prefixes (left in first half, right in second) whose difference lies in [lower, upper] while merge-sorting the prefixes.
 * Approach: 1. Build prefix array with prefix[0] = 0. 2. Recurse on halves and add their pair counts. 3. For each left prefix, advance two right pointers so differences sit in [lower, upper] and add the window size. 4. Merge the halves sorted and return the total.
 * Dry Run: numbersArray = [-2, 5, -1], lowerBound = -2, upperBound = 2.
 *   - Prefixes [0, -2, 3, 2]. Merge-sort counts three valid differences.
 *   - Return 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countRangeSum = function (numbersArray, lowerBound, upperBound) {
  const accumulatedSums = new Array(numbersArray.length + 1);
  accumulatedSums[0] = 0;
  let currentAccumulation = 0;
  for (
    let currentNumberIndex = 0;
    currentNumberIndex < numbersArray.length;
    currentNumberIndex++
  ) {
    currentAccumulation += numbersArray[currentNumberIndex];
    accumulatedSums[currentNumberIndex + 1] = currentAccumulation;
  }

  function calculateRangeSums(workingArray, segmentStart, segmentEnd) {
    if (segmentEnd - segmentStart < 1) {
      return 0;
    }

    const segmentMid = Math.floor((segmentStart + segmentEnd) / 2);
    let totalRangeCount =
      calculateRangeSums(workingArray, segmentStart, segmentMid) +
      calculateRangeSums(workingArray, segmentMid + 1, segmentEnd);

    let rightSegmentScanStart = segmentMid + 1;
    let rightSegmentScanEnd = segmentMid + 1;
    for (
      let leftSegmentPointer = segmentStart;
      leftSegmentPointer <= segmentMid;
      leftSegmentPointer++
    ) {
      for (
        ;
        rightSegmentScanStart <= segmentEnd &&
        workingArray[rightSegmentScanStart] - workingArray[leftSegmentPointer] <
          lowerBound;
        rightSegmentScanStart++
      );
      for (
        ;
        rightSegmentScanEnd <= segmentEnd &&
        workingArray[rightSegmentScanEnd] - workingArray[leftSegmentPointer] <=
          upperBound;
        rightSegmentScanEnd++
      );

      totalRangeCount += rightSegmentScanEnd - rightSegmentScanStart;
    }

    const mergedSegment = [];
    let leftMergeIndex = segmentStart;
    let rightMergeIndex = segmentMid + 1;

    while (leftMergeIndex <= segmentMid && rightMergeIndex <= segmentEnd) {
      if (workingArray[leftMergeIndex] <= workingArray[rightMergeIndex]) {
        mergedSegment.push(workingArray[leftMergeIndex++]);
      } else {
        mergedSegment.push(workingArray[rightMergeIndex++]);
      }
    }

    while (leftMergeIndex <= segmentMid) {
      mergedSegment.push(workingArray[leftMergeIndex++]);
    }

    while (rightMergeIndex <= segmentEnd) {
      mergedSegment.push(workingArray[rightMergeIndex++]);
    }

    for (
      let copyBackIndex = 0;
      copyBackIndex < mergedSegment.length;
      copyBackIndex++
    ) {
      workingArray[segmentStart + copyBackIndex] = mergedSegment[copyBackIndex];
    }

    return totalRangeCount;
  }

  return calculateRangeSums(accumulatedSums, 0, accumulatedSums.length - 1);
};

/**
 * Count Of Range Sum
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countRangeSum = function (numbersArray, lowerBound, upperBound) {
    const accumulatedSums = new Array(numbersArray.length + 1);
    accumulatedSums[0] = 0;
    let currentAccumulation = 0;
    for (let currentNumberIndex = 0; currentNumberIndex < numbersArray.length; currentNumberIndex++) {
        currentAccumulation += numbersArray[currentNumberIndex];
        accumulatedSums[currentNumberIndex + 1] = currentAccumulation;
    }

    function calculateRangeSums(workingArray, segmentStart, segmentEnd) {
        if (segmentEnd - segmentStart < 1) {
            return 0;
        }

        const segmentMid = Math.floor((segmentStart + segmentEnd) / 2);
        let totalRangeCount = calculateRangeSums(workingArray, segmentStart, segmentMid) +
            calculateRangeSums(workingArray, segmentMid + 1, segmentEnd);

        let rightSegmentScanStart = segmentMid + 1;
        let rightSegmentScanEnd = segmentMid + 1;
        for (let leftSegmentPointer = segmentStart; leftSegmentPointer <= segmentMid; leftSegmentPointer++) {
            for (; rightSegmentScanStart <= segmentEnd && workingArray[rightSegmentScanStart] - workingArray[leftSegmentPointer] < lowerBound; rightSegmentScanStart++);
            for (; rightSegmentScanEnd <= segmentEnd && workingArray[rightSegmentScanEnd] - workingArray[leftSegmentPointer] <= upperBound; rightSegmentScanEnd++);

            totalRangeCount += (rightSegmentScanEnd - rightSegmentScanStart);
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

        for (let copyBackIndex = 0; copyBackIndex < mergedSegment.length; copyBackIndex++) {
            workingArray[segmentStart + copyBackIndex] = mergedSegment[copyBackIndex];
        }

        return totalRangeCount;
    }

    return calculateRangeSums(accumulatedSums, 0, accumulatedSums.length - 1);
};
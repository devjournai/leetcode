/**
 * Summary Ranges
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var summaryRanges = function (nums) {
    const collectedRanges = [];
    const totalElementsCount = nums.length;

    if (totalElementsCount === 0) {
        return collectedRanges;
    }

    let currentRangeStartIndex = 0;

    for (let currentIterationIndex = 0; currentIterationIndex < totalElementsCount; currentIterationIndex++) {
        const valueAtCurrentIndex = nums[currentIterationIndex];
        const valueAfterCurrent = nums[currentIterationIndex + 1];
        const expectedNextConsecutive = valueAtCurrent + 1;

        const isLastElement = (currentIterationIndex === totalElementsCount - 1);
        const isNotConsecutive = (expectedNextConsecutive !== valueAfterCurrent);

        if (isLastElement || isNotConsecutive) {
            const rangeStartNumber = nums[currentRangeStartIndex];
            const rangeEndNumber = valueAtCurrent;
            let rangeOutputString;

            if (rangeStartNumber === rangeEndNumber) {
                rangeOutputString = `${rangeStartNumber}`;
            } else {
                rangeOutputString = `${rangeStartNumber}->${rangeEndNumber}`;
            }
            collectedRanges.push(rangeOutputString);

            currentRangeStartIndex = currentIterationIndex + 1;
        }
    }

    return collectedRanges;
};
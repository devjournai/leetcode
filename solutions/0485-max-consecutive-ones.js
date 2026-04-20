/**
 * Max Consecutive Ones
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findMaxConsecutiveOnes = function (nums) {
    let currentMaximumCount = 0;
    let sequenceLength = 0;
    let arrayIterationIndex = 0;

    while (arrayIterationIndex < nums.length) {
        let valueAtIndex = nums[arrayIterationIndex];
        if (valueAtIndex === 1) {
            sequenceLength++;
        } else {
            sequenceLength = 0;
        }
        currentMaximumCount = Math.max(currentMaximumCount, sequenceLength);
        arrayIterationIndex++;
    }

    return currentMaximumCount;
};
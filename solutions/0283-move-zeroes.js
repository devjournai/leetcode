/**
 * Move Zeroes
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var moveZeroes = function (nums) {
    let nonZeroInsertionPointer = 0;

    for (let currentElementExaminer = 0; currentElementExaminer < nums.length; currentElementExaminer++) {
        if (nums[currentElementExaminer] !== 0) {
            nums[nonZeroInsertionPointer] = nums[currentElementExaminer];
            nonZeroInsertionPointer++;
        }
    }

    for (let zeroFillerIndex = nonZeroInsertionPointer; zeroFillerIndex < nums.length; zeroFillerIndex++) {
        nums[zeroFillerIndex] = 0;
    }
};
/**
 * Wiggle Sort
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var wiggleSort = function (nums) {
    const arraySize = nums.length;

    for (let loopIndex = 0; loopIndex < arraySize - 1; loopIndex++) {
        if (loopIndex % 2 === 0) {
            if (nums[loopIndex] > nums[loopIndex + 1]) {
                [nums[loopIndex], nums[loopIndex + 1]] = [nums[loopIndex + 1], nums[loopIndex]];
            }
        }

        if (loopIndex % 2 !== 0) {
            if (nums[loopIndex] < nums[loopIndex + 1]) {
                [nums[loopIndex], nums[loopIndex + 1]] = [nums[loopIndex + 1], nums[loopIndex]];
            }
        }
    }
};
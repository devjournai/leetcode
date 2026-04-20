/**
 * Search Insert Position
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
*/
var searchInsert = function (nums, target) {
    let lowIndex = 0;
    let highIndex = nums.length - 1;

    while (lowIndex <= highIndex) {
        const midIndex = Math.floor((lowIndex + highIndex) / 2);

        if (nums[midIndex] === target) {
            return midIndex;
        } else if (nums[midIndex] < target) {
            lowIndex = midIndex + 1;
        } else {
            highIndex = midIndex - 1;
        }
    }

    return lowIndex;
};
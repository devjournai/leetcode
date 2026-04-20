/**
 * Sort Colors
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sortColors = function (nums) {
    let lowIndex = 0;
    let highIndex = nums.length - 1;
    let middleIndex = 0;

    while (middleIndex <= highIndex) {
        if (nums[middleIndex] === 0) {
            let swapItemOne = nums[lowIndex];
            nums[lowIndex] = nums[middleIndex];
            nums[middleIndex] = swapItemOne;
            lowIndex++;
            middleIndex++;
        } else if (nums[middleIndex] === 2) {
            let swapItemTwo = nums[highIndex];
            nums[highIndex] = nums[middleIndex];
            nums[middleIndex] = swapItemTwo;
            highIndex--;
        } else {
            middleIndex++;
        }
    }
};
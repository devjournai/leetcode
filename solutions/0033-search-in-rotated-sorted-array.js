/**
 * Search In Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
    let leftBoundary = 0;
    let rightBoundary = nums.length - 1;

    while (leftBoundary <= rightBoundary) {
        let currentMid = Math.floor((leftBoundary + rightBoundary) / 2);
        let midValue = nums[currentMid];

        if (midValue === target) {
            return currentMid;
        }

        let firstValue = nums[leftBoundary];
        let lastValue = nums[rightBoundary];

        if (firstValue <= midValue) {
            if (target >= firstValue && target < midValue) {
                rightBoundary = currentMid - 1;
            } else {
                leftBoundary = currentMid + 1;
            }
        } else {
            if (target > midValue && target <= lastValue) {
                leftBoundary = currentMid + 1;
            } else {
                rightBoundary = currentMid - 1;
            }
        }
    }

    return -1;
};
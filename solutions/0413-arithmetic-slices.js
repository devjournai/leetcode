/**
 * Arithmetic Slices
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfArithmeticSlices = function (nums) {
    const numsLength = nums.length;

    if (numsLength < 3) {
        return 0;
    }

    let totalSlicesFound = 0;
    let consecutiveCount = 0;
    let currentPointer = 2;

    while (currentPointer < numsLength) {
        const firstDifference = nums[currentPointer] - nums[currentPointer - 1];
        const secondDifference = nums[currentPointer - 1] - nums[currentPointer - 2];

        if (firstDifference === secondDifference) {
            consecutiveCount++;
            totalSlicesFound += consecutiveCount;
        } else {
            consecutiveCount = 0;
        }
        currentPointer++;
    }

    return totalSlicesFound;
};
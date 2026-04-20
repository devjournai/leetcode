/**
 * 3Sum Closest
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = Infinity;

    for (let firstPointer = 0; firstPointer < nums.length - 2; firstPointer++) {
        let secondPointer = firstPointer + 1;
        let thirdPointer = nums.length - 1;

        while (secondPointer < thirdPointer) {
            const currentSum = nums[firstPointer] + nums[secondPointer] + nums[thirdPointer];

            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }

            if (currentSum < target) {
                secondPointer++;
            } else if (currentSum > target) {
                thirdPointer--;
            } else {
                return target;
            }
        }
    }

    return closestSum;
};
/**
 * Minimum Pair Removal to Sort Array I
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
*/
var minimumPairRemoval = function (nums) {
    let operations = 0;

    function isNonDecreasing(arr) {
        if (arr.length <= 1) {
            return true;
        }
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    while (!isNonDecreasing(nums)) {
        let minSum = Infinity;
        let minSumIndex = -1;

        for (let i = 0; i < nums.length - 1; i++) {
            const currentSum = nums[i] + nums[i + 1];
            if (currentSum < minSum) {
                minSum = currentSum;
                minSumIndex = i;
            }
        }

        nums[minSumIndex] = minSum;
        nums.splice(minSumIndex + 1, 1);

        operations++;
    }

    return operations;
};
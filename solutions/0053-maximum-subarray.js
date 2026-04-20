/**
 * Maximum Subarray
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var maxSubArray = function (nums) {
    let globalMaxSum = nums[0];
    let currentContiguousSum = nums[0];

    let elementIndex = 1;
    while (elementIndex < nums.length) {
        let currentNumber = nums[elementIndex];
        currentContiguousSum = Math.max(currentNumber, currentContiguousSum + currentNumber);
        globalMaxSum = Math.max(globalMaxSum, currentContiguousSum);
        elementIndex++;
    }

    return globalMaxSum;
};
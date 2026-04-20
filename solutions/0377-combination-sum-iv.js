/**
 * Combination Sum Iv
 * Time Complexity: O(target * nums.length)
 * Space Complexity: O(target)
*/
var combinationSum4 = function (nums, target) {
    const memoizedCounts = new Array(target + 1).fill(0);
    memoizedCounts[0] = 1;

    for (let currentSumTotal = 1; currentSumTotal <= target; currentSumTotal++) {
        for (let currentNumValue of nums) {
            if (currentSumTotal >= currentNumValue) {
                memoizedCounts[currentSumTotal] += memoizedCounts[currentSumTotal - currentNumValue];
            }
        }
    }

    return memoizedCounts[target];
};
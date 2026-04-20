/**
 * Target Sum
 * Time Complexity: O(N * S)
 * Space Complexity: O(N * S)
*/
var findTargetSumWays = function (nums, target) {
    const memoizationStore = new Map();

    function computeCombinations(currentNumberIndex, currentAccumulatedSum) {
        if (currentNumberIndex === nums.length) {
            return currentAccumulatedSum === target ? 1 : 0;
        }

        const stateKey = `${currentNumberIndex},${currentAccumulatedSum}`;

        if (memoizationStore.has(stateKey)) {
            return memoizationStore.get(stateKey);
        }

        const resultFromAddition = computeCombinations(currentNumberIndex + 1, currentAccumulatedSum + nums[currentNumberIndex]);
        const resultFromSubtraction = computeCombinations(currentNumberIndex + 1, currentAccumulatedSum - nums[currentNumberIndex]);

        const totalPossibleWays = resultFromAddition + resultFromSubtraction;

        memoizationStore.set(stateKey, totalPossibleWays);

        return totalPossibleWays;
    }

    return computeCombinations(0, 0);
};
/**
 * Coin Change
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 */
var coinChange = function (coins, amount) {
    if (amount < 0) {
        return -1;
    }
    if (amount === 0) {
        return 0;
    }

    const memoizedResults = new Array(amount + 1).fill(-2);
    memoizedResults[0] = 0;

    function findMinCoins(currentSumToAchieve) {
        if (currentSumToAchieve < 0) {
            return -1;
        }
        if (memoizedResults[currentSumToAchieve] !== -2) {
            return memoizedResults[currentSumToAchieve];
        }

        let currentMinimumCoins = Infinity;

        for (const denominationValue of coins) {
            const recursiveResult = findMinCoins(currentSumToAchieve - denominationValue);

            if (recursiveResult !== -1) {
                currentMinimumCoins = Math.min(currentMinimumCoins, 1 + recursiveResult);
            }
        }

        memoizedResults[currentSumToAchieve] = (currentMinimumCoins === Infinity ? -1 : currentMinimumCoins);
        return memoizedResults[currentSumToAchieve];
    }

    const finalCoinCount = findMinCoins(amount);
    return finalCoinCount;
};
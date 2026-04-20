/**
 * Can I Win
 * Time Complexity: O(maxChoosableInteger * 2^maxChoosableInteger)
 * Space Complexity: O(2^maxChoosableInteger)
*/
var canIWin = function (maxChoosableInteger, desiredTotal) {
    const memoizationCache = new Map();

    if (desiredTotal <= 0) {
        return true;
    }

    const totalPossibleSum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
    if (totalPossibleSum < desiredTotal) {
        return false;
    }

    const canCurrentPlayerWin = (currentUsedNumbersMask, currentDesiredSum) => {
        if (currentDesiredSum <= 0) {
            return false;
        }

        const cacheKey = currentUsedNumbersMask.toString();
        if (memoizationCache.has(cacheKey)) {
            return memoizationCache.get(cacheKey);
        }

        for (let nextNumberChoice = 1; nextNumberChoice <= maxChoosableInteger; nextNumberChoice++) {
            const numberBit = 1 << nextNumberChoice;
            if (!(currentUsedNumbersMask & numberBit)) {

                if (nextNumberChoice >= currentDesiredSum) {
                    memoizationCache.set(cacheKey, true);
                    return true;
                }

                const updatedMask = currentUsedNumbersMask | numberBit;
                const newRemainingSum = currentDesiredSum - nextNumberChoice;
                const opponentOutcome = canCurrentPlayerWin(updatedMask, newRemainingSum);

                if (!opponentOutcome) {
                    memoizationCache.set(cacheKey, true);
                    return true;
                }
            }
        }

        memoizationCache.set(cacheKey, false);
        return false;
    };

    const finalResult = canCurrentPlayerWin(0, desiredTotal);
    return finalResult;
};
/**
 * Factor Combinations
 * Time Complexity: O(C * logN)
 * Space Complexity: O(logN)
 */
var getFactors = function (n) {
    const finalResultCollection = [];

    const initiateFactorSearch = (currentValue, minimumPossibleFactor, currentFactorSequence) => {
        for (let loopFactor = minimumPossibleFactor; loopFactor * loopFactor <= currentValue; loopFactor++) {
            if (currentValue % loopFactor === 0) {
                const quotientValue = currentValue / loopFactor;

                if (quotientValue >= loopFactor) {
                    finalResultCollection.push([...currentFactorSequence, loopFactor, quotientValue]);
                    initiateFactorSearch(quotientValue, loopFactor, [...currentFactorSequence, loopFactor]);
                }
            }
        }
    };

    if (n >= 2) {
        initiateFactorSearch(n, 2, []);
    }

    return finalResultCollection;
};
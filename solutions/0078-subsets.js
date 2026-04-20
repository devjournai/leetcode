/**
 * Subsets
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var subsets = function (nums) {
    const allCollectedSubsets = [];
    allCollectedSubsets.push([]);

    for (const currentNumber of nums) {
        const iterationLength = allCollectedSubsets.length;
        for (let collectionIndex = 0; collectionIndex < iterationLength; collectionIndex++) {
            const baseSubset = allCollectedSubsets[collectionIndex];
            const extendedSubset = [...baseSubset, currentNumber];
            allCollectedSubsets.push(extendedSubset);
        }
    }

    return allCollectedSubsets;
};
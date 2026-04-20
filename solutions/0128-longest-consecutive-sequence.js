/**
 * Longest Consecutive Sequence
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestConsecutive = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    let numberCollection = new Set(nums);
    let longestSequenceLength = 0;

    numberCollection.forEach(function (currentNumericalItem) {
        let previousNumericalItem = currentNumericalItem - 1;

        if (!numberCollection.has(previousNumericalItem)) {
            let currentSequenceExtent = 0;
            let sequenceProgressIdentifier = currentNumericalItem;

            do {
                currentSequenceExtent++;
                sequenceProgressIdentifier++;
            } while (numberCollection.has(sequenceProgressIdentifier));

            longestSequenceLength = Math.max(longestSequenceLength, currentSequenceExtent);
        }
    });

    return longestSequenceLength;
};
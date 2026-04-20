/**
 * Russian Doll Envelopes
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var maxEnvelopes = function (envelopes) {
    envelopes.sort((envelopeOne, envelopeTwo) => {
        if (envelopeOne[0] !== envelopeTwo[0]) {
            return envelopeOne[0] - envelopeTwo[0];
        }
        return envelopeTwo[1] - envelopeOne[1];
    });

    const longestIncreasingSubsequenceTails = [];

    for (const currentEnvelopeTuple of envelopes) {
        const currentHeightValue = currentEnvelopeTuple[1];

        let lowIndex = 0;
        let highIndex = longestIncreasingSubsequenceTails.length;
        let foundPosition = highIndex;

        while (lowIndex < highIndex) {
            const midIndex = Math.floor((lowIndex + highIndex) / 2);
            const midValue = longestIncreasingSubsequenceTails[midIndex];

            if (midValue >= currentHeightValue) {
                foundPosition = midIndex;
                highIndex = midIndex;
            } else {
                lowIndex = midIndex + 1;
            }
        }

        if (foundPosition === longestIncreasingSubsequenceTails.length) {
            longestIncreasingSubsequenceTails.push(currentHeightValue);
        } else {
            longestIncreasingSubsequenceTails[foundPosition] = currentHeightValue;
        }
    }

    return longestIncreasingSubsequenceTails.length;
};
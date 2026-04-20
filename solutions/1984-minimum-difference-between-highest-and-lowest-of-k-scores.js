/**
 * Minimum Difference Between Highest and Lowest of K Scores
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
*/
var minimumDifference = function (inputNumbers, groupSize) {
    inputNumbers.sort((valA, valB) => valA - valB);

    let minimumPossibleDifference = Infinity;
    let windowStartIndex = 0;
    const totalCount = inputNumbers.length;

    while (windowStartIndex <= totalCount - groupSize) {
        const windowEndIndex = windowStartIndex + groupSize - 1;
        const highestScoreInWindow = inputNumbers[windowEndIndex];
        const lowestScoreInWindow = inputNumbers[windowStartIndex];
        const currentWindowDifference = highestScoreInWindow - lowestScoreInWindow;
        minimumPossibleDifference = Math.min(minimumPossibleDifference, currentWindowDifference);
        windowStartIndex++;
    }

    return minimumPossibleDifference;
};
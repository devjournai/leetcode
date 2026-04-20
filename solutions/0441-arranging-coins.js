/**
 * Arranging Coins
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
*/
var arrangeCoins = function (n) {
    let lowerBound = 1;
    let upperBound = n;
    let maxCompleteRows = 0;

    while (lowerBound <= upperBound) {
        let currentGuess = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
        let neededCoins = currentGuess * (currentGuess + 1) / 2;

        if (neededCoins === n) {
            return currentGuess;
        } else if (neededCoins < n) {
            maxCompleteRows = currentGuess;
            lowerBound = currentGuess + 1;
        } else {
            upperBound = currentGuess - 1;
        }
    }
    return maxCompleteRows;
};
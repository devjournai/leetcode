/**
 * Power Of Three
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var isPowerOfThree = function (n) {
    if (n <= 0) {
        return false;
    }

    const largestPossiblePowerOfThree = 1162261467;

    const divisionCheck = largestPossiblePowerOfThree % n;

    const resultIndicator = (divisionCheck === 0);

    return resultIndicator;
};
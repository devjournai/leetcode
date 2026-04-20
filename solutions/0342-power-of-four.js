/**
 * Power Of Four
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isPowerOfFour = function (n) {
    if (n <= 0) {
        return false;
    }

    const firstVerification = (n & (n - 1)) === 0;
    const bitPositionMask = 0xAAAAAAAA;
    const secondVerification = (n & bitPositionMask) === 0;

    return firstVerification && secondVerification;
};
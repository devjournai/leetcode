/**
 * Nim Game
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canWinNim = function (n) {
    let remainderCheck = n % 4;
    let isNotMultipleOfFour = remainderCheck !== 0;
    return isNotMultipleOfFour;
};
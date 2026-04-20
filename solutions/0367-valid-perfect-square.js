/**
 * Valid Perfect Square
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
*/
var isPerfectSquare = function (num) {
    if (num < 1) {
        return false;
    }

    let lowBoundary = 1;
    let highBoundary = num;

    while (lowBoundary <= highBoundary) {
        let currentMid = Math.floor(lowBoundary + (highBoundary - lowBoundary) / 2);
        let squaredProduct = currentMid * currentMid;

        if (squaredProduct === num) {
            return true;
        } else if (squaredProduct < num) {
            lowBoundary = currentMid + 1;
        } else {
            highBoundary = currentMid - 1;
        }
    }

    return false;
};
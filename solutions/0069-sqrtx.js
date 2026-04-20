/**
 * Sqrtx
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
var mySqrt = function (x) {
    if (x < 2) {
        return x;
    }

    let searchLeft = 0;
    let searchRight = x;
    let resultValue = 0;

    while (searchLeft <= searchRight) {
        let middlePoint = Math.floor(searchLeft + (searchRight - searchLeft) / 2);
        if (middlePoint <= x / middlePoint) {
            resultValue = middlePoint;
            searchLeft = middlePoint + 1;
        } else {
            searchRight = middlePoint - 1;
        }
    }

    return resultValue;
};
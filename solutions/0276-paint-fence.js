/**
 * Paint Fence
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numWays = function (n, k) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return k;
    }

    let countSameColor = k;
    let countDifferentColor = k * (k - 1);

    for (let postIndex = 3; postIndex <= n; postIndex++) {
        let previousSameColorCount = countSameColor;
        countSameColor = countDifferentColor;
        countDifferentColor = (previousSameColorCount + countDifferentColor) * (k - 1);
    }

    return countSameColor + countDifferentColor;
};
/**
 * Maximize Area of Square Hole in Grid
 * Time Complexity: O(H log H + V log V)
 * Space Complexity: O(1)
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    const maxHSide = getMaxSide(hBars);
    const maxVSide = getMaxSide(vBars);
    const side = Math.min(maxHSide, maxVSide);
    return side * side;
};

function getMaxSide(bars) {
    bars.sort((a, b) => a - b);
    let maxConsecutiveLength = 1;
    let currentConsecutiveLength = 1;

    for (let i = 1; i < bars.length; i++) {
        if (bars[i] === bars[i-1] + 1) {
            currentConsecutiveLength++;
        } else {
            currentConsecutiveLength = 1;
        }
        maxConsecutiveLength = Math.max(maxConsecutiveLength, currentConsecutiveLength);
    }

    return maxConsecutiveLength + 1;
};
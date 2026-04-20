/**
 * Climbing Stairs
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var climbStairs = function (n) {
    if (n <= 2) {
        return n;
    }

    let previousTwoStepsWays = 1;
    let previousOneStepWays = 2;
    let currentCalculatedWays;

    for (let stepIterator = 3; stepIterator <= n; stepIterator++) {
        currentCalculatedWays = previousTwoStepsWays + previousOneStepWays;
        previousTwoStepsWays = previousOneStepWays;
        previousOneStepWays = currentCalculatedWays;
    }

    return previousOneStepWays;
};
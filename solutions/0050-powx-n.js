/**
 * Powx N
 * Time Complexity: O(log |n|)
 * Space Complexity: O(1)
 */
var myPow = function (x, n) {
    let baseValue = x;
    let exponentValue = n;
    let finalResult = 1.0;

    if (exponentValue < 0) {
        baseValue = 1 / baseValue;
        exponentValue = -exponentValue;
    }

    while (exponentValue > 0) {
        if (exponentValue % 2 === 1) {
            finalResult *= baseValue;
        }
        baseValue *= baseValue;
        exponentValue = Math.floor(exponentValue / 2);
    }

    return finalResult;
};
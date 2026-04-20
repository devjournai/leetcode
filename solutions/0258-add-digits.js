/**
 * Add Digits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var addDigits = function (num) {
    if (num === 0) {
        return 0;
    }

    let digitalRootValue = 1 + (num - 1) % 9;
    return digitalRootValue;
};
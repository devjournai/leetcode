/**
 * Increasing Triplet Subsequence
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var increasingTriplet = function (nums) {
    let firstSmallest = Infinity;
    let secondSmallest = Infinity;

    for (const iteratedValue of nums) {
        if (iteratedValue > secondSmallest) {
            return true;
        } else if (iteratedValue > firstSmallest) {
            secondSmallest = iteratedValue;
        } else {
            firstSmallest = iteratedValue;
        }
    }

    return false;
};
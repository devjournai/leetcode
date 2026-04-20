/**
 * Number Of 1 Bits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var hammingWeight = function (n) {
    let setBitCount = 0;

    while (n !== 0) {
        setBitCount++;
        n = n & (n - 1);
    }

    return setBitCount;
};
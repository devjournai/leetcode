/**
 * Hamming Distance
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var hammingDistance = function (x, y) {
    let bitwiseDifference = x ^ y;
    let differingBitsCount = 0;

    while (bitwiseDifference !== 0) {
        differingBitsCount++;
        bitwiseDifference &= (bitwiseDifference - 1);
    }

    return differingBitsCount;
};
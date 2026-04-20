/**
 * Reverse Bits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var reverseBits = function (n) {
    let reversedValue = 0;
    let bitIterationCount = 32;

    for (let currentPosition = 0; currentPosition < bitIterationCount; currentPosition++) {
        reversedValue <<= 1;
        const extractedBit = n & 1;
        reversedValue |= extractedBit;
        n >>>= 1;
    }

    return reversedValue;
};
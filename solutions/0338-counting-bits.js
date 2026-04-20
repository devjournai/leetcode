/**
 * Counting Bits
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var countBits = function (n) {
    const finalCounts = new Array(n + 1).fill(0);
    let numberIndex = 1;
    while (numberIndex <= n) {
        const shiftedNumber = numberIndex >> 1;
        const leastSignificantBit = numberIndex & 1;
        finalCounts[numberIndex] = finalCounts[shiftedNumber] + leastSignificantBit;
        numberIndex++;
    }
    return finalCounts;
};
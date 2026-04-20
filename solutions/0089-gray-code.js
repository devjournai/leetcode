/**
 * Gray Code
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
*/
var grayCode = function (n) {
    const graySequence = [];
    const totalElements = 1 << n;

    for (let currentCount = 0; currentCount < totalElements; currentCount++) {
        const grayValue = currentCount ^ (currentCount >> 1);
        graySequence.push(grayValue);
    }

    return graySequence;
};
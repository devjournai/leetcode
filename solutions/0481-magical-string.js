/**
 * Magical String
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var magicalString = function (n) {
    if (n === 0) {
        return 0;
    }
    if (n <= 3) {
        return 1;
    }

    const generatedSequence = [1, 2, 2];
    let onesCount = 1;

    let readPointer = 2;
    let digitToCreate = 1;

    while (generatedSequence.length < n) {
        let repeatCount = generatedSequence[readPointer];

        let currentAppendCount = 0;
        while (currentAppendCount < repeatCount) {
            if (generatedSequence.length < n) {
                generatedSequence.push(digitToCreate);
                if (digitToCreate === 1) {
                    onesCount++;
                }
            }
            currentAppendCount++;
        }

        readPointer++;
        digitToCreate = (digitToCreate === 1) ? 2 : 1;
    }

    return onesCount;
};
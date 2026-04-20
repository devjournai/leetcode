/**
 * Number Complement
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findComplement = function (inputNumber) {
    let bitsCoveredMask = inputNumber;
    bitsCoveredMask |= bitsCoveredMask >> 1;
    bitsCoveredMask |= bitsCoveredMask >> 2;
    bitsCoveredMask |= bitsCoveredMask >> 4;
    bitsCoveredMask |= bitsCoveredMask >> 8;
    bitsCoveredMask |= bitsCoveredMask >> 16;

    let finalAnswer = bitsCoveredMask ^ inputNumber;

    return finalAnswer;
};
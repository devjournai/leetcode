/**
 * Permutation Sequence
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
*/
var getPermutation = function (n, k) {
    const factorialProducts = [1];
    for (let digitStep = 1; digitStep < n; digitStep++) {
        factorialProducts[digitStep] = factorialProducts[digitStep - 1] * digitStep;
    }

    const availableDigits = new Array(n).fill(0).map((_element, mapIndex) => mapIndex + 1);
    let permutationResult = "";
    let adjustedKth = k - 1;

    for (let remainingSlots = n - 1; remainingSlots >= 0; remainingSlots--) {
        const currentDigitIndex = Math.floor(adjustedKth / factorialProducts[remainingSlots]);
        adjustedKth %= factorialProducts[remainingSlots];
        permutationResult += availableDigits[currentDigitIndex];
        availableDigits.splice(currentDigitIndex, 1);
    }

    return permutationResult;
};
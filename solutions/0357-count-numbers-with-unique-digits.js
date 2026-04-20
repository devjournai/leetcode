/**
 * Count Numbers With Unique Digits
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countNumbersWithUniqueDigits = function (n) {
    if (n === 0) {
        return 1;
    }

    let totalUniqueCount = 10;
    let permutationProduct = 9;
    let availableChoices = 9;

    for (let currentLength = 2; currentLength <= n; currentLength++) {
        permutationProduct = permutationProduct * availableChoices;
        totalUniqueCount = totalUniqueCount + permutationProduct;
        availableChoices--;
    }

    return totalUniqueCount;
};
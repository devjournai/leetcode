/**
 * Ones And Zeroes
 * Time Complexity: O(S * (L + m * n))
 * Space Complexity: O(m * n)
*/
var findMaxForm = function (strs, m, n) {
    const dpTable = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (const inputStringItem of strs) {
        const zeroCountForItem = (inputStringItem.match(/0/g) || []).length;
        const oneCountForItem = inputStringItem.length - zeroCountForItem;

        for (let currentZeroBudget = m; currentZeroBudget >= zeroCountForItem; currentZeroBudget--) {
            for (let currentOneBudget = n; currentOneBudget >= oneCountForItem; currentOneBudget--) {
                dpTable[currentZeroBudget][currentOneBudget] = Math.max(
                    dpTable[currentZeroBudget][currentOneBudget],
                    dpTable[currentZeroBudget - zeroCountForItem][currentOneBudget - oneCountForItem] + 1
                );
            }
        }
    }

    return dpTable[m][n];
};
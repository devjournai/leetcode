/**
 * Ones And Zeroes
 * Intuition: Each string is an item costing some zeros and ones. Maximize the number of items under budgets m zeros and n ones — 0/1 knapsack on a 2D capacity table, updated backward so each string is used at most once.
 * Approach: 1. `dpTable[z][o]` = best count using at most z zeros and o ones. 2. For each string, count zeros (regex `/0/g`) and ones = length − zeros. 3. Loop `currentZeroBudget` from m down to that cost and ones budget from n down; take max(skip, `dp[z-zeros][o-ones]+1`). 4. Return `dpTable[m][n]`.
 * Dry Run: strs = ["10","0","1"], m = 1, n = 1.
 *   - "10" (1 zero, 1 one): dp[1][1] = 1.
 *   - "0": dp[1][0] = 1; dp[1][1] stays 1.
 *   - "1": dp[1][1] = max(1, dp[1][0]+1) = 2. Return 2.
 * Time Complexity: O(S * (L + m * n))
 * Space Complexity: O(m * n)
 */
var findMaxForm = function (strs, m, n) {
  const dpTable = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (const inputStringItem of strs) {
    const zeroCountForItem = (inputStringItem.match(/0/g) || []).length;
    const oneCountForItem = inputStringItem.length - zeroCountForItem;

    for (
      let currentZeroBudget = m;
      currentZeroBudget >= zeroCountForItem;
      currentZeroBudget--
    ) {
      for (
        let currentOneBudget = n;
        currentOneBudget >= oneCountForItem;
        currentOneBudget--
      ) {
        dpTable[currentZeroBudget][currentOneBudget] = Math.max(
          dpTable[currentZeroBudget][currentOneBudget],
          dpTable[currentZeroBudget - zeroCountForItem][
            currentOneBudget - oneCountForItem
          ] + 1
        );
      }
    }
  }

  return dpTable[m][n];
};

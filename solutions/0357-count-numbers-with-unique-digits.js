/**
 * Count Numbers With Unique Digits
 * Intuition: Count n-digit numbers with all distinct digits by multiplying remaining unused digits (first digit 9 choices excluding 0, then 9, 8, …), and accumulate those counts onto the 1-digit total of 10 (0–9).
 * Approach: 1. n === 0 returns 1. 2. Start with `totalUniqueCount = 10`, `permutationProduct = 9`, `availableChoices = 9`. 3. For length 2..n, multiply the running permutation by remaining choices, add it to the total, then decrement available choices.
 * Dry Run: n = 2. Start 10; length 2 adds 9*9 = 81 → 91.
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

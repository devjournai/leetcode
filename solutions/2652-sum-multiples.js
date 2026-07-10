/**
 * Sum Multiples
 * Intuition: The problem requires summing multiples of 3, 5, or 7. Directly summing these would lead to double-counting numbers divisible by combinations (e.g., 15 is divisible by 3 and 5). The Principle of Inclusion-Exclusion is suitable to correctly account for these overlaps.
 * Approach: 1. Identify the divisors: 3, 5, 7. Their pairwise LCMs: 15 (3*5), 21 (3*7), 35 (5*7). Their triple LCM: 105 (3*5*7). 2. For each divisor `k`, calculate the sum of its multiples up to `n` using the arithmetic series formula: `k * (floor(n/k) * (floor(n/k) + 1) / 2)`. 3. Apply the Inclusion-Exclusion Principle: Sum(3) + Sum(5) + Sum(7) - Sum(15) - Sum(21) - Sum(35) + Sum(105).
 * Dry Run: n = 10
 *   countForThree = Math.floor(10 / 3) = 3; sumForThree = 3 * 3 * (3 + 1) / 2 = 18.
 *   countForFive = Math.floor(10 / 5) = 2; sumForFive = 5 * 2 * (2 + 1) / 2 = 15.
 *   countForSeven = Math.floor(10 / 7) = 1; sumForSeven = 7 * 1 * (1 + 1) / 2 = 7.
 *   countForFifteen = Math.floor(10 / 15) = 0; sumForFifteen = 15 * 0 * (0 + 1) / 2 = 0.
 *   countForTwentyOne = Math.floor(10 / 21) = 0; sumForTwentyOne = 21 * 0 * (0 + 1) / 2 = 0.
 *   countForThirtyFive = Math.floor(10 / 35) = 0; sumForThirtyFive = 35 * 0 * (0 + 1) / 2 = 0.
 *   countForOneHundredFive = Math.floor(10 / 105) = 0; sumForOneHundredFive = 105 * 0 * (0 + 1) / 2 = 0.
 *   resultTotal = 18 + 15 + 7 - 0 - 0 - 0 + 0 = 40.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sumOfMultiples = function (n) {
  const countForThree = Math.floor(n / 3);
  const sumForThree = (3 * countForThree * (countForThree + 1)) / 2;

  const countForFive = Math.floor(n / 5);
  const sumForFive = (5 * countForFive * (countForFive + 1)) / 2;

  const countForSeven = Math.floor(n / 7);
  const sumForSeven = (7 * countForSeven * (countForSeven + 1)) / 2;

  const countForFifteen = Math.floor(n / 15);
  const sumForFifteen = (15 * countForFifteen * (countForFifteen + 1)) / 2;

  const countForTwentyOne = Math.floor(n / 21);
  const sumForTwentyOne =
    (21 * countForTwentyOne * (countForTwentyOne + 1)) / 2;

  const countForThirtyFive = Math.floor(n / 35);
  const sumForThirtyFive =
    (35 * countForThirtyFive * (countForThirtyFive + 1)) / 2;

  const countForOneHundredFive = Math.floor(n / 105);
  const sumForOneHundredFive =
    (105 * countForOneHundredFive * (countForOneHundredFive + 1)) / 2;

  const finalSumResult =
    sumForThree +
    sumForFive +
    sumForSeven -
    sumForFifteen -
    sumForTwentyOne -
    sumForThirtyFive +
    sumForOneHundredFive;

  return finalSumResult;
};

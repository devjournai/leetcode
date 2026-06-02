/**
 * Number Of Single Divisor Triplets
 * Intuition: The problem asks to count ordered triplets of distinct indices (i, j, k) where the sum `nums[i] + nums[j] + nums[k]` is divisible by exactly one of `nums[i]`, `nums[j]`, or `nums[k]`. Given the constraint that numbers are positive integers between 1 and 100, we can optimize by iterating through possible *values* (a, b, c) that can form a triplet, rather than distinct indices directly.
 * Approach:
 * 1. Initialize an array `numberFrequencies` of size 101 to store the frequency of each number from 1 to 100 present in the input `nums` array. Populate this array by iterating through `nums`.
 * 2. Initialize `totalValidTriplets` to 0. This variable will accumulate the final count of ordered single divisor triplets.
 * 3. Use three nested loops to iterate through all unique combinations of three values `firstValue`, `secondValue`, and `thirdValue` such that `1 <= firstValue <= secondValue <= thirdValue <= 100`. This ensures each set of three values is considered exactly once.
 * 4. Inside the innermost loop, check if `numberFrequencies` has sufficient counts for `firstValue`, `secondValue`, and `thirdValue` to form a triplet. If any value has zero occurrences, skip this combination.
 * 5. Calculate `calculatedSum = firstValue + secondValue + thirdValue`.
 * 6. Determine `divisorHitCount` by checking if `calculatedSum` is divisible by `firstValue`, `secondValue`, and `thirdValue` individually. Increment `divisorHitCount` for each successful division.
 * 7. If `divisorHitCount` is exactly 1, then this set of values `(firstValue, secondValue, thirdValue)` satisfies the single divisor condition.
 * 8. Based on the equality of `firstValue`, `secondValue`, and `thirdValue`, calculate the number of ways to pick distinct indices and their permutations:
 *    a. If `firstValue = secondValue = thirdValue`: This case is impossible for a single divisor triplet because `3 * firstValue` is always divisible by `firstValue` three times, making `divisorHitCount` equal to 3. So, no additions are made.
 *    b. If `firstValue = secondValue` and `firstValue < thirdValue` (e.g., A, A, B):
 *       The number of ways to pick two distinct indices for `firstValue` and one for `thirdValue` is `(numberFrequencies[firstValue] * (numberFrequencies[firstValue] - 1) / 2) * numberFrequencies[thirdValue]`.
 *       These chosen indices can be arranged in `3` distinct ordered ways (e.g., `(idx_A1, idx_A2, idx_B)`, `(idx_A1, idx_B, idx_A2)`, `(idx_B, idx_A1, idx_A2)`).
 *       Add this quantity multiplied by `3` to `totalValidTriplets`.
 *    c. If `firstValue < secondValue` and `secondValue = thirdValue` (e.g., A, B, B):
 *       The number of ways to pick one distinct index for `firstValue` and two for `secondValue` is `numberFrequencies[firstValue] * (numberFrequencies[secondValue] * (numberFrequencies[secondValue] - 1) / 2)`.
 *       These chosen indices can be arranged in `3` distinct ordered ways.
 *       Add this quantity multiplied by `3` to `totalValidTriplets`.
 *    d. If `firstValue < secondValue < thirdValue` (e.g., A, B, C):
 *       The number of ways to pick one distinct index for each value is `numberFrequencies[firstValue] * numberFrequencies[secondValue] * numberFrequencies[thirdValue]`.
 *       These chosen indices can be arranged in `6` distinct ordered ways (`3!` permutations).
 *       Add this quantity multiplied by `6` to `totalValidTriplets`.
 * 9. After iterating through all value combinations, return `totalValidTriplets`.
 * Dry Run:
 * nums = [1, 5, 5]
 * 1. `numberFrequencies = new Array(101).fill(0)`
 *    `numberFrequencies[1] = 1`
 *    `numberFrequencies[5] = 2`
 * 2. `totalValidTriplets = 0`
 * 3. Loops for `firstValue`, `secondValue`, `thirdValue`:
 *    - Many iterations will skip due to `numberFrequencies[...] === 0`.
 *    - Consider `firstValue = 1`, `secondValue = 1`, `thirdValue = 1`:
 *      `numberFrequencies[1]` is 1. `(1 * 0 * -1 / 6)` would be 0 ways. Skip this value set (not enough 1s).
 *    - Consider `firstValue = 1`, `secondValue = 5`, `thirdValue = 5`:
 *      `numberFrequencies[1] = 1`, `numberFrequencies[5] = 2`. All counts are sufficient.
 *      `calculatedSum = 1 + 5 + 5 = 11`.
 *      `divisorHitCount = 0`.
 *      `11 % 1 === 0` (true) -> `divisorHitCount = 1`.
 *      `11 % 5 === 0` (false).
 *      `11 % 5 === 0` (false).
 *      `divisorHitCount` is 1. Condition met!
 *      Values are `firstValue=1`, `secondValue=5`, `thirdValue=5`. This matches `A < B = B` case.
 *      `waysToChooseAndPermute = numberFrequencies[1] * (numberFrequencies[5] * (numberFrequencies[5] - 1) / 2) * 3`.
 *      `waysToChooseAndPermute = 1 * (2 * (2 - 1) / 2) * 3`.
 *      `waysToChooseAndPermute = 1 * (2 * 1 / 2) * 3`.
 *      `waysToChooseAndPermute = 1 * 1 * 3 = 3`.
 *      `totalValidTriplets += 3`. `totalValidTriplets` is now 3.
 * 5. All other combinations will either have `numberFrequencies[...] === 0` or will not result in `divisorHitCount === 1`.
 * 6. Return `totalValidTriplets` which is 3.
 * Time Complexity: O(N + MaxValue^3)
 * Space Complexity: O(MaxValue)
 */
var singleDivisorTriplet = function (nums) {
  const numberFrequencies = new Array(101).fill(0);

  for (const currentNumber of nums) {
    numberFrequencies[currentNumber]++;
  }

  let totalValidTriplets = 0;

  for (let firstValue = 1; firstValue <= 100; ++firstValue) {
    if (numberFrequencies[firstValue] === 0) {
      continue;
    }

    for (let secondValue = firstValue; secondValue <= 100; ++secondValue) {
      if (numberFrequencies[secondValue] === 0) {
        continue;
      }

      for (let thirdValue = secondValue; thirdValue <= 100; ++thirdValue) {
        if (numberFrequencies[thirdValue] === 0) {
          continue;
        }

        const calculatedSum = firstValue + secondValue + thirdValue;
        let divisorHitCount = 0;

        if (calculatedSum % firstValue === 0) {
          divisorHitCount++;
        }
        // Only check secondValue if it's distinct from firstValue to avoid double counting for (X,X,Y) logic
        // The problem phrasing "divisible by exactly one of nums[i], nums[j], or nums[k]" implies checking each of the three.
        // So, if nums[i]=1, nums[j]=1, nums[k]=3, sum=5, it means (5%1==0) and (5%1==0) and (5%3!=0). Divisor count is 2.
        if (calculatedSum % secondValue === 0) {
          divisorHitCount++;
        }
        if (calculatedSum % thirdValue === 0) {
          divisorHitCount++;
        }

        if (divisorHitCount === 1) {
          let indexCombinationFactor = 0;
          let permutationMultiplier = 0;

          if (firstValue === secondValue && secondValue === thirdValue) {
            // All three values are the same (e.g., A, A, A).
            // This case will always result in divisorHitCount = 3 (since sum = 3*A is divisible by A thrice).
            // So, it can never be a single divisor triplet.
            // For completeness and distinctness of control flow, we can include it, but it contributes 0.
            // indexCombinationFactor = (numberFrequencies[firstValue] * (numberFrequencies[firstValue] - 1) * (numberFrequencies[firstValue] - 2)) / 6;
            // permutationMultiplier = 6;
            // If indexCombinationFactor is valid, divisorHitCount would be 3, so this branch won't be entered.
          } else if (firstValue === secondValue) {
            // Case A, A, B where B > A
            indexCombinationFactor =
              ((numberFrequencies[firstValue] *
                (numberFrequencies[firstValue] - 1)) /
                2) *
              numberFrequencies[thirdValue];
            permutationMultiplier = 3; // Number of ways to arrange (X, X, Y) in an ordered triplet
          } else if (secondValue === thirdValue) {
            // Case A, B, B where B > A
            indexCombinationFactor =
              numberFrequencies[firstValue] *
              ((numberFrequencies[secondValue] *
                (numberFrequencies[secondValue] - 1)) /
                2);
            permutationMultiplier = 3; // Number of ways to arrange (X, Y, Y) in an ordered triplet
          } else {
            // Case A, B, C where A < B < C
            indexCombinationFactor =
              numberFrequencies[firstValue] *
              numberFrequencies[secondValue] *
              numberFrequencies[thirdValue];
            permutationMultiplier = 6; // Number of ways to arrange (X, Y, Z) in an ordered triplet (3! permutations)
          }
          totalValidTriplets += indexCombinationFactor * permutationMultiplier;
        }
      }
    }
  }

  return totalValidTriplets;
};

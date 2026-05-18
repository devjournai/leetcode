/**
 * Find Missing Observations
 * Intuition: The problem asks us to find a sequence of 'n' missing dice rolls such that the average of all 'm + n' rolls equals a given 'mean'. The core idea is to first determine the total sum required for all 'm + n' rolls to achieve the specified mean. Then, we subtract the sum of the 'm' known rolls to find the exact sum that the 'n' missing rolls must contribute. Finally, we distribute this required sum among the 'n' missing rolls, ensuring each roll is between 1 and 6, by distributing a base value and then adding 1 to some rolls to account for any remainder.
 * Approach: 1. Calculate the combined total length of all rolls (`m + n`). 2. Determine the target sum for all rolls by multiplying the `mean` by the combined total length. 3. Compute the current sum of the observed `m` rolls. 4. Calculate the `remainingSum` that must be covered by the `n` missing rolls (target sum - current sum). 5. Check for feasibility: If `remainingSum` is less than `n * 1` (minimum possible sum) or greater than `n * 6` (maximum possible sum), no valid sequence exists, so return an empty array. 6. If feasible, distribute the `remainingSum` among the `n` missing rolls: Calculate a `baseQuantity` by integer division (`remainingSum / n`) and an `extraPortion` as the remainder (`remainingSum % n`). 7. Create a result array where the first `extraPortion` elements are `baseQuantity + 1`, and the remaining `n - extraPortion` elements are `baseQuantity`. 8. Return the constructed result array.
 * Dry Run: rolls = [1, 5, 6], mean = 3, n = 4
 * 1. `observedLength` = `rolls.length` = 3
 * 2. `overallLength` = `observedLength` + `n` = 3 + 4 = 7
 * 3. `targetTotalSum` = `mean` * `overallLength` = 3 * 7 = 21
 * 4. `existingSum` = `rolls.reduce((acc, current) => acc + current, 0)` = 1 + 5 + 6 = 12
 * 5. `requiredMissingSum` = `targetTotalSum` - `existingSum` = 21 - 12 = 9
 * 6. Feasibility check:
 *    `minimumPossibleSum` = `n` * 1 = 4 * 1 = 4
 *    `maximumPossibleSum` = `n` * 6 = 4 * 6 = 24
 *    Since 4 <= 9 <= 24, a solution is possible.
 * 7. Distribution:
 *    `baseQuantity` = `Math.floor(requiredMissingSum / n)` = `Math.floor(9 / 4)` = 2
 *    `extraPortion` = `requiredMissingSum % n` = 9 % 4 = 1
 * 8. Construct `finalObservations` array:
 *    Initialize `finalObservations = []`
 *    Loop `idxCounter` from 0 to `n-1` (0 to 3):
 *    - `idxCounter = 0`: `0 < extraPortion (1)` is true. `finalObservations.push(baseQuantity + 1)` -> `finalObservations.push(2 + 1)` -> `[3]`
 *    - `idxCounter = 1`: `1 < extraPortion (1)` is false. `finalObservations.push(baseQuantity)` -> `finalObservations.push(2)` -> `[3, 2]`
 *    - `idxCounter = 2`: `2 < extraPortion (1)` is false. `finalObservations.push(baseQuantity)` -> `finalObservations.push(2)` -> `[3, 2, 2]`
 *    - `idxCounter = 3`: `3 < extraPortion (1)` is false. `finalObservations.push(baseQuantity)` -> `finalObservations.push(2)` -> `[3, 2, 2, 2]`
 * 9. Return `[3, 2, 2, 2]`
 * Time Complexity: O(m + n)
 * Space Complexity: O(n)
 */
var missingRolls = function (rolls, mean, n) {
  const observedLength = rolls.length;
  const overallLength = observedLength + n;
  const targetTotalSum = mean * overallLength;

  const existingSum = rolls.reduce(
    (accumulator, currentRoll) => accumulator + currentRoll,
    0,
  );

  const requiredMissingSum = targetTotalSum - existingSum;

  const minimumPossibleSum = n * 1;
  const maximumPossibleSum = n * 6;

  if (
    requiredMissingSum < minimumPossibleSum ||
    requiredMissingSum > maximumPossibleSum
  ) {
    return [];
  }

  const baseQuantity = Math.floor(requiredMissingSum / n);
  const extraPortion = requiredMissingSum % n;
  const finalObservations = [];

  for (let idxCounter = 0; idxCounter < n; idxCounter++) {
    if (idxCounter < extraPortion) {
      finalObservations.push(baseQuantity + 1);
    } else {
      finalObservations.push(baseQuantity);
    }
  }

  return finalObservations;
};

/**
 * K Items With The Maximum Sum
 * Intuition: To maximize the sum, one should always prioritize picking items with value 1, then items with value 0, and finally items with value -1.
 * Approach: 1. Initialize maximumSum to 0 and remainingPicks to k. 2. Calculate how many '1's can be picked by taking the minimum of numOnes and remainingPicks. Add this amount to maximumSum and subtract from remainingPicks. 3. If remainingPicks is still greater than 0, calculate how many '0's can be picked by taking the minimum of numZeros and remainingPicks. Subtract this amount from remainingPicks (picking '0's does not change the sum). 4. If remainingPicks is still greater than 0, calculate how many '-1's can be picked by taking the minimum of numNegOnes and remainingPicks. Subtract this amount from maximumSum. 5. Return maximumSum.
 * Dry Run: numOnes = 2, numZeros = 2, numNegOnes = 1, k = 5
 *   - Initialize maximumSum = 0, remainingPicks = 5.
 *   - Pick '1's:
 *     - pickedOnes = Math.min(numOnes (2), remainingPicks (5)) = 2.
 *     - maximumSum = 0 + 2 = 2.
 *     - remainingPicks = 5 - 2 = 3.
 *   - Check remainingPicks (3 > 0). Pick '0's:
 *     - pickedZeros = Math.min(numZeros (2), remainingPicks (3)) = 2.
 *     - (maximumSum remains 2 as 0s add nothing).
 *     - remainingPicks = 3 - 2 = 1.
 *   - Check remainingPicks (1 > 0). Pick '-1's:
 *     - pickedNegOnes = Math.min(numNegOnes (1), remainingPicks (1)) = 1.
 *     - maximumSum = 2 - 1 = 1.
 *     - (remainingPicks would be 1 - 1 = 0, but not strictly needed for final sum).
 *   - Return maximumSum (1).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var kItemsWithMaximumSum = function (numOnes, numZeros, numNegOnes, k) {
  let maximumSum = 0;
  let itemsRemainingToPick = k;

  let takeOnes = Math.min(numOnes, itemsRemainingToPick);
  maximumSum += takeOnes;
  itemsRemainingToPick -= takeOnes;

  if (itemsRemainingToPick > 0) {
    let takeZeros = Math.min(numZeros, itemsRemainingToPick);
    itemsRemainingToPick -= takeZeros;
  }

  if (itemsRemainingToPick > 0) {
    let takeNegOnes = Math.min(numNegOnes, itemsRemainingToPick);
    maximumSum -= takeNegOnes;
  }

  return maximumSum;
};

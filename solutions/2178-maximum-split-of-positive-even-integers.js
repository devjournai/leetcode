/**
 * Maximum Split Of Positive Even Integers
 * Intuition: To maximize the number of unique positive even integers in a split of `finalSum`, we should greedily use the smallest possible unique positive even integers (2, 4, 6, ...) first. We continue this process as long as adding the current smallest even integer leaves enough remaining sum to potentially form another distinct even integer later. The crucial edge case is when adding the current smallest even integer would leave a remainder that is less than or equal to itself; in this scenario, it's optimal to add the entire remaining sum as the final element to ensure uniqueness and maximize count.
 * Approach: 1. First, check if `finalSum` is odd. If so, it's impossible to split it into a sum of even integers, so return an empty array. 2. Initialize an empty array `collectedParts` to store the unique even integers. 3. Initialize `currentValueToConsider` to 2 and `runningSumRemaining` to `finalSum`. 4. Enter a loop that continues indefinitely until an explicit break condition is met. 5. Inside the loop, check if `runningSumRemaining` is less than `currentValueToConsider`. If it is, it means we can no longer add `currentValueToConsider` (or any larger even number), so break the loop. 6. Next, evaluate if `runningSumRemaining` is less than or equal to `2 * currentValueToConsider`. This condition signals that if we were to add `currentValueToConsider`, the subsequent `runningSumRemaining` would be less than or equal to `currentValueToConsider` itself. In this case, to maintain uniqueness and maximize the count, the entire `runningSumRemaining` must be added as the final element to `collectedParts`. After adding, break the loop. 7. If neither of the above conditions is met, it means we can safely add `currentValueToConsider`. Add it to `collectedParts`, subtract it from `runningSumRemaining`, and increment `currentValueToConsider` by 2 for the next iteration. 8. Finally, return `collectedParts`.
 * Dry Run: finalSum = 12
 * 1. initialSum = 12. 12 % 2 !== 0 is false.
 * 2. collectedParts = [].
 * 3. currentValueToConsider = 2.
 * 4. runningSumRemaining = 12.
 * 5. Loop starts:
 *    - Iteration 1:
 *      - currentValueToConsider = 2.
 *      - runningSumRemaining (12) is not less than currentValueToConsider (2).
 *      - runningSumRemaining (12) <= 2 * currentValueToConsider (2*2=4) is false.
 *      - Add 2 to collectedParts: collectedParts = [2].
 *      - Subtract 2 from runningSumRemaining: runningSumRemaining = 10.
 *      - currentValueToConsider becomes 4.
 *    - Iteration 2:
 *      - currentValueToConsider = 4.
 *      - runningSumRemaining (10) is not less than currentValueToConsider (4).
 *      - runningSumRemaining (10) <= 2 * currentValueToConsider (2*4=8) is false.
 *      - Add 4 to collectedParts: collectedParts = [2, 4].
 *      - Subtract 4 from runningSumRemaining: runningSumRemaining = 6.
 *      - currentValueToConsider becomes 6.
 *    - Iteration 3:
 *      - currentValueToConsider = 6.
 *      - runningSumRemaining (6) is not less than currentValueToConsider (6).
 *      - runningSumRemaining (6) <= 2 * currentValueToConsider (2*6=12) is true.
 *      - Add runningSumRemaining (6) to collectedParts: collectedParts = [2, 4, 6].
 *      - Break loop.
 * 6. Return [2, 4, 6].
 * Time Complexity: O(sqrt(finalSum))
 * Space Complexity: O(sqrt(finalSum))
 */
var maximumEvenSplit = function (finalSum) {
  if (finalSum % 2 !== 0) {
    return [];
  }

  const collectedParts = [];
  let runningSumRemaining = finalSum;

  for (let currentValueToConsider = 2; ; currentValueToConsider += 2) {
    if (runningSumRemaining < currentValueToConsider) {
      break;
    }

    if (runningSumRemaining <= 2 * currentValueToConsider) {
      collectedParts.push(runningSumRemaining);
      break;
    }

    collectedParts.push(currentValueToConsider);
    runningSumRemaining -= currentValueToConsider;
  }

  return collectedParts;
};

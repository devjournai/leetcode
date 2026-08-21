/**
 * Removing Minimum Number Of Magic Beans
 * Intuition: The optimal number of beans `k` to keep in each non-empty bag must be one of the original bean counts present in the input array. By sorting the array, we can efficiently iterate through each potential target `k` and calculate the cost.
 * Approach: 1. Sort the input `beans` array in non-decreasing order. 2. Calculate the total sum of all beans, `initialTotalBeans`. 3. Initialize `minimumRemovedBeans` to `initialTotalBeans` (representing the worst case where all beans are removed). 4. Iterate through the sorted array using a `while` loop, considering each `sortedBeanAmounts[currentLoopIndex]` as the target value `k` for remaining bags. 5. For each `currentBeanValue` (target `k`), calculate the `numberOfRemainingBags` (all bags from the current index to the end). 6. The cost for this target `k` is `initialTotalBeans - (currentBeanValue * numberOfRemainingBags)`. 7. Update `minimumRemovedBeans` with the minimum of its current value and the `currentCost`. 8. Return `minimumRemovedBeans` after checking all possible targets.
 * Dry Run: beans = [4, 1, 6, 5]
 *   1. sortedBeanAmounts = [1, 4, 5, 6]
 *   2. initialTotalBeans = 1 + 4 + 5 + 6 = 16
 *   3. minimumRemovedBeans = 16
 *   4. currentLoopIndex = 0, beansArrayLength = 4
 *   Iteration 1 (currentLoopIndex = 0, currentBeanValue = 1):
 *     numberOfRemainingBags = 4 - 0 = 4
 *     currentCost = 16 - (1 * 4) = 12
 *     minimumRemovedBeans = min(16, 12) = 12
 *     currentLoopIndex becomes 1.
 *   Iteration 2 (currentLoopIndex = 1, currentBeanValue = 4):
 *     numberOfRemainingBags = 4 - 1 = 3
 *     currentCost = 16 - (4 * 3) = 4
 *     minimumRemovedBeans = min(12, 4) = 4
 *     currentLoopIndex becomes 2.
 *   Iteration 3 (currentLoopIndex = 2, currentBeanValue = 5):
 *     numberOfRemainingBags = 4 - 2 = 2
 *     currentCost = 16 - (5 * 2) = 6
 *     minimumRemovedBeans = min(4, 6) = 4
 *     currentLoopIndex becomes 3.
 *   Iteration 4 (currentLoopIndex = 3, currentBeanValue = 6):
 *     numberOfRemainingBags = 4 - 3 = 1
 *     currentCost = 16 - (6 * 1) = 10
 *     minimumRemovedBeans = min(4, 10) = 4
 *     currentLoopIndex becomes 4.
 *   Loop ends. Return 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minimumRemoval = function (beans) {
  const sortedBeanAmounts = beans.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );
  const initialTotalBeans = sortedBeanAmounts.reduce(
    (totalAccumulator, currentAmount) => totalAccumulator + currentAmount,
    0
  );

  let minimumRemovedBeans = initialTotalBeans;
  let currentLoopIndex = 0;
  const beansArrayLength = sortedBeanAmounts.length;

  while (currentLoopIndex < beansArrayLength) {
    const currentBeanValue = sortedBeanAmounts[currentLoopIndex];
    const numberOfRemainingBags = beansArrayLength - currentLoopIndex;
    const currentCost =
      initialTotalBeans - currentBeanValue * numberOfRemainingBags;
    minimumRemovedBeans = Math.min(minimumRemovedBeans, currentCost);
    currentLoopIndex++;
  }

  return minimumRemovedBeans;
};

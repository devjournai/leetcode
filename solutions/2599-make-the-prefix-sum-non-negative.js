/**
 * Make The Prefix Sum Non Negative
 * Intuition: To maintain a non-negative prefix sum while iterating through the array, if the sum drops below zero, we must remove an element that is currently contributing to the negative sum. To minimize operations, we should remove the element that gives the largest positive adjustment to the current prefix sum. Removing the smallest (most negative) number from the prefix achieves this, as subtracting a more negative number results in a larger increase to the sum.
 * Approach: 1. Initialize a min-priority queue to store all negative numbers encountered so far. 2. Maintain a running `currentSum` and an `operationCount`. 3. Iterate through the input array. For each number, add it to `currentSum`. If the number is negative, add it to the min-priority queue. 4. If `currentSum` becomes negative, it means we need to move an element. To maximize the correction (increase `currentSum` the most), remove the smallest (most negative) number from the priority queue. Subtract this removed negative number from `currentSum` (effectively adding its absolute value) and increment `operationCount`. 5. The final `operationCount` is the minimum operations required.
 * Dry Run: nums = [1, -1, -1, 1]
 * Initial: negativeValueTracker = [], currentSumAccumulator = 0, totalOperationCount = 0
 *
 * 1. itemNumber = 1
 *    currentSumAccumulator = 0 + 1 = 1
 *    1 is not < 0.
 *    currentSumAccumulator (1) is not < 0.
 *
 * 2. itemNumber = -1
 *    currentSumAccumulator = 1 + (-1) = 0
 *    -1 is < 0, negativeValueTracker.enqueue(-1) => [-1]
 *    currentSumAccumulator (0) is not < 0.
 *
 * 3. itemNumber = -1
 *    currentSumAccumulator = 0 + (-1) = -1
 *    -1 is < 0, negativeValueTracker.enqueue(-1) => [-1, -1]
 *    currentSumAccumulator (-1) IS < 0.
 *      minRemovedValue = negativeValueTracker.dequeue() => -1 (smallest)
 *      currentSumAccumulator = -1 - (-1) = 0
 *      totalOperationCount = 0 + 1 = 1
 *      negativeValueTracker = [-1]
 *
 * 4. itemNumber = 1
 *    currentSumAccumulator = 0 + 1 = 1
 *    1 is not < 0.
 *    currentSumAccumulator (1) is not < 0.
 *
 * End of loop. Return totalOperationCount = 1.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var makePrefSumNonNegative = function (nums) {
  const negativeValueTracker = new PriorityQueue((a, b) => a - b);
  let currentSumAccumulator = 0;
  let totalOperationCount = 0;

  for (const itemNumber of nums) {
    currentSumAccumulator += itemNumber;

    if (itemNumber < 0) {
      negativeValueTracker.enqueue(itemNumber);
    }

    if (currentSumAccumulator < 0) {
      const minRemovedValue = negativeValueTracker.dequeue();
      currentSumAccumulator -= minRemovedValue;
      totalOperationCount++;
    }
  }

  return totalOperationCount;
};

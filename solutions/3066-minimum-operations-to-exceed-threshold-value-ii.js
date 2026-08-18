/**
 * Minimum Operations To Exceed Threshold Value Ii
 * Intuition: To minimize operations, we must always combine the two smallest elements that are below the threshold. A min-priority queue (min-heap) is the most efficient data structure to repeatedly extract the smallest elements, perform the operation, and re-insert the result, maintaining the sorted order for subsequent operations.
 * Approach: 1. Initialize a `MinPriorityQueue` and populate it with all numbers from the input array `nums`. 2. Initialize an operation counter, `operationTracker`, to zero. 3. Enter a loop that continues as long as the priority queue contains at least two elements and its smallest element is less than the threshold `k`. 4. Inside the loop, extract the two smallest numbers, `firstSmallestNumber` and `secondSmallestNumber`. 5. Compute their combined value as `(firstSmallestNumber * 2 + secondSmallestNumber)` and insert this new value back into the priority queue. 6. Increment `operationTracker`. 7. Once the loop terminates, return the total `operationTracker` value.
 * Dry Run: nums = [1, 10, 2], k = 9
 *   1. `minPriorityQueueInstance` = `[1, 2, 10]` (after initial population)
 *   2. `operationTracker` = 0
 *   Loop 1:
 *     - `minPriorityQueueInstance.size()` is 3 (>= 2).
 *     - `minPriorityQueueInstance.front().element` is 1 (< 9). Condition true.
 *     - `firstSmallestNumber` = 1. `minPriorityQueueInstance` = `[2, 10]`.
 *     - `secondSmallestNumber` = 2. `minPriorityQueueInstance` = `[10]`.
 *     - `newCombinedValue` = (1 * 2 + 2) = 4.
 *     - `minPriorityQueueInstance.enqueue(4)`. `minPriorityQueueInstance` = `[4, 10]`.
 *     - `operationTracker` = 1.
 *   Loop 2:
 *     - `minPriorityQueueInstance.size()` is 2 (>= 2).
 *     - `minPriorityQueueInstance.front().element` is 4 (< 9). Condition true.
 *     - `firstSmallestNumber` = 4. `minPriorityQueueInstance` = `[10]`.
 *     - `secondSmallestNumber` = 10. `minPriorityQueueInstance` = `[]`.
 *     - `newCombinedValue` = (4 * 2 + 10) = 18.
 *     - `minPriorityQueueInstance.enqueue(18)`. `minPriorityQueueInstance` = `[18]`.
 *     - `operationTracker` = 2.
 *   Loop 3:
 *     - `minPriorityQueueInstance.size()` is 1 (< 2). Condition false. Loop terminates.
 *   Return `operationTracker` = 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minOperations = function (nums, k) {
  const minPriorityQueueInstance = new MinPriorityQueue();
  let operationTracker = 0;

  for (const currentNumber of nums) {
    minPriorityQueueInstance.enqueue(currentNumber);
  }

  while (
    minPriorityQueueInstance.size() >= 2 &&
    minPriorityQueueInstance.front().element < k
  ) {
    const firstSmallestNumber = minPriorityQueueInstance.dequeue().element;
    const secondSmallestNumber = minPriorityQueueInstance.dequeue().element;
    const newCombinedValue = firstSmallestNumber * 2 + secondSmallestNumber;
    minPriorityQueueInstance.enqueue(newCombinedValue);
    operationTracker++;
  }

  return operationTracker;
};

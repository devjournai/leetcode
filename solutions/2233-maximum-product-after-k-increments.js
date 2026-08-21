/**
 * Maximum Product After K Increments
 * Intuition: Incrementing the smallest numbers contributes most to increasing the product because the multiplicative effect is greater on smaller values than on larger ones.
 * Approach: 1. Populate a min-priority queue with all elements from the input array. 2. Perform `k` operations by repeatedly extracting the current minimum element from the queue, incrementing it by one, and then re-inserting it. 3. Finally, compute the product of all elements remaining in the priority queue, applying the modulo operation after each multiplication to handle large numbers.
 * Dry Run:
 *   nums = [1, 2], k = 2
 *   modulusValue = 1e9 + 7
 *
 *   1. priorityQueueInstance initialized.
 *   2. Populate priorityQueueInstance:
 *      populateIndex = 0: enqueue(nums[0]=1). Heap content (conceptually): [1]
 *      populateIndex = 1: enqueue(nums[1]=2). Heap content: [1, 2]
 *
 *   3. Perform `k` operations (operationsRemaining from 2 down to 0):
 *      operationsRemaining = 2:
 *         currentMinimum = priorityQueueInstance.dequeue() // extracts 1
 *         priorityQueueInstance.enqueue(currentMinimum + 1) // enqueues 2
 *         Heap content: [2, 2]
 *         operationsRemaining becomes 1
 *
 *      operationsRemaining = 1:
 *         currentMinimum = priorityQueueInstance.dequeue() // extracts 2
 *         priorityQueueInstance.enqueue(currentMinimum + 1) // enqueues 3
 *         Heap content: [2, 3]
 *         operationsRemaining becomes 0
 *
 *   4. Calculate final product:
 *      finalProduct = 1
 *      Loop while priorityQueueInstance.size() > 0:
 *         nextValue = priorityQueueInstance.dequeue() // extracts 2
 *         finalProduct = (1 * 2) % modulusValue = 2
 *
 *         nextValue = priorityQueueInstance.dequeue() // extracts 3
 *         finalProduct = (2 * 3) % modulusValue = 6
 *
 *      Priority queue is empty.
 *      Return finalProduct = 6.
 *
 * Time Complexity: O(N log N + K log N)
 * Space Complexity: O(N)
 */
var maximumProduct = function (nums, k) {
  const modulusValue = 1e9 + 7;
  const priorityQueueInstance = new PriorityQueue(
    (valueA, valueB) => valueA - valueB
  );

  let populateIndex = 0;
  while (populateIndex < nums.length) {
    priorityQueueInstance.enqueue(nums[populateIndex]);
    populateIndex++;
  }

  let operationsRemaining = k;
  while (operationsRemaining > 0) {
    const currentMinimum = priorityQueueInstance.dequeue();
    priorityQueueInstance.enqueue(currentMinimum + 1);
    operationsRemaining--;
  }

  let finalProduct = 1;
  while (priorityQueueInstance.size() > 0) {
    const nextValue = priorityQueueInstance.dequeue();
    finalProduct = (finalProduct * nextValue) % modulusValue;
  }

  return finalProduct;
};

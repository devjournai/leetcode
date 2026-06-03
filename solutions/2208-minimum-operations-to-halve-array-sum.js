/**
 * Minimum Operations To Halve Array Sum
 * Intuition: To minimize the total number of operations required to reduce the array sum by at least half, each individual operation must contribute the maximum possible reduction. Halving a larger number always results in a greater reduction amount compared to halving a smaller number. Therefore, at each step, we should select and halve the largest available number. This strategy is efficiently implemented using a Max-Priority Queue.
 * Approach: 1. First, calculate the initial total sum of all elements in the `nums` array. This sum determines the target reduction: we need to reduce the sum by at least half of this initial total. 2. Populate a Max-Priority Queue with all the numbers from the input array. This allows for quick retrieval of the largest element. 3. Initialize a variable to track the `accumulatedReduction` (starting at 0) and another for `operationTally` (starting at 0). 4. Enter a loop that continues as long as `accumulatedReduction` is less than the `halfSumTarget`. 5. Inside the loop: Extract the `topElement` (largest number) from the priority queue. Calculate `halvedElement` by dividing `topElement` by 2. Add `halvedElement` to `accumulatedReduction`. Re-insert `halvedElement` back into the priority queue (as it might be chosen again in a future operation). Increment `operationTally`. 6. Once the loop condition is no longer met (i.e., `accumulatedReduction` is at least `halfSumTarget`), return the final `operationTally`.
 * Dry Run: nums = [3, 8, 2]
 *   1. initialArraySum = 3 + 8 + 2 = 13.
 *   2. halfSumTarget = 13 / 2 = 6.5.
 *   3. numberStore (Max-Priority Queue) initialized: [8, 3, 2].
 *   4. accumulatedReduction = 0, operationTally = 0.
 *
 *   Loop 1:
 *     - accumulatedReduction (0) < halfSumTarget (6.5) is true.
 *     - topElement = 8 (dequeued from numberStore).
 *     - halvedElement = 8 / 2 = 4.
 *     - accumulatedReduction = 0 + 4 = 4.
 *     - numberStore.enqueue(4). (numberStore might look like [4, 3, 2]).
 *     - operationTally = 1.
 *
 *   Loop 2:
 *     - accumulatedReduction (4) < halfSumTarget (6.5) is true.
 *     - topElement = 4 (dequeued from numberStore).
 *     - halvedElement = 4 / 2 = 2.
 *     - accumulatedReduction = 4 + 2 = 6.
 *     - numberStore.enqueue(2). (numberStore might look like [3, 2, 2]).
 *     - operationTally = 2.
 *
 *   Loop 3:
 *     - accumulatedReduction (6) < halfSumTarget (6.5) is true.
 *     - topElement = 3 (dequeued from numberStore).
 *     - halvedElement = 3 / 2 = 1.5.
 *     - accumulatedReduction = 6 + 1.5 = 7.5.
 *     - numberStore.enqueue(1.5). (numberStore might look like [2, 2, 1.5]).
 *     - operationTally = 3.
 *
 *   Loop 4:
 *     - accumulatedReduction (7.5) < halfSumTarget (6.5) is false. Loop terminates.
 *
 *   Return operationTally = 3.
 * Time Complexity: O((N + K) log N)
 * Space Complexity: O(N)
 */
var halveArray = function (nums) {
  const numberStore = new PriorityQueue((a, b) => b - a);
  let initialArraySum = 0;

  for (const elementValue of nums) {
    numberStore.enqueue(elementValue);
    initialArraySum += elementValue;
  }

  const halfSumTarget = initialArraySum / 2;
  let accumulatedReduction = 0;
  let operationTally = 0;

  while (accumulatedReduction < halfSumTarget) {
    const topElement = numberStore.dequeue();
    const halvedElement = topElement / 2;
    accumulatedReduction += halvedElement;
    numberStore.enqueue(halvedElement);
    operationTally++;
  }

  return operationTally;
};

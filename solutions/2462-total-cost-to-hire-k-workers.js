/**
 * Total Cost To Hire K Workers
 * Intuition: To always pick the cheapest available worker while maintaining the "first/last candidates" rule, a min-priority queue (min-heap) is the ideal data structure. When a worker is chosen, the pool of available workers must be replenished from the next available worker from the respective side (leftmost or rightmost) if such workers still exist.
 * Approach: 1. Initialize a min-priority queue to store worker costs and their original indices, ordered primarily by cost, then by index. 2. Populate the priority queue with the first `candidates` workers and the last `candidates` workers from the `costs` array, ensuring no duplicate entries if the initial windows overlap. Maintain two pointers, `currentLeftmostIndex` and `currentRightmostIndex`, to track the next available workers for replenishment from the central part of the `costs` array. 3. Iterate `k` times, representing `k` hiring sessions. In each session, extract the worker with the minimum cost (and smallest index for ties) from the priority queue. Add their cost to a running total. 4. After hiring a worker, if there are still unconsidered workers between `currentLeftmostIndex` and `currentRightmostIndex` (inclusive), replenish the priority queue: if the just-hired worker came from the left initial window (identified by its original index being less than `currentLeftmostIndex`), add the worker at `currentLeftmostIndex` to the queue and increment `currentLeftmostIndex`; otherwise, add the worker at `currentRightmostIndex` and decrement `currentRightmostIndex`. 5. Return the accumulated total cost.
 * Dry Run: costs = [3,2,7,7,1,2], k = 2, candidates = 2
 *  1. Initialize: `cumulativeHiringExpense = 0`, `workerSelectionHeap = PriorityQueue()`, `currentLeftmostIndex = 0`, `currentRightmostIndex = 5`.
 *  2. Initial Population:
 *     - Left side (initialLeftCount loop): Enqueue `[3,0]`, `currentLeftmostIndex` becomes 1. Enqueue `[2,1]`, `currentLeftmostIndex` becomes 2. Loop ends.
 *     - Right side (initialRightCount loop): Enqueue `[2,5]`, `currentRightmostIndex` becomes 4. Enqueue `[1,4]`, `currentRightmostIndex` becomes 3. Loop ends.
 *     - `workerSelectionHeap` contains `[[1,4], [2,1], [2,5], [3,0]]` (conceptually sorted by priority).
 *     - Current pointers: `currentLeftmostIndex = 2`, `currentRightmostIndex = 3`.
 *  3. Hiring Session 1 (workersHired = 0):
 *     - Dequeue `[1,4]`. `cumulativeHiringExpense = 1`.
 *     - Check `currentLeftmostIndex (2) <= currentRightmostIndex (3)`: True.
 *     - Hired worker's index `4` is NOT less than `currentLeftmostIndex (2)`. So, replenish from right.
 *     - Enqueue `[costs[3], 3] = [7,3]`. Decrement `currentRightmostIndex` to 2.
 *     - `workerSelectionHeap` now has `[[2,1], [2,5], [3,0], [7,3]]`.
 *  4. Hiring Session 2 (workersHired = 1):
 *     - Dequeue `[2,1]` (tie-break with `[2,5]` by index). `cumulativeHiringExpense = 1 + 2 = 3`.
 *     - Check `currentLeftmostIndex (2) <= currentRightmostIndex (2)`: True.
 *     - Hired worker's index `1` IS less than `currentLeftmostIndex (2)`. So, replenish from left.
 *     - Enqueue `[costs[2], 2] = [7,2]`. Increment `currentLeftmostIndex` to 3.
 *     - `workerSelectionHeap` now has `[[2,5], [3,0], [7,2], [7,3]]`.
 *  5. `workersHired` is 2, which equals `k`. Loop ends.
 *  6. Return `cumulativeHiringExpense = 3`.
 * Time Complexity: O((k + candidates) * log(candidates))
 * Space Complexity: O(candidates)
 */
var totalCost = function (costs, k, candidates) {
  const workerSelectionHeap = new PriorityQueue((elementA, elementB) => {
    return elementA[0] === elementB[0]
      ? elementA[1] - elementB[1]
      : elementA[0] - elementB[0];
  });

  let cumulativeHiringExpense = 0;
  let currentLeftmostIndex = 0;
  let currentRightmostIndex = costs.length - 1;

  let initialLeftCount = 0;
  while (
    initialLeftCount < candidates &&
    currentLeftmostIndex <= currentRightmostIndex
  ) {
    workerSelectionHeap.enqueue([
      costs[currentLeftmostIndex],
      currentLeftmostIndex,
    ]);
    currentLeftmostIndex++;
    initialLeftCount++;
  }

  let initialRightCount = 0;
  while (
    initialRightCount < candidates &&
    currentLeftmostIndex <= currentRightmostIndex
  ) {
    workerSelectionHeap.enqueue([
      costs[currentRightmostIndex],
      currentRightmostIndex,
    ]);
    currentRightmostIndex--;
    initialRightCount++;
  }

  let workersHired = 0;
  while (workersHired < k) {
    const selectedWorker = workerSelectionHeap.dequeue();
    cumulativeHiringExpense += selectedWorker[0];

    if (currentLeftmostIndex <= currentRightmostIndex) {
      if (selectedWorker[1] < currentLeftmostIndex) {
        workerSelectionHeap.enqueue([
          costs[currentLeftmostIndex],
          currentLeftmostIndex,
        ]);
        currentLeftmostIndex++;
      } else {
        workerSelectionHeap.enqueue([
          costs[currentRightmostIndex],
          currentRightmostIndex,
        ]);
        currentRightmostIndex--;
      }
    }
    workersHired++;
  }

  return cumulativeHiringExpense;
};

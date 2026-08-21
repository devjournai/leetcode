/**
 * Sequentially Ordinal Rank Tracker
 * Intuition: Maintain the 'i' best elements in one priority queue and the remaining 'N-i' elements in another. The 'i' best elements priority queue should be structured such that its root is the i-th best element, making it easily retrievable.
 * Approach: 1. Use two priority queues: `lowerScoreHeap` to store the 'i' best locations and `higherScoreHeap` for the rest. 2. `lowerScoreHeap` is configured as a min-heap where elements are ordered by (score ascending, name ascending). This ensures its root is the i-th best location (the "worst" among the best 'i'). 3. `higherScoreHeap` is configured as a max-heap where elements are ordered by (score descending, name ascending). This ensures its root is the (i+1)-th best location (the "best" among the remaining 'N-i'). 4. `add` operation: Always enqueue the new location into `lowerScoreHeap`, then transfer its root (the current worst among its elements) to `higherScoreHeap`. This implicitly helps maintain the heap balance and ensures `higherScoreHeap` contains all locations eventually when `get` has not been called. 5. `get` operation: Increment the query counter 'i'. Dequeue the top (best) element from `higherScoreHeap` and enqueue it into `lowerScoreHeap`. The element just moved into `lowerScoreHeap` becomes part of the 'i' best. The root of `lowerScoreHeap` is now the i-th best element which is returned.
 * Dry Run:
 *  Initial: `queryCount = 0`, `lowerScoreHeap = []`, `higherScoreHeap = []`
 *
 *  add("a", 10):
 *    `lowerScoreHeap.enqueue([10, "a"])` -> `lowerScoreHeap = [[10,"a"]]`
 *    `higherScoreHeap.enqueue(lowerScoreHeap.dequeue())` -> `higherScoreHeap = [[10,"a"]]`, `lowerScoreHeap = []`
 *    State: `lowerScoreHeap=[]`, `higherScoreHeap=[[10,"a"]]`
 *
 *  add("b", 20):
 *    `lowerScoreHeap.enqueue([20, "b"])` -> `lowerScoreHeap = [[20,"b"]]`
 *    `higherScoreHeap.enqueue(lowerScoreHeap.dequeue())` -> `higherScoreHeap = [[20,"b"], [10,"a"]]`, `lowerScoreHeap = []`
 *    State: `lowerScoreHeap=[]`, `higherScoreHeap=[[20,"b"], [10,"a"]]` (root is `[20,"b"]`)
 *
 *  get() (1st query, `i=1`):
 *    `queryCount = 1`
 *    `bestLocation = higherScoreHeap.dequeue()` -> `bestLocation = [20,"b"]`, `higherScoreHeap = [[10,"a"]]`
 *    `lowerScoreHeap.enqueue(bestLocation)` -> `lowerScoreHeap = [[20,"b"]]`
 *    Return `bestLocation[1]` -> "b"
 *    State: `lowerScoreHeap=[[20,"b"]]`, `higherScoreHeap=[[10,"a"]]`
 *    (Correct: `lowerScoreHeap` has 1 best. Its root `[20,"b"]` is 1st best. `higherScoreHeap` has `N-1` elements worse than 1st best.)
 *
 *  add("c", 15):
 *    `lowerScoreHeap.enqueue([15, "c"])` -> `lowerScoreHeap = [[15,"c"], [20,"b"]]` (root is `[15,"c]`)
 *    `tempLocation = lowerScoreHeap.dequeue()` -> `tempLocation = [15,"c"]`, `lowerScoreHeap = [[20,"b"]]`
 *    `higherScoreHeap.enqueue(tempLocation)` -> `higherScoreHeap = [[15,"c"], [10,"a"]]` (root is `[15,"c]`)
 *    State: `lowerScoreHeap=[[20,"b"]]`, `higherScoreHeap=[[15,"c"], [10,"a"]]`
 *    (Correct: `queryCount=1`. `lowerScoreHeap` has 1 element. `higherScoreHeap` has `N-1 = 3-1=2` elements.)
 *
 *  get() (2nd query, `i=2`):
 *    `queryCount = 2`
 *    `secondBestLocation = higherScoreHeap.dequeue()` -> `secondBestLocation = [15,"c"]`, `higherScoreHeap = [[10,"a"]]`
 *    `lowerScoreHeap.enqueue(secondBestLocation)` -> `lowerScoreHeap = [[15,"c"], [20,"b"]]` (root is `[15,"c]`)
 *    Return `secondBestLocation[1]` -> "c"
 *    State: `lowerScoreHeap=[[15,"c"], [20,"b"]]`, `higherScoreHeap=[[10,"a"]]`
 *    (Correct: `lowerScoreHeap` has 2 best. Its root `[15,"c"]` is 2nd best. `higherScoreHeap` has `N-2 = 3-2=1` elements worse than 2nd best.)
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */
var SORTracker = function () {
  this.queryCount = 0;
  this.lowerScoreHeap = new PriorityQueue(
    (elementA, elementB) =>
      elementA[0] - elementB[0] || elementB[1].localeCompare(elementA[1])
  );
  this.higherScoreHeap = new PriorityQueue(
    (elementC, elementD) =>
      elementD[0] - elementC[0] || elementC[1].localeCompare(elementD[1])
  );
};

/**
 * @param {string} nameInput
 * @param {number} scoreValue
 * @return {void}
 */
SORTracker.prototype.add = function (nameInput, scoreValue) {
  const newLocation = [scoreValue, nameInput];
  this.lowerScoreHeap.enqueue(newLocation);
  const transferredLocation = this.lowerScoreHeap.dequeue();
  this.higherScoreHeap.enqueue(transferredLocation);
};

/**
 * @return {string}
 */
SORTracker.prototype.get = function () {
  this.queryCount++;
  const retrievedLocation = this.higherScoreHeap.dequeue();
  this.lowerScoreHeap.enqueue(retrievedLocation);
  const locationName = retrievedLocation[1];
  return locationName;
};

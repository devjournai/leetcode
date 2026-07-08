/**
 * Promise Pool
 * Intuition: Manage concurrent task execution by maintaining a fixed-size "pool". When a task finishes, a new one is immediately initiated from the queue to replace it, ensuring the pool is always utilized up to its limit until all tasks are completed.
 * Approach:
 * 1. Initialize an integer variable `nextTaskPointer` to 0, which will serve as an index to the next function available in the `functions` array to be executed.
 * 2. Define a recursive asynchronous helper function, `processNextFunction`, that encapsulates the logic for picking and executing the next available function.
 * 3. Inside `processNextFunction`:
 *    a. Check if `nextTaskPointer` has reached the end of the `functions` array. If it has, all functions have been scheduled, so return `Promise.resolve()` to indicate no further work from this path.
 *    b. Retrieve the function at `functions[nextTaskPointer]`.
 *    c. Increment `nextTaskPointer` to prepare for the subsequent call.
 *    d. Execute the retrieved function and chain its resolution to another call of `processNextFunction` using `.then()`. This ensures that as soon as a function completes, the `processNextFunction` logic is triggered again to potentially start a new task.
 * 4. In the main `promisePool` function, initiate the process by creating an array of promises. This array is populated by calling `processNextFunction` `n` times (or fewer if the total number of functions is less than `n`). This effectively fills the initial concurrency pool.
 * 5. Return `Promise.all()` on this array of initial promises. `Promise.all()` will wait for all these initial promises, and crucially, all the promises they subsequently chain (via `processNextFunction`), to resolve. This guarantees that the overall promise pool resolves only after all input functions have completed.
 * Dry Run:
 * functions = [async f1, async f2, async f3, async f4], n = 2
 *
 * 1. `nextTaskPointer` = 0.
 * 2. `initialExecutions` is created by mapping `functions.slice(0, n)`:
 *    - `functions.slice(0, 2)` effectively implies 2 calls to `processNextFunction`.
 *    - Call 1 for `f1`:
 *      - `nextTaskPointer` is 0. `currentCallable = f1`.
 *      - `nextTaskPointer` becomes 1.
 *      - `f1().then(processNextFunction)` is returned and added to `initialExecutions`.
 *    - Call 2 for `f2`:
 *      - `nextTaskPointer` is 1. `currentCallable = f2`.
 *      - `nextTaskPointer` becomes 2.
 *      - `f2().then(processNextFunction)` is returned and added to `initialExecutions`.
 * 3. `f1()` and `f2()` are now executing concurrently. `nextTaskPointer` is 2.
 * 4. Assume `f1()` resolves first:
 *    - Its `.then(processNextFunction)` handler is invoked.
 *    - Inside `processNextFunction`:
 *      - `nextTaskPointer` is 2. `currentCallable = f3`.
 *      - `nextTaskPointer` becomes 3.
 *      - `f3().then(processNextFunction)` is returned.
 *    - Now `f2()` and `f3()` are executing concurrently.
 * 5. Assume `f2()` resolves next:
 *    - Its `.then(processNextFunction)` handler is invoked.
 *    - Inside `processNextFunction`:
 *      - `nextTaskPointer` is 3. `currentCallable = f4`.
 *      - `nextTaskPointer` becomes 4.
 *      - `f4().then(processNextFunction)` is returned.
 *    - Now `f3()` and `f4()` are executing concurrently.
 * 6. Assume `f3()` resolves:
 *    - Its `.then(processNextFunction)` handler is invoked.
 *    - Inside `processNextFunction`:
 *      - `nextTaskPointer` is 4. `4 >= functions.length` (4 >= 4) is true.
 *      - `Promise.resolve()` is returned.
 * 7. Assume `f4()` resolves:
 *    - Its `.then(processNextFunction)` handler is invoked.
 *    - Inside `processNextFunction`:
 *      - `nextTaskPointer` is 4. `4 >= functions.length` (4 >= 4) is true.
 *      - `Promise.resolve()` is returned.
 * 8. All promises within `initialExecutions` (and their subsequent chains) have resolved. `Promise.all` resolves.
 * Time Complexity: O(F)
 * Space Complexity: O(N)
 */
var promisePool = async function (functions, n) {
  let nextTaskPointer = 0;

  const processNextFunction = () => {
    if (nextTaskPointer >= functions.length) {
      return Promise.resolve();
    }

    const currentCallable = functions[nextTaskPointer];
    nextTaskPointer++;

    return currentCallable().then(processNextFunction);
  };

  const initialExecutions = functions
    .slice(0, n)
    .map(() => processNextFunction());

  return Promise.all(initialExecutions);
};

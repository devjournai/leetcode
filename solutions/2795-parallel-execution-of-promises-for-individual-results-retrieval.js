/**
 * Parallel Execution Of Promises For Individual Results Retrieval
 * Intuition: Each input function, when executed, returns a promise that eventually settles (resolves or rejects). To capture the individual outcome of each promise and its original order, we must run them all concurrently. A central mechanism is needed to track the completion of all these individual promises, collecting their results along the way. Once every promise has settled, the overall promise can resolve with the compiled list of outcomes.
 * Approach: 1. Create a new Promise that will be returned, taking a resolver function as its parameter. 2. Initialize an array named `collectedOutcomes` of the same length as the input `functions` array to store the outcomes in their original order. 3. Initialize a counter named `finishedCounter` to track how many individual promises have settled. 4. Handle the edge case where the input `functions` array is empty, immediately resolving the main promise with an empty array. 5. Iterate through each function in the `functions` array using a standard `for` loop, using `funcIndex` as the loop variable. 6. For each function, execute it to obtain its corresponding `individualPromise`. 7. Attach separate `.then()` and `.catch()` handlers to this `individualPromise`. 8. In the `.then()` handler, store a fulfillment object `{ status: 'fulfilled', value: resolvedData }` at the `funcIndex` in the `collectedOutcomes` array, then increment `finishedCounter`. 9. In the `.catch()` handler, store a rejection object `{ status: 'rejected', reason: rejectionCause }` at the `funcIndex` in the `collectedOutcomes` array, then increment `finishedCounter`. 10. After incrementing the counter in both `.then()` and `.catch()`, check if `finishedCounter` equals the total number of input functions (`totalActions`). If it does, resolve the main promise using `mainPromiseResolver` with the `collectedOutcomes` array.
 * Dry Run:
 *   Input: functions = [() => Promise.resolve(1), () => Promise.reject('Error'), () => Promise.resolve(3)]
 *   1. `mainPromiseResolver` is created. `totalActions = 3`. `collectedOutcomes = [undefined, undefined, undefined]`. `finishedCounter = 0`.
 *   2. Loop (funcIndex = 0):
 *      - `currentInvoker = () => Promise.resolve(1)`
 *      - `individualPromise = currentInvoker()` resolves with `1`.
 *      - `.then` for `individualPromise` executes:
 *          - `collectedOutcomes[0] = { status: 'fulfilled', value: 1 }`
 *          - `finishedCounter = 1`
 *          - `finishedCounter (1)` is not `totalActions (3)`.
 *   3. Loop (funcIndex = 1):
 *      - `currentInvoker = () => Promise.reject('Error')`
 *      - `individualPromise = currentInvoker()` rejects with `'Error'`.
 *      - `.catch` for `individualPromise` executes:
 *          - `collectedOutcomes[1] = { status: 'rejected', reason: 'Error' }`
 *          - `finishedCounter = 2`
 *          - `finishedCounter (2)` is not `totalActions (3)`.
 *   4. Loop (funcIndex = 2):
 *      - `currentInvoker = () => Promise.resolve(3)`
 *      - `individualPromise = currentInvoker()` resolves with `3`.
 *      - `.then` for `individualPromise` executes:
 *          - `collectedOutcomes[2] = { status: 'fulfilled', value: 3 }`
 *          - `finishedCounter = 3`
 *          - `finishedCounter (3)` IS `totalActions (3)`.
 *          - `mainPromiseResolver(collectedOutcomes)` is called.
 *   5. `mainPromiseResolver` resolves the main promise with `[{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'Error' }, { status: 'fulfilled', value: 3 }]`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var promiseAllSettled = function (functions) {
  return new Promise((mainPromiseResolver) => {
    const totalActions = functions.length;
    const collectedOutcomes = new Array(totalActions);
    let finishedCounter = 0;

    if (totalActions === 0) {
      mainPromiseResolver([]);
      return;
    }

    for (let funcIndex = 0; funcIndex < totalActions; funcIndex++) {
      const currentInvoker = functions[funcIndex];
      const individualPromise = currentInvoker();

      individualPromise
        .then((resolvedData) => {
          collectedOutcomes[funcIndex] = {
            status: "fulfilled",
            value: resolvedData,
          };
          finishedCounter++;
          if (finishedCounter === totalActions) {
            mainPromiseResolver(collectedOutcomes);
          }
        })
        .catch((rejectionCause) => {
          collectedOutcomes[funcIndex] = {
            status: "rejected",
            reason: rejectionCause,
          };
          finishedCounter++;
          if (finishedCounter === totalActions) {
            mainPromiseResolver(collectedOutcomes);
          }
        });
    }
  });
};

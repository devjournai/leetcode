/**
 * Sleep
 * Intuition: Asynchronous delays in JavaScript are typically handled by `setTimeout`. To make this delay consumable in an asynchronous flow, we wrap it within a `Promise` which will resolve once the `setTimeout` callback fires.
 * Approach: 1. Create and return a new Promise instance. 2. The Promise constructor receives a function with a `resolve` callback. 3. Inside this function, call `setTimeout`, passing the `resolve` callback as the function to execute and the provided `ms` as the delay.
 * Dry Run: Input: `ms = 500`.
 * 1. `async function sleep(500)` is called.
 * 2. `return new Promise(...)` is executed. A new Promise `promiseResult` is created in a 'pending' state.
 * 3. The `Promise` constructor's executor function `(promiseCompletionHandler) => { ... }` is invoked. `promiseCompletionHandler` is the internal function to resolve `promiseResult`.
 * 4. `setTimeout(promiseCompletionHandler, 500)` is called. This schedules `promiseCompletionHandler` to be called after 500 milliseconds.
 * 5. The `new Promise` expression returns the 'pending' `promiseResult`.
 * 6. After 500 milliseconds, the JavaScript runtime executes `promiseCompletionHandler()`.
 * 7. This resolves `promiseResult`, changing its state from 'pending' to 'fulfilled'.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
async function sleep(msDuration) {
  return new Promise((promiseCompletionHandler) => {
    setTimeout(promiseCompletionHandler, msDuration);
  });
}

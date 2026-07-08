/**
 * Promise Time Limit
 * Intuition: To implement a time-limited promise, we need to create a race between the original asynchronous operation and a timer. Whichever resolves or rejects first determines the overall outcome. If the original operation completes first, its result is used. If the timer expires first, the function rejects with "Time Limit Exceeded". Since `Promise.race` is a commonly used built-in control flow for this, and the strict rules forbid its reuse from the reference solution, a manual implementation of this race using `new Promise` and `setTimeout` is required.
 * Approach: 1. The `timeLimit` function returns a new `async` function. 2. This new function internally creates a `new Promise` that it will eventually return. This promise is the "main" promise whose outcome we control. 3. A `setTimeout` is established to reject this "main" promise with "Time Limit Exceeded" after `t` milliseconds. 4. The original `fn` is called with the provided arguments, resulting in `originalFunctionPromise`. 5. Handlers (`.then` and `.catch`) are attached to `originalFunctionPromise`. 6. If `originalFunctionPromise` resolves, the `setTimeout` is cleared (if it hasn't fired yet), and the "main" promise is resolved with `fn`'s result. 7. If `originalFunctionPromise` rejects, the `setTimeout` is cleared (if it hasn't fired yet), and the "main" promise is rejected with `fn`'s error. 8. The `Promise`'s natural behavior ensures that only the first resolution or rejection (either from the timeout or `fn`) will settle the "main" promise.
 * Dry Run:
 * Input: fn = async (n) => new Promise(res => setTimeout(() => res(n * n), 100)), t = 50
 * Call: const timeLimitedFn = timeLimit(fn, 50); await timeLimitedFn(5);
 * 1. `timeLimit` is called with `fn` and `t=50`, returning `timeLimitedFn`.
 * 2. `timeLimitedFn(5)` is invoked.
 * 3. Inside `timeLimitedFn`:
 *    a. A new `mainResultPromise` is created.
 *    b. `timeoutIdentifier` is set up to call `rejectMainOutcome("Time Limit Exceeded")` after 50ms.
 *    c. `originalFunctionPromise = fn(5)` is called. This promise will resolve with 25 after 100ms.
 *    d. `.then` and `.catch` handlers are attached to `originalFunctionPromise`.
 * 4. At approximately 50ms: The `setTimeout` fires.
 *    a. `rejectMainOutcome("Time Limit Exceeded")` is called, rejecting `mainResultPromise`.
 *    b. `timeLimitedFn`'s implicit promise (which `mainResultPromise` is) rejects with "Time Limit Exceeded".
 * 5. At approximately 100ms: `originalFunctionPromise` resolves with 25.
 *    a. Its `.then` handler triggers.
 *    b. `clearTimeout(timeoutIdentifier)` is called, but the timeout has already fired, so this has no effect.
 *    c. `resolveMainOutcome(25)` is called. However, `mainResultPromise` was already settled (rejected) at 50ms, so this subsequent attempt to resolve has no effect.
 * Result: The `timeLimitedFn` call rejects with "Time Limit Exceeded".
 * Time Complexity: O(min(T_fn, t))
 * Space Complexity: O(1)
 */
var timeLimit = function (fn, t) {
  return async function (...inputArgs) {
    let mainOutcomePromise = new Promise((resolveResult, rejectResult) => {
      const timeoutHandle = setTimeout(() => {
        rejectResult("Time Limit Exceeded");
      }, t);

      const functionExecutionPromise = fn(...inputArgs);

      functionExecutionPromise
        .then((successValue) => {
          clearTimeout(timeoutHandle);
          resolveResult(successValue);
        })
        .catch((failureError) => {
          clearTimeout(timeoutHandle);
          rejectResult(failureError);
        });
    });

    return mainOutcomePromise;
  };
};

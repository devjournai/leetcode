/**
 * Convert Callback Based Function To Promise Based Function
 * Intuition: Wrap the callback-based function execution within a Promise constructor, mapping the callback's success (first argument) to Promise resolution and its error (second argument) to Promise rejection.
 * Approach: 1. Define an outer function `promisify` that accepts the original callback-based function `originalFn`. 2. Inside `promisify`, return a new function that will be the promise-based equivalent. 3. This new function accepts `inputArguments` using rest parameters. 4. Within this new function, create and return a `new Promise`. 5. The Promise constructor's executor function receives `promiseResolver` and `promiseRejecter` functions. 6. Inside the executor, call `originalFn`, passing a custom `callbackHandler` as its first argument, followed by the `inputArguments`. 7. The `callbackHandler` receives `callbackResult` and `callbackError`. 8. Inside `callbackHandler`, check if `callbackError` is present. If so, call `promiseRejecter` with `callbackError`. Otherwise, call `promiseResolver` with `callbackResult`.
 * Dry Run:
 * // Given originalFn:
 * // function sum(callback, a, b) {
 * //   if (a < 0 || b < 0) { const err = Error('negative input'); callback(undefined, err); }
 * //   else { callback(a + b); }
 * // }
 *
 * 1. `const promisifiedSum = promisify(sum);`
 *    - `promisify` is called with `originalFn = sum`.
 *    - It returns a `promisifiedFunction`.
 *
 * 2. `promisifiedSum(1, 2);`
 *    - `promisifiedFunction` is called with `inputArguments = [1, 2]`.
 *    - A `new Promise` is created. `promiseResolver` and `promiseRejecter` are its resolve/reject methods.
 *    - `sum((callbackResult, callbackError) => { ... }, 1, 2)` is executed.
 *    - Inside `sum`: `a=1`, `b=2`. `a<0 || b<0` is false.
 *    - `sum` calls its callback: `callbackHandler(1 + 2)`. So `callbackResult = 3`, `callbackError = undefined`.
 *    - Inside `callbackHandler`: `if (callbackError)` is false.
 *    - `promiseResolver(callbackResult)` is called. `promiseResolver(3)` is executed.
 *    - The promise resolves with `3`.
 *
 * 3. `promisifiedSum(-1, 2);`
 *    - `promisifiedFunction` is called with `inputArguments = [-1, 2]`.
 *    - A `new Promise` is created.
 *    - `sum((callbackResult, callbackError) => { ... }, -1, 2)` is executed.
 *    - Inside `sum`: `a=-1`, `b=2`. `a<0 || b<0` is true.
 *    - `sum` creates `err = Error('negative input')`.
 *    - `sum` calls its callback: `callbackHandler(undefined, err)`. So `callbackResult = undefined`, `callbackError = Error('negative input')`.
 *    - Inside `callbackHandler`: `if (callbackError)` is true.
 *    - `promiseRejecter(callbackError)` is called. `promiseRejecter(Error('negative input'))` is executed.
 *    - The promise rejects with `Error('negative input')`.
 *
 * Time Complexity: O(T_fn)
 * Space Complexity: O(S_fn)
 */
var promisify = function (originalFn) {
  return function (...inputArguments) {
    return new Promise((promiseResolver, promiseRejecter) => {
      originalFn(
        (callbackResult, callbackError) => {
          if (callbackError) {
            promiseRejecter(callbackError);
          } else {
            promiseResolver(callbackResult);
          }
        },
        ...inputArguments
      );
    });
  };
};

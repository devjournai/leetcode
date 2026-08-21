/**
 * Delay The Resolution Of Each Promise
 * Intuition: To delay each promise's resolution or rejection by a specified duration, we must first allow the original promise to settle, capture its outcome, then introduce the additional delay using setTimeout wrapped in a new Promise, and finally propagate the original outcome.
 * Approach: 1. Utilize Array.prototype.map to transform each original function into a new delayed function. 2. Each new function will be an async function to allow for sequential awaiting. 3. Inside the async function, use a try-catch block to handle both successful resolutions and rejections of the original promise. 4. Await the result of the original function's promise call. 5. Immediately after the original promise settles (either resolves or rejects), create and await a new Promise wrapped around setTimeout for the specified delay duration. 6. After the delay, either return the original resolved value or re-throw the original caught error.
 * Dry Run: Input: functions = [() => Promise.resolve('Hello'), () => Promise.reject('Fail')], ms = 50.
 * 1. delayAll is called with 'functions' and 'ms'.
 * 2. 'originalFunctions.map' iterates over the input array.
 * 3. For the first function, 'currentFunction = () => Promise.resolve('Hello')', a new async function 'delayedFunctionOne' is created and added to the output array.
 * 4. For the second function, 'currentFunction = () => Promise.reject('Fail')', another new async function 'delayedFunctionTwo' is created and added.
 * 5. 'delayAll' returns the array: [delayedFunctionOne, delayedFunctionTwo].
 *
 * Now, consider an invocation of 'delayedFunctionOne()':
 * a. The 'async function' starts execution.
 * b. Inside the 'try' block, 'originalOutcome = await currentFunction()' calls the original function, which resolves to 'Hello'. 'originalOutcome' is set to 'Hello'.
 * c. 'delayPromiseInstance = new Promise(resolveDelay => setTimeout(resolveDelay, 50))' creates a promise that will resolve after 50ms.
 * d. 'await delayPromiseInstance' pauses execution for 50ms.
 * e. After the delay, 'return originalOutcome;' resolves the promise returned by 'delayedFunctionOne()' with 'Hello'.
 *
 * Now, consider an invocation of 'delayedFunctionTwo()':
 * a. The 'async function' starts execution.
 * b. Inside the 'try' block, 'originalOutcome = await currentFunction()' calls the original function, which immediately rejects with 'Fail'.
 * c. Execution jumps to the 'catch (caughtIssue)' block. 'caughtIssue' is 'Fail'.
 * d. 'delayPromiseSecondInstance = new Promise(resolveTimeOut => setTimeout(resolveTimeOut, 50))' creates a promise that will resolve after 50ms.
 * e. 'await delayPromiseSecondInstance' pauses execution for 50ms.
 * f. After the delay, 'throw caughtIssue;' rejects the promise returned by 'delayedFunctionTwo()' with 'Fail'.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var delayAll = function (originalFunctions, delayMilliseconds) {
  return originalFunctions.map((currentFunction) => {
    return async function () {
      try {
        const originalOutcome = await currentFunction();
        const delayPromiseInstance = new Promise((resolveDelay) =>
          setTimeout(resolveDelay, delayMilliseconds)
        );
        await delayPromiseInstance;
        return originalOutcome;
      } catch (caughtIssue) {
        const delayPromiseSecondInstance = new Promise((resolveTimeOut) =>
          setTimeout(resolveTimeOut, delayMilliseconds)
        );
        await delayPromiseSecondInstance;
        throw caughtIssue;
      }
    };
  });
};

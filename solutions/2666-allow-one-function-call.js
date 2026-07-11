/**
 * Allow One Function Call
 * Intuition: Use a flag to track if the function has been called, and a variable to store its result upon the first invocation.
 * Approach: 1. Declare a boolean flag outside the returned function to check if the original function has been executed. 2. Declare a variable to store the result of the first successful function call. 3. Return a new function that checks the flag. If the flag is false, call the original function, store its result, set the flag to true, and return the result. If the flag is true, return undefined.
 * Dry Run:
 *   let originalFunction = (a, b) => a + b;
 *   let onceFunction = once(originalFunction);
 *
 *   1. once(originalFunction) is called.
 *      - `hasBeenInvoked` is initialized to `false`.
 *      - `storedOutcome` is initialized to `undefined`.
 *      - A new anonymous function is returned.
 *
 *   2. onceFunction(5, 3) is called.
 *      - Inside the returned function:
 *      - `hasBeenInvoked` is `false`. The `if (!hasBeenInvoked)` condition is true.
 *      - `storedOutcome = originalFunction(5, 3)` which means `storedOutcome = 5 + 3 = 8`.
 *      - `hasBeenInvoked` is set to `true`.
 *      - The function returns `storedOutcome`, which is `8`.
 *
 *   3. onceFunction(10, 20) is called.
 *      - Inside the returned function:
 *      - `hasBeenInvoked` is `true`. The `if (!hasBeenInvoked)` condition is false.
 *      - The `else` block is executed.
 *      - The function returns `undefined`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var once = function (fn) {
  let hasBeenInvoked = false;
  let storedOutcome;

  return function (...inputArguments) {
    if (!hasBeenInvoked) {
      storedOutcome = fn(...inputArguments);
      hasBeenInvoked = true;
      return storedOutcome;
    } else {
      return undefined;
    }
  };
};

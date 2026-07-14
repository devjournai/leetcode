/**
 * Timeout Cancellation
 * Intuition: Scheduled asynchronous operations can be cancelled if a reference or identifier to them is retained.
 * Approach: 1. Schedule the provided function `fn` to execute after `t` milliseconds using `setTimeout`, capturing the unique identifier returned. 2. Return a new function (the cancellation function) that, when invoked, calls `clearTimeout` with the captured identifier to prevent the original `fn` from executing.
 * Dry Run:
 *   Input: fn = (value) => console.log(value), args = ["Success"], t = 100
 *   1. `cancellable` is invoked with the given `fn`, `args`, and `t`.
 *   2. `setTimeout` is called to schedule `fn("Success")` after 100ms. Let's assume it returns `timerReference = 7`.
 *   3. `executionHandle` is assigned `7`.
 *   4. The `cancellable` function returns an anonymous function: `() => clearTimeout(7)`. Let's call this `cancelOperation`.
 *   5. If `cancelOperation()` is called after 50ms (before 100ms): `clearTimeout(7)` is executed, preventing `fn("Success")` from ever running. Nothing is printed.
 *   6. If `cancelOperation()` is NOT called within 100ms: After 100ms, the scheduled callback `fn("Success")` executes, printing "Success" to the console.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var cancellable = function (fn, args, t) {
  const executionHandle = setTimeout(() => {
    fn(...args);
  }, t);

  return () => {
    clearTimeout(executionHandle);
  };
};

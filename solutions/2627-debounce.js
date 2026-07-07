/**
 * Debounce
 * Intuition: When an event triggers repeatedly within a short timeframe, we often only want to perform an action after a period of inactivity. Debounce ensures that the function execution is delayed until a specified time 't' has passed since its last invocation. If the function is called again within this 't' window, any previously scheduled execution is cancelled, and a new timer begins from the current moment.
 * Approach: 1. A stateful variable, `activeTimeoutIdentifier`, is declared in the outer scope to hold the ID of the currently pending `setTimeout` call, allowing it to be accessed and cleared across multiple invocations of the debounced function. 2. The debounced function, when called, first checks if there's an existing `activeTimeoutIdentifier`. If so, it uses `clearTimeout` to cancel the previously scheduled execution, effectively resetting the timer. 3. It then defines a new callback function, `scheduledTask`, which captures the arguments from the current invocation. 4. Finally, it schedules `scheduledTask` to run after `delayDuration` milliseconds using `setTimeout`, and stores the returned timer ID in `activeTimeoutIdentifier`.
 * Dry Run:
 *   fn = console.log, t = 50ms
 *   1. `const debouncedLog = debounce(console.log, 50);`
 *      - `fnRef = console.log`, `delayDuration = 50`
 *      - `activeTimeoutIdentifier` is initially `undefined`.
 *   2. `debouncedLog('Hello')` at 0ms:
 *      - `executionArguments = ['Hello']`
 *      - `activeTimeoutIdentifier` is `undefined`, so `if` condition is skipped.
 *      - `scheduledTask` is `() => console.log('Hello')`.
 *      - `setTimeout(scheduledTask, 50)` is called, returns `timerId_1`.
 *      - `activeTimeoutIdentifier` becomes `timerId_1`. (console.log('Hello') scheduled for 50ms)
 *   3. `debouncedLog('World')` at 20ms:
 *      - `executionArguments = ['World']`
 *      - `activeTimeoutIdentifier` is `timerId_1` (truthy), so `if` condition is met.
 *      - `clearTimeout(timerId_1)` is called, cancelling the 'Hello' log.
 *      - `scheduledTask` is `() => console.log('World')`.
 *      - `setTimeout(scheduledTask, 50)` is called, returns `timerId_2`.
 *      - `activeTimeoutIdentifier` becomes `timerId_2`. (console.log('World') scheduled for 20ms + 50ms = 70ms)
 *   4. `debouncedLog('!')` at 60ms:
 *      - `executionArguments = ['!']`
 *      - `activeTimeoutIdentifier` is `timerId_2` (truthy), so `if` condition is met.
 *      - `clearTimeout(timerId_2)` is called, cancelling the 'World' log.
 *      - `scheduledTask` is `() => console.log('!')`.
 *      - `setTimeout(scheduledTask, 50)` is called, returns `timerId_3`.
 *      - `activeTimeoutIdentifier` becomes `timerId_3`. (console.log('!') scheduled for 60ms + 50ms = 110ms)
 *   5. No further calls.
 *      - At 110ms, `console.log('!')` executes.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var debounce = function (fnRef, delayDuration) {
  let activeTimeoutIdentifier;

  return function (...executionArguments) {
    if (activeTimeoutIdentifier) {
      clearTimeout(activeTimeoutIdentifier);
    }

    const scheduledTask = () => {
      fnRef(...executionArguments);
    };

    activeTimeoutIdentifier = setTimeout(scheduledTask, delayDuration);
  };
};

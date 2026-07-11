/**
 * Throttle
 * Intuition: Execute the first call immediately, then block subsequent calls for a duration 't'. If new calls arrive during the blocked period, store only the latest arguments to be executed once the blocking duration ends.
 * Approach: 1. Maintain a status flag (`throttleActiveStatus`) to indicate if a cooldown period is active. 2. Store the latest arguments for a deferred call in `deferredCallArguments`. 3. On a throttled function call, if `throttleActiveStatus` is false, execute `fn` immediately, set `throttleActiveStatus` to true, and schedule a timeout for `t` milliseconds. 4. If `throttleActiveStatus` is true, store the current arguments in `deferredCallArguments` (overwriting any previous ones). 5. When the timeout expires (handled by `completeThrottleCycle`), if `deferredCallArguments` is not null, execute `fn` with those arguments, clear `deferredCallArguments`, and schedule a new timeout. 6. If `deferredCallArguments` is null, it means no new calls occurred, so reset `throttleActiveStatus` to false.
 * Dry Run:
 *   fn = console.log, t = 100
 *   throttleActiveStatus = false, deferredCallArguments = null, deferredCallTimeoutHandle = null
 *
 *   1. Call throttledFn('a') at 0ms:
 *      - throttleActiveStatus is false.
 *      - console.log('a') executed.
 *      - throttleActiveStatus becomes true.
 *      - deferredCallTimeoutHandle = setTimeout(completeThrottleCycle, 100) scheduled for 100ms.
 *
 *   2. Call throttledFn('b') at 50ms:
 *      - throttleActiveStatus is true.
 *      - deferredCallArguments becomes ['b'].
 *
 *   3. Call throttledFn('c') at 80ms:
 *      - throttleActiveStatus is true.
 *      - deferredCallArguments becomes ['c'] (overwriting ['b']).
 *
 *   4. completeThrottleCycle executes at 100ms:
 *      - deferredCallArguments is ['c'] (not null).
 *      - console.log('c') executed.
 *      - deferredCallArguments becomes null.
 *      - deferredCallTimeoutHandle = setTimeout(completeThrottleCycle, 100) scheduled for 200ms.
 *
 *   5. Call throttledFn('d') at 150ms:
 *      - throttleActiveStatus is true.
 *      - deferredCallArguments becomes ['d'].
 *
 *   6. completeThrottleCycle executes at 200ms:
 *      - deferredCallArguments is ['d'] (not null).
 *      - console.log('d') executed.
 *      - deferredCallArguments becomes null.
 *      - deferredCallTimeoutHandle = setTimeout(completeThrottleCycle, 100) scheduled for 300ms.
 *
 *   7. No further calls.
 *
 *   8. completeThrottleCycle executes at 300ms:
 *      - deferredCallArguments is null.
 *      - throttleActiveStatus becomes false.
 *      - deferredCallTimeoutHandle becomes null.
 *      - No new timeouts scheduled, throttle is reset.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var throttle = function (fn, t) {
  let throttleActiveStatus = false;
  let deferredCallArguments = null;
  let deferredCallTimeoutHandle = null;

  const completeThrottleCycle = () => {
    if (deferredCallArguments !== null) {
      fn(...deferredCallArguments);
      deferredCallArguments = null;
      deferredCallTimeoutHandle = setTimeout(completeThrottleCycle, t);
    } else {
      throttleActiveStatus = false;
      deferredCallTimeoutHandle = null;
    }
  };

  return function (...receivedArguments) {
    if (throttleActiveStatus) {
      deferredCallArguments = receivedArguments;
    } else {
      fn(...receivedArguments);
      throttleActiveStatus = true;
      deferredCallTimeoutHandle = setTimeout(completeThrottleCycle, t);
    }
  };
};

/**
 * Custom Interval
 * Intuition: The problem requires scheduling a function at dynamically increasing intervals. This cannot be achieved with standard `setInterval` which uses a fixed delay. Instead, a recursive `setTimeout` approach is necessary. Each execution of the function will schedule its subsequent execution after calculating the specific `delay + period * count` for that next iteration. A global map is needed to store the `setTimeout` identifiers, allowing cancellation via `customClearInterval`.
 * Approach: 1. Establish global state with a Map (`intervalRegistry`) to link custom interval IDs to their active `setTimeout` handles and a counter (`nextAvailableIdentifier`) for unique custom IDs. 2. Implement `customInterval`: generate a unique ID, initialize a closure `currentExecutionCount`, define a recursive `schedulingProcedure` function, store the `setTimeout` handle in the map, and return the custom ID. 3. Implement `customClearInterval`: retrieve the `setTimeout` handle from the map using the given custom ID, cancel it with `clearTimeout`, and remove the entry from the map.
 * Dry Run: customInterval(myAction, 100, 50)
 * 1. `nextAvailableIdentifier` is 1, `intervalRegistry` is empty.
 * 2. `customInterval` executes:
 *    - `currentExecutionCount` = 0.
 *    - `uniqueIntervalIdentifier` = 1. `nextAvailableIdentifier` becomes 2.
 *    - `schedulingProcedure` is defined.
 *    - Call `schedulingProcedure()`:
 *      - `computedExecutionDuration` = 100 + (50 * 0) = 100.
 *      - `setTimeout` is called for 100ms. Let's say it returns `timeoutReference` = 500.
 *      - `intervalRegistry.set(1, 500)`.
 *    - `customInterval` returns 1.
 *
 * (After 100ms): `setTimeout` callback executes:
 * 1. `myAction()` is invoked.
 * 2. `currentExecutionCount` increments to 1.
 * 3. `schedulingProcedure()` is called again:
 *    - `computedExecutionDuration` = 100 + (50 * 1) = 150.
 *    - `setTimeout` is called for 150ms. Let's say it returns `nextTimeoutReference` = 501.
 *    - `intervalRegistry.set(1, 501)` (updates the value for key 1).
 *
 * customClearInterval(1) is called (e.g., before the 150ms timeout completes):
 * 1. `intervalIdToCancel` = 1.
 * 2. `retrievedTimeoutReference` = `intervalRegistry.get(1)`, which is 501.
 * 3. `clearTimeout(501)` is called, canceling the pending execution.
 * 4. `intervalRegistry.delete(1)` removes the entry. The interval stops.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */

const intervalRegistry = new Map();
let nextAvailableIdentifier = 1;

function customInterval(actionFunction, initialDelay, intervalPeriod) {
  let currentExecutionCount = 0;
  const uniqueIntervalIdentifier = nextAvailableIdentifier++;

  function schedulingProcedure() {
    const computedExecutionDuration =
      initialDelay + intervalPeriod * currentExecutionCount;
    const timeoutReference = setTimeout(() => {
      actionFunction();
      currentExecutionCount++;
      schedulingProcedure();
    }, computedExecutionDuration);
    intervalRegistry.set(uniqueIntervalIdentifier, timeoutReference);
  }

  schedulingProcedure();
  return uniqueIntervalIdentifier;
}

function customClearInterval(intervalIdToCancel) {
  const retrievedTimeoutReference = intervalRegistry.get(intervalIdToCancel);
  if (retrievedTimeoutReference) {
    clearTimeout(retrievedTimeoutReference);
    intervalRegistry.delete(intervalIdToCancel);
  }
}

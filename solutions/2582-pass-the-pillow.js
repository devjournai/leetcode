/**
 * Pass The Pillow
 * Intuition: The movement of the pillow follows a predictable cyclic pattern. It moves from person 1 to person `n`, then from person `n` back to person 1, and so on. The total time taken for one complete cycle (1 -> `n` -> 1) is `(n - 1)` seconds for the forward pass and another `(n - 1)` seconds for the backward pass, totaling `2 * (n - 1)` seconds. By finding the effective time within one such cycle using the modulo operator, we can determine the final position.
 * Approach:
 * 1. First, handle the special case where `n` is 1. If there's only one person, the pillow never moves, so it always stays with person 1.
 * 2. For `n > 1`, calculate `cycleSpan`, the total duration of one complete round trip (1 to `n` and back to 1), which is `2 * (n - 1)` seconds.
 * 3. Determine `effectiveTimeInCycle` by taking `time` modulo `cycleSpan`. This gives us the equivalent number of seconds passed within the current cycle.
 * 4. Check if `effectiveTimeInCycle` is less than `n`. If it is, the pillow is in the forward pass (moving from 1 towards `n`). The person holding the pillow will be `effectiveTimeInCycle + 1` (since persons are 1-indexed and `effectiveTimeInCycle` represents 0-indexed steps).
 * 5. If `effectiveTimeInCycle` is `n` or greater, the pillow is in the backward pass (moving from `n` towards 1). The pillow would have reached person `n` after `n - 1` steps. The remaining steps in the backward direction are `effectiveTimeInCycle - (n - 1)`. The person's index is then `n - (effectiveTimeInCycle - (n - 1))`, which simplifies to `2 * n - 1 - effectiveTimeInCycle`.
 * Dry Run:
 * Input: n = 4, time = 5
 * 1. `n` (4) is not 1.
 * 2. `cycleSpan` = `2 * (4 - 1)` = `2 * 3` = 6.
 * 3. `effectiveTimeInCycle` = `5 % 6` = 5.
 * 4. Is `effectiveTimeInCycle` < `n`? Is `5 < 4`? False.
 * 5. The pillow is in the backward pass.
 *    `finalPillowHolder` = `2 * n - 1 - effectiveTimeInCycle`
 *                         = `2 * 4 - 1 - 5`
 *                         = `8 - 1 - 5`
 *                         = `7 - 5`
 *                         = 2.
 * Output: 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var passThePillow = function (n, time) {
  if (n === 1) {
    return 1;
  }

  const cycleSpan = 2 * (n - 1);
  const effectiveTimeInCycle = time % cycleSpan;

  if (effectiveTimeInCycle < n) {
    return effectiveTimeInCycle + 1;
  } else {
    return 2 * n - 1 - effectiveTimeInCycle;
  }
};

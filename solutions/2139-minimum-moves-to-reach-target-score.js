/**
 * Minimum Moves To Reach Target Score
 * Intuition: To find the minimum moves, it's generally more efficient to use multiplication (doubling) than addition. This suggests a greedy approach. Working backward from the target to 1, a "double" operation becomes a "divide by 2", and an "increment" becomes a "subtract 1". We prioritize "divide by 2" as it reduces the number fastest, but we are limited by `maxDoubles`. If the current number is odd, we must first subtract 1 to make it even, allowing for a potential "divide by 2" (if `maxDoubles` is still available). Once all "doubles" are used, or if the number becomes 1, only "subtract 1" operations remain.
 * Approach: 1. Initialize `totalOperations` to 0, `numberProgress` to `target`, and `doublesAvailable` to `maxDoubles`. 2. Iterate while `numberProgress` is strictly greater than 1 AND `doublesAvailable` is strictly greater than 0. 3. Inside the loop, if `numberProgress` is even, divide `numberProgress` by 2 and decrement `doublesAvailable`. 4. If `numberProgress` is odd, subtract 1 from `numberProgress`. 5. Increment `totalOperations` by 1 in each iteration of the loop. 6. After the loop, if `numberProgress` is still strictly greater than 1 (meaning `doublesAvailable` has reached 0), add the remaining `numberProgress - 1` increments to `totalOperations` (as only increments are possible). 7. Return the final `totalOperations`.
 * Dry Run: target = 7, maxDoubles = 1
 *   1. `totalOperations = 0`, `numberProgress = 7`, `doublesAvailable = 1`.
 *   2. Loop (`numberProgress > 1 && doublesAvailable > 0`): `7 > 1 && 1 > 0` is true.
 *      `numberProgress` (7) is odd.
 *      `numberProgress` becomes `7 - 1 = 6`.
 *      `totalOperations` becomes `1`.
 *   3. Loop (`numberProgress > 1 && doublesAvailable > 0`): `6 > 1 && 1 > 0` is true.
 *      `numberProgress` (6) is even.
 *      `numberProgress` becomes `6 / 2 = 3`.
 *      `doublesAvailable` becomes `1 - 1 = 0`.
 *      `totalOperations` becomes `2`.
 *   4. Loop (`numberProgress > 1 && doublesAvailable > 0`): `3 > 1 && 0 > 0` is false (because `doublesAvailable` is 0).
 *      Loop terminates.
 *   5. After loop: `numberProgress` (3) is greater than 1.
 *      Add `numberProgress - 1` to `totalOperations`: `totalOperations = 2 + (3 - 1) = 2 + 2 = 4`.
 *   6. Return `totalOperations = 4`.
 * Time Complexity: O(maxDoubles + log(target))
 * Space Complexity: O(1)
 */
var minMoves = function (target, maxDoubles) {
  let totalOperations = 0;
  let numberProgress = target;
  let doublesAvailable = maxDoubles;

  while (numberProgress > 1 && doublesAvailable > 0) {
    if (numberProgress % 2 === 0) {
      numberProgress /= 2;
      doublesAvailable--;
    } else {
      numberProgress--;
    }
    totalOperations++;
  }

  return totalOperations + (numberProgress - 1);
};

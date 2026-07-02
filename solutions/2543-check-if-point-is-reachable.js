/**
 * Check If Point Is Reachable
 * Intuition: The core insight is that all allowed operations preserve the odd part of the greatest common divisor (GCD) of the coordinates. Starting from (1, 1), the GCD is 1, and its odd part is 1. Thus, any reachable point (targetX, targetY) must also have a GCD whose odd part is 1. Conversely, if the odd part of `gcd(targetX, targetY)` is 1, it implies `gcd(targetX, targetY)` is a power of two. If `gcd(targetX, targetY)` is `2^k`, then `(targetX/2^k, targetY/2^k)` has a GCD of 1. Any point `(A, B)` with `gcd(A, B) = 1` is reachable from `(1, 1)` using only `(x, y-x)` and `(x-y, y)` operations (and their inverses). Once `(targetX/2^k, targetY/2^k)` is reached, applying `k` `(2x, y)` operations and `k` `(x, 2y)` operations (not simultaneously, but strategically) can scale up to `(targetX, targetY)`.
 * Approach: 1. Compute the greatest common divisor (GCD) of `targetX` and `targetY`. 2. Repeatedly divide this GCD by 2 until it becomes an odd number. 3. If this final odd number is 1, the point is reachable; otherwise, it is not.
 * Dry Run: targetX = 4, targetY = 6
 *   1. Calculate GCD of 4 and 6:
 *      - `calculateGcd(4, 6)`:
 *        - `coordinateOne = 4`, `coordinateTwo = 6`
 *        - Loop 1: `coordinateTwo` is 6 (truthy). `tempCoord = 4 % 6 = 4`. `coordinateOne = 6`, `coordinateTwo = 4`.
 *        - Loop 2: `coordinateTwo` is 4 (truthy). `tempCoord = 6 % 4 = 2`. `coordinateOne = 4`, `coordinateTwo = 2`.
 *        - Loop 3: `coordinateTwo` is 2 (truthy). `tempCoord = 4 % 2 = 0`. `coordinateOne = 2`, `coordinateTwo = 0`.
 *        - Loop 4: `coordinateTwo` is 0 (falsy). Loop terminates.
 *        - Return `coordinateOne` (which is 2).
 *      `greatestCommonDivisor = 2`.
 *   2. Reduce `greatestCommonDivisor` by dividing by 2 until it's odd:
 *      - `oddPartRemoved = 2`.
 *      - While `oddPartRemoved % 2 === 0` (2 % 2 === 0 is true):
 *        - `oddPartRemoved = 2 / 2 = 1`.
 *      - While `oddPartRemoved % 2 === 0` (1 % 2 === 0 is false): Loop terminates.
 *   3. Check if `oddPartRemoved` is 1:
 *      - `1 === 1` is `true`.
 *      Return `true`.
 * Time Complexity: O(log(min(targetX, targetY)))
 * Space Complexity: O(1)
 */
var isReachable = function (targetX, targetY) {
  let greatestCommonDivisor = calculateGcd(targetX, targetY);
  let oddPartRemoved = greatestCommonDivisor;

  while (oddPartRemoved % 2 === 0) {
    oddPartRemoved /= 2;
  }

  return oddPartRemoved === 1;
};

function calculateGcd(coordinateOne, coordinateTwo) {
  while (coordinateTwo) {
    let tempCoord = coordinateOne % coordinateTwo;
    coordinateOne = coordinateTwo;
    coordinateTwo = tempCoord;
  }
  return coordinateOne;
}

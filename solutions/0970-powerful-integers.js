/**
 * Powerful Integers
 * Intuition: Enumerate x^i + y^j ≤ bound. If a base is 1, its powers never grow so break that nested loop after one term.
 * Approach: 1. Outer `currentPowerOfX` while ≤ bound. 2. Inner add `currentPowerOfX + currentPowerOfY` to a Set, multiply y unless y===1. 3. Multiply x unless x===1. 4. Return `Array.from(powerfulNumbersCollection)`.
 * Dry Run: x=2, y=3, bound=10. Pairs give 2,3,4,5,7,9,10. Set unique, convert to array.
 * Time Complexity: O(log_x(bound) * log_y(bound))
 * Space Complexity: O(bound)
 */
var powerfulIntegers = function (x, y, bound) {
  const powerfulNumbersCollection = new Set();

  let currentPowerOfX = 1;
  while (currentPowerOfX <= bound) {
    let currentPowerOfY = 1;
    while (currentPowerOfX + currentPowerOfY <= bound) {
      powerfulNumbersCollection.add(currentPowerOfX + currentPowerOfY);
      if (y === 1) {
        break;
      }
      currentPowerOfY *= y;
    }

    if (x === 1) {
      break;
    }
    currentPowerOfX *= x;
  }

  return Array.from(powerfulNumbersCollection);
};

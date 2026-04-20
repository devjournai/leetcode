/**
 * Powerful Integers
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

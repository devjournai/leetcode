/**
 * Bulb Switcher II
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var flipLights = function (n, presses) {
  if (presses === 0) {
    return 1;
  }

  if (n === 1) {
    return 2;
  }

  if (n === 2) {
    if (presses === 1) {
      return 3;
    } else {
      return 4;
    }
  }

  // For n >= 3
  if (presses === 1) {
    return 4;
  } else if (presses === 2) {
    return 7;
  } else {
    // presses >= 3
    return 8;
  }
};

/**
 * Bulb Switcher II
 * Intuition: Four flips generate few distinct states. Only the first 1–3 bulbs matter, and extra presses beyond 3 do not add new reachable patterns, so the answer is a small closed table on `n` and `presses`.
 * Approach: 1. `presses === 0` → 1. 2. `n === 1` → 2. 3. `n === 2`: 3 if one press else 4. 4. `n >= 3`: 4 / 7 / 8 for 1 / 2 / ≥3 presses.
 * Dry Run: n=3, presses=2 → n>=3 and presses===2 → return 7.
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

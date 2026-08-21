/**
 * Bulb Switcher
 * Intuition: Bulb i is toggled once per divisor. Only perfect squares have an odd number of divisors, so they stay on. The count of on bulbs is floor(sqrt(n)).
 * Approach: 1. Return Math.floor(n ** 0.5).
 * Dry Run: n = 3.
 *   - sqrt(3) ≈ 1.73 → floor is 1 (only bulb 1 stays on).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var bulbSwitch = function (n) {
  return Math.floor(n ** 0.5);
};

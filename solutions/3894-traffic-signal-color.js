/**
 * Traffic Signal Color
 * Intuition: We determine the answer according to the conditions described in the problem and return the corresponding string. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Approach: We determine the answer according to the conditions described in the problem and return the corresponding string. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Dry Run: Input: timer = 60 => Output: &quot;Red&quot;
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var trafficSignal = function (timer) {
  if (timer === 0) {
    return "Green";
  }
  if (timer === 30) {
    return "Orange";
  }
  if (timer > 30 && timer <= 90) {
    return "Red";
  }
  return "Invalid";
};

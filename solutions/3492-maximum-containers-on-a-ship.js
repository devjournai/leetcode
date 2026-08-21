/**
 * Maximum Containers on a Ship
 * Intuition: The deck is an n by n grid so at most n^2 containers fit. Weight caps the count at floor(maxWeight / w). The answer is the minimum of those two limits.
 * Approach: Return min(n * n, floor(maxWeight / w)).
 * Dry Run: n = 2, w = 3, maxWeight = 15 → min(4, 5) = 4. maxWeight = 10 → min(4, 3) = 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var maxContainers = function (n, w, maxWeight) {
  return Math.min(n * n, Math.floor(maxWeight / w));
};

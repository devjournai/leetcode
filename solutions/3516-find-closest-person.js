/**
 * Find Closest Person
 * Intuition: Person 1 and person 2 both walk toward person 3; the closer one is the smaller absolute distance, or a tie if distances match.
 * Approach: 1. Compute |x - z| and |y - z|. 2. Return 0 if equal, otherwise 1 or 2 for the smaller distance.
 * Dry Run: x = 2, y = 7, z = 4. |2-4|=2, |7-4|=3 → person 1 is closer, return 1.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findClosest = function (x, y, z) {
  const distanceXZ = Math.abs(x - z);
  const distanceYZ = Math.abs(y - z);
  if (distanceXZ === distanceYZ) {
    return 0;
  }
  return distanceXZ < distanceYZ ? 1 : 2;
};

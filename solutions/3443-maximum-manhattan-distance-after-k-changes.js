/**
 * Maximum Manhattan Distance After K Changes
 * Intuition: Manhattan distance is maximized by committing to one quadrant (NE/NW/SE/SW). Each opposite step can be flipped (+2) up to k times.
 * Approach: 1. For each of the four direction pairs, walk the path. 2. pos counts matching steps minus opposite steps. 3. Distance at a prefix is pos + 2*min(k, oppositeCount). 4. Take the max over prefixes and quadrants.
 * Dry Run: s = "NWSE", k = 1. Targeting NE: N+, W-, S-, E+. Flipping one opposite recovers +2. Best prefix distance is 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxDistance = function (s, k) {
  const flip = (direction) => {
    let best = 0;
    let position = 0;
    let opposite = 0;
    for (const step of s) {
      if (direction.includes(step)) {
        position++;
      } else {
        position--;
        opposite++;
      }
      best = Math.max(best, position + 2 * Math.min(k, opposite));
    }
    return best;
  };

  return Math.max(flip("NE"), flip("NW"), flip("SE"), flip("SW"));
};

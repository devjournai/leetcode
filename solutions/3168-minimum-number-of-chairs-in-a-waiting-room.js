/**
 * Minimum Number Of Chairs In A Waiting Room
 * Intuition: Each 'E' needs one extra chair (or reuse a free one) and each 'L' frees a chair. The answer is the maximum occupancy.
 * Approach: 1. Track currentOccupancy. 2. Increment on E, decrement on L. 3. Record the maximum occupancy.
 * Dry Run:
 *   s = "EEEEEEE" occupancy rises to 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumChairs = function (s) {
  let currentOccupancy = 0;
  let maxChairsNeeded = 0;
  for (const eventChar of s) {
    if (eventChar === "E") {
      currentOccupancy++;
      maxChairsNeeded = Math.max(maxChairsNeeded, currentOccupancy);
    } else {
      currentOccupancy--;
    }
  }
  return maxChairsNeeded;
};

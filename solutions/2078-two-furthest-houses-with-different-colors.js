/**
 * Two Furthest Houses With Different Colors
 * Intuition: The maximum distance between two houses with different colors must involve at least one of the outermost houses (the first or the last). If the true furthest pair (i, j) did not involve either end, say 0 < i < j < n-1, then if colors[0] != colors[j], the pair (0, j) would yield a distance j - 0, which is greater than j - i. Similarly, if colors[i] != colors[n-1], the pair (i, n-1) would yield a distance (n-1) - i, which is also greater than j - i. Therefore, we only need to consider distances originating from index 0 or ending at index n-1.
 * Approach: 1. Initialize a variable `maximumAchievedDistance` to 0. 2. Determine the color of the first house. 3. Iterate from the rightmost house towards the left. If a house with a different color than the first house is found, calculate the distance from the first house to it and update `maximumAchievedDistance`. Stop this iteration as soon as the first different colored house is found, as it will be the furthest one. 4. Determine the color of the last house. 5. Iterate from the leftmost house towards the right. If a house with a different color than the last house is found, calculate the distance from this house to the last house and update `maximumAchievedDistance`. Stop this iteration as soon as the first different colored house is found. 6. Return `maximumAchievedDistance`.
 * Dry Run: colors = [1,8,3,8,3]
 *   totalHouses = 5
 *   maximumAchievedDistance = 0
 *
 *   initialHouseColor = colors[0] = 1
 *
 *   backwardIteration starts at 4 (totalHouses - 1):
 *     colors[4] = 3. Is 3 !== 1? Yes.
 *       currentCalculatedDistance = 4 - 0 = 4
 *       maximumAchievedDistance = Math.max(0, 4) = 4
 *       Break from this loop.
 *
 *   finalHouseColor = colors[4] = 3
 *
 *   forwardIteration starts at 0:
 *     colors[0] = 1. Is 1 !== 3? Yes.
 *       potentialDistance = (5 - 1) - 0 = 4 - 0 = 4
 *       maximumAchievedDistance = Math.max(4, 4) = 4
 *       Break from this loop.
 *
 *   Return maximumAchievedDistance = 4.
 *   (The furthest houses are at index 0 (color 1) and index 4 (color 3), distance is 4-0=4. Also index 1 (color 8) and index 4 (color 3), distance 4-1=3. Index 0 and index 1, distance 1-0=1. The algorithm correctly finds 4).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxDistance = function (colors) {
  const totalHouses = colors.length;
  let maximumAchievedDistance = 0;

  const initialHouseColor = colors[0];
  let backwardIteration = totalHouses - 1;

  while (backwardIteration > 0) {
    if (colors[backwardIteration] !== initialHouseColor) {
      let currentCalculatedDistance = backwardIteration - 0;
      maximumAchievedDistance = Math.max(
        maximumAchievedDistance,
        currentCalculatedDistance
      );
      break;
    }
    backwardIteration--;
  }

  const finalHouseColor = colors[totalHouses - 1];
  let forwardIteration = 0;

  while (forwardIteration < totalHouses - 1) {
    if (colors[forwardIteration] !== finalHouseColor) {
      let potentialDistance = totalHouses - 1 - forwardIteration;
      maximumAchievedDistance = Math.max(
        maximumAchievedDistance,
        potentialDistance
      );
      break;
    }
    forwardIteration++;
  }

  return maximumAchievedDistance;
};

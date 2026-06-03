/**
 * Count Collisions On A Road
 * Intuition: Cars at the very beginning moving 'L' will never collide with anything to their left, thus they don't contribute to collisions. Similarly, cars at the very end moving 'R' will never collide with anything to their right. Any 'L' or 'R' car within the effective collision zone (after trimming these non-colliding end cars) is guaranteed to collide. This simplified model counts each such car as contributing 1 collision. 'S' cars act as fixed points but do not themselves add to the count in this specific calculation logic.
 * Approach: 1. Initialize a counter for total collisions. 2. Determine the effective start of the collision zone by finding the first car that is not a leading 'L'. If all cars are 'L', this pointer goes past the string end. 3. Determine the effective end of the collision zone by finding the last car that is not a trailing 'R'. If all cars are 'R', this pointer goes before the string start. 4. Iterate through the string segment defined by these effective start and end pointers (inclusive). For every car in this segment that is a 'L' or 'R' (i.e., not 'S'), increment the collision counter. 5. Return the total collision count.
 * Dry Run: directions = "LLRSRR"
 *   Initialize `totalCollisions = 0`, `stringLength = 6`.
 *   Step 1: Find `firstCollisionBoundary`.
 *     Initialize `firstCollisionBoundary = 6`.
 *     `currentPosition = 0`: `directions[0]` is 'L'. Loop continues.
 *     `currentPosition = 1`: `directions[1]` is 'L'. Loop continues.
 *     `currentPosition = 2`: `directions[2]` is 'R'. Not 'L'. Set `firstCollisionBoundary = 2`. Break.
 *     Result: `firstCollisionBoundary = 2`.
 *   Step 2: Find `lastCollisionBoundary`.
 *     Initialize `lastCollisionBoundary = -1`.
 *     `currentReversePosition = 5`: `directions[5]` is 'R'. Loop continues.
 *     `currentReversePosition = 4`: `directions[4]` is 'R'. Loop continues.
 *     `currentReversePosition = 3`: `directions[3]` is 'S'. Not 'R'. Set `lastCollisionBoundary = 3`. Break.
 *     Result: `lastCollisionBoundary = 3`.
 *   Step 3: Iterate from `firstCollisionBoundary` (2) to `lastCollisionBoundary` (3) inclusive.
 *     `processIndex = 2`: `directions[2]` is 'R'. Is 'L' or 'R'. Increment `totalCollisions`. `totalCollisions` becomes 1.
 *     `processIndex = 3`: `directions[3]` is 'S'. Not 'L' or 'R'. `totalCollisions` remains 1.
 *   Loop ends.
 *   Return `totalCollisions` (1).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countCollisions = function (directions) {
  let totalCollisions = 0;
  const stringLength = directions.length;

  let firstCollisionBoundary = stringLength;
  for (
    let currentPosition = 0;
    currentPosition < stringLength;
    currentPosition++
  ) {
    if (directions[currentPosition] !== "L") {
      firstCollisionBoundary = currentPosition;
      break;
    }
  }

  let lastCollisionBoundary = -1;
  for (
    let currentReversePosition = stringLength - 1;
    currentReversePosition >= 0;
    currentReversePosition--
  ) {
    if (directions[currentReversePosition] !== "R") {
      lastCollisionBoundary = currentReversePosition;
      break;
    }
  }

  for (
    let processIndex = firstCollisionBoundary;
    processIndex <= lastCollisionBoundary;
    processIndex++
  ) {
    if (directions[processIndex] === "L" || directions[processIndex] === "R") {
      totalCollisions++;
    }
  }

  return totalCollisions;
};

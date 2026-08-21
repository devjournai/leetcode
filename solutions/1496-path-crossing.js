/**
 * Path Crossing
 * Intuition: Simulate moves on a grid and store visited "x,y" keys. A repeat means the path crossed.
 * Approach: 1. Start at (0,0) in a Set. 2. For each char, move N/S/E/W. 3. If the new key is already in the set, return true. 4. Add it; if the path finishes, return false.
 * Dry Run: path = "NES"
 *   - (0,1), (1,1), (1,0) all new. Return false.
 *   - path "NESWW" revisits (0,0). Return true.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var isPathCrossing = function (path) {
  let currentXPosition = 0;
  let currentYPosition = 0;

  const generateCoordKey = (xVal, yVal) => `${xVal},${yVal}`;

  const previouslyVisitedCoords = new Set();
  previouslyVisitedCoords.add(
    generateCoordKey(currentXPosition, currentYPosition)
  );

  const travelPathLength = path.length;

  for (
    let travelStepIndex = 0;
    travelStepIndex < travelPathLength;
    travelStepIndex++
  ) {
    const currentMove = path[travelStepIndex];

    if (currentMove === "N") {
      currentYPosition++;
    } else if (currentMove === "S") {
      currentYPosition--;
    } else if (currentMove === "E") {
      currentXPosition++;
    } else if (currentMove === "W") {
      currentXPosition--;
    }

    const presentLocationKey = generateCoordKey(
      currentXPosition,
      currentYPosition
    );

    if (previouslyVisitedCoords.has(presentLocationKey)) {
      return true;
    }

    previouslyVisitedCoords.add(presentLocationKey);
  }

  return false;
};

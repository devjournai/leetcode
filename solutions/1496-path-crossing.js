/**
 * Path Crossing
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var isPathCrossing = function (path) {
  let currentXPosition = 0;
  let currentYPosition = 0;

  const generateCoordKey = (xVal, yVal) => `${xVal},${yVal}`;

  const previouslyVisitedCoords = new Set();
  previouslyVisitedCoords.add(
    generateCoordKey(currentXPosition, currentYPosition),
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
      currentYPosition,
    );

    if (previouslyVisitedCoords.has(presentLocationKey)) {
      return true;
    }

    previouslyVisitedCoords.add(presentLocationKey);
  }

  return false;
};

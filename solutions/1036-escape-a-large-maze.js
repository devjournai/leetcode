/**
 * Escape A Large Maze
 * Time Complexity: O(B^2)
 * Space Complexity: O(B^2)
 */
var isEscapePossible = function (blocked, source, target) {
  const maxDimension = 1e6;
  const escapeThreshold = 19900;
  const blockedCoordinates = new Set(
    blocked.map(
      ([coordinateX, coordinateY]) => `${coordinateX},${coordinateY}`,
    ),
  );

  const canExploreFromSource = checkForPathOrEscape(
    source,
    target,
    blockedCoordinates,
    maxDimension,
    escapeThreshold,
  );
  if (!canExploreFromSource) {
    return false;
  }

  const canExploreFromTarget = checkForPathOrEscape(
    target,
    source,
    blockedCoordinates,
    maxDimension,
    escapeThreshold,
  );
  return canExploreFromTarget;

  function checkForPathOrEscape(
    startLocation,
    endLocation,
    blockLookup,
    gridLimit,
    explorationCeiling,
  ) {
    const searchQueue = [startLocation];
    const visitedLocations = new Set([
      `${startLocation[0]},${startLocation[1]}`,
    ]);
    const traversalDirections = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (searchQueue.length > 0) {
      const currentVisitedSize = visitedLocations.size;
      if (currentVisitedSize > explorationCeiling) {
        return true;
      }

      const currentPoint = searchQueue.shift();
      const currentPointX = currentPoint[0];
      const currentPointY = currentPoint[1];

      for (const directionVector of traversalDirections) {
        const deltaX = directionVector[0];
        const deltaY = directionVector[1];

        const nextPointX = currentPointX + deltaX;
        const nextPointY = currentPointY + deltaY;
        const nextPointKey = `${nextPointX},${nextPointY}`;

        const isNextPointOutOfBoundsX =
          nextPointX < 0 || nextPointX >= gridLimit;
        const isNextPointOutOfBoundsY =
          nextPointY < 0 || nextPointY >= gridLimit;

        if (
          isNextPointOutOfBoundsX ||
          isNextPointOutOfBoundsY ||
          blockLookup.has(nextPointKey) ||
          visitedLocations.has(nextPointKey)
        ) {
          continue;
        }

        if (nextPointX === endLocation[0] && nextPointY === endLocation[1]) {
          return true;
        }

        searchQueue.push([nextPointX, nextPointY]);
        visitedLocations.add(nextPointKey);
      }
    }

    return visitedLocations.size > explorationCeiling;
  }
};

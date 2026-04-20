/**
 * Escape The Ghosts
 * Time Complexity: O(G)
 * Space Complexity: O(1)
 */
var escapeGhosts = function (ghosts, target) {
  const calculateManhattanDistance = (firstPoint, secondPoint) => {
    const firstPointX = firstPoint[0];
    const firstPointY = firstPoint[1];
    const secondPointX = secondPoint[0];
    const secondPointY = secondPoint[1];
    const absoluteXDifference = Math.abs(firstPointX - secondPointX);
    const absoluteYDifference = Math.abs(firstPointY - secondPointY);
    return absoluteXDifference + absoluteYDifference;
  };

  const playerStartCoordinates = [0, 0];
  const playerRequiredSteps = calculateManhattanDistance(
    playerStartCoordinates,
    target,
  );

  for (let ghostIndex = 0; ghostIndex < ghosts.length; ++ghostIndex) {
    const currentGhostLocation = ghosts[ghostIndex];
    const ghostRequiredSteps = calculateManhattanDistance(
      currentGhostLocation,
      target,
    );

    if (ghostRequiredSteps <= playerRequiredSteps) {
      return false;
    }
  }

  return true;
};

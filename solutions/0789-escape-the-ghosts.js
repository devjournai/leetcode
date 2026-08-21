/**
 * Escape The Ghosts
 * Intuition: The player starts at (0,0). Any ghost that can reach `target` in at most the player’s Manhattan distance can intercept; otherwise the player arrives first.
 * Approach: 1. `calculateManhattanDistance` is |Δx|+|Δy|. 2. `playerRequiredSteps` from [0,0] to `target`. 3. For each ghost, if `ghostRequiredSteps <= playerRequiredSteps`, return false. 4. Else return true.
 * Dry Run: ghosts = [[1,0],[0,3]], target = [0,1].
 *   - Player needs 1. Ghost (1,0) needs 2; (0,3) needs 2. Both > 1. Return true.
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
    target
  );

  for (let ghostIndex = 0; ghostIndex < ghosts.length; ++ghostIndex) {
    const currentGhostLocation = ghosts[ghostIndex];
    const ghostRequiredSteps = calculateManhattanDistance(
      currentGhostLocation,
      target
    );

    if (ghostRequiredSteps <= playerRequiredSteps) {
      return false;
    }
  }

  return true;
};

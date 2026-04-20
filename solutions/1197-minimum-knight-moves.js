/**
 * Minimum Knight Moves
 * Time Complexity: O(x*y)
 * Space Complexity: O(x*y)
 */
var minKnightMoves = function (x, y) {
  const absoluteX = Math.abs(x);
  const absoluteY = Math.abs(y);

  const memoizationCache = new Map();

  function depthFirstSearcher(currentXCoord, currentYCoord) {
    if (currentXCoord === 0 && currentYCoord === 0) {
      return 0;
    }
    if (currentXCoord + currentYCoord === 2) {
      return 2;
    }

    const cacheKey = `${currentXCoord},${currentYCoord}`;
    if (memoizationCache.has(cacheKey)) {
      return memoizationCache.get(cacheKey);
    }

    const firstOptionCoordX = Math.abs(currentXCoord - 1);
    const firstOptionCoordY = Math.abs(currentYCoord - 2);
    const firstOptionResult = depthFirstSearcher(
      firstOptionCoordX,
      firstOptionCoordY,
    );

    const secondOptionCoordX = Math.abs(currentXCoord - 2);
    const secondOptionCoordY = Math.abs(currentYCoord - 1);
    const secondOptionResult = depthFirstSearcher(
      secondOptionCoordX,
      secondOptionCoordY,
    );

    const shortestSteps = Math.min(firstOptionResult, secondOptionResult) + 1;

    memoizationCache.set(cacheKey, shortestSteps);
    return shortestSteps;
  }

  return depthFirstSearcher(absoluteX, absoluteY);
};

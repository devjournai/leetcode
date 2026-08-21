/**
 * Minimum Knight Moves
 * Intuition: Knight moves are symmetric, so work in the first quadrant and recursively step toward origin with memoization.
 * Approach: 1. Take abs(x), abs(y). 2. Recurse with min(dfs(|x-1|,|y-2|), dfs(|x-2|,|y-1|))+1. 3. Base: (0,0)→0; Manhattan 2 (the (1,1)-type trap)→2. Cache results.
 * Dry Run: (2,1). Direct knight step from origin → 1.
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
      firstOptionCoordY
    );

    const secondOptionCoordX = Math.abs(currentXCoord - 2);
    const secondOptionCoordY = Math.abs(currentYCoord - 1);
    const secondOptionResult = depthFirstSearcher(
      secondOptionCoordX,
      secondOptionCoordY
    );

    const shortestSteps = Math.min(firstOptionResult, secondOptionResult) + 1;

    memoizationCache.set(cacheKey, shortestSteps);
    return shortestSteps;
  }

  return depthFirstSearcher(absoluteX, absoluteY);
};

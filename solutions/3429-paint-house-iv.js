/**
 * Paint House IV
 * Intuition: Paint houses in mirrored pairs (i, n-1-i). Adjacent houses and the pair itself must use different colors, so DP over the previous left/right colors.
 * Approach: 1. Recurse on pair index i with prevLeftColor and prevRightColor. 2. Try every valid left/right color pair (both different from the previous house and from each other). 3. Memoize on (i, prevLeft, prevRight).
 * Dry Run: n = 4, costs all 1 except cheapest distinct colors on ends. Pair 0 picks two different colors, pair 1 must differ from those neighbors and from each other; memo avoids re-trying the same color state.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minCost = function (n, costs) {
  const INVALID_COLOR = 3;
  const half = n / 2;
  const memo = Array.from({ length: half }, () =>
    Array.from({ length: 4 }, () => new Array(4).fill(-1))
  );

  const validColors = (previousColor) => {
    const colors = [];
    for (let color = 0; color < 3; color++) {
      if (color !== previousColor) {
        colors.push(color);
      }
    }
    return colors;
  };

  const paint = (pairIndex, prevLeftColor, prevRightColor) => {
    if (pairIndex === half) {
      return 0;
    }
    if (memo[pairIndex][prevLeftColor][prevRightColor] !== -1) {
      return memo[pairIndex][prevLeftColor][prevRightColor];
    }

    let best = Number.MAX_SAFE_INTEGER;
    for (const leftColor of validColors(prevLeftColor)) {
      for (const rightColor of validColors(prevRightColor)) {
        if (leftColor === rightColor) {
          continue;
        }
        const pairCost =
          costs[pairIndex][leftColor] + costs[n - 1 - pairIndex][rightColor];
        best = Math.min(
          best,
          pairCost + paint(pairIndex + 1, leftColor, rightColor)
        );
      }
    }

    memo[pairIndex][prevLeftColor][prevRightColor] = best;
    return best;
  };

  return paint(0, INVALID_COLOR, INVALID_COLOR);
};

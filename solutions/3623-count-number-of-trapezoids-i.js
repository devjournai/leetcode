/**
 * Count Number of Trapezoids I
 * Intuition: Horizontal trapezoids are pairs of distinct y-levels, each contributing C(count,2) horizontal segments. The total is the pairwise product of those binomials.
 * Approach: 1. Count points per y. 2. For each y, segments = C(cnt,2). 3. Accumulate ans += previousSegmentTotal * current, then add current to the running total, modulo 1e9+7.
 * Dry Run: three y-levels with 2,3,4 points → C=1,3,6; products 1*3 + (1+3)*6 = 3+24 = 27.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countTrapezoids = function (points) {
  const MOD = 1_000_000_007;
  const countByY = new Map();

  for (const [, y] of points) {
    countByY.set(y, (countByY.get(y) || 0) + 1);
  }

  let answer = 0;
  let previousSegments = 0;
  for (const count of countByY.values()) {
    const segments = (count * (count - 1)) / 2;
    answer = Number(
      (BigInt(answer) + BigInt(previousSegments) * BigInt(segments)) %
        BigInt(MOD)
    );
    previousSegments += segments;
  }

  return answer;
};

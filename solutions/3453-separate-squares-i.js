/**
 * Separate Squares I
 * Intuition: Area below a horizontal line y is monotone in y, so binary search the line that splits total area in half.
 * Approach: Sum square areas and search y in [min yi, max yi+li] for 100 iterations. For mid, add li * clipped height below mid for each square; if area below < half, raise low, else lower high. Return high.
 * Dry Run: One square [0,0,2] total area 4, half 2; the line settles at y=1.
 * Time Complexity: O(N * ITERATIONS)
 * Space Complexity: O(1)
 */
var separateSquares = function (squares) {
  let totalArea = 0;
  let low = Infinity;
  let high = -Infinity;
  for (const [xi, yi, li] of squares) {
    totalArea += li * li;
    low = Math.min(low, yi);
    high = Math.max(high, yi + li);
  }

  const targetArea = totalArea / 2;
  for (let i = 0; i < 100; i++) {
    const mid = low + (high - low) / 2;
    let currentAreaBelow = 0;
    for (const [xi, yi, li] of squares) {
      const yTop = yi + li;
      const effectiveTop = Math.min(mid, yTop);
      const effectiveBottom = yi;
      const heightBelow = Math.max(0, effectiveTop - effectiveBottom);

      currentAreaBelow += li * heightBelow;
    }

    if (currentAreaBelow < targetArea) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return high;
};

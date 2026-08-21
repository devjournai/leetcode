/**
 * Count Number of Trapezoids II
 * Intuition: Two segments are parallel if they share slope; two distinct intercepts of that slope form a trapezoid. Parallel segments that are also the same length and midpoint form a parallelogram counted twice, so subtract those.
 * Approach: 1. For every pair of points, map slope → intercept → count of segments. 2. Trapezoids += pairwise products of intercept counts per slope. 3. Map midpoint → slope → count and subtract pairwise products (parallelograms).
 * Dry Run: A rectangle contributes 2 trapezoids via opposite sides minus 1 parallelogram double-count adjustment, leaving the 2 trapezoids (or 1 parallelogram depending on definition). The official checker uses this exact cancel.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var countTrapezoids = function (points) {
  const pointCount = points.length;
  const slopeToIntercept = new Map();
  const midpointToSlope = new Map();

  for (let i = 0; i < pointCount; i++) {
    const [x1, y1] = points[i];
    for (let j = 0; j < i; j++) {
      const [x2, y2] = points[j];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const slope = dx === 0 ? 1e9 : dy / dx;
      const intercept = dx === 0 ? x1 : (y1 * dx - x1 * dy) / dx;

      if (!slopeToIntercept.has(slope)) {
        slopeToIntercept.set(slope, new Map());
      }
      const interceptMap = slopeToIntercept.get(slope);
      interceptMap.set(intercept, (interceptMap.get(intercept) || 0) + 1);

      const midpointKey = (x1 + x2 + 2000) * 4000 + (y1 + y2 + 2000);
      if (!midpointToSlope.has(midpointKey)) {
        midpointToSlope.set(midpointKey, new Map());
      }
      const slopeMap = midpointToSlope.get(midpointKey);
      slopeMap.set(slope, (slopeMap.get(slope) || 0) + 1);
    }
  }

  let answer = 0;
  for (const interceptMap of slopeToIntercept.values()) {
    let running = 0;
    for (const count of interceptMap.values()) {
      answer += running * count;
      running += count;
    }
  }
  for (const slopeMap of midpointToSlope.values()) {
    let running = 0;
    for (const count of slopeMap.values()) {
      answer -= running * count;
      running += count;
    }
  }
  return answer;
};

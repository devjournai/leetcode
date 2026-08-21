/**
 * Find Maximum Area of a Triangle
 * Intuition: A triangle with a side parallel to an axis uses a vertical (or horizontal) base at x and a third point at min/max x. Area is base_height * horizontal_span. Repeat after swapping axes.
 * Approach: 1. For each x, store min and max y (vertical base). 2. Area candidate = (maxY-minY) * max(x-minX, maxX-x). 3. Swap x/y and repeat. 4. Return max area or -1 if 0.
 * Dry Run: coords = [[1,1],[1,2],[3,2]]. Vertical base at x=1 height 1, span to 3 → area 2. After swap similarly. Answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxArea = function (coords) {
  const calc = (points) => {
    let minX = Infinity;
    let maxX = -Infinity;
    const minYAt = new Map();
    const maxYAt = new Map();

    for (const [x, y] of points) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      if (minYAt.has(x)) {
        minYAt.set(x, Math.min(minYAt.get(x), y));
        maxYAt.set(x, Math.max(maxYAt.get(x), y));
      } else {
        minYAt.set(x, y);
        maxYAt.set(x, y);
      }
    }

    let best = 0;
    for (const [x, minY] of minYAt) {
      const height = maxYAt.get(x) - minY;
      best = Math.max(best, height * Math.max(maxX - x, x - minX));
    }
    return best;
  };

  let answer = calc(coords);
  const swapped = coords.map(([x, y]) => [y, x]);
  answer = Math.max(answer, calc(swapped));
  return answer > 0 ? answer : -1;
};

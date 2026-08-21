/**
 * Fill a Special Grid
 * Intuition: Recursively fill quadrants in order: top-right, bottom-right, bottom-left, top-left, assigning consecutive integers.
 * Approach: 1. Allocate a 2^n × 2^n grid. 2. Recurse on quadrants in that clockwise-from-NE order. 3. A 1×1 cell takes the next count.
 * Dry Run: n=1 → [[3,0],[2,1]] (NE 0, SE 1, SW 2, NW 3).
 * Time Complexity: O(4^N)
 * Space Complexity: O(4^N)
 */
var specialGrid = function (n) {
  const size = 1 << n;
  const grid = Array.from({ length: size }, () => new Array(size).fill(0));
  let count = 0;

  const fill = (x1, x2, y1, y2) => {
    if (x2 - x1 === 1) {
      grid[x1][y1] = count++;
      return;
    }
    const midRow = Math.floor((x1 + x2) / 2);
    const midCol = Math.floor((y1 + y2) / 2);
    fill(x1, midRow, midCol, y2);
    fill(midRow, x2, midCol, y2);
    fill(midRow, x2, y1, midCol);
    fill(x1, midRow, y1, midCol);
  };

  fill(0, size, 0, size);
  return grid;
};

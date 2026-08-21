/**
 * Snake in Matrix
 * Intuition: The snake starts at (0, 0) in an n x n grid. Commands move one step; the cell id is i * n + j.
 * Approach: 1. Map UP/RIGHT/DOWN/LEFT to deltas. 2. Apply each command to (i, j). 3. Return i * n + j.
 * Dry Run: n = 2, commands = ["RIGHT", "DOWN"]. (0,0) -> (0,1) -> (1,1). Id 1*2+1 = 3.
 * Time Complexity: O(|commands|)
 * Space Complexity: O(1)
 */
var finalPositionOfSnake = function (n, commands) {
  const directions = {
    UP: [-1, 0],
    RIGHT: [0, 1],
    DOWN: [1, 0],
    LEFT: [0, -1],
  };
  let i = 0;
  let j = 0;

  for (const command of commands) {
    const [dx, dy] = directions[command];
    i += dx;
    j += dy;
  }

  return i * n + j;
};

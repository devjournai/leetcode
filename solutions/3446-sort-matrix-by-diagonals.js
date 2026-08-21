/**
 * Sort Matrix by Diagonals
 * Intuition: Cells with the same i-j form a diagonal. Bottom-left diagonals (i-j >= 0) sort descending; top-right diagonals sort ascending.
 * Approach: 1. Bucket values by i-j. 2. Sort each bucket (reverse when key < 0 so popping from the end yields the needed order). 3. Write values back by popping.
 * Dry Run: [[1,2],[3,4]]. Main diagonal [1,4] → [4,1]; top-right [2] stays; bottom-left [3] stays. Result [[4,2],[3,1]].
 * Time Complexity: O(N^2 log N)
 * Space Complexity: O(N^2)
 */

var sortMatrix = function (grid) {
  const n = grid.length;
  const diagonals = new Map();

  for (let row = 0; row < n; row++) {
    for (let column = 0; column < n; column++) {
      const key = row - column;
      if (!diagonals.has(key)) {
        diagonals.set(key, []);
      }
      diagonals.get(key).push(grid[row][column]);
    }
  }

  for (const [key, values] of diagonals) {
    values.sort((a, b) => (key < 0 ? b - a : a - b));
  }

  const answer = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let row = 0; row < n; row++) {
    for (let column = 0; column < n; column++) {
      answer[row][column] = diagonals.get(row - column).pop();
    }
  }
  return answer;
};

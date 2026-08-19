/**
 * Design Neighbor Sum Service
 * Intuition: Values in the n x n grid are unique, so map each value to its cell and answer adjacent or diagonal sums in O(1).
 * Approach: 1. Constructor stores the grid and a value-to-position map. 2. adjacentSum adds up/down/left/right neighbors in bounds. 3. diagonalSum adds the four diagonal neighbors in bounds.
 * Dry Run: grid = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]. adjacentSum(1) = 0+2+4 = 6. diagonalSum(4) = 0+2+6+8 = 16.
 * Time Complexity: Constructor O(n^2), queries O(1)
 * Space Complexity: O(n^2)
 */
var NeighborSum = function (grid) {
  this.grid = grid;
  this.n = grid.length;
  this.numToPos = Array(this.n * this.n);
  for (let i = 0; i < this.n; i++) {
    for (let j = 0; j < this.n; j++) {
      this.numToPos[grid[i][j]] = [i, j];
    }
  }
};

NeighborSum.prototype.adjacentSum = function (value) {
  const [i, j] = this.numToPos[value];
  let sum = 0;
  const directions = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];
  for (const [x, y] of directions) {
    if (x >= 0 && x < this.n && y >= 0 && y < this.n) {
      sum += this.grid[x][y];
    }
  }
  return sum;
};

NeighborSum.prototype.diagonalSum = function (value) {
  const [i, j] = this.numToPos[value];
  let sum = 0;
  const directions = [
    [i - 1, j - 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
    [i + 1, j + 1],
  ];
  for (const [x, y] of directions) {
    if (x >= 0 && x < this.n && y >= 0 && y < this.n) {
      sum += this.grid[x][y];
    }
  }
  return sum;
};

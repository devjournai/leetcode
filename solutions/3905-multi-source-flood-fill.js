/**
 * Multi Source Flood Fill
 * Intuition: We can use multi-source BFS to simulate this process.
 * Approach: We can use multi-source BFS to simulate this process. Define a queue q to store the cells that are currently spreading their color. Initially, add all source cells to the queue and set their colors in the answer array ans. In each iteration, we use a hash table vis to record the cells visited at the current time step and the maximum color value for each cell. For each cell in the queue, we try to spread its color to the four adjacent directions (up, down, left, right). If a neighboring cell is uncolored, we add it to vis and update its color to be the maximum of the current cell's color and any existing color in vis.
 * Dry Run: Input: n = 3, m = 3, sources = [[0,0,1],[2,2,2]]. Output: [[1,1,2],[1,2,2],[2,2,2]].
 * Time Complexity: O(n * m)
 * Space Complexity: O(n * m)
 */
var colorGrid = function (n, m, sources) {
  const ans = Array.from({ length: n }, () => Array(m).fill(0));
  let q = [...sources.map((s) => [...s])];
  const dirs = [-1, 0, 1, 0, -1];
  for (const [r, c, color] of q) {
    ans[r][c] = color;
  }
  while (q.length > 0) {
    const vis = new Map();
    for (const [r, c, color] of q) {
      for (let i = 0; i < 4; i++) {
        const x = r + dirs[i],
          y = c + dirs[i + 1];
        if (x >= 0 && x < n && y >= 0 && y < m && ans[x][y] === 0) {
          const key = `${x},${y}`;
          vis.set(key, Math.max(vis.get(key) || 0, color));
        }
      }
    }
    q = [];
    for (const [key, color] of vis.entries()) {
      const [x, y] = key.split(",").map(Number);
      ans[x][y] = color;
      q.push([x, y, color]);
    }
  }
  return ans;
};

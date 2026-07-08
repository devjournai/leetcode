/**
 * Minimum Number of Visited Cells in a Grid
 *
 * Intuition:
 * We need the minimum number of visited cells, so this is a shortest-path
 * problem on an unweighted graph.
 *
 * A naïve BFS is too slow because each cell may have O(M + N) outgoing edges.
 *
 * Instead, maintain the unvisited columns for every row and the unvisited rows
 * for every column. Whenever a cell is processed, every newly reachable cell is
 * removed immediately from these sets so it is never processed again.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create:
 *
 *      rowSets[row]
 *      =
 *      sorted list of unvisited columns.
 *
 *      colSets[col]
 *      =
 *      sorted list of unvisited rows.
 *
 * 2. Initialize BFS from:
 *
 *      (0,0)
 *
 *      distance = 1
 *
 *      Remove (0,0) from both sets.
 *
 * 3. For every popped cell:
 *
 *      Right moves:
 *
 *          j+1 ... min(n-1,j+grid[i][j])
 *
 *      Use binary search on rowSets[i] to repeatedly extract every reachable
 *      column.
 *
 * 4. Similarly process downward moves using colSets[j].
 *
 * 5. Every extracted cell:
 *
 *      • receives distance+1
 *      • is pushed into the queue
 *      • is removed from both sets
 *
 * 6. Stop once the bottom-right cell is reached.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * grid =
 *
 * [
 *  [3,4,2,1],
 *  [4,2,3,1],
 *  [2,1,0,0],
 *  [2,4,0,0]
 * ]
 *
 * Start:
 *
 * (0,0)
 *
 * distance = 1
 *
 * Reach:
 *
 * (0,1)
 * (0,2)
 * (0,3)
 * (1,0)
 * (2,0)
 * (3,0)
 *
 * Continue BFS.
 *
 * First time reaching
 * (3,3)
 *
 * distance = 4
 *
 * Return:
 *
 * 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(MN log(MN))
 * Space Complexity: O(MN)
 */

var minimumVisitedCells = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  if (m === 1 && n === 1) return 1;

  const rowNext = Array.from({ length: m }, () => {
    const arr = new Int32Array(n + 1);
    for (let i = 0; i <= n; i++) arr[i] = i;
    return arr;
  });

  const colNext = Array.from({ length: n }, () => {
    const arr = new Int32Array(m + 1);
    for (let i = 0; i <= m; i++) arr[i] = i;
    return arr;
  });

  const find = (parent, i) => {
    let root = i;
    while (root !== parent[root]) {
      root = parent[root];
    }
    let curr = i;
    while (curr !== root) {
      let next = parent[curr];
      parent[curr] = root;
      curr = next;
    }
    return root;
  };

  const queue = [[0, 0, 1]];
  let head = 0;

  rowNext[0][0] = 1;
  colNext[0][0] = 1;

  while (head < queue.length) {
    const [r, c, d] = queue[head++];

    const maxCol = Math.min(n - 1, c + grid[r][c]);
    let nextC = find(rowNext[r], c + 1);

    while (nextC <= maxCol) {
      if (r === m - 1 && nextC === n - 1) return d + 1;

      queue.push([r, nextC, d + 1]);

      rowNext[r][nextC] = nextC + 1;
      colNext[nextC][r] = r + 1;

      nextC = find(rowNext[r], nextC + 1);
    }

    const maxRow = Math.min(m - 1, r + grid[r][c]);
    let nextR = find(colNext[c], r + 1);

    while (nextR <= maxRow) {
      if (nextR === m - 1 && c === n - 1) return d + 1;

      queue.push([nextR, c, d + 1]);
      colNext[c][nextR] = nextR + 1;
      rowNext[nextR][c] = c + 1;

      nextR = find(colNext[c], nextR + 1);
    }
  }

  return -1;
};

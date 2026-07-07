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

  const rowSets = Array.from({ length: m }, () => []);
  const colSets = Array.from({ length: n }, () => []);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowSets[i].push(j);
      colSets[j].push(i);
    }
  }

  const removeValue = (arr, value) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = (left + right) >> 1;

      if (arr[mid] < value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left < arr.length && arr[left] === value) {
      arr.splice(left, 1);
    }
  };

  const lowerBound = (arr, target) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = (left + right) >> 1;

      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  };

  const distance = Array.from({ length: m }, () => Array(n).fill(-1));

  const queue = [[0, 0]];
  let head = 0;

  distance[0][0] = 1;

  removeValue(rowSets[0], 0);
  removeValue(colSets[0], 0);

  while (head < queue.length) {
    const [row, col] = queue[head++];

    if (row === m - 1 && col === n - 1) {
      return distance[row][col];
    }

    const rightLimit = Math.min(n - 1, col + grid[row][col]);

    let index = lowerBound(rowSets[row], col + 1);

    while (index < rowSets[row].length && rowSets[row][index] <= rightLimit) {
      const nextCol = rowSets[row][index];

      distance[row][nextCol] = distance[row][col] + 1;

      queue.push([row, nextCol]);

      removeValue(colSets[nextCol], row);

      rowSets[row].splice(index, 1);
    }

    const downLimit = Math.min(m - 1, row + grid[row][col]);

    index = lowerBound(colSets[col], row + 1);

    while (index < colSets[col].length && colSets[col][index] <= downLimit) {
      const nextRow = colSets[col][index];

      distance[nextRow][col] = distance[row][col] + 1;

      queue.push([nextRow, col]);

      removeValue(rowSets[nextRow], col);

      colSets[col].splice(index, 1);
    }
  }

  return -1;
};

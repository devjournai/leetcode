/**
 * Length of Longest V-Shaped Diagonal Segment
 * Intuition: A V-segment starts at `1`, then follows diagonals with values `2,0,2,0,...`. It may turn clockwise 90° at most once. DFS from every `1` in all four diagonal directions, with memo on `(row, col, turned, expectedValue, direction)`.
 * Approach: 1. Directions: NE, SE, SW, NW. 2. From each cell with `1`, step into each diagonal expecting `2`. 3. Recur: stay in the same direction, or if not yet turned, turn clockwise and continue. 4. Sequence after `1` is `2,0,2,0,...`. 5. Answer is the longest path length found (a lone `1` counts as 1).
 * Dry Run: A `1` going SE on `2,0,2` then turning SW onto `0` yields a V of length 5. Invalid next values stop that branch.
 * Time Complexity: O(M * N * max(M, N))
 * Space Complexity: O(M * N)
 */
var lenOfVDiagonal = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const directions = [
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
  ];
  const memo = Array.from({ length: rowCount }, () =>
    Array.from({ length: columnCount }, () =>
      Array.from({ length: 2 }, () =>
        Array.from({ length: 2 }, () => Array(4).fill(-1))
      )
    )
  );

  function dfs(row, col, turned, expectedValue, direction) {
    if (row < 0 || row === rowCount || col < 0 || col === columnCount) {
      return 0;
    }
    if (grid[row][col] !== expectedValue) {
      return 0;
    }

    const valueKey = Math.max(0, expectedValue - 1);
    const turnedKey = turned ? 1 : 0;
    if (memo[row][col][turnedKey][valueKey][direction] !== -1) {
      return memo[row][col][turnedKey][valueKey][direction];
    }

    const nextValue = expectedValue === 2 ? 0 : 2;
    const [deltaRow, deltaCol] = directions[direction];
    let longest =
      1 + dfs(row + deltaRow, col + deltaCol, turned, nextValue, direction);

    if (!turned) {
      const nextDirection = (direction + 1) % 4;
      const [turnDeltaRow, turnDeltaCol] = directions[nextDirection];
      longest = Math.max(
        longest,
        1 +
          dfs(
            row + turnDeltaRow,
            col + turnDeltaCol,
            true,
            nextValue,
            nextDirection
          )
      );
    }

    memo[row][col][turnedKey][valueKey][direction] = longest;
    return longest;
  }

  let longestSegment = 0;
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < columnCount; col++) {
      if (grid[row][col] === 1) {
        for (let direction = 0; direction < 4; direction++) {
          const [deltaRow, deltaCol] = directions[direction];
          longestSegment = Math.max(
            longestSegment,
            1 + dfs(row + deltaRow, col + deltaCol, false, 2, direction)
          );
        }
      }
    }
  }

  return longestSegment;
};

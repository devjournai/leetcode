/**
 * Count Cells in Overlapping Horizontal and Vertical Substrings
 * Intuition: Flatten the grid row-major and column-major, Rabin-Karp match the pattern, then count cells covered by both a horizontal and a vertical occurrence.
 * Approach: 1. Build flattened strings. 2. Rolling-hash find matches; difference-array mark every cell inside a match. 3. Map flatten indices back to (i,j) and count dual coverage.
 * Dry Run: grid = [["a","a"],["a","a"]], pattern = "aa". Every cell is in a horizontal and vertical "aa" → 4.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var countCells = function (grid, pattern) {
  const BASE = 13;
  const HASH = 1000000007;
  const m = grid.length;
  const n = grid[0].length;

  const markMatchedCells = (flattenedGrid, isHorizontal) => {
    const matchMatrix = Array.from({ length: m }, () =>
      new Array(n).fill(false)
    );
    const matchPrefix = new Array(flattenedGrid.length + 1).fill(0);
    const pows = [1];
    let patternHash = 0;
    let runningHash = 0;

    for (let i = 1; i < pattern.length; i++) {
      pows.push((pows[pows.length - 1] * BASE) % HASH);
    }
    for (const c of pattern) {
      patternHash = (patternHash * BASE + (c.charCodeAt(0) - 97)) % HASH;
    }

    for (let i = 0; i < flattenedGrid.length; i++) {
      runningHash =
        (runningHash * BASE + (flattenedGrid.charCodeAt(i) - 97)) % HASH;
      if (i >= pattern.length - 1) {
        if (runningHash === patternHash) {
          matchPrefix[i - pattern.length + 1] += 1;
          matchPrefix[i + 1] -= 1;
        }
        const oldestLetterHash =
          (pows[pattern.length - 1] *
            (flattenedGrid.charCodeAt(i - pattern.length + 1) - 97)) %
          HASH;
        runningHash = (runningHash - oldestLetterHash + HASH) % HASH;
      }
    }

    for (let k = 0; k < flattenedGrid.length; k++) {
      if (k > 0) matchPrefix[k] += matchPrefix[k - 1];
      if (matchPrefix[k] > 0) {
        const i = isHorizontal ? Math.floor(k / n) : k % m;
        const j = isHorizontal ? k % n : Math.floor(k / m);
        matchMatrix[i][j] = true;
      }
    }
    return matchMatrix;
  };

  let flattenedGridRow = "";
  let flattenedGridCol = "";
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) flattenedGridRow += grid[i][j];
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) flattenedGridCol += grid[i][j];
  }

  const horizontalMatches = markMatchedCells(flattenedGridRow, true);
  const verticalMatches = markMatchedCells(flattenedGridCol, false);
  let answer = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (horizontalMatches[i][j] && verticalMatches[i][j]) answer += 1;
    }
  }
  return answer;
};

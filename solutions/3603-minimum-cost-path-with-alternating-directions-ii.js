/**
 * Minimum Cost Path with Alternating Directions II
 * Intuition: Odd seconds must move right/down (pay entry (i+1)*(j+1)); even seconds wait in place. Start at (0,0) on second 1, so wait never happens at the origin before the first move, and never after arriving at the destination.
 * Approach: 1. DP backward from (m-1,n-1). 2. odd[i][j] = min entry+even of a right/down neighbor. 3. even[i][j] = waitCost + odd (0 at the destination). 4. Answer is 1 + odd[0][0].
 * Dry Run: m = 2, n = 2, waitCost = [[3,5],[2,4]]. Path (0,0)→(1,0) wait 2 →(1,1) costs 1+2+2+4 = 9.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var minCost = function (m, n, waitCost) {
  const INF = Number.MAX_SAFE_INTEGER / 4;
  const even = Array.from({ length: m }, () => Array(n).fill(INF));
  const odd = Array.from({ length: m }, () => Array(n).fill(INF));
  const entryCost = (row, col) => (row + 1) * (col + 1);

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      if (row === m - 1 && col === n - 1) {
        odd[row][col] = 0;
        even[row][col] = 0;
        continue;
      }

      let best = INF;
      if (row + 1 < m) {
        best = Math.min(best, entryCost(row + 1, col) + even[row + 1][col]);
      }
      if (col + 1 < n) {
        best = Math.min(best, entryCost(row, col + 1) + even[row][col + 1]);
      }
      odd[row][col] = best;
      even[row][col] = waitCost[row][col] + odd[row][col];
    }
  }

  return 1 + odd[0][0];
};

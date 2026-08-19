/**
 * Maximum Number of Moves to Kill All Pawns
 * Intuition: The knight and up to 15 pawns sit on a 50x50 board. Distances between them are independent of turn order, so precompute knight BFS distances, then play the Alice-max / Bob-min game over the subset of remaining pawns with bitmask DP.
 * Approach:
 * 1. Append the knight start `(kx, ky)` to `positions` as index `n`.
 * 2. BFS from every point (each pawn and the knight) with knight moves to fill `dist[i][j]`.
 * 3. `dp[i][mask][turn]` is the total knight moves from position `i` when `mask` is the set of killed pawns (plus the knight bit) and `turn` is 0 (Alice maximizes) or 1 (Bob minimizes).
 * 4. If every pawn is already in `mask`, the cost is 0. Otherwise try killing each remaining pawn `j` and recurse with the opposite turn.
 * 5. Start from the knight index with mask `1 << n` on Alice's turn.
 * Dry Run: kx = 1, ky = 3, positions = [[5, 5]]
 *   - n = 1. Points: pawn (5,5) index 0, knight (1,3) index 1.
 *   - Knight BFS distance from (1,3) to (5,5) is 2 (e.g. (1,3) -> (2,5) -> (4,4) or similar knight path of length 2; actual min is 4? On 50x50, (1,3) to (5,5): dx=4, dy=2, which is two knight moves of (2,1) type... (1,3)+(2,1)=(3,4)+(2,1)=(5,5), distance 2).
 *   - Only one pawn: Alice must take it. dp[1][1<<1][0] = dist[1][0] + 0 = 2.
 * Time Complexity: O(n * 50^2 + n^2 * 2^n)
 * Space Complexity: O(n * 2^n)
 */
var maxMoves = function (kx, ky, positions) {
  const SIZE = 50;
  const MAX = 1000000;
  const DIRS = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  const n = positions.length;
  const pts = positions.map((p) => [p[0], p[1]]);
  pts.push([kx, ky]);

  const hash = (x, y) => x * SIZE + y;
  const hashedPositionToIndex = new Map();
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i < pts.length; i++) {
    hashedPositionToIndex.set(hash(pts[i][0], pts[i][1]), i);
  }

  const bfs = (sourceIndex) => {
    const sx = pts[sourceIndex][0];
    const sy = pts[sourceIndex][1];
    const q = [[sx, sy]];
    const seen = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
    seen[sx][sy] = true;
    let seenPositions = 0;
    let step = 0;
    let head = 0;

    while (head < q.length && seenPositions < pts.length) {
      const sz = q.length - head;

      for (let s = 0; s < sz; s++) {
        const [i, j] = q[head++];
        const key = hash(i, j);

        if (hashedPositionToIndex.has(key)) {
          dist[sourceIndex][hashedPositionToIndex.get(key)] = step;
          seenPositions++;
        }

        for (const [dx, dy] of DIRS) {
          const x = i + dx;
          const y = j + dy;
          if (x < 0 || x >= SIZE || y < 0 || y >= SIZE || seen[x][y]) continue;
          seen[x][y] = true;
          q.push([x, y]);
        }
      }

      step++;
    }
  };

  for (let sourceIndex = 0; sourceIndex < n + 1; sourceIndex++) {
    bfs(sourceIndex);
  }

  const maxMask = 1 << (n + 1);
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: maxMask }, () => [0, 0])
  );

  for (let i = 0; i < n + 1; i++) {
    for (let mask = 0; mask < maxMask - 1; mask++) {
      dp[i][mask] = [-MAX, MAX];
    }
  }

  for (let mask = maxMask - 2; mask >= 0; mask--) {
    for (let i = 0; i < n + 1; i++) {
      for (let turn = 0; turn < 2; turn++) {
        for (let j = 0; j < n; j++) {
          if ((mask >> j) & 1) continue;
          const moves = dist[i][j] + dp[j][mask | (1 << j)][1 - turn];
          dp[i][mask][turn] =
            turn === 0
              ? Math.max(dp[i][mask][turn], moves)
              : Math.min(dp[i][mask][turn], moves);
        }
      }
    }
  }

  return dp[n][1 << n][0];
};

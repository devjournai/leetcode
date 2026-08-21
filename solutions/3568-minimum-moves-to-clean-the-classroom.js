/**
 * Minimum Moves to Clean the Classroom
 * Intuition: Collect every litter cell 'L' without walking through 'X'. Energy drops by 1 per step and resets at 'R'. BFS on (row, col, energy, remaining-litter mask).
 * Approach: 1. Map each L to a bit. 2. BFS from S with full energy and all L bits set. 3. Stepping onto R restores energy; onto L clears that bit. 4. First time mask is 0 is the answer; else -1.
 * Dry Run: classroom = ["S.", "L."], energy = 2. One step to L, mask 0 in 1 move.
 * Time Complexity: O(M * N * Energy * 2^L)
 * Space Complexity: O(M * N * Energy * 2^L)
 */
var minMoves = function (classroom, energy) {
  const m = classroom.length;
  const n = classroom[0].length;
  const litterId = Array.from({ length: m }, () => Array(n).fill(0));
  let startR = 0;
  let startC = 0;
  let litterCount = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = classroom[i][j];
      if (cell === "S") {
        startR = i;
        startC = j;
      } else if (cell === "L") {
        litterId[i][j] = litterCount;
        litterCount++;
      }
    }
  }

  if (litterCount === 0) {
    return 0;
  }

  const fullMask = (1 << litterCount) - 1;
  const visited = Array.from({ length: m }, () =>
    Array.from({ length: n }, () =>
      Array.from({ length: energy + 1 }, () =>
        Array(1 << litterCount).fill(false)
      )
    )
  );

  const queue = [[startR, startC, energy, fullMask]];
  visited[startR][startC][energy][fullMask] = true;
  const dirs = [-1, 0, 1, 0, -1];
  let moves = 0;

  while (queue.length) {
    const size = queue.length;
    for (let s = 0; s < size; s++) {
      const [i, j, curEnergy, mask] = queue.shift();
      if (mask === 0) {
        return moves;
      }
      if (curEnergy <= 0) {
        continue;
      }
      for (let k = 0; k < 4; k++) {
        const x = i + dirs[k];
        const y = j + dirs[k + 1];
        if (x < 0 || x >= m || y < 0 || y >= n || classroom[x][y] === "X") {
          continue;
        }
        const nextEnergy = classroom[x][y] === "R" ? energy : curEnergy - 1;
        let nextMask = mask;
        if (classroom[x][y] === "L") {
          nextMask &= ~(1 << litterId[x][y]);
        }
        if (!visited[x][y][nextEnergy][nextMask]) {
          visited[x][y][nextEnergy][nextMask] = true;
          queue.push([x, y, nextEnergy, nextMask]);
        }
      }
    }
    moves++;
  }

  return -1;
};

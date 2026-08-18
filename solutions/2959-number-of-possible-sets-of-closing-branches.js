/**
 * Number of Possible Sets of Closing Branches
 *
 * Intuition:
 *
 * n <= 10, so we can try every possible set of branches that
 * remains open.
 *
 * There are:
 *
 *     2^n
 *
 * possible subsets.
 *
 * For every subset:
 *
 * 1. Consider only the branches that remain open.
 * 2. Calculate the shortest distance between every pair of
 *    open branches.
 * 3. Check whether every distance is <= maxDistance.
 *
 * If yes, this subset represents a valid set of closing branches.
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * We are counting CLOSING sets, but it is easier to enumerate
 * the set of OPEN branches.
 *
 * Every closing set has exactly one corresponding open set:
 *
 *     closing branches = all branches - open branches
 *
 * Therefore, counting valid open sets gives the same answer.
 *
 * ------------------------------------------------------------
 *
 * Floyd-Warshall:
 *
 * Since n <= 10, we can use Floyd-Warshall for every subset.
 *
 *     dist[i][j] =
 *         shortest distance from i to j
 *
 * Initially:
 *
 *     dist[i][i] = 0
 *     dist[u][v] = road length
 *
 * For multiple roads between the same branches, keep only the
 * smallest road length.
 *
 * Then:
 *
 *     dist[i][j] =
 *         min(
 *             dist[i][j],
 *             dist[i][k] + dist[k][j]
 *         )
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 *     n = 3
 *
 * Possible open sets:
 *
 *     {}
 *     {0}
 *     {1}
 *     {2}
 *     {0,1}
 *     {0,2}
 *     {1,2}
 *     {0,1,2}
 *
 * We check each one.
 *
 * An empty set and a single-node set are always valid because
 * there are no two different branches whose distance needs to
 * be checked.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(2^n * n^3)
 * Space Complexity: O(n^2)
 */
var numberOfSets = function (n, maxDistance, roads) {
  const INF = Infinity;
  const originalDistance = Array.from({ length: n }, () => Array(n).fill(INF));

  for (let i = 0; i < n; i++) {
    originalDistance[i][i] = 0;
  }

  for (const [u, v, w] of roads) {
    originalDistance[u][v] = Math.min(originalDistance[u][v], w);

    originalDistance[v][u] = Math.min(originalDistance[v][u], w);
  }

  let answer = 0;

  for (let mask = 0; mask < 1 << n; mask++) {
    const dist = Array.from({ length: n }, (_, i) => [...originalDistance[i]]);

    for (let middle = 0; middle < n; middle++) {
      if ((mask & (1 << middle)) === 0) {
        continue;
      }

      for (let from = 0; from < n; from++) {
        if ((mask & (1 << from)) === 0) {
          continue;
        }

        for (let to = 0; to < n; to++) {
          if ((mask & (1 << to)) === 0) {
            continue;
          }

          dist[from][to] = Math.min(
            dist[from][to],
            dist[from][middle] + dist[middle][to],
          );
        }
      }
    }

    let isValid = true;

    for (let i = 0; i < n && isValid; i++) {
      if ((mask & (1 << i)) === 0) {
        continue;
      }

      for (let j = i + 1; j < n; j++) {
        if ((mask & (1 << j)) === 0) {
          continue;
        }

        if (dist[i][j] > maxDistance) {
          isValid = false;
          break;
        }
      }
    }
    if (isValid) {
      answer++;
    }
  }

  return answer;
};

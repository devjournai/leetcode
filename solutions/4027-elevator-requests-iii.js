/**
 * Elevator Requests III
 * Intuition: The number of floors n can be as large as 10^9, but there are at most m le 16 requests, so we only need to plan a path among at most m target floors.
 * Approach: The number of floors n can be as large as 10^9, but there are at most m le 16 requests, so we only need to plan a path among at most m target floors. This is a traveling salesman problem with arrival-time constraints. Let f[i][j] be the minimum time to fulfill the set of requests represented by bitmask i, with request j fulfilled last. For each state i that contains request j, let i_0 = i oplus 2^j:
 * Dry Run: Input: n = 9, start = 0, requests = [[0,8],[6,5]]. Output: 9.
 * Time Complexity: O(m^2 * 2^m)
 * Space Complexity: O(m * 2^m)
 */
var elevatorRequests = function (n, start, requests) {
  const m = requests.length;
  const f = Array.from({ length: 1 << m }, () => Array(m).fill(0));

  for (let i = 0; i < 1 << m; i++) {
    for (let j = 0; j < m; j++) {
      if (((i >> j) & 1) === 1) {
        f[i][j] = Infinity;

        const i0 = i ^ (1 << j);

        if (i0 === 0) {
          const d = Math.abs(start - requests[j][1]);

          f[i][j] = Math.min(f[i][j], Math.max(d, requests[j][0]));
        } else {
          for (let j0 = 0; j0 < m; j0++) {
            if (j0 !== j && ((i >> j0) & 1) === 1) {
              const d = Math.abs(requests[j0][1] - requests[j][1]);

              f[i][j] = Math.min(
                f[i][j],
                Math.max(f[i0][j0] + d, requests[j][0])
              );
            }
          }
        }
      }
    }
  }

  const full = (1 << m) - 1;
  let ans = Infinity;

  for (let j = 0; j < m; j++) {
    ans = Math.min(ans, f[full][j]);
  }

  return ans;
};

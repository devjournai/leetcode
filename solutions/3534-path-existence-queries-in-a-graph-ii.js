/**
 * Path Existence Queries in a Graph II
 * Intuition: Processing a BFS or modifying a Segment Tree for every query is too slow, leading to TLE when Q and N are up to 10^5. Because edges exist between nodes with a value difference <= maxDiff, sorting the nodes by value transforms the graph into contiguous reachable segments. Since reaching the furthest possible node in one direction is always optimal for shortest paths, we can precalculate these maximum reaches. This monotonic property perfectly suits Binary Lifting (Jump Pointers), allowing us to answer each query in O(log N) time instead of O(N).
 *
 * Approach:
 * 1.  **Sort & Map**: Create an array of objects containing the original node values and their initial indices. Sort this array by value. Create a reverse map (`pos`) to easily find a node's new sorted index given its original index.
 * 2.  **Sliding Window (1-Step Boundaries)**: Use a two-pointer approach on the sorted array to precompute two arrays: `L` and `R`. `L[i]` stores the furthest left index reachable from `i` in 1 step, and `R[i]` stores the furthest right index reachable from `i` in 1 step.
 * 3.  **Binary Lifting (DP Setup)**: Initialize a constant `K = 19` (since 2^18 > 10^5). Create flat DP arrays `upL` and `upR` where `upR[k * n + i]` represents the furthest right index reachable from `i` in 2^k steps.
 * * Base case: `upR[i] = R[i]` and `upL[i] = L[i]` (for 2^0 = 1 step).
 * * Transition: `upR[k][i] = upR[k-1][upR[k-1][i]]`.
 * 4.  **Process Queries in O(log N)**: For each query `(u, v)`:
 * * Convert to their sorted indices `u_prime` and `v_prime`.
 * * If `u_prime === v_prime`, distance is 0.
 * * Determine direction (left if `u_prime > v_prime`, right if `u_prime < v_prime`).
 * * Check if the target is reachable at all using the maximum jump (k = K - 1). If not, return -1.
 * * Iterate `k` downwards from `K - 1` to 0. If a jump of 2^k steps does *not* reach or pass `v_prime`, take the jump, update the current position, and add 2^k to the step count.
 * * Add 1 to the final step count to cover the final jump to `v_prime`.
 *
 * Complexity Analysis:
 * - Time Complexity: O(N log N + N * K + Q * K)
 * - Space Complexity: O(N * K)
 */

var pathExistenceQueries = function (n, nums, maxDiff, queries) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = { val: nums[i], id: i };
  }
  arr.sort((a, b) => a.val - b.val);

  const pos = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pos[arr[i].id] = i;
  }

  const R = new Int32Array(n);
  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j < n && arr[j].val <= arr[i].val + maxDiff) {
      j++;
    }
    R[i] = j - 1;
  }

  const L = new Int32Array(n);
  j = 0;
  for (let i = 0; i < n; i++) {
    while (arr[i].val - arr[j].val > maxDiff) {
      j++;
    }
    L[i] = j;
  }

  const K = 19;
  const upR = new Int32Array(K * n);
  const upL = new Int32Array(K * n);

  for (let i = 0; i < n; i++) {
    upR[i] = R[i];
    upL[i] = L[i];
  }

  for (let k = 1; k < K; k++) {
    let currOffset = k * n;
    let prevOffset = (k - 1) * n;
    for (let i = 0; i < n; i++) {
      upR[currOffset + i] = upR[prevOffset + upR[prevOffset + i]];
      upL[currOffset + i] = upL[prevOffset + upL[prevOffset + i]];
    }
  }

  const ans = new Int32Array(queries.length);
  for (let q = 0; q < queries.length; q++) {
    const u_prime = pos[queries[q][0]];
    const v_prime = pos[queries[q][1]];

    if (u_prime === v_prime) {
      ans[q] = 0;
    } else if (u_prime < v_prime) {
      if (upR[(K - 1) * n + u_prime] < v_prime) {
        ans[q] = -1;
      } else {
        let curr = u_prime;
        let steps = 0;
        for (let k = K - 1; k >= 0; k--) {
          if (upR[k * n + curr] < v_prime) {
            curr = upR[k * n + curr];
            steps += 1 << k;
          }
        }
        ans[q] = steps + 1;
      }
    } else {
      if (upL[(K - 1) * n + u_prime] > v_prime) {
        ans[q] = -1;
      } else {
        let curr = u_prime;
        let steps = 0;
        for (let k = K - 1; k >= 0; k--) {
          if (upL[k * n + curr] > v_prime) {
            curr = upL[k * n + curr];
            steps += 1 << k;
          }
        }
        ans[q] = steps + 1;
      }
    }
  }

  return Array.from(ans);
};

/**
 * Path Existence Queries in a Graph II
 * Intuition: Edges exist between values differing by at most maxDiff, so sorting by value turns reachability into contiguous spans. Furthest one-step left/right jumps are monotonic, so binary lifting answers shortest jumps in O(log N).
 * Approach: 1. Sort nodes by value and map original ids to sorted positions. 2. Two pointers compute 1-step furthest left L[i] and right R[i]. 3. Build K=19 binary-lifting tables upL/upR. 4. For each query, convert to sorted indices; if equal, distance 0; else greedy-lift toward the target, or -1 if even the 2^(K-1) jump cannot reach. Add 1 after the last incomplete jump.
 * Dry Run: nums = [1, 3, 6], maxDiff = 2, query (0, 2). Sorted positions 0→1→2. R[0]=1, R[1]=2. From 0, 1-step cannot reach 2, two 1-steps can: answer 2.
 * Time Complexity: O(N log N + N * K + Q * K)
 * Space Complexity: O(N * K)
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

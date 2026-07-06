/**
 * Minimum Reverse Operations
 *
 * Intuition:
 * Let the current position of the single '1' be `i`.
 *
 * Reversing any subarray of length `k` containing `i` moves the '1' to another
 * position that can be computed directly.
 *
 * Instead of trying every possible reverse operation, perform a BFS over
 * reachable positions.
 *
 * The difficult part is efficiently finding all unvisited positions reachable
 * from the current position.
 *
 * Observe:
 *
 * - Every reachable position has the same parity (even/odd).
 * - Reachable positions form a continuous interval.
 *
 * Store all unvisited indices separately by parity in two ordered sets.
 * During BFS, query only the indices inside the reachable interval and remove
 * them immediately after visiting.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Mark all banned positions.
 *
 * 2. Build two ordered sets:
 *
 *      even indices
 *      odd indices
 *
 *      excluding:
 *      - banned positions
 *      - starting position.
 *
 * 3. Initialize BFS from position `p`.
 *
 *      answer[p] = 0.
 *
 * 4. For every current position:
 *
 *      Compute the smallest and largest reachable positions.
 *
 *      low =
 *          max(
 *              i-k+1,
 *              k-1-i
 *          )
 *
 *      high =
 *          min(
 *              i+k-1,
 *              2*n-k-i-1
 *          )
 *
 *      Every reachable position has parity:
 *
 *          low % 2
 *
 * 5. From the corresponding ordered set,
 *    repeatedly extract every index inside
 *    [low, high].
 *
 *      Update answer.
 *      Push into BFS.
 *      Remove from the set.
 *
 * 6. Continue until BFS finishes.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 4
 * p = 0
 * k = 4
 *
 * Start:
 *
 * 1 0 0 0
 *
 * Reachable interval:
 *
 * [3,3]
 *
 * Visit:
 *
 * index 3
 *
 * answer[3]=1
 *
 * BFS ends.
 *
 * Answer:
 *
 * [0,-1,-1,1]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var minReverseOperations = function (n, p, banned, k) {
  const answer = new Array(n).fill(-1);

  const bannedSet = new Set(banned);

  const paritySets = [[], []];

  for (let i = 0; i < n; i++) {
    if (i !== p && !bannedSet.has(i)) {
      paritySets[i & 1].push(i);
    }
  }

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

  const queue = [p];
  let head = 0;

  answer[p] = 0;

  while (head < queue.length) {
    const current = queue[head++];

    const low = Math.max(current - k + 1, k - current - 1);

    const high = Math.min(current + k - 1, 2 * n - k - current - 1);

    const parity = low & 1;
    const list = paritySets[parity];

    let index = lowerBound(list, low);

    while (index < list.length && list[index] <= high) {
      const next = list[index];

      answer[next] = answer[current] + 1;

      queue.push(next);

      list.splice(index, 1);
    }
  }

  return answer;
};

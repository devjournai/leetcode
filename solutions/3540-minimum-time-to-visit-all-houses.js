/**
 * Minimum Time to Visit All Houses
 * Intuition: Houses sit on a circle. Prefixed forward and backward edge costs let each query take the cheaper of the two arcs from the current position.
 * Approach: 1. Build prefix sums of forward and backward arrays. 2. For each query house q, compute clockwise and counterclockwise times wrapping if needed. 3. Add the min and move pos to q.
 * Dry Run: n=3, forward=[1,2,3], backward=[3,2,1], queries=[1]. From 0 to 1: forward 1 vs backward wrap, take 1.
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */
var minTotalTime = function (forward, backward, queries) {
  const n = forward.length;
  let backwardSum = 0;
  for (const value of backward) backwardSum += value;
  let answer = 0;
  let pos = 0;
  const prefixF = new Array(n + 1).fill(0);
  const prefixB = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixF[i + 1] = prefixF[i] + forward[i];
    prefixB[i] = (i === 0 ? 0 : prefixB[i - 1]) + backward[i];
  }

  for (const q of queries) {
    const right = (q < pos ? prefixF[n] : 0) + prefixF[q] - prefixF[pos];
    const left = (q > pos ? backwardSum : 0) + prefixB[pos] - prefixB[q];
    answer += Math.min(left, right);
    pos = q;
  }

  return answer;
};

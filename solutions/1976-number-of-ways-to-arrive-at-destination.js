/**
 * Number Of Ways To Arrive At Destination
 * Intuition: This problem is a variation of Dijkstra's algorithm. We need to find the shortest time to reach the destination and count how many distinct paths achieve that shortest time. We can adapt Dijkstra's to not only track the minimum distance to each node but also the number of ways to achieve that minimum distance.
 * Approach:
 * 1. Define `moduloValue` as 10^9 + 7 to handle large results.
 * 2. Construct an adjacency list `graphRepresentation` from the `roads` array. Each entry `graphRepresentation[u]` will store an array of `[v, time]` pairs, representing a road from `u` to `v` taking `time` minutes. Since roads are bi-directional, add entries for both `[ui, vi, timei]` and `[vi, ui, timei]`.
 * 3. Initialize an array `minimumTimes` of size `n` with `Infinity` values. This array will store the shortest time found so far to reach each intersection from intersection 0.
 * 4. Initialize an array `totalWays` of size `n` with `0` values. This array will store the number of ways to reach each intersection in its `minimumTimes`.
 * 5. Set `minimumTimes[0]` to `0` and `totalWays[0]` to `1`, as the starting intersection 0 can be reached in 0 time with 1 way (starting there).
 * 6. Create a `processingQueue` (acting as a min-priority queue, simulated by an array that is sorted upon updates). Add the initial state `[0, 0]` (time, intersection) to it.
 * 7. While `processingQueue` is not empty:
 *    a. Extract the element `[currentPathTime, currentIntersection]` with the smallest `currentPathTime` from `processingQueue`.
 *    b. If `currentPathTime` is greater than `minimumTimes[currentIntersection]`, it means we have already processed a shorter path to this `currentIntersection`, so skip this entry.
 *    c. Iterate through all `[neighborIntersection, edgeDuration]` connected to `currentIntersection` in `graphRepresentation`.
 *       i. Calculate `newCalculatedTime = currentPathTime + edgeDuration`.
 *       ii. If `newCalculatedTime` is strictly less than `minimumTimes[neighborIntersection]`:
 *           - Update `minimumTimes[neighborIntersection]` to `newCalculatedTime`.
 *           - Update `totalWays[neighborIntersection]` to `totalWays[currentIntersection]`.
 *           - Add `[newCalculatedTime, neighborIntersection]` to `processingQueue` and re-sort `processingQueue` to maintain min-priority order.
 *       iii. Else if `newCalculatedTime` is equal to `minimumTimes[neighborIntersection]`:
 *           - Add `totalWays[currentIntersection]` to `totalWays[neighborIntersection]`, taking the result modulo `moduloValue`.
 * 8. After the loop completes, `totalWays[n - 1]` will contain the number of ways to reach the destination `n - 1` in the shortest amount of time. Return this value.
 * Dry Run:
 * Input: n = 3, roads = [[0,1,1], [1,2,1], [0,2,2]]
 * moduloValue = 1000000007
 * graphRepresentation = [
 *   [[1,1], [2,2]], // Neighbors of 0: [node, time]
 *   [[0,1], [2,1]], // Neighbors of 1
 *   [[0,2], [1,1]]  // Neighbors of 2
 * ]
 * minimumTimes = [Infinity, Infinity, Infinity]
 * totalWays = [0, 0, 0]
 *
 * 1. Initialize minimumTimes[0] = 0, totalWays[0] = 1.
 * 2. processingQueue = [[0, 0]]
 *
 * Iteration 1 (processingQueue = [[0,0]]):
 *   - Dequeue `[currentPathTime = 0, currentIntersection = 0]`.
 *   - `0 <= minimumTimes[0]` (0), proceed.
 *   - Neighbors of 0:
 *     - `[neighborIntersection = 1, edgeDuration = 1]`:
 *       - `newCalculatedTime = 0 + 1 = 1`.
 *       - `1 < minimumTimes[1]` (Infinity): True.
 *         - `minimumTimes[1] = 1`.
 *         - `totalWays[1] = totalWays[0] = 1`.
 *         - Enqueue `[1, 1]`. `processingQueue` becomes `[[0,0], [1,1]]`. Sort: `[[0,0], [1,1]]`.
 *     - `[neighborIntersection = 2, edgeDuration = 2]`:
 *       - `newCalculatedTime = 0 + 2 = 2`.
 *       - `2 < minimumTimes[2]` (Infinity): True.
 *         - `minimumTimes[2] = 2`.
 *         - `totalWays[2] = totalWays[0] = 1`.
 *         - Enqueue `[2, 2]`. `processingQueue` becomes `[[0,0], [1,1], [2,2]]`. Sort: `[[0,0], [1,1], [2,2]]`.
 * State after Iteration 1:
 *   minimumTimes = [0, 1, 2]
 *   totalWays = [1, 1, 1]
 *   processingQueue = [[0,0], [1,1], [2,2]]
 *
 * Iteration 2 (processingQueue = [[0,0], [1,1], [2,2]]):
 *   - Dequeue `[currentPathTime = 0, currentIntersection = 0]`.
 *   - `0 <= minimumTimes[0]` (0), proceed.
 *   - Neighbors of 0:
 *     - `[neighborIntersection = 1, edgeDuration = 1]`:
 *       - `newCalculatedTime = 0 + 1 = 1`.
 *       - `1 < minimumTimes[1]` (1): False.
 *       - `1 === minimumTimes[1]` (1): True.
 *         - `totalWays[1] = (totalWays[1] + totalWays[0]) % moduloValue = (1 + 1) % MOD = 2`.
 *     - `[neighborIntersection = 2, edgeDuration = 2]`:
 *       - `newCalculatedTime = 0 + 2 = 2`.
 *       - `2 < minimumTimes[2]` (2): False.
 *       - `2 === minimumTimes[2]` (2): True.
 *         - `totalWays[2] = (totalWays[2] + totalWays[0]) % moduloValue = (1 + 1) % MOD = 2`.
 * State after Iteration 2:
 *   minimumTimes = [0, 1, 2]
 *   totalWays = [1, 2, 2]
 *   processingQueue = [[1,1], [2,2]]
 *
 * Iteration 3 (processingQueue = [[1,1], [2,2]]):
 *   - Dequeue `[currentPathTime = 1, currentIntersection = 1]`.
 *   - `1 <= minimumTimes[1]` (1), proceed.
 *   - Neighbors of 1:
 *     - `[neighborIntersection = 0, edgeDuration = 1]`:
 *       - `newCalculatedTime = 1 + 1 = 2`.
 *       - `2 < minimumTimes[0]` (0): False.
 *       - `2 === minimumTimes[0]` (0): False. (No update)
 *     - `[neighborIntersection = 2, edgeDuration = 1]`:
 *       - `newCalculatedTime = 1 + 1 = 2`.
 *       - `2 < minimumTimes[2]` (2): False.
 *       - `2 === minimumTimes[2]` (2): True.
 *         - `totalWays[2] = (totalWays[2] + totalWays[1]) % moduloValue = (2 + 2) % MOD = 4`.
 * State after Iteration 3:
 *   minimumTimes = [0, 1, 2]
 *   totalWays = [1, 2, 4]
 *   processingQueue = [[2,2]]
 *
 * Iteration 4 (processingQueue = [[2,2]]):
 *   - Dequeue `[currentPathTime = 2, currentIntersection = 2]`.
 *   - `2 <= minimumTimes[2]` (2), proceed.
 *   - Neighbors of 2:
 *     - `[neighborIntersection = 0, edgeDuration = 2]`:
 *       - `newCalculatedTime = 2 + 2 = 4`.
 *       - `4 < minimumTimes[0]` (0): False.
 *       - `4 === minimumTimes[0]` (0): False.
 *     - `[neighborIntersection = 1, edgeDuration = 1]`:
 *       - `newCalculatedTime = 2 + 1 = 3`.
 *       - `3 < minimumTimes[1]` (1): False.
 *       - `3 === minimumTimes[1]` (1): False.
 * State after Iteration 4:
 *   minimumTimes = [0, 1, 2]
 *   totalWays = [1, 2, 4]
 *   processingQueue = []
 *
 * Loop terminates.
 * Return `totalWays[n - 1]` which is `totalWays[2] = 4`.
 * Time Complexity: O(E log V)
 * Space Complexity: O(N + E)
 */
var countPaths = function (n, roads) {
  const moduloValue = 1e9 + 7;
  const graphRepresentation = Array.from({ length: n }, () => []);
  const minimumTimes = new Array(n).fill(Infinity);
  const totalWays = new Array(n).fill(0);

  for (const [startNode, endNode, travelTime] of roads) {
    graphRepresentation[startNode].push([endNode, travelTime]);
    graphRepresentation[endNode].push([startNode, travelTime]);
  }

  const processingQueue = [[0, 0]];
  minimumTimes[0] = 0;
  totalWays[0] = 1;

  while (processingQueue.length > 0) {
    const [currentPathTime, currentIntersection] = processingQueue.shift();

    if (currentPathTime > minimumTimes[currentIntersection]) {
      continue;
    }

    for (const [neighborIntersection, edgeDuration] of graphRepresentation[
      currentIntersection
    ]) {
      const newCalculatedTime = currentPathTime + edgeDuration;

      if (newCalculatedTime < minimumTimes[neighborIntersection]) {
        minimumTimes[neighborIntersection] = newCalculatedTime;
        totalWays[neighborIntersection] = totalWays[currentIntersection];
        processingQueue.push([newCalculatedTime, neighborIntersection]);
        processingQueue.sort(
          (firstElement, secondElement) => firstElement[0] - secondElement[0]
        );
      } else if (newCalculatedTime === minimumTimes[neighborIntersection]) {
        totalWays[neighborIntersection] =
          (totalWays[neighborIntersection] + totalWays[currentIntersection]) %
          moduloValue;
      }
    }
  }

  return totalWays[n - 1];
};

/**
 * Minimum Cost of a Path With Special Roads
 *
 * Intuition:
 * Walking between any two points costs their Manhattan distance.
 *
 * The only locations worth considering are:
 *
 * • the start point
 * • the end point of every special road
 *
 * Reaching an end point may involve:
 *
 *      walking to the start of a special road
 *      +
 *      using that special road
 *
 * This naturally becomes a shortest-path problem solved with Dijkstra's
 * algorithm.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *
 *      dist[i]
 *
 *      be the minimum cost to reach the end point of
 *      specialRoads[i].
 *
 * 2. Initially,
 *    every special road can be reached directly from the start:
 *
 *      distance(start → roadStart)
 *      +
 *      roadCost
 *
 * 3. Use Dijkstra.
 *
 *      When a road endpoint becomes final,
 *      try reaching every other road by:
 *
 *          currentRoadEnd
 *          →
 *          nextRoadStart
 *          →
 *          use next road
 *
 * 4. During Dijkstra,
 *    continuously update the answer by walking directly
 *    from the current road's endpoint to the target.
 *
 * 5. Also consider walking directly from the start
 *    to the target.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * start =
 * (1,1)
 *
 * target =
 * (4,5)
 *
 * Roads:
 *
 * (1,2)->(3,3),2
 *
 * (3,4)->(4,5),1
 *
 * Initial:
 *
 * reach road1:
 *
 * 1 + 2 = 3
 *
 * Dijkstra:
 *
 * road1 end
 * (3,3)
 *
 * →
 *
 * walk to
 * (3,4)
 *
 * +
 * road2
 *
 * =
 *
 * 3+1+1
 *
 * =5
 *
 * Reach target:
 *
 * 5
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(R²)
 * Space Complexity: O(R)
 */

var minimumCost = function (start, target, specialRoads) {
  const m = specialRoads.length;

  const manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const dist = new Array(m).fill(Infinity);
  const visited = new Array(m).fill(false);

  for (let i = 0; i < m; i++) {
    const [x1, y1, , , cost] = specialRoads[i];

    dist[i] = manhattan(start[0], start[1], x1, y1) + cost;
  }

  let answer = manhattan(start[0], start[1], target[0], target[1]);

  for (let count = 0; count < m; count++) {
    let current = -1;

    for (let i = 0; i < m; i++) {
      if (!visited[i] && (current === -1 || dist[i] < dist[current])) {
        current = i;
      }
    }

    if (current === -1) {
      break;
    }

    visited[current] = true;

    const [, , endX, endY] = specialRoads[current];

    answer = Math.min(
      answer,
      dist[current] + manhattan(endX, endY, target[0], target[1])
    );

    for (let next = 0; next < m; next++) {
      const [startX, startY, , , roadCost] = specialRoads[next];

      const newCost =
        dist[current] + manhattan(endX, endY, startX, startY) + roadCost;

      if (newCost < dist[next]) {
        dist[next] = newCost;
      }
    }
  }

  return answer;
};

/**
 * Second Minimum Time To Reach Destination
 * Intuition: A standard Breadth-First Search (BFS) finds the shortest path. To find the second shortest path in a graph with uniform edge weights, we can adapt BFS by tracking not just the minimum time to reach each node, but also the second minimum time. We must account for traffic signal delays, which depend on the arrival time at a vertex.
 * Approach: 1. Build an adjacency list to represent the graph from the given edges. 2. Initialize a 2D array, `timesTaken`, where `timesTaken[i][0]` stores the first minimum time to reach node `i`, and `timesTaken[i][1]` stores the second minimum time. Initialize all entries to `Infinity`, except `timesTaken[1][0]` to 0 for the starting node. 3. Use a queue for BFS, pushing `[node, time]` pairs. Start by enqueuing `[1, 0]`. 4. While the queue is not empty, dequeue `[currentNode, currentArrivalTime]`. 5. For each `connectedNode` adjacent to `currentNode`: a. Calculate the time to depart `currentNode`: Determine the current signal phase (`currentArrivalTime / change`). If the phase is even, the light is green, so `travelStartTime = currentArrivalTime`. If the phase is odd, the light is red, so wait until the next green phase starts at `(phase + 1) * change`, making `travelStartTime = (phase + 1) * change`. b. Calculate the `arrivalAtNext = travelStartTime + time`. c. Update `timesTaken[connectedNode]`: If `arrivalAtNext` is strictly less than `timesTaken[connectedNode][0]`, update `timesTaken[connectedNode][1]` with the old `timesTaken[connectedNode][0]`, then `timesTaken[connectedNode][0]` with `arrivalAtNext`, and enqueue `[connectedNode, arrivalAtNext]`. d. Else if `arrivalAtNext` is strictly greater than `timesTaken[connectedNode][0]` AND strictly less than `timesTaken[connectedNode][1]`, update `timesTaken[connectedNode][1]` with `arrivalAtNext`, and enqueue `[connectedNode, arrivalAtNext]`. 6. Once the BFS completes, `timesTaken[n][1]` will contain the second minimum time to reach node `n`.
 * Dry Run: n = 2, edges = [[1,2]], time = 10, change = 10
 * 1. adjacencyList = [[], [2], [1]]
 * 2. timesTaken = [[inf, inf], [0, inf], [inf, inf]]
 * 3. bfsQueue = [[1, 0]]
 * 4. Dequeue [1, 0]. currentNode = 1, currentArrivalTime = 0.
 * 5. connectedNode = 2 (from adjList[1]):
 *    a. signalPhase = floor(0/10) = 0 (even, green). travelStartTime = 0.
 *    b. arrivalAtNext = 0 + 10 = 10.
 *    c. 10 < timesTaken[2][0] (inf) -> true. Update: timesTaken[2][1] = inf, timesTaken[2][0] = 10. Enqueue [2, 10].
 *    timesTaken = [[inf, inf], [0, inf], [10, inf]]. bfsQueue = [[2, 10]].
 * 6. Dequeue [2, 10]. currentNode = 2, currentArrivalTime = 10.
 * 7. connectedNode = 1 (from adjList[2]):
 *    a. signalPhase = floor(10/10) = 1 (odd, red). travelStartTime = (1+1)*10 = 20.
 *    b. arrivalAtNext = 20 + 10 = 30.
 *    c. 30 < timesTaken[1][0] (0) -> false.
 *    d. 30 > timesTaken[1][0] (0) AND 30 < timesTaken[1][1] (inf) -> true. Update: timesTaken[1][1] = 30. Enqueue [1, 30].
 *    timesTaken = [[inf, inf], [0, 30], [10, inf]]. bfsQueue = [[1, 30]].
 * 8. Dequeue [1, 30]. currentNode = 1, currentArrivalTime = 30.
 * 9. connectedNode = 2 (from adjList[1]):
 *    a. signalPhase = floor(30/10) = 3 (odd, red). travelStartTime = (3+1)*10 = 40.
 *    b. arrivalAtNext = 40 + 10 = 50.
 *    c. 50 < timesTaken[2][0] (10) -> false.
 *    d. 50 > timesTaken[2][0] (10) AND 50 < timesTaken[2][1] (inf) -> true. Update: timesTaken[2][1] = 50. Enqueue [2, 50].
 *    timesTaken = [[inf, inf], [0, 30], [10, 50]]. bfsQueue = [[2, 50]].
 * 10. Dequeue [2, 50]. currentNode = 2, currentArrivalTime = 50.
 * 11. connectedNode = 1 (from adjList[2]):
 *     a. signalPhase = floor(50/10) = 5 (odd, red). travelStartTime = (5+1)*10 = 60.
 *     b. arrivalAtNext = 60 + 10 = 70.
 *     c. 70 < timesTaken[1][0] (0) -> false.
 *     d. 70 > timesTaken[1][0] (0) AND 70 < timesTaken[1][1] (30) -> false.
 *     bfsQueue = [].
 * 12. Queue is empty. Return timesTaken[2][1] = 50.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var secondMinimum = function (n, edges, time, change) {
  const adjacencyList = Array.from({ length: n + 1 }, () => []);
  for (const edgeCouple of edges) {
    const firstVertex = edgeCouple[0];
    const secondVertex = edgeCouple[1];
    adjacencyList[firstVertex].push(secondVertex);
    adjacencyList[secondVertex].push(firstVertex);
  }

  const timesTaken = Array.from({ length: n + 1 }, () => [Infinity, Infinity]);
  const bfsQueue = [[1, 0]];
  timesTaken[1][0] = 0;

  let queuePointer = 0;
  while (queuePointer < bfsQueue.length) {
    const currentEntry = bfsQueue[queuePointer];
    queuePointer++;

    const processNode = currentEntry[0];
    const currentArrivalTime = currentEntry[1];

    for (const connectedNode of adjacencyList[processNode]) {
      const signalPhase = Math.floor(currentArrivalTime / change);
      const isLightGreen = signalPhase % 2 === 0;

      let travelStartTime;
      if (isLightGreen) {
        travelStartTime = currentArrivalTime;
      } else {
        travelStartTime = (signalPhase + 1) * change;
      }

      const arrivalAtNext = travelStartTime + time;

      if (arrivalAtNext < timesTaken[connectedNode][0]) {
        timesTaken[connectedNode][1] = timesTaken[connectedNode][0];
        timesTaken[connectedNode][0] = arrivalAtNext;
        bfsQueue.push([connectedNode, arrivalAtNext]);
      } else if (
        arrivalAtNext > timesTaken[connectedNode][0] &&
        arrivalAtNext < timesTaken[connectedNode][1]
      ) {
        timesTaken[connectedNode][1] = arrivalAtNext;
        bfsQueue.push([connectedNode, arrivalAtNext]);
      }
    }
  }

  return timesTaken[n][1];
};

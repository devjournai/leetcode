/**
 * The Time When The Network Becomes Idle
 * Intuition: The network becomes idle when the last reply to any server's message (initial or resend) has arrived. This requires finding the shortest path distance from each data server to the master (server 0) and then calculating the arrival time of the last possible reply for each data server based on its patience, finally taking the maximum of these times plus one.
 * Approach: 1. Construct an adjacency list representation of the network from the given edges. 2. Perform a Breadth-First Search (BFS) starting from the master server (server 0) to determine the shortest path distance (in seconds) for every other server to reach the master. 3. Initialize a variable `overallLatestCompletion` to track the latest time any message finishes its round trip. 4. Iterate through each data server (from 1 to n-1). For each server `i`:    a. Calculate its round-trip time (`twoWayTravelDuration = 2 * distance_i`).    b. Determine how many times server `i` would resend its message before its *first* reply arrives. If `twoWayTravelDuration` is less than or equal to `patience_i`, no resends occur. Otherwise, the number of resends is `floor((twoWayTravelDuration - 1) / patience_i)`.    c. Calculate the time of the *last resend* for server `i`: `lastResendMoment = resendCount * patience_i`.    d. The reply for this last resend arrives at `lastResendMoment + twoWayTravelDuration`. This is `serverCompletionTime`.    e. Update `overallLatestCompletion = Math.max(overallLatestCompletion, serverCompletionTime)`. 5. The network becomes idle at `overallLatestCompletion + 1`, as it's the first second *after* all messages have completed their journey.
 * Dry Run:
 * Input: edges = [[0,1],[0,2],[1,3]], patience = [0,2,3,1]
 * n = 4
 *
 * 1. Adjacency list (connectionMatrix):
 *    connectionMatrix[0] = [1, 2]
 *    connectionMatrix[1] = [0, 3]
 *    connectionMatrix[2] = [0]
 *    connectionMatrix[3] = [1]
 *
 * 2. BFS for shortest distances (pathDuration):
 *    pathDuration = [Infinity, Infinity, Infinity, Infinity]
 *    pathDuration[0] = 0
 *    bfsQueue = [0]
 *
 *    - Dequeue 0. currentMasterServer = 0.
 *      Neighbors: 1, 2.
 *      pathDuration[1] = 1. Enqueue 1.
 *      pathDuration[2] = 1. Enqueue 2.
 *    - bfsQueue = [1, 2]
 *    - Dequeue 1. currentMasterServer = 1.
 *      Neighbors: 0, 3.
 *      0 already visited (pathDuration[0] is not Infinity).
 *      pathDuration[3] = 2. Enqueue 3.
 *    - bfsQueue = [2, 3]
 *    - Dequeue 2. currentMasterServer = 2.
 *      Neighbors: 0.
 *      0 already visited.
 *    - bfsQueue = [3]
 *    - Dequeue 3. currentMasterServer = 3.
 *      Neighbors: 1.
 *      1 already visited.
 *    - bfsQueue = []
 *
 *    Resulting pathDuration = [0, 1, 1, 2]
 *
 * 3. Calculate overallLatestCompletion:
 *    overallLatestCompletion = 0
 *
 *    - Data server 1 (index 1):
 *      currentServerDistance = pathDuration[1] = 1
 *      twoWayTravelDuration = 2 * 1 = 2
 *      currentServerPatience = patience[1] = 2
 *      resendMultiplier = Math.floor((2 - 1) / 2) = Math.floor(1/2) = 0
 *      lastResendMoment = 0 * 2 = 0
 *      serverCompletionTime = 0 + 2 = 2
 *      overallLatestCompletion = Math.max(0, 2) = 2
 *
 *    - Data server 2 (index 2):
 *      currentServerDistance = pathDuration[2] = 1
 *      twoWayTravelDuration = 2 * 1 = 2
 *      currentServerPatience = patience[2] = 3
 *      resendMultiplier = Math.floor((2 - 1) / 3) = Math.floor(1/3) = 0
 *      lastResendMoment = 0 * 3 = 0
 *      serverCompletionTime = 0 + 2 = 2
 *      overallLatestCompletion = Math.max(2, 2) = 2
 *
 *    - Data server 3 (index 3):
 *      currentServerDistance = pathDuration[3] = 2
 *      twoWayTravelDuration = 2 * 2 = 4
 *      currentServerPatience = patience[3] = 1
 *      resendMultiplier = Math.floor((4 - 1) / 1) = Math.floor(3/1) = 3
 *      lastResendMoment = 3 * 1 = 3
 *      serverCompletionTime = 3 + 4 = 7
 *      overallLatestCompletion = Math.max(2, 7) = 7
 *
 * 4. Return overallLatestCompletion + 1 = 7 + 1 = 8.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var networkBecomesIdle = function (edges, patience) {
  const totalServers = patience.length;
  const connectionMatrix = Array.from({ length: totalServers }, () => []);

  for (const [serverA, serverB] of edges) {
    connectionMatrix[serverA].push(serverB);
    connectionMatrix[serverB].push(serverA);
  }

  const pathDuration = new Array(totalServers).fill(Infinity);
  pathDuration[0] = 0;
  const bfsQueue = [0];

  let headPointer = 0;
  while (headPointer < bfsQueue.length) {
    const currentMasterServer = bfsQueue[headPointer++];
    for (const neighborServer of connectionMatrix[currentMasterServer]) {
      if (pathDuration[neighborServer] === Infinity) {
        pathDuration[neighborServer] = pathDuration[currentMasterServer] + 1;
        bfsQueue.push(neighborServer);
      }
    }
  }

  let overallLatestCompletion = 0;

  for (let serverIndex = 1; serverIndex < totalServers; serverIndex++) {
    const currentServerDistance = pathDuration[serverIndex];
    const twoWayTravelDuration = 2 * currentServerDistance;
    const currentServerPatience = patience[serverIndex];

    let resendMultiplier = 0;
    if (twoWayTravelDuration > currentServerPatience) {
      resendMultiplier = Math.floor(
        (twoWayTravelDuration - 1) / currentServerPatience
      );
    }

    const lastResendMoment = resendMultiplier * currentServerPatience;
    const serverCompletionTime = lastResendMoment + twoWayTravelDuration;

    overallLatestCompletion = Math.max(
      overallLatestCompletion,
      serverCompletionTime
    );
  }

  return overallLatestCompletion + 1;
};

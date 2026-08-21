/**
 * Process Tasks Using Servers
 * Intuition: Tasks arrive at time i and need a free server of smallest weight then index. Two heaps: free (weight, index) and busy (freeTime, weight, index). Jump time when all servers are busy.
 * Approach: 1. Enqueue all servers as free. 2. Loop until all tasks assigned: release busy servers with freeTime ≤ simulationTime, assign while free servers exist and nextTaskToAssignIndex ≤ time, else jump to the next busy completion.
 * Dry Run: servers=[3,3,2], tasks=[1,2,3,2,1,2]. Assignments [2,2,0,2,1,2].
 * Time Complexity: O((M + N) log N)
 * Space Complexity: O(N + M)
 */
var assignTasks = function (servers, tasks) {
  const freeServerPriorityQueue = new PriorityQueue(
    (serverA, serverB) =>
      serverA[0] * 1000001 + serverA[1] - (serverB[0] * 1000001 + serverB[1])
  );

  const busyServerPriorityQueue = new PriorityQueue(
    (serverA, serverB) => serverA[0] - serverB[0]
  );

  const taskServerAssignments = new Array(tasks.length);

  for (
    let serverInitializationIndex = 0;
    serverInitializationIndex < servers.length;
    serverInitializationIndex++
  ) {
    freeServerPriorityQueue.enqueue([
      servers[serverInitializationIndex],
      serverInitializationIndex,
    ]);
  }

  let simulationTime = 0;
  let nextTaskToAssignIndex = 0;

  while (nextTaskToAssignIndex < tasks.length) {
    simulationTime = Math.max(simulationTime, nextTaskToAssignIndex);

    while (
      !busyServerPriorityQueue.isEmpty() &&
      busyServerPriorityQueue.front()[0] <= simulationTime
    ) {
      const completedServerDetails = busyServerPriorityQueue.dequeue();
      freeServerPriorityQueue.enqueue([
        completedServerDetails[1],
        completedServerDetails[2],
      ]);
    }

    while (
      freeServerPriorityQueue.size() > 0 &&
      nextTaskToAssignIndex < tasks.length &&
      nextTaskToAssignIndex <= simulationTime
    ) {
      const selectedServerDetails = freeServerPriorityQueue.dequeue();
      const assignedServerIdentifier = selectedServerDetails[1];

      taskServerAssignments[nextTaskToAssignIndex] = assignedServerIdentifier;

      const currentTaskDuration = tasks[nextTaskToAssignIndex];
      const nextFreeTimePoint = simulationTime + currentTaskDuration;

      busyServerPriorityQueue.enqueue([
        nextFreeTimePoint,
        selectedServerDetails[0],
        assignedServerIdentifier,
      ]);

      nextTaskToAssignIndex++;
    }

    if (
      freeServerPriorityQueue.isEmpty() &&
      nextTaskToAssignIndex < tasks.length
    ) {
      const earliestFreedServer = busyServerPriorityQueue.dequeue();
      simulationTime = earliestFreedServer[0];
      freeServerPriorityQueue.enqueue([
        earliestFreedServer[1],
        earliestFreedServer[2],
      ]);
    }
  }

  return taskServerAssignments;
};

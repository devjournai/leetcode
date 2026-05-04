/**
 * Process Tasks Using Servers
 * Time Complexity: O((M + N) log N)
 * Space Complexity: O(N + M)
 */
var assignTasks = function (servers, tasks) {
  const freeServerPriorityQueue = new PriorityQueue(
    (serverA, serverB) =>
      serverA[0] * 1000001 + serverA[1] - (serverB[0] * 1000001 + serverB[1]),
  );

  const busyServerPriorityQueue = new PriorityQueue(
    (serverA, serverB) => serverA[0] - serverB[0],
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

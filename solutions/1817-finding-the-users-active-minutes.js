/**
 * Finding The Users Active Minutes
 * Time Complexity: O(logs.length + k)
 * Space Complexity: O(logs.length + k)
 */
var findingUsersActiveMinutes = function (logs, k) {
  const userActivityData = new Map();

  for (
    let currentLogIndex = 0;
    currentLogIndex < logs.length;
    currentLogIndex++
  ) {
    const currentLogEntry = logs[currentLogIndex];
    const individualUserId = currentLogEntry[0];
    const particularMinute = currentLogEntry[1];

    if (!userActivityData.has(individualUserId)) {
      userActivityData.set(individualUserId, new Set());
    }
    userActivityData.get(individualUserId).add(particularMinute);
  }

  const userUamCounts = new Array(k).fill(0);

  for (const userMinuteActivitySet of userActivityData.values()) {
    const uniqueActivityCount = userMinuteActivitySet.size;

    if (uniqueActivityCount >= 1 && uniqueActivityCount <= k) {
      userUamCounts[uniqueActivityCount - 1]++;
    }
  }

  return userUamCounts;
};

/**
 * Finding The Users Active Minutes
 * Intuition: UAM is the number of distinct minutes a user appears in the logs. Bucket how many users have each UAM from 1 to k.
 * Approach: 1. Map user id → set of minutes. 2. Initialize `userUamCounts` of length k. 3. For each set size s in 1..k, increment index s-1. 4. Return the array.
 * Dry Run: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5.
 *   - User 0 minutes {5,2} UAM 2; user 1 {2,3} UAM 2 → [0,2,0,0,0].
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

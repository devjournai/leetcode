/**
 * Count Mentions Per User
 * Intuition: Process events in time order (OFFLINE before MESSAGE on ties). Track who is online; ALL can be added at the end, HERE only hits currently online users.
 * Approach: 1. Sort by timestamp, then OFFLINE before MESSAGE. 2. On MESSAGE ALL increment a global counter; HERE increment online users; id list increment those ids. 3. OFFLINE marks a user offline until timestamp+60.
 * Dry Run: 2 users, OFFLINE user 0 at t=10, HERE at t=10 → user 0 already offline so only user 1 gets the mention. ALL at t=70 after user 0 is back still adds 1 to everyone at the end.
 * Time Complexity: O(E log E + E * U)
 * Space Complexity: O(U)
 */

var countMentions = function (numberOfUsers, events) {
  const mentions = new Array(numberOfUsers).fill(0);
  const online = new Array(numberOfUsers).fill(true);
  const offlineQueue = [];
  let allMentions = 0;

  events.sort((left, right) => {
    const timeDiff = Number(left[1]) - Number(right[1]);
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return right[0].localeCompare(left[0]);
  });

  for (const event of events) {
    const eventType = event[0];
    const timestamp = Number(event[1]);

    while (
      offlineQueue.length > 0 &&
      offlineQueue[0].returnTimestamp <= timestamp
    ) {
      online[offlineQueue.shift().userId] = true;
    }

    if (eventType === "MESSAGE") {
      const mentionsString = event[2];
      if (mentionsString === "ALL") {
        allMentions++;
      } else if (mentionsString === "HERE") {
        for (let userId = 0; userId < numberOfUsers; userId++) {
          if (online[userId]) {
            mentions[userId]++;
          }
        }
      } else {
        for (const token of mentionsString.split(" ")) {
          mentions[Number(token.slice(2))]++;
        }
      }
    } else if (eventType === "OFFLINE") {
      const userId = Number(event[2]);
      online[userId] = false;
      offlineQueue.push({ returnTimestamp: timestamp + 60, userId });
      offlineQueue.sort((a, b) => a.returnTimestamp - b.returnTimestamp);
    }
  }

  for (let userId = 0; userId < numberOfUsers; userId++) {
    mentions[userId] += allMentions;
  }
  return mentions;
};

/**
 * Alert Using Same Key Card Three Or More Times In A One Hour Period
 * Intuition: After grouping times per worker and sorting them, three uses fit in one hour iff some time[i] and time[i-2] differ by at most 60 minutes.
 * Approach: 1. Convert HH:MM to minutes and bucket times by name. 2. Sort each worker's times. 3. For every i ≥ 2, if times[i] - times[i-2] ≤ 60, alert that name and stop scanning them. 4. Sort the alert list lexicographically.
 * Dry Run: names = [a,a,a], times = 10:00, 10:40, 11:00.
 *   - Sorted minutes 600, 640, 660; 660-600 = 60 ≤ 60 → alert ["a"].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var alertNames = function (keyName, keyTime) {
  const timeToMinutesConverter = function (timeStringParam) {
    const timeParts = timeStringParam.split(":");
    const hoursNum = Number(timeParts[0]);
    const minutesNum = Number(timeParts[1]);
    return hoursNum * 60 + minutesNum;
  };

  const userAccessLogs = new Map();

  for (let recordIndex = 0; recordIndex < keyName.length; recordIndex++) {
    const currentUserName = keyName[recordIndex];
    const currentKeyTimeString = keyTime[recordIndex];
    const currentMinutesAccess = timeToMinutesConverter(currentKeyTimeString);

    if (!userAccessLogs.has(currentUserName)) {
      userAccessLogs.set(currentUserName, []);
    }
    userAccessLogs.get(currentUserName).push(currentMinutesAccess);
  }

  const triggeredAlerts = [];

  for (const [individualName, accessTimesList] of userAccessLogs) {
    accessTimesList.sort((timeA, timeB) => timeA - timeB);

    for (
      let checkIndex = 2;
      checkIndex < accessTimesList.length;
      checkIndex++
    ) {
      const latestAccessTime = accessTimesList[checkIndex];
      const earlierAccessTime = accessTimesList[checkIndex - 2];

      if (latestAccessTime - earlierAccessTime <= 60) {
        triggeredAlerts.push(individualName);
        break;
      }
    }
  }

  triggeredAlerts.sort();

  return triggeredAlerts;
};

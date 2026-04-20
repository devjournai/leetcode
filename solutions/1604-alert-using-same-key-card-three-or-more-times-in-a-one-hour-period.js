/**
 * Alert Using Same Key Card Three Or More Times In A One Hour Period
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

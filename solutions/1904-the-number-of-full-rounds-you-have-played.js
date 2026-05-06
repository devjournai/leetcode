/**
 * The Number Of Full Rounds You Have Played
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numberOfRounds = function (loginTime, logoutTime) {
  const loginTimeParts = loginTime.split(":");
  const loginHourValue = Number(loginTimeParts[0]);
  const loginMinuteValue = Number(loginTimeParts[1]);

  const logoutTimeParts = logoutTime.split(":");
  const logoutHourValue = Number(logoutTimeParts[0]);
  const logoutMinuteValue = Number(logoutTimeParts[1]);

  let initialLoginTotalMinutes = loginHourValue * 60 + loginMinuteValue;
  let initialLogoutTotalMinutes = logoutHourValue * 60 + logoutMinuteValue;

  let effectiveLogoutTotalMinutes =
    initialLogoutTotalMinutes < initialLoginTotalMinutes
      ? initialLogoutTotalMinutes + 24 * 60
      : initialLogoutTotalMinutes;

  let earliestFullRoundStart = Math.ceil(initialLoginTotalMinutes / 15);
  let latestFullRoundEnd = Math.floor(effectiveLogoutTotalMinutes / 15);

  let calculatedRoundDifference = latestFullRoundEnd - earliestFullRoundStart;
  let finalRoundCount = Math.max(0, calculatedRoundDifference);

  return finalRoundCount;
};

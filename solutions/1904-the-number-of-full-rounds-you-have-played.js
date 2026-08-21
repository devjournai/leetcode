/**
 * The Number Of Full Rounds You Have Played
 * Intuition: Full rounds are 15-minute slots. Count how many complete [15k, 15k+15) intervals sit inside [login, logout], wrapping past midnight if needed.
 * Approach: 1. Convert times to minutes. 2. If logout < login, add 24*60. 3. earliestFullRoundStart = ceil(login/15), latestFullRoundEnd = floor(logout/15). 4. Return max(0, difference).
 * Dry Run: login="09:31", logout="10:14". ceil(571/15)=39, floor(614/15)=40 → 1 round.
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

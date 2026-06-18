/**
 * Angle Between Hands of a Clock
 * Intuition: Model the clock as a 360-degree circle. Calculate the absolute angular position of both the hour and minute hands relative to the 12 o'clock mark. The difference between these positions will give one angle, and the smaller of this angle and its 360-degree complement is the required result.
 * Approach: 1. Calculate the minute hand's angle by multiplying the minutes by 6 degrees/minute. 2. Calculate the hour hand's angle by taking the hour (adjusted for 12-hour format) multiplied by 30 degrees/hour, and adding the minute's contribution (minutes multiplied by 0.5 degrees/minute). 3. Find the absolute difference between the two hand angles. 4. The final answer is the minimum of this absolute difference and `360 - absoluteDifference`.
 * Dry Run: hour = 3, minutes = 15
 * 1. minuteDegreePerUnit = 6. currentMinuteHandAngle = 15 * 6 = 90 degrees.
 * 2. hourDegreePerUnit = 30. hourDegreePerMinuteContribution = 0.5.
 *    normalizedHour = 3 % 12 = 3.
 *    baseHourAngle = 3 * 30 = 90 degrees.
 *    minuteInfluenceAngle = 15 * 0.5 = 7.5 degrees.
 *    totalHourHandAngle = 90 + 7.5 = 97.5 degrees.
 * 3. angularDelta = Math.abs(90 - 97.5) = Math.abs(-7.5) = 7.5 degrees.
 * 4. complementaryAngle = 360 - 7.5 = 352.5 degrees.
 *    smallestAngle = Math.min(7.5, 352.5) = 7.5 degrees.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var angleClock = function (hourInput, minuteInput) {
  const minuteDegreePerUnit = 6;
  const currentMinuteHandAngle = minuteInput * minuteDegreePerUnit;

  const hourDegreePerUnit = 30;
  const hourDegreePerMinuteContribution = 0.5;

  const normalizedHour = hourInput % 12;
  const baseHourAngle = normalizedHour * hourDegreePerUnit;
  const minuteInfluenceAngle = minuteInput * hourDegreePerMinuteContribution;
  const totalHourHandAngle = baseHourAngle + minuteInfluenceAngle;

  const angularDelta = Math.abs(currentMinuteHandAngle - totalHourHandAngle);
  const complementaryAngle = 360 - angularDelta;

  const smallestAngle = Math.min(angularDelta, complementaryAngle);

  return smallestAngle;
};

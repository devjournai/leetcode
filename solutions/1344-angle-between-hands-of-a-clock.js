/**
 * Angle Between Hands Of A Clock
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var angleClock = function (hour, minutes) {
  const degreesPerMinute = 6;
  const degreesPerHourUnit = 30;
  const totalDegreesInCircle = 360;

  const minuteHandPosition = minutes * degreesPerMinute;

  const hourAdjustedFor12 = hour % 12;
  const minuteFractionOfHour = minutes / 60;
  const hourHandPosition =
    (hourAdjustedFor12 + minuteFractionOfHour) * degreesPerHourUnit;

  const initialAngleDifference = Math.abs(
    hourHandPosition - minuteHandPosition,
  );

  const complementaryAngleValue = totalDegreesInCircle - initialAngleDifference;

  const smallestAngle = Math.min(
    initialAngleDifference,
    complementaryAngleValue,
  );

  return smallestAngle;
};

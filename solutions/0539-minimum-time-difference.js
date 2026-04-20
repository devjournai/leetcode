/**
 * Minimum Time Difference
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findMinDifference = function (timePoints) {
  const parsedTimeInMinutes = timePoints.map((currentPoint) => {
    const timeFragments = currentPoint.split(":");
    const hourFragment = Number(timeFragments[0]);
    const minuteFragment = Number(timeFragments[1]);
    return hourFragment * 60 + minuteFragment;
  });

  parsedTimeInMinutes.sort((valueOne, valueTwo) => valueOne - valueTwo);

  let minimumDifferenceResult = Infinity;

  for (let timeIndex = 1; timeIndex < parsedTimeInMinutes.length; timeIndex++) {
    const currentDifference =
      parsedTimeInMinutes[timeIndex] - parsedTimeInMinutes[timeIndex - 1];
    minimumDifferenceResult = Math.min(
      minimumDifferenceResult,
      currentDifference,
    );
  }

  const totalMinutesInDay = 24 * 60;
  const lastTimeValue = parsedTimeInMinutes[parsedTimeInMinutes.length - 1];
  const firstTimeValue = parsedTimeInMinutes[0];
  const wrappedAroundDifference =
    totalMinutesInDay - lastTimeValue + firstTimeValue;

  return Math.min(minimumDifferenceResult, wrappedAroundDifference);
};

/**
 * Minimum Time Difference
 * Intuition: Convert HH:MM to minutes, sort, and take the min gap between neighbors. Also compare the wrap-around from last to first across midnight.
 * Approach: 1. Map each time to `hour*60+minute`. 2. Sort. 3. Min consecutive differences. 4. Also `1440 - last + first`. Return the overall min.
 * Dry Run: ["23:59","00:00"].
 *   - Minutes 1439, 0 sorted. Consecutive 1439. Wrap 1440-1439+0=1. Return 1.
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
      currentDifference
    );
  }

  const totalMinutesInDay = 24 * 60;
  const lastTimeValue = parsedTimeInMinutes[parsedTimeInMinutes.length - 1];
  const firstTimeValue = parsedTimeInMinutes[0];
  const wrappedAroundDifference =
    totalMinutesInDay - lastTimeValue + firstTimeValue;

  return Math.min(minimumDifferenceResult, wrappedAroundDifference);
};

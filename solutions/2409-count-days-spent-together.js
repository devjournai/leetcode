/**
 * Count Days Spent Together
 * Intuition: The problem asks for the overlap duration between two date intervals. Converting dates to a cumulative day count from the year's beginning simplifies interval comparison to numerical comparison.
 * Approach: 1. Define a helper function to convert "MM-DD" format dates into a single integer representing the day number from the start of the year (e.g., Jan 1st is day 1). This involves summing days of preceding months and adding the current day. 2. Apply this helper function to convert all four input date strings (Alice's arrival/leave, Bob's arrival/leave) into day numbers. 3. Calculate the start of the overlapping period as the maximum of Alice's arrival day and Bob's arrival day. 4. Calculate the end of the overlapping period as the minimum of Alice's leave day and Bob's leave day. 5. If the calculated overlap period is valid (start <= end), the number of shared days is `overlapEnd - overlapStart + 1`. Otherwise, there's no overlap, and the result is 0.
 * Dry Run: Input: arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
 *   daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 *
 *   convertDateToDayOfYear("08-15"): Month 8, Day 15.
 *     Days up to Jul (month 7): 31+28+31+30+31+30+31 = 212.
 *     totalAccumulatedDays = 212 + 15 = 227.
 *   aliceArrivalDayOfYear = 227.
 *
 *   convertDateToDayOfYear("08-18"): Month 8, Day 18.
 *     Days up to Jul: 212.
 *     totalAccumulatedDays = 212 + 18 = 230.
 *   aliceLeaveDayOfYear = 230.
 *
 *   convertDateToDayOfYear("08-16"): Month 8, Day 16.
 *     Days up to Jul: 212.
 *     totalAccumulatedDays = 212 + 16 = 228.
 *   bobArrivalDayOfYear = 228.
 *
 *   convertDateToDayOfYear("08-19"): Month 8, Day 19.
 *     Days up to Jul: 212.
 *     totalAccumulatedDays = 212 + 19 = 231.
 *   bobLeaveDayOfYear = 231.
 *
 *   intervalStartDay = Math.max(aliceArrivalDayOfYear, bobArrivalDayOfYear) = Math.max(227, 228) = 228.
 *   intervalEndDay = Math.min(aliceLeaveDayOfYear, bobLeaveDayOfYear) = Math.min(230, 231) = 230.
 *
 *   finalOverlapDays = Math.max(0, intervalEndDay - intervalStartDay + 1)
 *                    = Math.max(0, 230 - 228 + 1)
 *                    = Math.max(0, 3) = 3.
 *   Result: 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var countDaysTogether = function (
  arriveAlice,
  leaveAlice,
  arriveBob,
  leaveBob
) {
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function convertDateToDayOfYear(dateString) {
    const [parsedMonthComponent, parsedDayComponent] = dateString
      .split("-")
      .map(Number);
    let totalAccumulatedDays = 0;
    for (
      let monthIterationVariable = 0;
      monthIterationVariable < parsedMonthComponent - 1;
      monthIterationVariable++
    ) {
      totalAccumulatedDays += daysPerMonth[monthIterationVariable];
    }
    return totalAccumulatedDays + parsedDayComponent;
  }

  const aliceArrivalDayOfYear = convertDateToDayOfYear(arriveAlice);
  const aliceLeaveDayOfYear = convertDateToDayOfYear(leaveAlice);
  const bobArrivalDayOfYear = convertDateToDayOfYear(arriveBob);
  const bobLeaveDayOfYear = convertDateToDayOfYear(leaveBob);

  const intervalStartDay = Math.max(aliceArrivalDayOfYear, bobArrivalDayOfYear);
  const intervalEndDay = Math.min(aliceLeaveDayOfYear, bobLeaveDayOfYear);

  const finalOverlapDays = Math.max(0, intervalEndDay - intervalStartDay + 1);

  return finalOverlapDays;
};

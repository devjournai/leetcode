/**
 * Count Days Without Meetings
 * Intuition: Merge meeting intervals on [1, days] and subtract covered length from days.
 * Approach: 1. Sort meetings by start. 2. Merge overlapping ranges. 3. Subtract merged lengths from days.
 * Dry Run:
 *   days = 10, meetings = [[5,7],[1,3],[9,10]] covered 3+3+2=8, free = 2.
 * Time Complexity: O(M log M)
 * Space Complexity: O(1)
 */
var countDays = function (days, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);
  let freeDays = 0;
  let previousEnd = 0;
  for (const [startDay, endDay] of meetings) {
    if (startDay > previousEnd + 1) {
      freeDays += startDay - previousEnd - 1;
    }
    previousEnd = Math.max(previousEnd, endDay);
  }
  if (previousEnd < days) {
    freeDays += days - previousEnd;
  }
  return freeDays;
};

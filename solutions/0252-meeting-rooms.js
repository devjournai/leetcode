/**
 * Meeting Rooms
 * Intuition: After sorting by start time, two meetings conflict only if the next start is strictly before the previous end.
 * Approach: 1. Sort intervals by start. 2. For each adjacent pair, if `intervals[i][0] < intervals[i-1][1]`, return false. 3. Otherwise return true.
 * Dry Run: [[0,30],[5,10],[15,20]].
 *   - Sorted same order. 5<30 → overlap → false.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var canAttendMeetings = function (intervals) {
  intervals.sort(
    (firstMeeting, secondMeeting) => firstMeeting[0] - secondMeeting[0]
  );

  for (
    let currentIntervalIndex = 1;
    currentIntervalIndex < intervals.length;
    currentIntervalIndex++
  ) {
    if (
      intervals[currentIntervalIndex][0] <
      intervals[currentIntervalIndex - 1][1]
    ) {
      return false;
    }
  }

  return true;
};

/**
 * Meeting Rooms
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
*/
var canAttendMeetings = function (intervals) {
    intervals.sort((firstMeeting, secondMeeting) => firstMeeting[0] - secondMeeting[0]);

    for (let currentIntervalIndex = 1; currentIntervalIndex < intervals.length; currentIntervalIndex++) {
        if (intervals[currentIntervalIndex][0] < intervals[currentIntervalIndex - 1][1]) {
            return false;
        }
    }

    return true;
};
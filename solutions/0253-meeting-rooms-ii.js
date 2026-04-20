/**
 * Meeting Rooms II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minMeetingRooms = function (intervals) {
  if (!intervals || intervals.length === 0) {
    return 0;
  }

  const eventTimeline = [];

  for (const singleInterval of intervals) {
    const [startPoint, endPoint] = singleInterval;
    eventTimeline.push([startPoint, 1]);
    eventTimeline.push([endPoint, -1]);
  }

  eventTimeline.sort((eventA, eventB) => {
    const timeOne = eventA[0];
    const typeOne = eventA[1];
    const timeTwo = eventB[0];
    const typeTwo = eventB[1];

    if (timeOne !== timeTwo) {
      return timeOne - timeTwo;
    }
    return typeOne - typeTwo;
  });

  let maxRoomsNeeded = 0;
  let currentActiveMeetings = 0;

  for (const currentEvent of eventTimeline) {
    const eventValue = currentEvent[1];
    currentActiveMeetings += eventValue;
    maxRoomsNeeded = Math.max(maxRoomsNeeded, currentActiveMeetings);
  }

  return maxRoomsNeeded;
};

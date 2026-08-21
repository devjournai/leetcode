/**
 * Meeting Rooms II
 * Intuition: Sweep a timeline of +1 at start and -1 at end. Sorting times, and processing ends before starts when times tie, gives the peak concurrent meetings (rooms needed).
 * Approach: 1. Empty input → 0. 2. Push `[start, 1]` and `[end, -1]` for every interval. 3. Sort by time, then by type (`-1` before `+1`). 4. Scan, adding the type to `currentActiveMeetings` and tracking the max. 5. Return that max.
 * Dry Run: [[0,30],[5,10],[15,20]].
 *   - Events: 0+1, 5+1, 10-1, 15+1, 20-1, 30-1. Active peaks at 2 after 5+1. Return 2.
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

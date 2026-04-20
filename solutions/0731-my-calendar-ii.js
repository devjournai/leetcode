/**
 * My Calendar Ii
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var MyCalendarTwo = function () {
  this.scheduledEvents = [];
  this.conflictingEvents = [];
};

MyCalendarTwo.prototype.book = function (startTime, endTime) {
  for (
    let currentConflictIndex = 0;
    currentConflictIndex < this.conflictingEvents.length;
    currentConflictIndex++
  ) {
    const currentConflictBoundary =
      this.conflictingEvents[currentConflictIndex];
    const conflictRangeStart = currentConflictBoundary[0];
    const conflictRangeEnd = currentConflictBoundary[1];

    if (startTime < conflictRangeEnd && endTime > conflictRangeStart) {
      return false;
    }
  }

  for (const existingEvent of this.scheduledEvents) {
    const eventRangeStart = existingEvent[0];
    const eventRangeEnd = existingEvent[1];

    if (startTime < eventRangeEnd && endTime > eventRangeStart) {
      const newOverlapMomentStart = Math.max(eventRangeStart, startTime);
      const newOverlapMomentEnd = Math.min(eventRangeEnd, endTime);
      this.conflictingEvents.push([newOverlapMomentStart, newOverlapMomentEnd]);
    }
  }

  this.scheduledEvents.push([startTime, endTime]);
  return true;
};

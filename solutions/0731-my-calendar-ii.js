/**
 * My Calendar Ii
 * Intuition: Double booking is allowed; triple is not. Store all booked intervals and the pairwise overlaps (`conflictingEvents`). A new booking is rejected if it hits any existing overlap.
 * Approach: 1. Scan `conflictingEvents`; overlap (`startTime < end && endTime > start`) returns false. 2. For each `scheduledEvents` interval that overlaps, push the intersection onto `conflictingEvents`. 3. Push the new event and return true.
 * Dry Run: [10,20) then [50,60) then [10,40) OK (double on [10,20)). [5,15) hits the overlap [10,20) ∩ [10,40) = [10,20) → false.
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

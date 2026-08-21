/**
 * My Calendar Iii
 * Intuition: Sweep line: +1 at each start, -1 at each end, kept sorted in `allCalendarEvents`. After every book, the running sum’s maximum is the current k-booking.
 * Approach: 1. `addOrAdjustEventPoint` inserts or adds `deltaValue` at `timeValue`. 2. `book` adds +1 at start and -1 at end. 3. Scan points, accumulate `currentOverlapTracker`, track `maxOverlapCount`, and return it.
 * Dry Run: [10,20), [50,60), [10,40) → max overlap 2. Adding [5,15) raises the sweep to 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class MyCalendarThree {
  constructor() {
    this.allCalendarEvents = [];
  }

  addOrAdjustEventPoint(timeValue, deltaValue) {
    const existingEvents = this.allCalendarEvents;
    let insertionIndex = 0;

    while (
      insertionIndex < existingEvents.length &&
      existingEvents[insertionIndex][0] < timeValue
    ) {
      insertionIndex++;
    }

    if (
      insertionIndex < existingEvents.length &&
      existingEvents[insertionIndex][0] === timeValue
    ) {
      existingEvents[insertionIndex][1] += deltaValue;
    } else {
      existingEvents.splice(insertionIndex, 0, [timeValue, deltaValue]);
    }
  }

  book(startMoment, endMoment) {
    this.addOrAdjustEventPoint(startMoment, 1);
    this.addOrAdjustEventPoint(endMoment, -1);

    let maxOverlapCount = 0;
    let currentOverlapTracker = 0;

    for (
      let currentPointIdx = 0;
      currentPointIdx < this.allCalendarEvents.length;
      currentPointIdx++
    ) {
      const iteratedPoint = this.allCalendarEvents[currentPointIdx];
      currentOverlapTracker += iteratedPoint[1];
      if (currentOverlapTracker > maxOverlapCount) {
        maxOverlapCount = currentOverlapTracker;
      }
    }

    return maxOverlapCount;
  }
}

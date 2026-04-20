/**
 * My Calendar Iii
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

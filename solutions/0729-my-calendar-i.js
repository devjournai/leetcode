/**
 * My Calendar I
 * Intuition: Keep events sorted by start. Binary search the insertion index, then reject if the previous event ends after the new start or the next event starts before the new end (half-open overlap).
 * Approach: 1. Binary search `insertionIdx` as the first start `>= candidateStartTime`. 2. If `priorEventEnd > candidateStartTime` or `succeedingEventStart < candidateEndTime`, return false. 3. Else splice the pair into `eventListings` and return true.
 * Dry Run: book [10,20) true. book [15,25) overlaps prior end 20 > 15 → false. book [20,30) sits after 20 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class MyCalendar {
  constructor() {
    this.eventListings = [];
  }

  book(candidateStartTime, candidateEndTime) {
    let insertionIdx = this.eventListings.length;
    let searchLeft = 0;
    let searchRight = this.eventListings.length - 1;

    while (searchLeft <= searchRight) {
      let middlePosition = Math.floor((searchLeft + searchRight) / 2);
      let existingEventCurrent = this.eventListings[middlePosition];
      let existingEventCurrentStart = existingEventCurrent[0];

      if (existingEventCurrentStart >= candidateStartTime) {
        insertionIdx = middlePosition;
        searchRight = middlePosition - 1;
      } else {
        searchLeft = middlePosition + 1;
      }
    }

    if (insertionIdx > 0) {
      let priorEvent = this.eventListings[insertionIdx - 1];
      let priorEventEnd = priorEvent[1];
      if (priorEventEnd > candidateStartTime) {
        return false;
      }
    }

    if (insertionIdx < this.eventListings.length) {
      let succeedingEvent = this.eventListings[insertionIdx];
      let succeedingEventStart = succeedingEvent[0];
      if (succeedingEventStart < candidateEndTime) {
        return false;
      }
    }

    this.eventListings.splice(insertionIdx, 0, [
      candidateStartTime,
      candidateEndTime,
    ]);
    return true;
  }
}

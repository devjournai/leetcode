/**
 * Maximum Number Of Events That Can Be Attended
 * Intuition: Attend at most one event per day. Always pick the eligible event that ends soonest (min-heap of end days).
 * Approach: 1. Sort events by start. 2. Day by day, push newly started ends onto a min-heap, drop expired, pop one end if any. 3. Increment attended. 4. Return the count.
 * Dry Run: events = [[1,2],[2,3],[3,4]]. Attend one per day → 3.
 * Time Complexity: O(N log N + D)
 * Space Complexity: O(N)
 */
var maxEvents = function (events) {
  const sortedEventSchedule = events.sort(
    (eventA, eventB) => eventA[0] - eventB[0]
  );

  const eventEndDatesMinHeap = [];
  let totalAttendedEvents = 0;
  let schedulePointer = 0;
  let presentDay = 1;
  const totalEventsNumber = sortedEventSchedule.length;

  while (
    schedulePointer < totalEventsNumber ||
    eventEndDatesMinHeap.length > 0
  ) {
    while (
      schedulePointer < totalEventsNumber &&
      sortedEventSchedule[schedulePointer][0] <= presentDay
    ) {
      heapAddValue(
        eventEndDatesMinHeap,
        sortedEventSchedule[schedulePointer][1]
      );
      schedulePointer++;
    }

    while (
      eventEndDatesMinHeap.length > 0 &&
      eventEndDatesMinHeap[0] < presentDay
    ) {
      heapExtractMin(eventEndDatesMinHeap);
    }

    if (eventEndDatesMinHeap.length > 0) {
      heapExtractMin(eventEndDatesMinHeap);
      totalAttendedEvents++;
    }

    presentDay++;
  }

  function heapAddValue(heapStore, itemValue) {
    heapStore.push(itemValue);
    let itemIndex = heapStore.length - 1;
    while (itemIndex > 0) {
      const parentElementPosition = Math.floor((itemIndex - 1) / 2);
      if (heapStore[parentElementPosition] <= heapStore[itemIndex]) break;
      const temporarySwapValue = heapStore[parentElementPosition];
      heapStore[parentElementPosition] = heapStore[itemIndex];
      heapStore[itemIndex] = temporarySwapValue;
      itemIndex = parentElementPosition;
    }
  }

  function heapExtractMin(heapCollection) {
    const minimumValue = heapCollection[0];
    heapCollection[0] = heapCollection[heapCollection.length - 1];
    heapCollection.pop();
    let rootNodeIndex = 0;
    while (true) {
      const leftChildIndexPosition = 2 * rootNodeIndex + 1;
      const rightChildIndexPosition = 2 * rootNodeIndex + 2;
      let smallestChildPosition = rootNodeIndex;
      if (
        leftChildIndexPosition < heapCollection.length &&
        heapCollection[leftChildIndexPosition] <
          heapCollection[smallestChildPosition]
      ) {
        smallestChildPosition = leftChildIndexPosition;
      }
      if (
        rightChildIndexPosition < heapCollection.length &&
        heapCollection[rightChildIndexPosition] <
          heapCollection[smallestChildPosition]
      ) {
        smallestChildPosition = rightChildIndexPosition;
      }
      if (smallestChildPosition === rootNodeIndex) break;
      const anotherTemporarySwapValue = heapCollection[rootNodeIndex];
      heapCollection[rootNodeIndex] = heapCollection[smallestChildPosition];
      heapCollection[smallestChildPosition] = anotherTemporarySwapValue;
      rootNodeIndex = smallestChildPosition;
    }
    return minimumValue;
  }

  return totalAttendedEvents;
};

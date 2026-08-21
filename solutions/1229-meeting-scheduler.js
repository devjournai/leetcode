/**
 * Meeting Scheduler
 * Intuition: After sorting slots, two pointers walk the earliest remaining intervals and take the first overlap long enough for duration.
 * Approach: 1. Sort both slot lists by start. 2. Overlap = [max(starts), min(ends)]. 3. If length ≥ duration return [start, start+duration]. 4. Advance the interval that ends first.
 * Dry Run: slots1=[[10,50],[60,120]], slots2=[[0,15],[60,70]], duration=8. Overlap [60,70] → [60,68].
 * Time Complexity: O(M log M + N log N)
 * Space Complexity: O(1)
 */
var minAvailableDuration = function (slots1, slots2, duration) {
  const availableSlotsOne = slots1.sort((slotA, slotB) => slotA[0] - slotB[0]);
  const availableSlotsTwo = slots2.sort((slotC, slotD) => slotC[0] - slotD[0]);

  let firstPersonPointer = 0;
  let secondPersonPointer = 0;

  const totalSlotsOne = availableSlotsOne.length;
  const totalSlotsTwo = availableSlotsTwo.length;

  while (
    firstPersonPointer < totalSlotsOne &&
    secondPersonPointer < totalSlotsTwo
  ) {
    const potentialMeetingStart = Math.max(
      availableSlotsOne[firstPersonPointer][0],
      availableSlotsTwo[secondPersonPointer][0]
    );
    const potentialMeetingEnd = Math.min(
      availableSlotsOne[firstPersonPointer][1],
      availableSlotsTwo[secondPersonPointer][1]
    );

    const currentOverlapDuration = potentialMeetingEnd - potentialMeetingStart;

    if (currentOverlapDuration >= duration) {
      return [potentialMeetingStart, potentialMeetingStart + duration];
    }

    if (
      availableSlotsOne[firstPersonPointer][1] <
      availableSlotsTwo[secondPersonPointer][1]
    ) {
      firstPersonPointer++;
    } else {
      secondPersonPointer++;
    }
  }

  return [];
};

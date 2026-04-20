/**
 * Meeting Scheduler
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
      availableSlotsTwo[secondPersonPointer][0],
    );
    const potentialMeetingEnd = Math.min(
      availableSlotsOne[firstPersonPointer][1],
      availableSlotsTwo[secondPersonPointer][1],
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

/**
 * Meeting Rooms III
 * Intuition: Always give a meeting the lowest-numbered free room; if none is free, delay it in the room that frees first.
 * Approach: 1. Sort meetings by start. 2. Track free room ids and busy rooms as (end, id), both kept sorted. 3. Free any room ending by the meeting start. 4. Assign the lowest free room, or delay using the earliest busy room. 5. Return the room with the most meetings (smallest id on ties).
 * Dry Run: n=2, meetings=[[0,10],[1,5],[2,7],[3,4]]. Meeting [0,10] takes room 0. [1,5] takes room 1. [2,7] waits for room 1 (free at 5) and runs until 11. [3,4] waits for room 0 (free at 10). Room 0 has 2 meetings.
 * Time Complexity: O(M log M + M * N log N)
 * Space Complexity: O(N)
 */
var mostBooked = function (totalRooms, allMeetings) {
  allMeetings.sort((meetingA, meetingB) => meetingA[0] - meetingB[0]);

  const roomUsageCount = new Array(totalRooms).fill(0);
  const freeRooms = [];
  const busyRooms = [];

  let currentRoomIndex = 0;
  while (currentRoomIndex < totalRooms) {
    freeRooms.push(currentRoomIndex);
    currentRoomIndex++;
  }

  let meetingIterator = 0;
  while (meetingIterator < allMeetings.length) {
    const currentMeetingDetails = allMeetings[meetingIterator];
    const currentMeetingStart = currentMeetingDetails[0];
    const currentMeetingOriginalEnd = currentMeetingDetails[1];

    for (;;) {
      if (busyRooms.length === 0 || busyRooms[0][0] > currentMeetingStart) {
        break;
      }
      const finishedRoomEntry = busyRooms.shift();
      const liberatedRoomId = finishedRoomEntry[1];
      freeRooms.push(liberatedRoomId);
      freeRooms.sort((idPrimary, idSecondary) => idPrimary - idSecondary);
    }

    let allocatedRoomId;
    let effectiveMeetingCompletionTime;

    if (freeRooms.length > 0) {
      allocatedRoomId = freeRooms.shift();
      effectiveMeetingCompletionTime = currentMeetingOriginalEnd;
    } else {
      const nextOccupiedRoomInfo = busyRooms.shift();
      const nextFreeingTime = nextOccupiedRoomInfo[0];
      const nextFreeingRoomIdentifier = nextOccupiedRoomInfo[1];

      allocatedRoomId = nextFreeingRoomIdentifier;
      effectiveMeetingCompletionTime =
        nextFreeingTime + (currentMeetingOriginalEnd - currentMeetingStart);
    }

    roomUsageCount[allocatedRoomId]++;
    busyRooms.push([effectiveMeetingCompletionTime, allocatedRoomId]);
    busyRooms.sort((scheduleOne, scheduleTwo) =>
      scheduleOne[0] === scheduleTwo[0]
        ? scheduleOne[1] - scheduleTwo[1]
        : scheduleOne[0] - scheduleTwo[0]
    );

    meetingIterator++;
  }

  let maximalMeetingCount = -1;
  let finalSelectionRoomId = -1;

  let roomInspectionIndex = 0;
  while (roomInspectionIndex < totalRooms) {
    const roomTotalBookings = roomUsageCount[roomInspectionIndex];
    if (roomTotalBookings > maximalMeetingCount) {
      maximalMeetingCount = roomTotalBookings;
      finalSelectionRoomId = roomInspectionIndex;
    }
    roomInspectionIndex++;
  }

  return finalSelectionRoomId;
};

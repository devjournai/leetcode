/**
 * Meeting Rooms III
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

        for (; ;) {
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
            effectiveMeetingCompletionTime = nextFreeingTime + (currentMeetingOriginalEnd - currentMeetingStart);
        }

        roomUsageCount[allocatedRoomId]++;
        busyRooms.push([effectiveMeetingCompletionTime, allocatedRoomId]);
        busyRooms.sort((scheduleOne, scheduleTwo) => scheduleOne[0] === scheduleTwo[0] ? scheduleOne[1] - scheduleTwo[1] : scheduleOne[0] - scheduleTwo[0]);

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
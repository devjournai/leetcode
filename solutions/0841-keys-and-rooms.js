/**
 * Keys And Rooms
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var canVisitAllRooms = function (rooms) {
  const totalRoomCount = rooms.length;

  const accessQueue = [];
  accessQueue.push(0);

  const visitedRoomSet = new Set();
  visitedRoomSet.add(0);

  while (accessQueue.length > 0) {
    const currentRoomId = accessQueue.shift();

    for (const nextRoomKey of rooms[currentRoomId]) {
      if (!visitedRoomSet.has(nextRoomKey)) {
        visitedRoomSet.add(nextRoomKey);
        accessQueue.push(nextRoomKey);
      }
    }
  }

  return visitedRoomSet.size === totalRoomCount;
};

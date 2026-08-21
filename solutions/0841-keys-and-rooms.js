/**
 * Keys And Rooms
 * Intuition: Room 0 is unlocked. BFS with keys found in visited rooms; if every room is visited, return true.
 * Approach: 1. Queue and `visitedRoomSet` start with 0. 2. While queue: dequeue, for each key in `rooms[id]` enqueue if unseen. 3. Return `visitedRoomSet.size === totalRoomCount`.
 * Dry Run: rooms=[[1],[2],[3],[]]. Visit 0→1→2→3. Size 4 → true. [[1,3],[3,0,1],[2],[0]] never reaches 2 → false.
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

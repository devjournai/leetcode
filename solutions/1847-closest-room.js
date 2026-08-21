/**
 * Closest Room
 * Intuition: Process queries from largest minSize to smallest so the set of eligible rooms only grows. Among rooms that are large enough, pick the id closest to preferred (smaller id on a tie).
 * Approach: 1. Sort rooms and queries by size descending. 2. For each query, insert all remaining rooms with size ≥ requiredMinimumSize into sorted `candidateRoomNumbers`. 3. Binary-search `discoverClosestId` for preferredRoomIdentifier. 4. Write answers back by originalPosition.
 * Dry Run: rooms=[[2,2],[1,2],[3,2]], queries=[[3,1]].
 *   - minSize 1: all rooms eligible, preferred 3 → id 3. Return [3].
 * Time Complexity: O(N log N + K log K + N^2 + K log N)
 * Space Complexity: O(N + K)
 */
var closestRoom = function (rooms, queries) {
  const allRoomsData = [...rooms];
  allRoomsData.sort((roomA, roomB) => roomB[1] - roomA[1]);

  const queryInformationList = queries
    .map((queryEntry, originalIndexVal) => [
      queryEntry[0],
      queryEntry[1],
      originalIndexVal,
    ])
    .sort((queryOne, queryTwo) => queryTwo[1] - queryOne[1]);

  const finalRoomAssignments = new Array(queries.length).fill(-1);
  const candidateRoomNumbers = [];
  let roomDataPointer = 0;

  for (
    let queryIteration = 0;
    queryIteration < queryInformationList.length;
    ++queryIteration
  ) {
    const preferredRoomIdentifier = queryInformationList[queryIteration][0];
    const requiredMinimumSize = queryInformationList[queryIteration][1];
    const originalPosition = queryInformationList[queryIteration][2];

    while (
      roomDataPointer < allRoomsData.length &&
      allRoomsData[roomDataPointer][1] >= requiredMinimumSize
    ) {
      performSortedInsertion(
        allRoomsData[roomDataPointer][0],
        candidateRoomNumbers
      );
      roomDataPointer++;
    }

    finalRoomAssignments[originalPosition] = discoverClosestId(
      preferredRoomIdentifier,
      candidateRoomNumbers
    );
  }

  return finalRoomAssignments;

  function performSortedInsertion(newRoomNumberValue, targetList) {
    let searchLowerBoundary = 0;
    let searchUpperBoundary = targetList.length;
    while (searchLowerBoundary < searchUpperBoundary) {
      const centralPoint = Math.floor(
        (searchLowerBoundary + searchUpperBoundary) / 2
      );
      if (targetList[centralPoint] < newRoomNumberValue) {
        searchLowerBoundary = centralPoint + 1;
      } else {
        searchUpperBoundary = centralPoint;
      }
    }
    targetList.splice(searchLowerBoundary, 0, newRoomNumberValue);
  }

  function discoverClosestId(targetNumber, searchList) {
    if (searchList.length === 0) {
      return -1;
    }

    let initialLowerBound = 0;
    let initialUpperBound = searchList.length - 1;
    let bestMatchedId = searchList[0];
    let minAbsoluteDifference = Math.abs(bestMatchedId - targetNumber);

    while (initialLowerBound <= initialUpperBound) {
      const midPointLocation = Math.floor(
        (initialLowerBound + initialUpperBound) / 2
      );
      const currentRoomId = searchList[midPointLocation];
      const currentAbsoluteDifference = Math.abs(currentRoomId - targetNumber);

      if (
        currentAbsoluteDifference < minAbsoluteDifference ||
        (currentAbsoluteDifference === minAbsoluteDifference &&
          currentRoomId < bestMatchedId)
      ) {
        minAbsoluteDifference = currentAbsoluteDifference;
        bestMatchedId = currentRoomId;
      }

      if (currentRoomId < targetNumber) {
        initialLowerBound = midPointLocation + 1;
      } else if (currentRoomId > targetNumber) {
        initialUpperBound = midPointLocation - 1;
      } else {
        return currentRoomId;
      }
    }

    return bestMatchedId;
  }
};

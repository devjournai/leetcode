/**
 * Queue Reconstruction By Height
 * Intuition: Place taller people first so later shorter inserts do not change anyone’s k-count among the taller-or-equal already seated. Insert each person at index `k`.
 * Approach: 1. Sort by height descending, then k ascending. 2. `reduce` with `splice(kIndex, 0, currentPerson)` into an empty array. 3. Return that queue.
 * Dry Run: [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]].
 *   - Order: [7,0],[7,1],[6,1],[5,0],[5,2],[4,4].
 *   - Insert → [5,0],[7,0],[5,2],[6,1],[4,4],[7,1].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var reconstructQueue = function (people) {
  const sortedPeopleArray = people.sort(
    ([currentHeightOne, currentKValueOne], [nextHeightTwo, nextKValueTwo]) => {
      return (
        nextHeightTwo - currentHeightOne || currentKValueOne - nextKValueTwo
      );
    }
  );

  const reconstructedResult = sortedPeopleArray.reduce(
    (accumulatedQueue, currentPerson) => {
      const kIndex = currentPerson[1];
      accumulatedQueue.splice(kIndex, 0, currentPerson);
      return accumulatedQueue;
    },
    []
  );

  return reconstructedResult;
};

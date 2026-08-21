/**
 * Number Of Flowers In Full Bloom
 * Intuition: The problem asks for the count of active intervals (blooming flowers) at specific query points (person arrival times). This is a classic application for a sweep-line algorithm, where we transform intervals into discrete start and end events and process them in chronological order.
 * Approach: 1. Convert each flower's bloom period `[start, end]` into two time-based events: `[start, +1]` (a flower begins blooming) and `[end + 1, -1]` (a flower ceases blooming, `end + 1` because `end` is inclusive). Collect all these into a master list of `timeLineEvents`. 2. Sort `timeLineEvents` primarily by time, and secondarily by event type (positive changes first to ensure correct bloom count at exact same time points). 3. Create a new list `personArrivalsWithOriginalIndices` by pairing each person's arrival time with their original index. Sort this list by arrival time. 4. Initialize `bloomCountsResult` array to store answers and `currentBloomTally` to zero. Iterate through the sorted `personArrivalsWithOriginalIndices`. For each person, advance through `timeLineEvents`, applying all events that occur at or before the person's arrival time to `currentBloomTally`. Once all relevant events are processed for that person, store `currentBloomTally` into `bloomCountsResult` at their original index.
 * Dry Run: flowers = [[1,6], [3,7]], people = [2,3,7]
 * 1. timeLineEvents (unsorted): [[1,1], [7,-1], [3,1], [8,-1]] (from [1,6] and [3,7])
 * 2. timeLineEvents (sorted): [[1,1], [3,1], [7,-1], [8,-1]]
 * 3. personArrivalsWithOriginalIndices (sorted): [[2,0], [3,1], [7,2]]
 * 4. Sweep:
 *    - currentBloomTally = 0, eventIterator = 0
 *    - Person 0 (arrival 2):
 *      - Process [1,1]: currentBloomTally = 1, eventIterator = 1
 *      - Stop (next event time 3 > 2)
 *      - bloomCountsResult[0] = 1
 *    - Person 1 (arrival 3):
 *      - Process [3,1]: currentBloomTally = 1 + 1 = 2, eventIterator = 2
 *      - Stop (next event time 7 > 3)
 *      - bloomCountsResult[1] = 2
 *    - Person 2 (arrival 7):
 *      - Process [7,-1]: currentBloomTally = 2 - 1 = 1, eventIterator = 3
 *      - Stop (next event time 8 > 7)
 *      - bloomCountsResult[2] = 1
 *    Final bloomCountsResult = [1, 2, 1]
 * Time Complexity: O(F log F + P log P)
 * Space Complexity: O(F + P)
 */
var fullBloomFlowers = function (flowers, people) {
  const timeLineEvents = [];
  for (const flowerEntry of flowers) {
    const [bloomStart, bloomEnd] = flowerEntry;
    timeLineEvents.push([bloomStart, 1]);
    timeLineEvents.push([bloomEnd + 1, -1]);
  }

  timeLineEvents.sort((eventA, eventB) => {
    if (eventA[0] !== eventB[0]) {
      return eventA[0] - eventB[0];
    }
    return eventA[1] - eventB[1];
  });

  const bloomCountsResult = new Array(people.length).fill(0);
  const personArrivalsWithOriginalIndices = people.map(
    (arrivalMoment, originalPosition) => [arrivalMoment, originalPosition]
  );

  personArrivalsWithOriginalIndices.sort(
    (personA, personB) => personA[0] - personB[0]
  );

  let currentBloomTally = 0;
  let eventIterator = 0;
  for (const currentPersonQuery of personArrivalsWithOriginalIndices) {
    const [personArrivalMoment, personOriginalIndex] = currentPersonQuery;
    while (
      eventIterator < timeLineEvents.length &&
      timeLineEvents[eventIterator][0] <= personArrivalMoment
    ) {
      currentBloomTally += timeLineEvents[eventIterator][1];
      eventIterator++;
    }
    bloomCountsResult[personOriginalIndex] = currentBloomTally;
  }

  return bloomCountsResult;
};

/**
 * Avoid Flood In The City
 * Intuition: Rain days fill a lake; a later rain on the same lake floods unless a dry day after the previous rain is assigned to that lake. Keep last-rain days and unused dry slots.
 * Approach: 1. Answer starts as -1s. 2. On 0, push the dry index. 3. On rain, if the lake rained before, find the first dry slot after that day, assign the lake, and splice it out; else flood []. 4. Remaining dry days become 1.
 * Dry Run: rains = [1,2,0,0,2,1]
 *   - rain 1, rain 2, dry, dry
 *   - second 2 uses first dry for lake 2; second 1 uses second dry for lake 1
 *   - [-1,-1,2,1,-1,-1]
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var avoidFlood = function (rains) {
  const lakeLastRainDay = new Map();
  const availableDrySlots = [];
  const finalAnswer = new Array(rains.length).fill(-1);

  for (
    let currentDayIndex = 0;
    currentDayIndex < rains.length;
    currentDayIndex++
  ) {
    const currentLakeNumber = rains[currentDayIndex];

    if (currentLakeNumber === 0) {
      availableDrySlots.push(currentDayIndex);
    } else {
      if (lakeLastRainDay.has(currentLakeNumber)) {
        const previousRainDay = lakeLastRainDay.get(currentLakeNumber);
        let drySlotFound = false;
        for (
          let drySlotIterator = 0;
          drySlotIterator < availableDrySlots.length;
          drySlotIterator++
        ) {
          if (availableDrySlots[drySlotIterator] > previousRainDay) {
            finalAnswer[availableDrySlots[drySlotIterator]] = currentLakeNumber;
            availableDrySlots.splice(drySlotIterator, 1);
            drySlotFound = true;
            break;
          }
        }
        if (!drySlotFound) {
          return [];
        }
      }
      lakeLastRainDay.set(currentLakeNumber, currentDayIndex);
    }
  }

  for (const unusedDryDayIndex of availableDrySlots) {
    finalAnswer[unusedDryDayIndex] = 1;
  }

  return finalAnswer;
};

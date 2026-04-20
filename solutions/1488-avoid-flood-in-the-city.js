/**
 * Avoid Flood In The City
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

/**
 * Maximum Units On A Truck
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((firstType, secondType) => secondType[1] - firstType[1]);

  let totalAccumulatedUnits = 0;
  let currentTruckCapacity = truckSize;

  for (let typeIndex = 0; typeIndex < boxTypes.length; typeIndex++) {
    const boxTypeData = boxTypes[typeIndex];
    const numberOfAvailableBoxes = boxTypeData[0];
    const unitsPerSingleBox = boxTypeData[1];

    const boxesToPut = Math.min(numberOfAvailableBoxes, currentTruckCapacity);
    totalAccumulatedUnits += boxesToPut * unitsPerSingleBox;
    currentTruckCapacity -= boxesToPut;

    if (currentTruckCapacity === 0) {
      break;
    }
  }

  return totalAccumulatedUnits;
};

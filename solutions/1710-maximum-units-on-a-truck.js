/**
 * Maximum Units On A Truck
 * Intuition: Prefer box types with more units per box. Sort by units descending and fill the truck greedily until `truckSize` is used.
 * Approach: 1. Sort `boxTypes` by `secondType[1]` descending. 2. Take `boxesToPut = min(available, currentTruckCapacity)` and add units. 3. Stop when capacity is 0. 4. Return `totalAccumulatedUnits`.
 * Dry Run: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
 * Take 1 of 3-unit, 2 of 2-unit, 1 of 1-unit → 3+4+1 = 8.
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

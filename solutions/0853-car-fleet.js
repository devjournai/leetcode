/**
 * Car Fleet
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var carFleet = function (target, position, speed) {
  const totalCarNumber = position.length;
  const initialCarRecords = [];

  for (let carIterator = 0; carIterator < totalCarNumber; carIterator++) {
    const currentCarPositionValue = position[carIterator];
    const currentCarSpeedValue = speed[carIterator];
    const timeToDestination =
      (target - currentCarPositionValue) / currentCarSpeedValue;
    initialCarRecords.push({
      startingPosition: currentCarPositionValue,
      estimatedTime: timeToDestination,
    });
  }

  initialCarRecords.sort(
    (carOne, carTwo) => carTwo.startingPosition - carOne.startingPosition,
  );

  let fleetCounterValue = 0;
  let slowestTimeObserved = 0;
  let recordIndex = 0;

  while (recordIndex < totalCarNumber) {
    const currentRecord = initialCarRecords[recordIndex];
    const currentCarCalculatedTime = currentRecord.estimatedTime;

    if (currentCarCalculatedTime > slowestTimeObserved) {
      fleetCounterValue++;
      slowestTimeObserved = currentCarCalculatedTime;
    }
    recordIndex++;
  }

  return fleetCounterValue;
};

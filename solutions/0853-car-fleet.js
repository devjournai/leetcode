/**
 * Car Fleet
 * Intuition: Sort by position descending. A car is a new fleet if it needs strictly more time than the slowest fleet ahead; otherwise it catches that fleet.
 * Approach: 1. For each car store `{startingPosition, estimatedTime=(target-pos)/speed}`. 2. Sort position desc. 3. Scan: if time > `slowestTimeObserved`, increment fleet and update slowest. 4. Return count.
 * Dry Run: target=12, pos=[10,8,0,5,3], speed=[2,4,1,1,3]. Times 1,1,12,7,3. From pos 10 then 8 (catch), 5 (new), 3 (catch 5), 0 (new) → 3 fleets.
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
    (carOne, carTwo) => carTwo.startingPosition - carOne.startingPosition
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

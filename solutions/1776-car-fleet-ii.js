/**
 * Car Fleet II
 * Time Complexity: O(totalCarCount)
 * Space Complexity: O(totalCarCount)
 */
var getCollisionTimes = function (cars) {
  const totalCarCount = cars.length;
  const carStackIndices = [];
  const collisionDurations = Array(totalCarCount).fill(-1);

  for (let carIterator = totalCarCount - 1; carIterator >= 0; carIterator--) {
    const currentCarDetails = cars[carIterator];
    const currentCarPositionMetric = currentCarDetails[0];
    const currentCarSpeedMetric = currentCarDetails[1];

    while (carStackIndices.length > 0) {
      const lookAheadIndex = carStackIndices[carStackIndices.length - 1];
      const lookAheadCarDetails = cars[lookAheadIndex];
      const lookAheadCarPositionMetric = lookAheadCarDetails[0];
      const lookAheadCarSpeedMetric = lookAheadCarDetails[1];
      const willCarAheadBePopped =
        currentCarSpeedMetric <= lookAheadCarSpeedMetric ||
        (collisionDurations[lookAheadIndex] > 0 &&
          (lookAheadCarPositionMetric - currentCarPositionMetric) /
            (currentCarSpeedMetric - lookAheadCarSpeedMetric) >=
            collisionDurations[lookAheadIndex]);

      if (willCarAheadBePopped) {
        carStackIndices.pop();
      } else {
        break;
      }
    }

    if (carStackIndices.length > 0) {
      const closestTargetIndex = carStackIndices[carStackIndices.length - 1];
      const closestTargetCarDetails = cars[closestTargetIndex];
      const closestTargetPosition = closestTargetCarDetails[0];
      const closestTargetSpeed = closestTargetCarDetails[1];

      collisionDurations[carIterator] =
        (closestTargetPosition - currentCarPositionMetric) /
        (currentCarSpeedMetric - closestTargetSpeed);
    }

    carStackIndices.push(carIterator);
  }

  return collisionDurations;
};

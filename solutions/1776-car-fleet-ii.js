/**
 * Car Fleet II
 * Intuition: A car only collides with a slower car ahead. Cars that get caught sooner than that meeting time never actually meet the current car, so a monotone stack of prospective leaders from the right yields collision times.
 * Approach: 1. Fill `collisionDurations` with -1. 2. Scan cars from right to left; pop stack cars that are not slower or that collide with someone else first. 3. If a leader remains, time = position gap / speed gap. 4. Push the current index.
 * Dry Run: cars = [[1,2],[2,1],[4,3],[7,2]].
 *   - Car 3 never collides (-1). Car 2 meets car 3 at time 3. Car 0 meets the fleet at time 1. Car 1 never collides. Return [1,-1,3,-1].
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

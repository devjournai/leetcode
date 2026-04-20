/**
 * Magnetic Force Between Two Balls
 * Time Complexity: O(N log N + N log D)
 * Space Complexity: O(1)
 */
var maxDistance = function (position, m) {
  position.sort((valA, valB) => valA - valB);

  const checkFeasibility = (
    forceThreshold,
    basketLocations,
    desiredBallCount,
  ) => {
    let placedBallQuantity = 1;
    let previousBallLocation = basketLocations[0];

    for (
      let iteratorIndex = 1;
      iteratorIndex < basketLocations.length;
      iteratorIndex++
    ) {
      if (
        basketLocations[iteratorIndex] - previousBallLocation >=
        forceThreshold
      ) {
        placedBallQuantity++;
        previousBallLocation = basketLocations[iteratorIndex];
        if (placedBallQuantity === desiredBallCount) {
          return true;
        }
      }
    }
    return placedBallQuantity >= desiredBallCount;
  };

  let lowerBoundForce = 1;
  let upperBoundForce = position[position.length - 1] - position[0];
  let finalMaxMinForce = 0;

  while (lowerBoundForce <= upperBoundForce) {
    let attemptedForce = Math.floor((lowerBoundForce + upperBoundForce) / 2);
    if (checkFeasibility(attemptedForce, position, m)) {
      finalMaxMinForce = attemptedForce;
      lowerBoundForce = attemptedForce + 1;
    } else {
      upperBoundForce = attemptedForce - 1;
    }
  }

  return finalMaxMinForce;
};

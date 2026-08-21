/**
 * Magnetic Force Between Two Balls
 * Intuition: Maximize the min gap: binary search force F and greedily place m balls at least F apart on sorted positions.
 * Approach: 1. Sort positions. 2. lo=1, hi=max-min. 3. If feasible, try larger F. 4. Return the last good F.
 * Dry Run: position = [1,2,3,4,7], m = 3.
 *   - Max min-force is 3 (place at 1,4,7).
 * Time Complexity: O(N log N + N log D)
 * Space Complexity: O(1)
 */
var maxDistance = function (position, m) {
  position.sort((valA, valB) => valA - valB);

  const checkFeasibility = (
    forceThreshold,
    basketLocations,
    desiredBallCount
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

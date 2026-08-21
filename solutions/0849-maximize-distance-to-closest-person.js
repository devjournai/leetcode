/**
 * Maximize Distance To Closest Person
 * Intuition: For each empty seat, distance to closest person is min(dist to left occupied, dist to right occupied). Use a large sentinel (`totalSeats`) when a side has no person.
 * Approach: 1. Left pass: last person index, fill `distancesToLeft`. 2. Right pass similarly. 3. For empty seats take min of both, track max. 4. Return it.
 * Dry Run: [1,0,0,0,1,0,1]. Empty at 1,2,3: mins 1,2,1; empty at 5: min 1. Max 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxDistToClosest = function (seats) {
  const totalSeats = seats.length;
  const distancesToLeft = new Array(totalSeats);
  const distancesToRight = new Array(totalSeats);

  let lastPersonIndex = -1;
  for (
    let currentSeatIndex = 0;
    currentSeatIndex < totalSeats;
    currentSeatIndex++
  ) {
    if (seats[currentSeatIndex] === 1) {
      lastPersonIndex = currentSeatIndex;
    }
    if (lastPersonIndex === -1) {
      distancesToLeft[currentSeatIndex] = totalSeats;
    } else {
      distancesToLeft[currentSeatIndex] = currentSeatIndex - lastPersonIndex;
    }
  }

  let nextPersonIndex = totalSeats;
  for (
    let backwardSeatIndex = totalSeats - 1;
    backwardSeatIndex >= 0;
    backwardSeatIndex--
  ) {
    if (seats[backwardSeatIndex] === 1) {
      nextPersonIndex = backwardSeatIndex;
    }
    if (nextPersonIndex === totalSeats) {
      distancesToRight[backwardSeatIndex] = totalSeats;
    } else {
      distancesToRight[backwardSeatIndex] = nextPersonIndex - backwardSeatIndex;
    }
  }

  let maxOverallDistance = 0;
  for (
    let finalCheckIndex = 0;
    finalCheckIndex < totalSeats;
    finalCheckIndex++
  ) {
    if (seats[finalCheckIndex] === 0) {
      const currentSeatLeftDistance = distancesToLeft[finalCheckIndex];
      const currentSeatRightDistance = distancesToRight[finalCheckIndex];
      const minOfTwoDistances = Math.min(
        currentSeatLeftDistance,
        currentSeatRightDistance
      );
      if (minOfTwoDistances > maxOverallDistance) {
        maxOverallDistance = minOfTwoDistances;
      }
    }
  }

  return maxOverallDistance;
};

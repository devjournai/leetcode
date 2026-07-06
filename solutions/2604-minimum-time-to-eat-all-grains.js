/**
 * Minimum Time To Eat All Grains
 * Intuition: The problem asks for the minimum time, and the ability for hens to eat all grains within a given time is a monotonic property. If all grains can be eaten in time `T`, they can also be eaten in any time `T' > T`. This monotonicity allows us to use binary search on the answer (the time).
 * Approach:
 * 1. Sort both the `hens` and `grains` arrays in ascending order. This preparation simplifies the logic for hens moving from left to right to consume grains efficiently.
 * 2. Establish a search range for the binary search. The `lowerTimeBound` is 0. The `upperTimeBound` is calculated as twice the total span covering all hens and grains (from the minimum of all positions to the maximum of all positions), providing a safe maximum time.
 * 3. Execute a binary search for the minimum `feasibleTime`.
 *    a. In each iteration, compute `midpointTime = floor((lowerTimeBound + upperTimeBound) / 2)`.
 *    b. Invoke a helper function `checkPossibility(midpointTime)` to ascertain if all grains can be consumed within this `midpointTime`.
 *    c. If `checkPossibility` yields `true`, it indicates `midpointTime` is a potential minimum. We store this as `finalAnswerTime` and attempt to find an even smaller time by adjusting the `upperTimeBound` to `midpointTime - 1`.
 *    d. If `checkPossibility` yields `false`, `midpointTime` is insufficient. We must seek a larger time by setting `lowerTimeBound` to `midpointTime + 1`.
 * 4. The `checkPossibility(durationLimit)` helper function operates as follows:
 *    a. Initialize `currentGrainLocator` to 0, pointing to the first grain that needs to be eaten.
 *    b. Iterate through each hen using an index-based `for` loop. For each `currentHenCoordinate`:
 *       i. If `currentGrainLocator` has reached the total number of grains, all grains are eaten; return `true`.
 *       ii. Determine the `maximalRightwardReach` for the current hen within `durationLimit`.
 *          - If `grains[currentGrainLocator]` is to the right of or at `currentHenCoordinate`, the hen's `maximalRightwardReach` is simply `durationLimit` (it just moves right).
 *          - If `grains[currentGrainLocator]` is to the left of `currentHenCoordinate`, the hen must first move left. Calculate `leftwardDistance = currentHenCoordinate - grains[currentGrainLocator]`.
 *          - If `leftwardDistance` is greater than `durationLimit`, this hen cannot even reach the current target grain; return `false`.
 *          - Otherwise, the hen first moves left to `grains[currentGrainLocator]` and then turns right. The `maximalRightwardReach` from its starting `currentHenCoordinate` is then determined by the maximum of 0, `durationLimit - 2 * leftwardDistance` (move left, return to start, then move right), and `floor((durationLimit - leftwardDistance) / 2)` (move left, then sweep right from the grain).
 *       iii. If `currentHenCoordinate + maximalRightwardReach` is greater than or equal to `grains[currentGrainLocator]`:
 *          - Use a `do...while` loop to advance `currentGrainLocator`, consuming all grains reachable by the current hen (i.e., grains whose positions are less than or equal to `currentHenCoordinate + maximalRightwardReach`).
 *          - If `currentGrainLocator` reaches the total number of grains, return `true`.
 *    c. After all hens have been processed, if `currentGrainLocator` has not reached the total number of grains, it means not all grains could be eaten; return `false`.
 * 5. The binary search concludes, returning the `finalAnswerTime`.
 * Dry Run: hens = [0], grains = [10]
 * 1. `hensPositions = [0]`, `grainLocations = [10]` (after sorting).
 * 2. `lowerTimeBound = 0`, `upperTimeBound = 2 * (Math.max(10, 0) - Math.min(10, 0)) = 2 * (10 - 0) = 20`. `finalAnswerTime = 20`.
 * 3. Binary Search loop (`while (lowerTimeBound <= upperTimeBound)`):
 *    - Iteration 1: `lowerTimeBound=0`, `upperTimeBound=20`. `midpointTime = 10`. Call `checkPossibility(10)`.
 *      - `timeToEvaluate = 10`. `currentGrainLocator = 0`. `totalGrainsLength = 1`.
 *      - `for (henIterator = 0; henIterator < 1; ++henIterator)`:
 *        - `currentHenCoordinate = hensPositions[0] = 0`.
 *        - `currentGrainLocator` (0) is NOT at `totalGrainsLength` (1).
 *        - `grainsLocations[currentGrainLocator] (10)` is NOT `< currentHenCoordinate (0)`. So `maximalRightwardReach = 10`.
 *        - `effectiveFarthestPoint = currentHenCoordinate (0) + maximalRightwardReach (10) = 10`.
 *        - `effectiveFarthestPoint (10) >= grainsLocations[currentGrainLocator] (10)` is `true`.
 *        - `do { currentGrainLocator++; } while (currentGrainLocator < totalGrainsLength && grainsLocations[currentGrainLocator] <= effectiveFarthestPoint)`.
 *          - `currentGrainLocator` becomes 1. Loop condition `(1 < 1)` is `false`. Loop terminates.
 *        - `currentGrainLocator (1) === totalGrainsLength (1)` is `true`. `checkPossibility(10)` returns `true`.
 *      - `finalAnswerTime = 10`. `upperTimeBound = 10 - 1 = 9`.
 *    - Iteration 2: `lowerTimeBound=0`, `upperTimeBound=9`. `midpointTime = 4`. Call `checkPossibility(4)`.
 *      - `timeToEvaluate = 4`. `currentGrainLocator = 0`.
 *      - `for (henIterator = 0; henIterator < 1; ++henIterator)`:
 *        - `currentHenCoordinate = 0`.
 *        - `maximalRightwardReach = 4`. `effectiveFarthestPoint = 4`.
 *        - `effectiveFarthestPoint (4) >= grainsLocations[0] (10)` is `false`. Inner `do...while` is skipped.
 *      - Loop ends. `currentGrainLocator (0) !== totalGrainsLength (1)`. `checkPossibility(4)` returns `false`.
 *      - `lowerTimeBound = 4 + 1 = 5`.
 *    - Iteration 3: `lowerTimeBound=5`, `upperTimeBound=9`. `midpointTime = 7`. `checkPossibility(7)` returns `false`. `lowerTimeBound = 8`.
 *    - Iteration 4: `lowerTimeBound=8`, `upperTimeBound=9`. `midpointTime = 8`. `checkPossibility(8)` returns `false`. `lowerTimeBound = 9`.
 *    - Iteration 5: `lowerTimeBound=9`, `upperTimeBound=9`. `midpointTime = 9`. `checkPossibility(9)` returns `false`. `lowerTimeBound = 10`.
 *    - Iteration 6: `lowerTimeBound=10`, `upperTimeBound=9`. Loop condition `(10 <= 9)` is `false`. Loop terminates.
 * 4. Return `finalAnswerTime = 10`.
 * Time Complexity: O(N log N + M log M + (N + M) log(MAX_POSITION_SPAN))
 * Space Complexity: O(1)
 */
var minimumTime = function (hensPositions, grainLocations) {
  hensPositions.sort((firstHen, secondHen) => firstHen - secondHen);
  grainLocations.sort((firstGrain, secondGrain) => firstGrain - secondGrain);

  let lowerTimeBound = 0;
  const minCoord = Math.min(grainLocations[0], hensPositions[0]);
  const maxCoord = Math.max(
    grainLocations[grainLocations.length - 1],
    hensPositions[hensPositions.length - 1],
  );
  let upperTimeBound = 2 * (maxCoord - minCoord);
  let finalAnswerTime = upperTimeBound;

  while (lowerTimeBound <= upperTimeBound) {
    const midpointTime = Math.floor((lowerTimeBound + upperTimeBound) / 2);
    if (checkPossibility(midpointTime, hensPositions, grainLocations)) {
      finalAnswerTime = midpointTime;
      upperTimeBound = midpointTime - 1;
    } else {
      lowerTimeBound = midpointTime + 1;
    }
  }

  return finalAnswerTime;

  function checkPossibility(timeToEvaluate, henCoordinates, grainCoordinates) {
    let currentGrainLocator = 0;
    const totalGrainsLength = grainCoordinates.length;

    for (
      let henIterator = 0;
      henIterator < henCoordinates.length;
      ++henIterator
    ) {
      const currentHenCoordinate = henCoordinates[henIterator];
      let maximalRightwardReach = timeToEvaluate;

      if (currentGrainLocator === totalGrainsLength) {
        return true;
      }

      if (grainCoordinates[currentGrainLocator] < currentHenCoordinate) {
        const leftwardDistance =
          currentHenCoordinate - grainCoordinates[currentGrainLocator];
        if (leftwardDistance > timeToEvaluate) {
          return false;
        }

        maximalRightwardReach = Math.max(
          0,
          timeToEvaluate - 2 * leftwardDistance,
          Math.floor((timeToEvaluate - leftwardDistance) / 2),
        );
      }

      const effectiveFarthestPoint =
        currentHenCoordinate + maximalRightwardReach;
      if (effectiveFarthestPoint >= grainCoordinates[currentGrainLocator]) {
        do {
          currentGrainLocator++;
        } while (
          currentGrainLocator < totalGrainsLength &&
          grainCoordinates[currentGrainLocator] <= effectiveFarthestPoint
        );
        if (currentGrainLocator === totalGrainsLength) {
          return true;
        }
      }
    }

    return false;
  }
};

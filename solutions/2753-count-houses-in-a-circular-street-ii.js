/**
 * Count Houses In A Circular Street Ii
 * Intuition: Repeatedly find an open door, close it, and measure the distance to the next open door. Once all doors are closed, the measurement will exceed the maximum possible number of houses, indicating the last successful measurement was the true count.
 * Approach: 1. Define a helper function `computeDistanceToOpenDoor` that either returns 0 (if currently at an open door and allowed to consider it) or counts moves until the next open door is found (up to `k` moves). This helper also modifies the `Street` object by moving its pointer. 2. Implement the main logic using a recursive function `determineTotalHouses` to replace the `while(true)` loop. This function takes the `Street` object, the bound `k`, and the `latestKnownCount` of houses. 3. In `determineTotalHouses`, first call `computeDistanceToOpenDoor` to position the `Street` pointer at an open door (discarding its return value as its primary purpose is side-effect). 4. Next, call `computeDistanceToOpenDoor` again (forcing a move right first) to get `measuredHouseDistance` to the *next* open door. 5. If `measuredHouseDistance` exceeds `k`, it means all houses have been counted and closed, so return `latestKnownCount`. 6. Otherwise, update `latestKnownCount` with `measuredHouseDistance`, close the current door, and recursively call `determineTotalHouses`. 7. Initiate the process with an initial recursive call.
 * Dry Run: Given `n = 3`, houses `[O, O, C]`, `k = 5`. Starting at `H0`.
 * `houseCount(street, 5)` calls `determineTotalHouses(street_at_H0, 5, 0)`.
 * - **Call 1: `determineTotalHouses(street_at_H0, 5, 0)`**
 *   1. `computeDistanceToOpenDoor(street_at_H0, 5, true)`: `H0` is open. Returns `0`. `street` remains at `H0`.
 *   2. `measuredHouseDistance = computeDistanceToOpenDoor(street_at_H0, 5, false)`: `H0` is open but `includeCurrentHouse` is false.
 *      - `totalSteps = 1`. `street.moveRight()` (to `H1`).
 *      - `H1` is open. `while` loop condition `!isDoorOpen()` is false. Loop ends.
 *      - Returns `1`. `street` is at `H1`. `measuredHouseDistance` is `1`.
 *   3. `if (1 > 5)` is false.
 *   4. `newAccumulation = 1`. `street.closeDoor()` (closes `H1`. Street becomes `[O, C, C]`, `street` at `H1`).
 *   5. Returns `determineTotalHouses(street_at_H1, 5, 1)`.
 *
 * - **Call 2: `determineTotalHouses(street_at_H1, 5, 1)`**
 *   1. `computeDistanceToOpenDoor(street_at_H1, 5, true)`: `H1` is closed.
 *      - `totalSteps = 1`. `street.moveRight()` (to `H2`).
 *      - `H2` is closed. `totalSteps = 2`. `street.moveRight()` (to `H0`).
 *      - `H0` is open. `while` loop condition `!isDoorOpen()` is false. Loop ends.
 *      - Returns `2`. `street` is at `H0`.
 *   2. `measuredHouseDistance = computeDistanceToOpenDoor(street_at_H0, 5, false)`: `H0` is open but `includeCurrentHouse` is false.
 *      - `totalSteps = 1`. `street.moveRight()` (to `H1`).
 *      - `H1` is closed. `totalSteps = 2`. `street.moveRight()` (to `H2`).
 *      - `H2` is closed. `totalSteps = 3`. `street.moveRight()` (to `H0`).
 *      - `H0` is open. `while` loop condition `!isDoorOpen()` is false. Loop ends.
 *      - Returns `3`. `street` is at `H0`. `measuredHouseDistance` is `3`.
 *   3. `if (3 > 5)` is false.
 *   4. `newAccumulation = 3`. `street.closeDoor()` (closes `H0`. Street becomes `[C, C, C]`, `street` at `H0`).
 *   5. Returns `determineTotalHouses(street_at_H0, 5, 3)`.
 *
 * - **Call 3: `determineTotalHouses(street_at_H0, 5, 3)`**
 *   1. `computeDistanceToOpenDoor(street_at_H0, 5, true)`: `H0` is closed.
 *      - `totalSteps` increments through `H1, H2, H0, H1, H2, H0` until `totalSteps` reaches `6` (`> k`). Loop ends.
 *      - Returns `6`. `street` is at `H0`.
 *   2. `measuredHouseDistance = computeDistanceToOpenDoor(street_at_H0, 5, false)`: `H0` is closed.
 *      - `totalSteps` increments similarly, going through all houses until `totalSteps` reaches `6` (`> k`). Loop ends.
 *      - Returns `6`. `street` is at `H0`. `measuredHouseDistance` is `6`.
 *   3. `if (6 > 5)` is true.
 *   4. Returns `accumulatedCount` (`3`).
 * Final result: `3`.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
 */
var houseCount = function (street, k) {
  const computeDistanceToOpenDoor = (
    currentStreetInstance,
    maximumBound,
    includeCurrentHouse
  ) => {
    if (currentStreetInstance.isDoorOpen() && includeCurrentHouse) {
      return 0;
    }

    let totalSteps = 1;
    currentStreetInstance.moveRight();

    while (!currentStreetInstance.isDoorOpen() && totalSteps <= maximumBound) {
      currentStreetInstance.moveRight();
      totalSteps++;
    }
    return totalSteps;
  };

  const determineTotalHouses = (
    currentStreetState,
    boundValue,
    accumulatedCount
  ) => {
    computeDistanceToOpenDoor(currentStreetState, boundValue, true);

    let measuredHouseDistance = computeDistanceToOpenDoor(
      currentStreetState,
      boundValue,
      false
    );

    if (measuredHouseDistance > boundValue) {
      return accumulatedCount;
    }

    let newAccumulation = measuredHouseDistance;
    currentStreetState.closeDoor();

    return determineTotalHouses(
      currentStreetState,
      boundValue,
      newAccumulation
    );
  };

  return determineTotalHouses(street, k, 0);
};

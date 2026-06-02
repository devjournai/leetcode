/**
 * Minimum Time To Complete Trips
 * Intuition: The problem asks for the minimum time 'T' such that all buses collectively complete at least 'totalTrips'. The total number of trips achievable within a given time 'T' is a monotonically increasing function of 'T'. This property makes binary search on the answer (time 'T') an ideal approach. We can define a `check(T)` function that returns true if `totalTrips` can be met within time `T`, and false otherwise. We then binary search for the smallest `T` where `check(T)` is true.
 * Approach:
 * 1. Determine the search space for the minimum time. The lower bound (`lowerBoundSearch`) is 1 (minimum possible time). The upper bound (`upperBoundSearch`) is `Math.min(...time) * totalTrips`, representing the maximum time if the fastest bus had to complete all trips.
 * 2. Initialize `finalMinimumTime` with the `upperBoundSearch` as a potential answer.
 * 3. Perform a binary search within the `[lowerBoundSearch, upperBoundSearch]` range:
 *    a. Calculate the `candidateDuration` (midpoint) of the current search range.
 *    b. For this `candidateDuration`, calculate the `currentTripsCount` that all buses can collectively make. This is done by summing `Math.floor(candidateDuration / busTime)` for each bus in the `time` array.
 *    c. If `currentTripsCount` is greater than or equal to `targetTotalTrips`, it means `candidateDuration` is a possible answer. We store this `candidateDuration` in `finalMinimumTime` and try to find an even smaller time by searching in the left half of the range (`upperBoundSearch = candidateDuration - 1`).
 *    d. If `currentTripsCount` is less than `targetTotalTrips`, `candidateDuration` is too small. We need more time, so we search in the right half of the range (`lowerBoundSearch = candidateDuration + 1`).
 * 4. The loop continues until `lowerBoundSearch` exceeds `upperBoundSearch`. The `finalMinimumTime` will hold the smallest time that satisfies the condition.
 * Dry Run:
 * Input: `time = [1, 2, 3]`, `totalTrips = 5`
 * 1. `minBusTripDuration` (found by iterating `time` or using `Math.min`) ` = 1`
 * 2. `lowerBoundSearch = 1`
 * 3. `upperBoundSearch = 1 * 5 = 5`
 * 4. `finalMinimumTime = 5`
 *
 * Loop 1: `lowerBoundSearch = 1`, `upperBoundSearch = 5`
 * - `candidateDuration = floor((1 + 5) / 2) = 3`
 * - Calculate `accumulatedTrips`: `floor(3/1) + floor(3/2) + floor(3/3) = 3 + 1 + 1 = 5`
 * - `currentTripsCount = 5`
 * - `5 >= 5` is true.
 *   - `finalMinimumTime = 3`
 *   - `upperBoundSearch = 3 - 1 = 2`
 *
 * Loop 2: `lowerBoundSearch = 1`, `upperBoundSearch = 2`
 * - `candidateDuration = floor((1 + 2) / 2) = 1`
 * - Calculate `accumulatedTrips`: `floor(1/1) + floor(1/2) + floor(1/3) = 1 + 0 + 0 = 1`
 * - `currentTripsCount = 1`
 * - `1 >= 5` is false.
 *   - `lowerBoundSearch = 1 + 1 = 2`
 *
 * Loop 3: `lowerBoundSearch = 2`, `upperBoundSearch = 2`
 * - `candidateDuration = floor((2 + 2) / 2) = 2`
 * - Calculate `accumulatedTrips`: `floor(2/1) + floor(2/2) + floor(2/3) = 2 + 1 + 0 = 3`
 * - `currentTripsCount = 3`
 * - `3 >= 5` is false.
 *   - `lowerBoundSearch = 2 + 1 = 3`
 *
 * Loop 4: `lowerBoundSearch = 3`, `upperBoundSearch = 2`
 * - Condition `lowerBoundSearch <= upperBoundSearch` (`3 <= 2`) is false. Loop terminates.
 *
 * Return `finalMinimumTime = 3`.
 * Time Complexity: O(N * log(M * K))
 * Space Complexity: O(1)
 */
var minimumTime = function (timeCollection, targetTotalTrips) {
  let minBusTripDuration = Number.MAX_SAFE_INTEGER;
  for (const busTripTiming of timeCollection) {
    if (busTripTiming < minBusTripDuration) {
      minBusTripDuration = busTripTiming;
    }
  }

  let lowerBoundSearch = 1;
  let upperBoundSearch = minBusTripDuration * targetTotalTrips;
  let finalMinimumTime = upperBoundSearch;

  while (lowerBoundSearch <= upperBoundSearch) {
    const candidateDuration = Math.floor(
      (lowerBoundSearch + upperBoundSearch) / 2,
    );
    let accumulatedTrips = 0;

    for (const individualBusTime of timeCollection) {
      accumulatedTrips += Math.floor(candidateDuration / individualBusTime);
    }

    const currentTripsCount = accumulatedTrips;

    if (currentTripsCount >= targetTotalTrips) {
      finalMinimumTime = candidateDuration;
      upperBoundSearch = candidateDuration - 1;
    } else {
      lowerBoundSearch = candidateDuration + 1;
    }
  }

  return finalMinimumTime;
};

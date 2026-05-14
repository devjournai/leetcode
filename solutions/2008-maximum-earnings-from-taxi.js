/**
 * Maximum Earnings From Taxi
 * Intuition: This problem exhibits optimal substructure and overlapping subproblems, making dynamic programming suitable. We aim to find the maximum earnings achievable up to each point on the road. For any given point `i`, the maximum earnings can be derived either by not taking any ride that finishes precisely at `i` (thus inheriting the maximum earnings from `i-1`), or by taking a ride that finishes at `i`. If a ride from `start` to `i` with `tip` is taken, the total earnings would be the maximum earnings accumulated up to `start` plus the profit from this specific ride (`i - start + tip`).
 * Approach: 1. Group all rides by their end points using an array of lists (or a map) where the index (or key) is the end point and the value is a list of `[start, tip]` pairs for rides ending at that point. This allows efficient retrieval of rides ending at a specific point. 2. Initialize a dynamic programming array, `earningsTracker`, of size `n + 1` with all zeros. `earningsTracker[i]` will store the maximum earnings attainable up to point `i`. 3. Iterate from `currentPointIdx = 1` to `n`. For each `currentPointIdx`, first set `earningsTracker[currentPointIdx]` to `earningsTracker[currentPointIdx - 1]`, representing the option of not taking any ride ending at `currentPointIdx`. 4. If there are rides stored that end at `currentPointIdx`, iterate through these rides. For each such ride `[rideStartingPoint, ridePayment]`, calculate the `calculatedProfit` as `currentPointIdx - rideStartingPoint + ridePayment`. 5. Update `earningsTracker[currentPointIdx]` by taking the maximum between its current value and the sum of `earningsTracker[rideStartingPoint]` (maximum earnings before this ride started) and `calculatedProfit`. 6. After iterating through all points, `earningsTracker[n]` will contain the maximum total earnings.
 * Dry Run: n = 7, rides = [[1,6,1],[2,5,3],[4,7,2]]
 * 1. Initialize `rideData` (array of arrays): `Array(8).fill(null).map(() => [])`
 *    Process rides:
 *    [1,6,1] -> `rideData[6].push([1,1])`
 *    [2,5,3] -> `rideData[5].push([2,3])`
 *    [4,7,2] -> `rideData[7].push([4,2])`
 *    `rideData` populated. E.g., `rideData[5] = [[2,3]]`, `rideData[6] = [[1,1]]`, `rideData[7] = [[4,2]]`. Other indices are empty arrays.
 * 2. Initialize `earningsTracker = [0,0,0,0,0,0,0,0]` (size n+1 = 8)
 * 3. Iterate `currentPointIdx` from 1 to 7:
 *    `currentPointIdx = 1`: `earningsTracker[1] = earningsTracker[0]` (0). No rides end at 1. `earningsTracker` remains `[0,0,0,0,0,0,0,0]`
 *    `currentPointIdx = 2`: `earningsTracker[2] = earningsTracker[1]` (0). No rides end at 2. `earningsTracker` remains `[0,0,0,0,0,0,0,0]`
 *    `currentPointIdx = 3`: `earningsTracker[3] = earningsTracker[2]` (0). No rides end at 3. `earningsTracker` remains `[0,0,0,0,0,0,0,0]`
 *    `currentPointIdx = 4`: `earningsTracker[4] = earningsTracker[3]` (0). No rides end at 4. `earningsTracker` remains `[0,0,0,0,0,0,0,0]`
 *    `currentPointIdx = 5`: `earningsTracker[5] = earningsTracker[4]` (0).
 *      Rides ending at 5 (`ridesAtCurrentEnd` from `rideData[5]`): `[[2,3]]` (ride from 2 to 5, tip 3)
 *      `rideEntry = [2,3]`: `rideStartingPoint = 2`, `ridePayment = 3`
 *      `calculatedProfit = 5 - 2 + 3 = 6`
 *      `updatedMaxEarnings = Math.max(earningsTracker[5] (0), earningsTracker[2] (0) + 6)` = 6.
 *      `earningsTracker[5]` becomes 6. `earningsTracker = [0,0,0,0,0,6,0,0]`
 *    `currentPointIdx = 6`: `earningsTracker[6] = earningsTracker[5]` (6).
 *      Rides ending at 6 (`ridesAtCurrentEnd` from `rideData[6]`): `[[1,1]]` (ride from 1 to 6, tip 1)
 *      `rideEntry = [1,1]`: `rideStartingPoint = 1`, `ridePayment = 1`
 *      `calculatedProfit = 6 - 1 + 1 = 6`
 *      `updatedMaxEarnings = Math.max(earningsTracker[6] (6), earningsTracker[1] (0) + 6)` = 6.
 *      `earningsTracker[6]` remains 6. `earningsTracker = [0,0,0,0,0,6,6,0]`
 *    `currentPointIdx = 7`: `earningsTracker[7] = earningsTracker[6]` (6).
 *      Rides ending at 7 (`ridesAtCurrentEnd` from `rideData[7]`): `[[4,2]]` (ride from 4 to 7, tip 2)
 *      `rideEntry = [4,2]`: `rideStartingPoint = 4`, `ridePayment = 2`
 *      `calculatedProfit = 7 - 4 + 2 = 5`
 *      `updatedMaxEarnings = Math.max(earningsTracker[7] (6), earningsTracker[4] (0) + 5)` = 6.
 *      `earningsTracker[7]` remains 6. `earningsTracker = [0,0,0,0,0,6,6,6]`
 * 4. Return `earningsTracker[7]` which is 6.
 *
 * Time Complexity: O(N + R)
 * Space Complexity: O(N + R)
 */
var maxTaxiEarnings = function (n, rides) {
  const rideData = Array(n + 1)
    .fill(null)
    .map(() => []);

  for (let iterOne = 0; iterOne < rides.length; iterOne++) {
    const singleRide = rides[iterOne];
    const [startCoordinate, endCoordinate, tipValue] = singleRide;
    rideData[endCoordinate].push([startCoordinate, tipValue]);
  }

  const earningsTracker = new Array(n + 1).fill(0);

  for (let currentPointIdx = 1; currentPointIdx <= n; currentPointIdx++) {
    earningsTracker[currentPointIdx] = earningsTracker[currentPointIdx - 1];

    const ridesAtCurrentEnd = rideData[currentPointIdx];
    if (ridesAtCurrentEnd.length > 0) {
      for (let iterTwo = 0; iterTwo < ridesAtCurrentEnd.length; iterTwo++) {
        const rideEntry = ridesAtCurrentEnd[iterTwo];
        const [rideStartingPoint, ridePayment] = rideEntry;
        const calculatedProfit =
          currentPointIdx - rideStartingPoint + ridePayment;

        const priorEarnings =
          rideStartingPoint > 0 ? earningsTracker[rideStartingPoint] : 0;
        const updatedMaxEarnings = priorEarnings + calculatedProfit;

        earningsTracker[currentPointIdx] = Math.max(
          earningsTracker[currentPointIdx],
          updatedMaxEarnings,
        );
      }
    }
  }

  return earningsTracker[n];
};

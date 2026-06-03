/**
 * Earliest Finish Time for Land and Water Rides II
 * Intuition: The problem requires finding the minimum total finish time for a pair of rides (one land, one water), considering two possible orders (land then water, or water then land). A brute-force O(N*M) approach is too slow given the constraints. The key observation is that for a fixed first ride, the choice of the second ride depends on whether it opens before or after the first ride finishes. This suggests sorting the second category of rides and using precomputed prefix/suffix minimums to efficiently query the best second ride option.
 * Approach:
 * 1. Define a helper function, `calculateMinFinishForOrder(firstCategory, secondCategory)`, which computes the minimum finish time if a ride from `firstCategory` is taken first, then a ride from `secondCategory`.
 * 2. Inside `calculateMinFinishForOrder`:
 *    a. Create `secondParsed` array by mapping `secondCategory` rides to objects with `start`, `duration`, and `finish` (start + duration) properties.
 *    b. Sort `secondParsed` by `start` time. This allows efficient partitioning using binary search.
 *    c. Compute two auxiliary arrays for `secondParsed`:
 *       - `prefixMinDuration[i]`: the minimum `duration` among `secondParsed[0]` through `secondParsed[i]`. This helps when the second ride is started after the first ride finishes, but *before* its own opening time.
 *       - `suffixMinFinish[i]`: the minimum `finish` time among `secondParsed[i]` through `secondParsed[n2-1]`. This helps when the second ride is started at or after its own opening time (which is also after the first ride finishes).
 *    d. Initialize `minTotalFinish = Infinity`.
 *    e. Iterate through each `firstRide` in `firstCategory`:
 *       i. Calculate `firstFinishTime = firstRide.start + firstRide.duration`. This is the earliest time the tourist is available for the second ride.
 *       ii. Use binary search (specifically, `lower_bound` behavior) on `secondParsed` to find `k`, the index of the first `secondRide` whose `start` time is greater than or equal to `firstFinishTime`. This `k` partitions `secondParsed` into two groups.
 *       iii. Initialize `currentCandidateFinish = Infinity`.
 *       iv. Consider two scenarios for selecting a `secondRide`:
 *           - If `k > 0` (meaning there are `secondRides` (indices `0` to `k-1`) that start *before* `firstFinishTime`): The tourist finishes the first ride at `firstFinishTime`, then waits to start the second ride immediately at `firstFinishTime`. The finish time will be `firstFinishTime + minDuration` from `prefixMinDuration[k-1]`. Update `currentCandidateFinish`.
 *           - If `k < n2` (meaning there are `secondRides` (indices `k` to `n2-1`) that start *at or after* `firstFinishTime`): The tourist finishes the first ride, then waits until `secondRide.start` to begin the second ride. Since `secondRide.start >= firstFinishTime`, the effective start time is `secondRide.start`. The finish time will be `secondRide.start + secondRide.duration`, which is `secondRide.finish`. We need the minimum of these, available from `suffixMinFinish[k]`. Update `currentCandidateFinish`.
 *       v. Update `minTotalFinish = Math.min(minTotalFinish, currentCandidateFinish)`.
 *    f. Return `minTotalFinish`.
 * 3. In the main `earliestFinishTime` function:
 *    a. Create `landRides` and `waterRides` arrays in `{start, duration}` format from the input arrays.
 *    b. Call `calculateMinFinishForOrder(landRides, waterRides)` to get the minimum finish time for the (Land -> Water) order.
 *    c. Call `calculateMinFinishForOrder(waterRides, landRides)` to get the minimum finish time for the (Water -> Land) order.
 *    d. The final answer is the minimum of these two results.
 * Dry Run: Example 1: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
 * landRides = [{s:2,d:4}, {s:8,d:1}], waterRides = [{s:6,d:3}]
 *
 * calculateMinFinishForOrder(landRides, waterRides):
 *   secondParsed (water): [{start:6, duration:3, finish:9}]. Sorted. n2=1.
 *   prefixMinDuration = [3]
 *   suffixMinFinish = [9]
 *   minTotalFinish = Infinity
 *   - landRide {s:2,d:4}: firstFinishTime = 6.
 *     Binary search for k (start >= 6) -> k = 0.
 *     k > 0 is false.
 *     k < n2 is true (0 < 1): currentCandidateFinish = Math.min(Inf, suffixMinFinish[0]=9) = 9.
 *     minTotalFinish = Math.min(Inf, 9) = 9.
 *   - landRide {s:8,d:1}: firstFinishTime = 9.
 *     Binary search for k (start >= 9) -> k = 1 (after element at index 0).
 *     k > 0 is true (1 > 0): currentCandidateFinish = Math.min(Inf, firstFinishTime + prefixMinDuration[0]) = Math.min(Inf, 9+3=12) = 12.
 *     k < n2 is false.
 *     minTotalFinish = Math.min(9, 12) = 9.
 *   Returns 9.
 *
 * calculateMinFinishForOrder(waterRides, landRides):
 *   secondParsed (land): [{start:2, duration:4, finish:6}, {start:8, duration:1, finish:9}]. Sorted. n2=2.
 *   prefixMinDuration = [4, 1] (prefixMinDuration[0]=4, prefixMinDuration[1]=min(4,1)=1)
 *   suffixMinFinish = [6, 9] (suffixMinFinish[1]=9, suffixMinFinish[0]=min(9,6)=6)
 *   minTotalFinish = Infinity
 *   - waterRide {s:6,d:3}: firstFinishTime = 9.
 *     Binary search for k (start >= 9) -> k = 2.
 *     k > 0 is true (2 > 0): currentCandidateFinish = Math.min(Inf, firstFinishTime + prefixMinDuration[1]) = Math.min(Inf, 9+1=10) = 10.
 *     k < n2 is false.
 *     minTotalFinish = Math.min(Inf, 10) = 10.
 *   Returns 10.
 *
 * Final result: Math.min(9, 10) = 9. This matches the example output.
 * Time Complexity: O((N+M) log(max(N,M)))
 * Space Complexity: O(N+M)
 */
var earliestFinishTime = function (
  landStartTime,
  landDuration,
  waterStartTime,
  waterDuration,
) {
  const calculateMinFinishForOrder = (firstCategory, secondCategory) => {
    if (firstCategory.length === 0 || secondCategory.length === 0) {
      return Infinity;
    }

    const secondParsed = secondCategory.map((ride) => ({
      start: ride.start,
      duration: ride.duration,
      finish: ride.start + ride.duration,
    }));
    secondParsed.sort((a, b) => a.start - b.start);

    const n2 = secondParsed.length;

    const prefixMinDuration = new Array(n2);
    if (n2 > 0) {
      prefixMinDuration[0] = secondParsed[0].duration;
      for (let i = 1; i < n2; i++) {
        prefixMinDuration[i] = Math.min(
          prefixMinDuration[i - 1],
          secondParsed[i].duration,
        );
      }
    }

    const suffixMinFinish = new Array(n2);
    if (n2 > 0) {
      suffixMinFinish[n2 - 1] = secondParsed[n2 - 1].finish;
      for (let i = n2 - 2; i >= 0; i--) {
        suffixMinFinish[i] = Math.min(
          suffixMinFinish[i + 1],
          secondParsed[i].finish,
        );
      }
    }

    let minTotalFinish = Infinity;

    for (const firstRide of firstCategory) {
      const firstFinishTime = firstRide.start + firstRide.duration;

      let low = 0;
      let high = n2;
      let k = n2;

      while (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        if (secondParsed[mid].start >= firstFinishTime) {
          k = mid;
          high = mid;
        } else {
          low = mid + 1;
        }
      }

      let currentCandidateFinish = Infinity;

      if (k > 0) {
        currentCandidateFinish = Math.min(
          currentCandidateFinish,
          firstFinishTime + prefixMinDuration[k - 1],
        );
      }

      if (k < n2) {
        currentCandidateFinish = Math.min(
          currentCandidateFinish,
          suffixMinFinish[k],
        );
      }

      minTotalFinish = Math.min(minTotalFinish, currentCandidateFinish);
    }

    return minTotalFinish;
  };

  const landRides = landStartTime.map((start, i) => ({
    start: start,
    duration: landDuration[i],
  }));
  const waterRides = waterStartTime.map((start, i) => ({
    start: start,
    duration: waterDuration[i],
  }));

  const minFinishLandThenWater = calculateMinFinishForOrder(
    landRides,
    waterRides,
  );
  const minFinishWaterThenLand = calculateMinFinishForOrder(
    waterRides,
    landRides,
  );

  return Math.min(minFinishLandThenWater, minFinishWaterThenLand);
};

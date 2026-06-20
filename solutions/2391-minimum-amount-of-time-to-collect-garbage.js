/**
 * Minimum Amount Of Time To Collect Garbage
 * Intuition: The total time is the sum of all garbage collection times and all travel times for each truck. Since trucks are independent for their respective garbage types and only stop at the last house containing their specific garbage, we can calculate these components separately for each type and sum them up. Travel time to a house can be efficiently found using prefix sums on the `travel` array.
 * Approach: 1. Initialize total time and track the last seen house index for 'M', 'P', and 'G' garbage types (default to 0). 2. Iterate through each house in the `garbage` array. For each house, add the length of its `garbage` string to the total time (this accounts for collection time). Then, iterate through each character in the `garbage` string to update the last seen house index for the respective garbage type. 3. Compute a prefix sum array for `travel` times. `prefixSumTravel[k]` will store the total travel time from house 0 to house `k`. 4. Add the travel time for each garbage truck (M, P, G) to the total time. The travel time for a truck is `prefixSumTravel[lastHouseIndex]` for its specific garbage type.
 * Dry Run:
 * garbage = ["G", "P", "GP", "MG"], travel = [1, 2, 3]
 *
 * Initialize:
 * totalMinutesOverall = 0
 * lastHouseIndexM = 0
 * lastHouseIndexP = 0
 * lastHouseIndexG = 0
 *
 * Step 1: Process `garbage` and find last occurrences
 * currentHouse = 0, garbage[0] = "G"
 *   totalMinutesOverall += 1 (totalMinutesOverall = 1)
 *   garbageUnit = 'G': lastHouseIndexG = 0
 *
 * currentHouse = 1, garbage[1] = "P"
 *   totalMinutesOverall += 1 (totalMinutesOverall = 2)
 *   garbageUnit = 'P': lastHouseIndexP = 1
 *
 * currentHouse = 2, garbage[2] = "GP"
 *   totalMinutesOverall += 2 (totalMinutesOverall = 4)
 *   garbageUnit = 'G': lastHouseIndexG = 2
 *   garbageUnit = 'P': lastHouseIndexP = 2
 *
 * currentHouse = 3, garbage[3] = "MG"
 *   totalMinutesOverall += 2 (totalMinutesOverall = 6)
 *   garbageUnit = 'M': lastHouseIndexM = 3
 *   garbageUnit = 'G': lastHouseIndexG = 3
 *
 * After Step 1:
 * totalMinutesOverall = 6
 * lastHouseIndexM = 3
 * lastHouseIndexP = 2
 * lastHouseIndexG = 3
 *
 * Step 2: Compute `accumulatedTravelMinutes` (prefix sums for travel)
 * travel = [1, 2, 3]
 * accumulatedTravelMinutes = [0]
 *
 * travelSegmentIndex = 0, travel[0] = 1
 *   accumulatedTravelMinutes.push(accumulatedTravelMinutes[0] + 1) -> [0, 1]
 *
 * travelSegmentIndex = 1, travel[1] = 2
 *   accumulatedTravelMinutes.push(accumulatedTravelMinutes[1] + 2) -> [0, 1, 3]
 *
 * travelSegmentIndex = 2, travel[2] = 3
 *   accumulatedTravelMinutes.push(accumulatedTravelMinutes[2] + 3) -> [0, 1, 3, 6]
 *
 * After Step 2:
 * accumulatedTravelMinutes = [0, 1, 3, 6]
 *
 * Step 3: Add travel times for each truck
 * totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexM] (accumulatedTravelMinutes[3] = 6)
 *   totalMinutesOverall = 6 + 6 = 12
 *
 * totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexP] (accumulatedTravelMinutes[2] = 3)
 *   totalMinutesOverall = 12 + 3 = 15
 *
 * totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexG] (accumulatedTravelMinutes[3] = 6)
 *   totalMinutesOverall = 15 + 6 = 21
 *
 * Result: 21
 * Time Complexity: O(N + H)
 * Space Complexity: O(H)
 */
var garbageCollection = function (garbage, travel) {
  let totalMinutesOverall = 0;
  let lastHouseIndexM = 0;
  let lastHouseIndexP = 0;
  let lastHouseIndexG = 0;

  const numberOfHouses = garbage.length;

  for (let currentHouse = 0; currentHouse < numberOfHouses; currentHouse++) {
    const currentGarbageString = garbage[currentHouse];
    totalMinutesOverall += currentGarbageString.length;

    for (
      let garbageUnitIndex = 0;
      garbageUnitIndex < currentGarbageString.length;
      garbageUnitIndex++
    ) {
      const garbageUnitType = currentGarbageString[garbageUnitIndex];
      if (garbageUnitType === "M") {
        lastHouseIndexM = currentHouse;
      } else if (garbageUnitType === "P") {
        lastHouseIndexP = currentHouse;
      } else if (garbageUnitType === "G") {
        lastHouseIndexG = currentHouse;
      }
    }
  }

  const accumulatedTravelMinutes = [0];
  const numberOfTravelSegments = travel.length;

  for (
    let travelSegmentIndex = 0;
    travelSegmentIndex < numberOfTravelSegments;
    travelSegmentIndex++
  ) {
    const travelDuration = travel[travelSegmentIndex];
    const previousAccumulatedTime =
      accumulatedTravelMinutes[accumulatedTravelMinutes.length - 1];
    accumulatedTravelMinutes.push(previousAccumulatedTime + travelDuration);
  }

  totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexM];
  totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexP];
  totalMinutesOverall += accumulatedTravelMinutes[lastHouseIndexG];

  return totalMinutesOverall;
};

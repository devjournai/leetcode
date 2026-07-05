/**
 * Minimum Time To Repair Cars
 * Intuition: The problem asks for the minimum time to repair a fixed number of cars given different mechanic ranks. The time taken by a mechanic to repair cars grows quadratically with the number of cars. This monotonic property (more time allows more cars to be repaired) suggests that binary search can be used on the "time" axis to find the smallest time that satisfies the condition of repairing all cars.
 * Approach:
 * 1. Define a search space for the minimum time. The lower bound is 1 (minimum possible time). The upper bound is the maximum time a single mechanic (with the lowest rank) would take to repair all cars: `minRank * cars * cars`.
 * 2. Implement a binary search within this time range. In each iteration, calculate a `potentialRepairTime`.
 * 3. Use a helper function, `canAllCarsBeRepaired`, to check if all `requiredCarQuantity` cars can be repaired within the `potentialRepairTime`. This function iterates through all mechanics and sums the number of cars each can repair using the formula `n = sqrt(time / rank)`. If the total repaired cars meet or exceed `requiredCarQuantity`, the function returns true.
 * 4. If `canAllCarsBeRepaired` returns true, it means `potentialRepairTime` is a possible answer, or even better, a smaller time might exist. So, update the upper bound of the search space to `potentialRepairTime`.
 * 5. If `canAllCarsBeRepaired` returns false, it means `potentialRepairTime` is not enough, so we need more time. Update the lower bound of the search space to `potentialRepairTime + 1`.
 * 6. The binary search continues until the lower bound equals the upper bound, which will be the minimum time required.
 * Dry Run: ranks = [1, 2, 3], cars = 10
 * Initial: minimumTimePossible = 1. minRankVal = 1. maximumTimeEstimate = 1 * 10 * 10 = 100. currentMinTime = 1, currentMaxTime = 100.
 * Iteration 1: potentialRepairTime = floor((1+100)/2) = 50.
 *   canAllCarsBeRepaired(50, [1,2,3], 10):
 *     mechanic 1: floor(sqrt(50/1)) = 7 cars.
 *     mechanic 2: floor(sqrt(50/2)) = 5 cars.
 *     actualCarsRepaired = 7 + 5 = 12. 12 >= 10, return true.
 *   currentMaxTime = 50. (currentMinTime = 1, currentMaxTime = 50)
 * Iteration 2: potentialRepairTime = floor((1+50)/2) = 25.
 *   canAllCarsBeRepaired(25, [1,2,3], 10):
 *     mechanic 1: floor(sqrt(25/1)) = 5 cars.
 *     mechanic 2: floor(sqrt(25/2)) = 3 cars.
 *     mechanic 3: floor(sqrt(25/3)) = 2 cars.
 *     actualCarsRepaired = 5 + 3 + 2 = 10. 10 >= 10, return true.
 *   currentMaxTime = 25. (currentMinTime = 1, currentMaxTime = 25)
 * Iteration 3: potentialRepairTime = floor((1+25)/2) = 13.
 *   canAllCarsBeRepaired(13, [1,2,3], 10):
 *     mechanic 1: floor(sqrt(13/1)) = 3 cars.
 *     mechanic 2: floor(sqrt(13/2)) = 2 cars.
 *     mechanic 3: floor(sqrt(13/3)) = 2 cars.
 *     actualCarsRepaired = 3 + 2 + 2 = 7. 7 < 10, return false.
 *   currentMinTime = 13 + 1 = 14. (currentMinTime = 14, currentMaxTime = 25)
 * ... (iterations continue until currentMinTime = 25, currentMaxTime = 25)
 * The loop terminates when currentMinTime = 25.
 * Return: 25.
 * Time Complexity: O(N * log(M))
 * Space Complexity: O(1)
 */
var repairCars = function (mechanicRanksInput, requiredCarQuantity) {
  let minimumTimePossible = 1;
  let minRankVal = Math.min(...mechanicRanksInput);
  let maximumTimeEstimate =
    minRankVal * requiredCarQuantity * requiredCarQuantity;

  let currentMinTime = minimumTimePossible;
  let currentMaxTime = maximumTimeEstimate;

  while (currentMinTime < currentMaxTime) {
    const potentialRepairTime = Math.floor(
      (currentMinTime + currentMaxTime) / 2,
    );

    if (
      canAllCarsBeRepaired(
        potentialRepairTime,
        mechanicRanksInput,
        requiredCarQuantity,
      )
    ) {
      currentMaxTime = potentialRepairTime;
    } else {
      currentMinTime = potentialRepairTime + 1;
    }
  }

  return currentMinTime;

  function canAllCarsBeRepaired(durationLimit, mechanics, totalNeeded) {
    let actualCarsRepaired = 0;
    for (let idx = 0; idx < mechanics.length; ++idx) {
      const rankValue = mechanics[idx];
      const carsByThisMechanic = Math.floor(
        Math.sqrt(durationLimit / rankValue),
      );
      actualCarsRepaired += carsByThisMechanic;
      if (actualCarsRepaired >= totalNeeded) {
        return true;
      }
    }
    return false;
  }
};

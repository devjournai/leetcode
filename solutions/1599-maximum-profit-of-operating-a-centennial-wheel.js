/**
 * Maximum Profit Of Operating A Centennial Wheel
 * Intuition: Simulate rotations: board min(4, waiting), profit = boarded*boardingCost - rotations*runningCost; track the first max positive profit rotation.
 * Approach: 1. While customers remain in input or queue. 2. Add the next batch, board ≤4. 3. Update profit and best rotation. 4. Return best if profit>0 else -1.
 * Dry Run: customers = [8,3], boardingCost = 5, runningCost = 6.
 *   - Max profit after 3 rotations → 3.
 * Time Complexity: O(N + S/C)
 * Space Complexity: O(1)
 */
var minOperationsMaxProfit = function (
  inputCustomers,
  singleBoardCost,
  singleRunCost
) {
  let pendingCustomers = 0;
  let totalPassengersServed = 0;
  let highestProfitAchieved = -Infinity;
  let rotationCountForMaxProfit = -1;
  let currentIterativeProfit = 0;
  let currentWheelRotations = 0;

  const gondolaMaxCapacity = 4;

  let customerBatchIndex = 0;

  while (customerBatchIndex < inputCustomers.length || pendingCustomers > 0) {
    currentWheelRotations++;

    if (customerBatchIndex < inputCustomers.length) {
      pendingCustomers += inputCustomers[customerBatchIndex];
    }

    const passengersBoardingThisTurn = Math.min(
      pendingCustomers,
      gondolaMaxCapacity
    );

    pendingCustomers -= passengersBoardingThisTurn;
    totalPassengersServed += passengersBoardingThisTurn;

    currentIterativeProfit =
      totalPassengersServed * singleBoardCost -
      currentWheelRotations * singleRunCost;

    if (currentIterativeProfit > highestProfitAchieved) {
      highestProfitAchieved = currentIterativeProfit;
      rotationCountForMaxProfit = currentWheelRotations;
    }

    customerBatchIndex++;
  }

  return highestProfitAchieved > 0 ? rotationCountForMaxProfit : -1;
};

/**
 * Maximum Profit Of Operating A Centennial Wheel
 * Time Complexity: O(N + S/C)
 * Space Complexity: O(1)
 */
var minOperationsMaxProfit = function (
  inputCustomers,
  singleBoardCost,
  singleRunCost,
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
      gondolaMaxCapacity,
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

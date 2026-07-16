/**
 * Total Distance Traveled
 * Intuition: The total distance traveled is determined by the total fuel consumed. This includes the initial fuel in the main tank plus any fuel successfully transferred from the additional tank. The key is to correctly identify how many liters are transferred.
 * Approach: 1. Initialize variables to hold the current state of the main and additional tanks for simulation, along with a counter for transferred fuel. 2. Iterate a `for` loop, with its upper bound being the initial quantity in the additional tank, representing the maximum possible transfers. 3. Inside the loop, check if the simulated main tank has at least 5 liters. If so, simulate a 5-liter consumption, a 1-liter transfer from the additional tank to the main tank, and increment the transferred fuel counter. 4. If the simulated main tank falls below 5 liters, break the loop as no further transfers can be triggered. 5. After the loop, calculate the total distance by adding the initial main tank fuel and the total successfully transferred fuel, then multiplying by 10 km/liter.
 * Dry Run: mainTank = 10, additionalTank = 2
 *   primaryTankFuel = 10
 *   auxiliaryTankFuel = 2
 *   simulatedPrimaryFuel = 10
 *   simulatedAuxiliaryFuel = 2
 *   fuelReceivedFromAuxiliary = 0
 *
 *   Loop (transferOperationIndex from 0 to < 2):
 *     transferOperationIndex = 0: (0 < 2 is true)
 *       simulatedPrimaryFuel (10) >= 5 is true.
 *       simulatedPrimaryFuel = 10 - 5 = 5
 *       simulatedPrimaryFuel = 5 + 1 = 6
 *       simulatedAuxiliaryFuel = 2 - 1 = 1
 *       fuelReceivedFromAuxiliary = 0 + 1 = 1
 *     transferOperationIndex = 1: (1 < 2 is true)
 *       simulatedPrimaryFuel (6) >= 5 is true.
 *       simulatedPrimaryFuel = 6 - 5 = 1
 *       simulatedPrimaryFuel = 1 + 1 = 2
 *       simulatedAuxiliaryFuel = 1 - 1 = 0
 *       fuelReceivedFromAuxiliary = 1 + 1 = 2
 *     transferOperationIndex = 2: (2 < 2 is false) -> Loop terminates.
 *
 *   totalMileage = (primaryTankFuel + fuelReceivedFromAuxiliary) * 10
 *   totalMileage = (10 + 2) * 10 = 12 * 10 = 120
 *   Return 120.
 * Time Complexity: O(additionalTank)
 * Space Complexity: O(1)
 */
var distanceTraveled = function (mainTank, additionalTank) {
  let primaryTankFuel = mainTank;
  let auxiliaryTankFuel = additionalTank;
  let simulatedPrimaryFuel = primaryTankFuel;
  let simulatedAuxiliaryFuel = auxiliaryTankFuel;
  let fuelReceivedFromAuxiliary = 0;

  for (
    let transferOperationIndex = 0;
    transferOperationIndex < simulatedAuxiliaryFuel;
    transferOperationIndex++
  ) {
    if (simulatedPrimaryFuel >= 5) {
      simulatedPrimaryFuel -= 5;
      simulatedPrimaryFuel += 1;
      fuelReceivedFromAuxiliary += 1;
    } else {
      break;
    }
  }

  let totalMileage = (primaryTankFuel + fuelReceivedFromAuxiliary) * 10;
  return totalMileage;
};

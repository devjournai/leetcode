/**
 * Water Bottles Ii
 * Intuition: Start by drinking all initial full bottles, converting them to empty ones. Then, continuously exchange empty bottles for a single full bottle, immediately drink it (adding to total drunk and empty counts), and increment the exchange rate, until no more exchanges are possible.
 * Approach: 1. Initialize total drunk bottles with the initial number of full bottles. 2. Initialize available empty bottles with the initial number of full bottles. 3. Use a while loop that continues as long as there are enough available empty bottles to meet the current exchange rate. 4. Inside the loop, subtract the current exchange rate from available empty bottles, add 1 to total drunk bottles (for the newly obtained and immediately consumed bottle), add 1 to available empty bottles (as the new bottle becomes empty), and increment the exchange rate for the next exchange. 5. Return the total drunk bottles.
 * Dry Run: numBottles = 10, numExchange = 3
 * - Initialize totalDrunkBottles = 10
 * - Initialize availableEmptyBottles = 10
 * - Initialize currentExchangeRate = 3
 * - Loop 1: availableEmptyBottles (10) >= currentExchangeRate (3) is true.
 *   - availableEmptyBottles = 10 - 3 = 7
 *   - totalDrunkBottles = 10 + 1 = 11
 *   - availableEmptyBottles = 7 + 1 = 8
 *   - currentExchangeRate = 3 + 1 = 4
 * - Loop 2: availableEmptyBottles (8) >= currentExchangeRate (4) is true.
 *   - availableEmptyBottles = 8 - 4 = 4
 *   - totalDrunkBottles = 11 + 1 = 12
 *   - availableEmptyBottles = 4 + 1 = 5
 *   - currentExchangeRate = 4 + 1 = 5
 * - Loop 3: availableEmptyBottles (5) >= currentExchangeRate (5) is true.
 *   - availableEmptyBottles = 5 - 5 = 0
 *   - totalDrunkBottles = 12 + 1 = 13
 *   - availableEmptyBottles = 0 + 1 = 1
 *   - currentExchangeRate = 5 + 1 = 6
 * - Loop 4: availableEmptyBottles (1) >= currentExchangeRate (6) is false. Loop terminates.
 * - Return totalDrunkBottles = 13.
 * Time Complexity: O(sqrt(numBottles))
 * Space Complexity: O(1)
 */
var maxBottlesDrunk = function (numBottles, numExchange) {
  let totalDrunkBottles = numBottles;
  let availableEmptyBottles = numBottles;
  let currentExchangeRate = numExchange;

  while (availableEmptyBottles >= currentExchangeRate) {
    availableEmptyBottles -= currentExchangeRate;
    totalDrunkBottles += 1;
    availableEmptyBottles += 1;
    currentExchangeRate += 1;
  }

  return totalDrunkBottles;
};

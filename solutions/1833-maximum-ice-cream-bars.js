/**
 * Maximum Ice Cream Bars
 * Intuition: To maximize the number of ice cream bars purchased with a fixed budget, one should always prioritize buying the cheapest available bars first. This greedy strategy ensures that the least amount of money is spent per bar, allowing for the acquisition of more items overall before the budget is depleted.
 * Approach: 1. Sort the array of ice cream costs in non-decreasing order. 2. Initialize a counter to track the number of bars bought and a variable to keep track of the remaining budget. 3. Iterate through the sorted costs, attempting to purchase each bar. 4. If the current bar's cost is less than or equal to the remaining budget, buy it: increment the counter and subtract its cost from the budget. 5. If the current bar's cost exceeds the remaining budget, stop the process, as all subsequent bars will be equally or more expensive and thus also unaffordable. 6. Return the final count of purchased ice cream bars.
 * Dry Run:
 * costs = [1, 3, 2, 4, 1], coins = 7
 * 1. Sorted costs: costs becomes [1, 1, 2, 3, 4] (modifies the input array)
 * 2. numberOfBars = 0, remainingBalance = 7
 * 3. Loop through sorted costs:
 *    - loopIndex = 0:
 *      - currentItemCost = costs[0] = 1
 *      - Is 1 <= remainingBalance (7)? True.
 *      - numberOfBars becomes 1.
 *      - remainingBalance becomes 7 - 1 = 6.
 *    - loopIndex = 1:
 *      - currentItemCost = costs[1] = 1
 *      - Is 1 <= remainingBalance (6)? True.
 *      - numberOfBars becomes 2.
 *      - remainingBalance becomes 6 - 1 = 5.
 *    - loopIndex = 2:
 *      - currentItemCost = costs[2] = 2
 *      - Is 2 <= remainingBalance (5)? True.
 *      - numberOfBars becomes 3.
 *      - remainingBalance becomes 5 - 2 = 3.
 *    - loopIndex = 3:
 *      - currentItemCost = costs[3] = 3
 *      - Is 3 <= remainingBalance (3)? True.
 *      - numberOfBars becomes 4.
 *      - remainingBalance becomes 3 - 3 = 0.
 *    - loopIndex = 4:
 *      - currentItemCost = costs[4] = 4
 *      - Is 4 <= remainingBalance (0)? False.
 *      - Break loop.
 * 4. Return numberOfBars (4).
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxIceCream = function (costs, coins) {
  let numberOfBars = 0;
  let remainingBalance = coins;

  costs.sort((priceA, priceB) => priceA - priceB);

  for (let loopIndex = 0; loopIndex < costs.length; loopIndex++) {
    let currentItemCost = costs[loopIndex];
    if (currentItemCost <= remainingBalance) {
      numberOfBars++;
      remainingBalance -= currentItemCost;
    } else {
      break;
    }
  }

  return numberOfBars;
};

/**
 * Number Of Ways To Buy Pens And Pencils
 * Intuition: The problem asks for combinations of two items with a budget constraint. We can fix the quantity of one item and then determine how many of the second item can be bought with the remaining money. By iterating through all possible quantities of the first item, we accumulate all valid combinations.
 * Approach: 1. Initialize a variable to count the total distinct ways. 2. Calculate the maximum number of pencils that can be purchased with the given total money. 3. Iterate through each possible quantity of pencils, starting from zero up to this maximum. 4. For each pencil quantity, determine the money left after spending on pencils. 5. With the remaining money, calculate the maximum number of pens that can be purchased. 6. Add `(maximum pens + 1)` to the total distinct ways, as buying zero pens is also a valid option. 7. After the loop completes, return the accumulated total distinct ways.
 * Dry Run: total = 20, cost1 = 10 (penCost), cost2 = 5 (pencilCost)
 *   distinctWays = 0
 *   maxPencilsPossible = Math.floor(20 / 5) = 4
 *
 *   Iteration 1: currentPencilQuantity = 0
 *     remainingBudget = 20 - (0 * 5) = 20
 *     possiblePenQuantity = Math.floor(20 / 10) = 2
 *     distinctWays = 0 + (2 + 1) = 3
 *
 *   Iteration 2: currentPencilQuantity = 1
 *     remainingBudget = 20 - (1 * 5) = 15
 *     possiblePenQuantity = Math.floor(15 / 10) = 1
 *     distinctWays = 3 + (1 + 1) = 5
 *
 *   Iteration 3: currentPencilQuantity = 2
 *     remainingBudget = 20 - (2 * 5) = 10
 *     possiblePenQuantity = Math.floor(10 / 10) = 1
 *     distinctWays = 5 + (1 + 1) = 7
 *
 *   Iteration 4: currentPencilQuantity = 3
 *     remainingBudget = 20 - (3 * 5) = 5
 *     possiblePenQuantity = Math.floor(5 / 10) = 0
 *     distinctWays = 7 + (0 + 1) = 8
 *
 *   Iteration 5: currentPencilQuantity = 4
 *     remainingBudget = 20 - (4 * 5) = 0
 *     possiblePenQuantity = Math.floor(0 / 10) = 0
 *     distinctWays = 8 + (0 + 1) = 9
 *
 *   Loop finishes. Return distinctWays = 9.
 *
 * Time Complexity: O(total / cost2)
 * Space Complexity: O(1)
 */
var waysToBuyPensPencils = function (total, cost1, cost2) {
  let distinctWays = 0;
  let maxPencilsPossible = Math.floor(total / cost2);

  for (
    let currentPencilQuantity = 0;
    currentPencilQuantity <= maxPencilsPossible;
    currentPencilQuantity++
  ) {
    let remainingBudget = total - currentPencilQuantity * cost2;
    let possiblePenQuantity = Math.floor(remainingBudget / cost1);
    distinctWays += possiblePenQuantity + 1;
  }

  return distinctWays;
};

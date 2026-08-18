/**
 * Alice And Bob Playing Flower Game
 * Intuition: The game described is a variant of a standard impartial game. Since players can pick one flower from either side in each turn, the total number of flowers decreases by one in each turn. The player who picks the last flower wins. In such games, the first player (Alice) wins if and only if the total number of items (flowers, x + y) is odd. The second player (Bob) wins if the total number of items is even. Therefore, Alice wins if x + y is an odd number.
 * Approach: 1. Identify the winning condition for Alice: x + y must be odd. 2. Recognize that x + y is odd if and only if one of x or y is an odd number and the other is an even number. 3. Count the number of even integers for x within the range [1, n] and for y within the range [1, m]. 4. The number of odd integers can be derived by subtracting the count of even integers from the total count for that range (e.g., for x, total 'n' values, so odd count is n - even count). 5. Calculate the total winning pairs by summing two cases: (number of odd x * number of even y) + (number of even x * number of odd y).
 * Dry Run: For n = 2, m = 3:
 * x values: [1, 2]
 * y values: [1, 2, 3]
 *
 * Calculate even counts:
 * countEvenForN = floor(2 / 2) = 1 (for x = 2)
 * countEvenForM = floor(3 / 2) = 1 (for y = 2)
 *
 * Calculate odd counts (implicitly):
 * For x: (n - countEvenForN) = (2 - 1) = 1 (for x = 1)
 * For y: (m - countEvenForM) = (3 - 1) = 2 (for y = 1, 3)
 *
 * Total winning pairs = (count of even x * count of odd y) + (count of odd x * count of even y)
 * = (countEvenForN * (m - countEvenForM)) + ((n - countEvenForN) * countEvenForM)
 * = (1 * (3 - 1)) + ((2 - 1) * 1)
 * = (1 * 2) + (1 * 1)
 * = 2 + 1
 * = 3
 *
 * The winning pairs (x, y) are:
 * (1, 2) -> 1+2=3 (odd)
 * (2, 1) -> 2+1=3 (odd)
 * (2, 3) -> 2+3=5 (odd)
 * Total: 3 pairs, which matches the calculation.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var flowerGame = function (n, m) {
  let countEvenForN = Math.floor(n / 2);
  let countEvenForM = Math.floor(m / 2);

  let resultTotal =
    countEvenForN * (m - countEvenForM) + (n - countEvenForN) * countEvenForM;

  return resultTotal;
};

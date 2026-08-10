/**
 * Distribute Candies Among Children I
 * Intuition: The problem asks for the number of ways to distribute 'n' candies among 3 children, with each child receiving no more than 'limit' candies. This is a direct combinatorial counting problem where we need to find all non-negative integer solutions (c1, c2, c3) such that c1 + c2 + c3 = n and 0 <= c_i <= limit for each child c_i.
 * Approach: 1. Initialize a counter variable, `totalWaysCount`, to zero. 2. Iterate through all possible candy amounts for the first child, `candiesFirstChild`, from 0 up to `limit`. 3. Inside the first loop, iterate through all possible candy amounts for the second child, `candiesSecondChild`, from 0 up to `limit`. 4. Inside the second loop, iterate through all possible candy amounts for the third child, `candiesThirdChild`, from 0 up to `limit`. 5. In the innermost loop, calculate the `currentSum` of `candiesFirstChild`, `candiesSecondChild`, and `candiesThirdChild`. 6. If `currentSum` is equal to `n`, increment `totalWaysCount`. 7. After iterating through all combinations, return `totalWaysCount`.
 * Dry Run: n = 3, limit = 1
 * totalWaysCount = 0
 *
 * candiesFirstChild = 0:
 *   candiesSecondChild = 0:
 *     candiesThirdChild = 0: currentSum = 0. (0 != 3)
 *     candiesThirdChild = 1: currentSum = 1. (1 != 3)
 *   candiesSecondChild = 1:
 *     candiesThirdChild = 0: currentSum = 1. (1 != 3)
 *     candiesThirdChild = 1: currentSum = 2. (2 != 3)
 *
 * candiesFirstChild = 1:
 *   candiesSecondChild = 0:
 *     candiesThirdChild = 0: currentSum = 1. (1 != 3)
 *     candiesThirdChild = 1: currentSum = 2. (2 != 3)
 *   candiesSecondChild = 1:
 *     candiesThirdChild = 0: currentSum = 2. (2 != 3)
 *     candiesThirdChild = 1: currentSum = 3. (3 == 3) -> totalWaysCount = 1
 *
 * All loops finish.
 * Return totalWaysCount = 1. (Correct: only (1,1,1) for n=3, limit=1)
 * Time Complexity: O(limit^3)
 * Space Complexity: O(1)
 */
var distributeCandies = function (n, limit) {
  let totalWaysCount = 0;

  for (
    let candiesFirstChild = 0;
    candiesFirstChild <= limit;
    candiesFirstChild++
  ) {
    for (
      let candiesSecondChild = 0;
      candiesSecondChild <= limit;
      candiesSecondChild++
    ) {
      for (
        let candiesThirdChild = 0;
        candiesThirdChild <= limit;
        candiesThirdChild++
      ) {
        let currentSum =
          candiesFirstChild + candiesSecondChild + candiesThirdChild;
        if (currentSum === n) {
          totalWaysCount++;
        }
      }
    }
  }

  return totalWaysCount;
};

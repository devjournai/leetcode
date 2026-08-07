/**
 * Distribute Candies Among Children Iii
 * Intuition: The problem asks for combinations with an upper limit, which often points to the Principle of Inclusion-Exclusion (PIE) when dealing with "at most" conditions in combinatorics problems that can otherwise be solved with stars and bars.
 * Approach: 1. Define a helper function to calculate the number of ways to distribute 'x' candies among 3 children without an upper limit using the stars and bars formula C(x + 2, 2). 2. Apply the Principle of Inclusion-Exclusion to subtract invalid distributions where children exceed the 'limit'. 3. The PIE formula used is: (Total ways) - (Ways at least 1 child exceeds limit) + (Ways at least 2 children exceed limit) - (Ways at least 3 children exceed limit).
 * Dry Run: n = 2, limit = 1
 *   - The maximum total candies if each child respects limit is 3 * 1 = 3. Since n=2 <= 3, proceed.
 *   - excessAmount = limit + 1 = 1 + 1 = 2.
 *   - calculateCombinations(candiesValue): returns (candiesValue + 2) * (candiesValue + 1) / 2 if candiesValue >= 0, else 0.
 *   - initialWays = calculateCombinations(n) = calculateCombinations(2) = (2+2)*(2+1)/2 = 4*3/2 = 6.
 *   - firstAdjustment = 3 * calculateCombinations(n - excessAmount) = 3 * calculateCombinations(2 - 2) = 3 * calculateCombinations(0) = 3 * ((0+2)*(0+1)/2) = 3 * 1 = 3.
 *   - secondAdjustment = 3 * calculateCombinations(n - 2 * excessAmount) = 3 * calculateCombinations(2 - 2*2) = 3 * calculateCombinations(-2) = 3 * 0 = 0.
 *   - thirdAdjustment = calculateCombinations(n - 3 * excessAmount) = calculateCombinations(2 - 3*2) = calculateCombinations(-4) = 0.
 *   - finalResult = initialWays - firstAdjustment + secondAdjustment - thirdAdjustment = 6 - 3 + 0 - 0 = 3.
 *   - This matches manual enumeration for (c1, c2, c3) with n=2, limit=1: (1,1,0), (1,0,1), (0,1,1).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var distributeCandies = function (n, limit) {
  if (n > 3 * limit) {
    return 0;
  }

  function calculateCombinations(candiesToDistribute) {
    if (candiesToDistribute < 0) {
      return 0;
    }
    const firstTerm = candiesToDistribute + 2;
    const secondTerm = candiesToDistribute + 1;
    const totalNumerator = firstTerm * secondTerm;
    const divisionResult = totalNumerator / 2;
    return Math.floor(divisionResult);
  }

  const excessRequirement = limit + 1;

  const allPossibleWays = calculateCombinations(n);

  const firstCategoryViolations =
    3 * calculateCombinations(n - excessRequirement);

  const secondCategoryViolations =
    3 * calculateCombinations(n - 2 * excessRequirement);

  const thirdCategoryViolations = calculateCombinations(
    n - 3 * excessRequirement,
  );

  const finalCount =
    allPossibleWays -
    firstCategoryViolations +
    secondCategoryViolations -
    thirdCategoryViolations;
  return finalCount;
};

/**
 * Distribute Candies Among Children Ii
 * Intuition: The problem asks for the number of integer solutions to c1 + c2 + c3 = n such that 0 <= ci <= limit. This is a classic combinatorics problem that can be solved using the stars and bars method combined with the Principle of Inclusion-Exclusion to handle the upper bound constraint for each child.
 * Approach: 1. Calculate the total number of non-negative integer solutions to c1 + c2 + c3 = n using stars and bars: C(n + k - 1, k - 1), where k=3, so C(n+2, 2).
 * 2. Apply the Principle of Inclusion-Exclusion to subtract solutions where one or more children exceed the `limit`.
 *    - Subtract solutions where at least one child (say c1) gets more than `limit` candies (c1 >= limit + 1). This is equivalent to finding solutions for c1' + c2 + c3 = n - (limit + 1), where c1' = c1 - (limit + 1). There are 3 such cases.
 *    - Add back solutions where at least two children (say c1, c2) get more than `limit` candies (c1 >= limit + 1, c2 >= limit + 1). This is equivalent to finding solutions for c1' + c2' + c3 = n - 2*(limit + 1). There are 3 such cases.
 *    - Subtract solutions where all three children get more than `limit` candies (c1, c2, c3 >= limit + 1). This is equivalent to finding solutions for c1' + c2' + c3' = n - 3*(limit + 1). There is 1 such case.
 * 3. Use a helper function for combinations C(N, 2) which simplifies to N * (N - 1) / 2, returning 0 if N < 2.
 * Dry Run: n = 5, limit = 2
 *   - Base ways (no limit): C(5 + 2, 2) = C(7, 2) = 7 * 6 / 2 = 21
 *   - Subtract for one child exceeding limit: 3 * C(5 - 2 + 1, 2) = 3 * C(4, 2) = 3 * (4 * 3 / 2) = 3 * 6 = 18
 *   - Add for two children exceeding limit: 3 * C(5 - 2*2, 2) = 3 * C(1, 2) = 3 * 0 = 0 (since 1 < 2)
 *   - Subtract for three children exceeding limit: 1 * C(5 - 3*2 - 1, 2) = 1 * C(-2, 2) = 1 * 0 = 0 (since -2 < 2)
 *   - Total ways = 21 - 18 + 0 - 0 = 3.
 *   This matches the manual count for (c1, c2, c3) where sum is 5 and each <= 2: (1,2,2), (2,1,2), (2,2,1).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var distributeCandies = function (n, limit) {
  const combinationsOfTwo = (topValue) => {
    if (topValue < 2) {
      return 0;
    }
    return (topValue * (topValue - 1)) / 2;
  };

  const currentN = n;
  const maxLimit = limit;

  const baseWays = combinationsOfTwo(currentN + 2);
  const exceedOneChildAdjustment =
    3 * combinationsOfTwo(currentN - maxLimit + 1);
  const exceedTwoChildrenAdjustment =
    3 * combinationsOfTwo(currentN - 2 * maxLimit);
  const exceedThreeChildrenAdjustment = combinationsOfTwo(
    currentN - 3 * maxLimit - 1
  );

  let finalResult =
    baseWays -
    exceedOneChildAdjustment +
    exceedTwoChildrenAdjustment -
    exceedThreeChildrenAdjustment;

  return finalResult;
};

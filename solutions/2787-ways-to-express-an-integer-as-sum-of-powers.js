/**
 * Ways To Express An Integer As Sum Of Powers
 * Intuition: The problem asks for the number of unique combinations of x-th powers that sum up to n. This can be modeled as a subset sum problem where we decide for each positive integer 'i' whether to include 'i^x' in our sum or not. Since the integers must be unique, each 'i^x' can be used at most once. A recursive approach with memoization can efficiently explore these choices.
 * Approach:
 * 1. Define a `moduloConstant` (10^9 + 7) for handling large results.
 * 2. Pre-calculate `maxBaseForPower`, the largest integer whose `x`-th power does not exceed `n`. This limits the range of base integers we need to consider.
 * 3. Initialize a `memoCache` (a Map or object) to store the results of subproblems to avoid redundant calculations. The keys for the cache will be a combination of `remainingSumTarget` and `currentIntegerBase`.
 * 4. Implement a recursive helper function `calculateCombinations(remainingSumTarget, currentIntegerBase)`:
 *    a. Construct a unique `cacheKey` using `remainingSumTarget` and `currentIntegerBase`.
 *    b. Check if the result for `cacheKey` is already in `memoCache`. If yes, return the cached value.
 *    c. Base case: If `remainingSumTarget` is 0, it means we found one valid combination, so return 1.
 *    d. Base case: If `currentIntegerBase` exceeds `maxBaseForPower`, it means we have exhausted all possible unique base integers, so return 0.
 *    e. Calculate `computedPowerValue = Math.pow(currentIntegerBase, powerX)`.
 *    f. Initialize `numWaysFound` to 0.
 *    g. **Option 1 (Exclude current integer base):** Recursively call `calculateCombinations(remainingSumTarget, currentIntegerBase + 1)`. Add the result to `numWaysFound`.
 *    h. **Option 2 (Include current integer base):** If `computedPowerValue` is less than or equal to `remainingSumTarget`, recursively call `calculateCombinations(remainingSumTarget - computedPowerValue, currentIntegerBase + 1)`. Add the result to `numWaysFound`.
 *    i. Store `numWaysFound` modulo `moduloConstant` in `memoCache` for `cacheKey` and return it.
 * 5. Start the recursion by calling `calculateCombinations(targetN, 1)`.
 * Dry Run: n = 10, x = 2
 * maxBaseForPower = floor(10^(1/2)) = 3
 * memoCache = {}
 * calculateCombinations(10, 1):
 *   computedPowerValue = 1^2 = 1
 *   numWaysFound = 0
 *   // Exclude 1^2
 *   numWaysFound = (0 + calculateCombinations(10, 2)) % MOD
 *     calculateCombinations(10, 2):
 *       computedPowerValue = 2^2 = 4
 *       numWaysFound = 0
 *       // Exclude 2^2
 *       numWaysFound = (0 + calculateCombinations(10, 3)) % MOD
 *         calculateCombinations(10, 3):
 *           computedPowerValue = 3^2 = 9
 *           numWaysFound = 0
 *           // Exclude 3^2
 *           numWaysFound = (0 + calculateCombinations(10, 4)) % MOD
 *             calculateCombinations(10, 4): currentIntegerBase (4) > maxBaseForPower (3) -> returns 0.
 *           numWaysFound = (0 + 0) % MOD = 0
 *           // Include 3^2 (9 <= 10)
 *           numWaysFound = (0 + calculateCombinations(10 - 9, 4)) % MOD
 *             calculateCombinations(1, 4): currentIntegerBase (4) > maxBaseForPower (3) -> returns 0.
 *           numWaysFound = (0 + 0) % MOD = 0
 *           memoCache['10-3'] = 0 -> returns 0
 *       numWaysFound = (0 + 0) % MOD = 0
 *       // Include 2^2 (4 <= 10)
 *       numWaysFound = (0 + calculateCombinations(10 - 4, 3)) % MOD
 *         calculateCombinations(6, 3):
 *           computedPowerValue = 3^2 = 9
 *           numWaysFound = 0
 *           // Exclude 3^2
 *           numWaysFound = (0 + calculateCombinations(6, 4)) % MOD
 *             calculateCombinations(6, 4): currentIntegerBase (4) > maxBaseForPower (3) -> returns 0.
 *           numWaysFound = (0 + 0) % MOD = 0
 *           // Include 3^2 (9 > 6) -> Skip
 *           memoCache['6-3'] = 0 -> returns 0
 *       numWaysFound = (0 + 0) % MOD = 0
 *       memoCache['10-2'] = 0 -> returns 0
 *   numWaysFound = (0 + 0) % MOD = 0
 *   // Include 1^2 (1 <= 10)
 *   numWaysFound = (0 + calculateCombinations(10 - 1, 2)) % MOD
 *     calculateCombinations(9, 2):
 *       computedPowerValue = 2^2 = 4
 *       numWaysFound = 0
 *       // Exclude 2^2
 *       numWaysFound = (0 + calculateCombinations(9, 3)) % MOD
 *         calculateCombinations(9, 3):
 *           computedPowerValue = 3^2 = 9
 *           numWaysFound = 0
 *           // Exclude 3^2
 *           numWaysFound = (0 + calculateCombinations(9, 4)) % MOD
 *             calculateCombinations(9, 4): currentIntegerBase (4) > maxBaseForPower (3) -> returns 0.
 *           numWaysFound = (0 + 0) % MOD = 0
 *           // Include 3^2 (9 <= 9)
 *           numWaysFound = (0 + calculateCombinations(9 - 9, 4)) % MOD
 *             calculateCombinations(0, 4): remainingSumTarget (0) === 0 -> returns 1.
 *           numWaysFound = (0 + 1) % MOD = 1
 *           memoCache['9-3'] = 1 -> returns 1
 *       numWaysFound = (0 + 1) % MOD = 1
 *       // Include 2^2 (4 <= 9)
 *       numWaysFound = (1 + calculateCombinations(9 - 4, 3)) % MOD
 *         calculateCombinations(5, 3):
 *           computedPowerValue = 3^2 = 9
 *           numWaysFound = 0
 *           // Exclude 3^2
 *           numWaysFound = (0 + calculateCombinations(5, 4)) % MOD
 *             calculateCombinations(5, 4): currentIntegerBase (4) > maxBaseForPower (3) -> returns 0.
 *           numWaysFound = (0 + 0) % MOD = 0
 *           // Include 3^2 (9 > 5) -> Skip
 *           memoCache['5-3'] = 0 -> returns 0
 *       numWaysFound = (1 + 0) % MOD = 1
 *       memoCache['9-2'] = 1 -> returns 1
 *   numWaysFound = (0 + 1) % MOD = 1
 *   memoCache['10-1'] = 1 -> returns 1
 * Final Result: 1 (10 = 1^2 + 3^2)
 * Time Complexity: O(N * N^(1/X))
 * Space Complexity: O(N * N^(1/X))
 */
var numberOfWays = function (targetN, powerX) {
  const moduloConstant = 1e9 + 7;
  const memoCache = new Map();

  function calculateCombinations(remainingSumTarget, currentIntegerBase) {
    const cacheKey = `${remainingSumTarget}-${currentIntegerBase}`;

    if (memoCache.has(cacheKey)) {
      return memoCache.get(cacheKey);
    }

    if (remainingSumTarget === 0) {
      return 1;
    }

    const computedPowerValue = Math.pow(currentIntegerBase, powerX);

    if (computedPowerValue > remainingSumTarget) {
      return 0;
    }

    let numWaysFound = 0;

    numWaysFound =
      (numWaysFound +
        calculateCombinations(remainingSumTarget, currentIntegerBase + 1)) %
      moduloConstant;

    numWaysFound =
      (numWaysFound +
        calculateCombinations(
          remainingSumTarget - computedPowerValue,
          currentIntegerBase + 1
        )) %
      moduloConstant;

    memoCache.set(cacheKey, numWaysFound);
    return numWaysFound;
  }

  return calculateCombinations(targetN, 1);
};

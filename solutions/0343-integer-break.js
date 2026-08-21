/**
 * Integer Break
 * Intuition: For n > 3 the max product is over a first cut i and second cut n - i, each side either kept whole or replaced by its already-computed max break. n <= 3 cannot use a trivial n * 1 so the answer is n - 1.
 * Approach: 1. If n <= 3 return n - 1. 2. DP array; seed [2]=1, [3]=2. 3. For currentNumber 4..n, try firstPart 1..floor(n/2) and take max of the four products (both raw, left raw * dp[right], dp[left] * right raw, both dp). 4. Return dp[n].
 * Dry Run: n = 10.
 *   - Smaller dp fills 4→4, 5→6, 6→9, ... up to 10.
 *   - maxProductValues[10] = 36.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var integerBreak = function (n) {
  if (n <= 3) {
    return n - 1;
  }

  const maxProductValues = new Array(n + 1).fill(0);

  maxProductValues[2] = 1;
  maxProductValues[3] = 2;

  for (let currentNumber = 4; currentNumber <= n; currentNumber++) {
    let currentMaxAchieved = 0;
    for (
      let firstPartValue = 1;
      firstPartValue <= Math.floor(currentNumber / 2);
      firstPartValue++
    ) {
      let secondPartValue = currentNumber - firstPartValue;

      let productOption1 = firstPartValue * secondPartValue;
      let productOption2 = firstPartValue * maxProductValues[secondPartValue];
      let productOption3 = maxProductValues[firstPartValue] * secondPartValue;
      let productOption4 =
        maxProductValues[firstPartValue] * maxProductValues[secondPartValue];

      currentMaxAchieved = Math.max(
        currentMaxAchieved,
        productOption1,
        productOption2,
        productOption3,
        productOption4
      );
    }
    maxProductValues[currentNumber] = currentMaxAchieved;
  }

  return maxProductValues[n];
};

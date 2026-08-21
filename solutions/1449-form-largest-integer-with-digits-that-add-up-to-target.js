/**
 * Form Largest Integer With Digits That Add Up To Target
 * Intuition: Unbounded knapsack on cost: dp[sum] is the lexicographically largest digit string whose costs add to sum. Prefer longer strings, then larger digit order.
 * Approach: 1. dp[0] = ""; other sums start as "0" (impossible). 2. For each cost sum 1..target and digit 1..9, if remainder is reachable, prepend the digit. 3. Keep the candidate if it is longer or same length but greater. 4. Return dp[target].
 * Dry Run: cost = [4,3,2,5,6,7,2,5,5], target = 9
 *   - cheap digits 2 (cost 3) and 7 (cost 2) fill larger sums
 *   - best string for 9 is "7772" (or similar per costs). Sample answer "7772".
 * Time Complexity: O(target^2)
 * Space Complexity: O(target^2)
 */
var largestNumber = function (cost, target) {
  const dpValues = new Array(target + 1).fill("0");
  dpValues[0] = "";

  for (let currentCostSum = 1; currentCostSum <= target; currentCostSum++) {
    for (let digitOption = 1; digitOption <= 9; digitOption++) {
      const costForDigit = cost[digitOption - 1];
      const previousCostRequired = currentCostSum - costForDigit;

      if (previousCostRequired >= 0 && dpValues[previousCostRequired] !== "0") {
        const candidateNumString =
          digitOption.toString() + dpValues[previousCostRequired];
        const existingBestNumString = dpValues[currentCostSum];

        const candidateLength = candidateNumString.length;
        const existingLength = existingBestNumString.length;

        if (
          candidateLength > existingLength ||
          (candidateLength === existingLength &&
            candidateNumString > existingBestNumString)
        ) {
          dpValues[currentCostSum] = candidateNumString;
        }
      }
    }
  }

  return dpValues[target];
};

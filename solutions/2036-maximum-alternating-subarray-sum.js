/**
 * Maximum Alternating Subarray Sum
 * Intuition: The maximum alternating subarray sum ending at the current element can either have the current element added (as +num) or subtracted (as -num). We use dynamic programming to track these two possibilities for sums ending at the current position, updating a global maximum.
 * Approach: 1. Initialize `maxOverallResult` to negative infinity. Initialize two DP states: `maxSumEndingPlus` (maximum alternating sum ending at the current number `n` where `n` is added) and `maxSumEndingMinus` (maximum alternating sum ending at `n` where `n` is subtracted), both also to negative infinity. 2. Iterate through each `elementValue` in the input array `nums`. 3. For each `elementValue`, calculate `candidateSumEndingPlus`: this can be either `elementValue` itself (starting a new subarray) or `maxSumEndingMinus` from the previous step plus `elementValue` (extending a subarray that previously ended with a negative sign). 4. Calculate `candidateSumEndingMinus`: this must extend a previous subarray that ended with a positive sign, so it is `maxSumEndingPlus` from the previous step minus `elementValue`. A new subarray cannot begin with a negative sign (e.g., `-nums[i]`). 5. Update `maxSumEndingPlus` and `maxSumEndingMinus` with their `candidate` calculated values. 6. Update `maxOverallResult` by taking the maximum of `maxOverallResult`, the new `maxSumEndingPlus`, and the new `maxSumEndingMinus`. 7. After iterating through all elements, return `maxOverallResult`.
 * Dry Run: nums = [1, -2, 3]
 * Initial: maxOverallResult = -Infinity, maxSumEndingPlus = -Infinity, maxSumEndingMinus = -Infinity
 *
 * Iteration 1: elementValue = 1
 *   candidateSumEndingPlus = Math.max(maxSumEndingMinus + 1, 1) = Math.max(-Infinity + 1, 1) = 1
 *   candidateSumEndingMinus = maxSumEndingPlus - 1 = -Infinity - 1 = -Infinity
 *   maxSumEndingPlus = 1, maxSumEndingMinus = -Infinity
 *   maxOverallResult = Math.max(-Infinity, 1, -Infinity) = 1
 *
 * Iteration 2: elementValue = -2
 *   candidateSumEndingPlus = Math.max(maxSumEndingMinus + (-2), -2) = Math.max(-Infinity - 2, -2) = -2
 *   candidateSumEndingMinus = maxSumEndingPlus - (-2) = 1 - (-2) = 3
 *   maxSumEndingPlus = -2, maxSumEndingMinus = 3
 *   maxOverallResult = Math.max(1, -2, 3) = 3
 *
 * Iteration 3: elementValue = 3
 *   candidateSumEndingPlus = Math.max(maxSumEndingMinus + 3, 3) = Math.max(3 + 3, 3) = 6
 *   candidateSumEndingMinus = maxSumEndingPlus - 3 = -2 - 3 = -5
 *   maxSumEndingPlus = 6, maxSumEndingMinus = -5
 *   maxOverallResult = Math.max(3, 6, -5) = 6
 *
 * End of loop. Return maxOverallResult = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumAlternatingSubarraySum = function (nums) {
  let maxOverallResult = -Infinity;
  let maxSumEndingPlus = -Infinity;
  let maxSumEndingMinus = -Infinity;

  for (const elementValue of nums) {
    let candidateSumEndingPlus = Math.max(
      maxSumEndingMinus + elementValue,
      elementValue
    );
    let candidateSumEndingMinus = maxSumEndingPlus - elementValue;

    maxSumEndingPlus = candidateSumEndingPlus;
    maxSumEndingMinus = candidateSumEndingMinus;
    maxOverallResult = Math.max(
      maxOverallResult,
      maxSumEndingPlus,
      maxSumEndingMinus
    );
  }

  return maxOverallResult;
};

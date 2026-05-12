/**
 * Number Of Unique Good Subsequences
 * Intuition: Dynamic programming can track the unique good subsequences ending with '0' and '1' separately, with a special case for the single digit "0" due to its unique leading zero rule.
 * Approach: 1. Initialize `dpEndsWithZero` and `dpEndsWithOne` to count unique good subsequences ending in '0' and '1' respectively. 2. Use a boolean `encounteredZero` to track if the single good subsequence "0" has been seen. 3. Iterate through the input string: if the current character is '0', update `dpEndsWithZero` by adding `dpEndsWithOne` to it (all subsequences ending in '1' can have '0' appended) and set `encounteredZero` to true. 4. If the current character is '1', update `dpEndsWithOne` by adding `dpEndsWithZero` to it, plus 1 for the standalone "1" subsequence. 5. The final answer is the sum of `dpEndsWithZero`, `dpEndsWithOne`, and 1 if `encounteredZero` is true, all modulo `modConstant`.
 * Dry Run: binary = "101"
 * Initial: modConstant = 1000000007, dpEndsWithZero = 0, dpEndsWithOne = 0, encounteredZero = false
 *
 * Iteration 1 (currentChar = '1'):
 *   dpEndsWithOne = (0 + 0 + 1) % modConstant = 1
 *   (Subsequence: "1")
 *   State: dpEndsWithZero = 0, dpEndsWithOne = 1, encounteredZero = false
 *
 * Iteration 2 (currentChar = '0'):
 *   encounteredZero = true
 *   dpEndsWithZero = (0 + 1) % modConstant = 1
 *   (Subsequence: "10")
 *   State: dpEndsWithZero = 1, dpEndsWithOne = 1, encounteredZero = true
 *
 * Iteration 3 (currentChar = '1'):
 *   dpEndsWithOne = (1 + 1 + 1) % modConstant = 3
 *   (Subsequences ending in '1': "1" (from previous '1'), "11" (from "1" + '1'), "101" (from "10" + '1'))
 *   State: dpEndsWithZero = 1, dpEndsWithOne = 3, encounteredZero = true
 *
 * End of loop.
 * Result: (dpEndsWithZero + dpEndsWithOne + (encounteredZero ? 1 : 0)) % modConstant
 *       = (1 + 3 + 1) % modConstant = 5
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfUniqueGoodSubsequences = function (binary) {
  const modConstant = 1e9 + 7;
  let dpEndsWithZero = 0;
  let dpEndsWithOne = 0;
  let encounteredZero = false;
  const stringLength = binary.length;

  for (let loopIndex = 0; loopIndex < stringLength; loopIndex++) {
    const currentChar = binary[loopIndex];
    if (currentChar === "0") {
      encounteredZero = true;
      dpEndsWithZero = (dpEndsWithZero + dpEndsWithOne) % modConstant;
    } else {
      dpEndsWithOne = (dpEndsWithOne + dpEndsWithZero + 1) % modConstant;
    }
  }

  return (
    (dpEndsWithZero + dpEndsWithOne + (encounteredZero ? 1 : 0)) % modConstant
  );
};

/**
 * Count Ways To Build Good Strings
 * Intuition: This problem can be solved using dynamic programming. We need to find the number of ways to form strings of certain lengths. The key insight is that a string of length 'i' can be formed by appending either 'zero' characters (0s) to a string of length 'i - zero' or 'one' characters (1s) to a string of length 'i - one'. This recursive structure with overlapping subproblems points to DP.
 * Approach: 1. Initialize a DP array, `dpArray`, of size `high + 1` where `dpArray[i]` stores the number of ways to form a string of exact length `i`.
 * 2. Set `dpArray[0] = 1` because there is one way to form an empty string (length 0).
 * 3. Iterate `currentLength` from 1 to `high`. For each `currentLength`:
 *    a. If `currentLength` is greater than or equal to `zero`, add `dpArray[currentLength - zero]` to `dpArray[currentLength]`. This accounts for strings formed by appending `zero` characters.
 *    b. If `currentLength` is greater than or equal to `one`, add `dpArray[currentLength - one]` to `dpArray[currentLength]`. This accounts for strings formed by appending `one` characters.
 *    c. Apply the modulo operation (`1e9 + 7`) after each addition to prevent overflow.
 * 4. Initialize a `totalCount` variable to 0.
 * 5. Iterate `finalLength` from `low` to `high`. For each `finalLength`, add `dpArray[finalLength]` to `totalCount`.
 * 6. Apply the modulo operation to `totalCount` after each addition.
 * 7. Return `totalCount`.
 * Dry Run: low = 2, high = 3, zero = 1, one = 2
 * modulusValue = 1e9 + 7
 * dpArray = [0, 0, 0, 0]
 * dpArray[0] = 1 => dpArray = [1, 0, 0, 0]
 *
 * currentLength = 1:
 *   1 >= zero (1 >= 1): dpArray[1] = (dpArray[1] + dpArray[0]) % modulusValue = (0 + 1) % modulusValue = 1
 *   1 >= one (1 >= 2) is false.
 *   dpArray = [1, 1, 0, 0]
 * currentLength = 2:
 *   2 >= zero (2 >= 1): dpArray[2] = (dpArray[2] + dpArray[1]) % modulusValue = (0 + 1) % modulusValue = 1
 *   2 >= one (2 >= 2): dpArray[2] = (dpArray[2] + dpArray[0]) % modulusValue = (1 + 1) % modulusValue = 2
 *   dpArray = [1, 1, 2, 0]
 * currentLength = 3:
 *   3 >= zero (3 >= 1): dpArray[3] = (dpArray[3] + dpArray[2]) % modulusValue = (0 + 2) % modulusValue = 2
 *   3 >= one (3 >= 2): dpArray[3] = (dpArray[3] + dpArray[1]) % modulusValue = (2 + 1) % modulusValue = 3
 *   dpArray = [1, 1, 2, 3]
 *
 * totalCount = 0
 *
 * finalLength = 2:
 *   totalCount = (totalCount + dpArray[2]) % modulusValue = (0 + 2) % modulusValue = 2
 * finalLength = 3:
 *   totalCount = (totalCount + dpArray[3]) % modulusValue = (2 + 3) % modulusValue = 5
 *
 * Return 5.
 * Time Complexity: O(high)
 * Space Complexity: O(high)
 */
var countGoodStrings = function (low, high, zero, one) {
  const modulusValue = 1e9 + 7;
  const dpArray = new Array(high + 1).fill(0);
  dpArray[0] = 1;

  for (let currentLength = 1; currentLength <= high; currentLength++) {
    if (currentLength >= zero) {
      dpArray[currentLength] =
        (dpArray[currentLength] + dpArray[currentLength - zero]) % modulusValue;
    }
    if (currentLength >= one) {
      dpArray[currentLength] =
        (dpArray[currentLength] + dpArray[currentLength - one]) % modulusValue;
    }
  }

  let totalCount = 0;
  for (let finalLength = low; finalLength <= high; finalLength++) {
    totalCount = (totalCount + dpArray[finalLength]) % modulusValue;
  }

  return totalCount;
};

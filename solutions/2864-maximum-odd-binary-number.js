/**
 * Maximum Odd Binary Number
 * Intuition: To construct the maximum odd binary number, the last bit must be '1' to ensure oddness. All other '1's should be placed at the most significant (leftmost) positions to maximize the number's value. The remaining positions are filled with '0's.
 * Approach: 1. Count the total number of '1's in the input string. 2. To satisfy the "odd" condition, reserve one '1' for the very last position. 3. Place all remaining '1's at the beginning of the string. 4. Fill the middle section with '0's for all remaining character slots.
 * Dry Run: s = "0101"
 *   1. Initialize `oneCounter` to 0.
 *   2. Iterate through s:
 *      - `charIndex = 0`, `s[0] = '0'`. `oneCounter` remains 0.
 *      - `charIndex = 1`, `s[1] = '1'`. `oneCounter` becomes 1.
 *      - `charIndex = 2`, `s[2] = '0'`. `oneCounter` remains 1.
 *      - `charIndex = 3`, `s[3] = '1'`. `oneCounter` becomes 2.
 *   3. Loop finishes. `oneCounter` is 2.
 *   4. `strLength` is `s.length` which is 4.
 *   5. `leadingOnesCount = oneCounter - 1 = 2 - 1 = 1`.
 *   6. `zeroBitsCount = strLength - oneCounter = 4 - 2 = 2`.
 *   7. `firstPart = "1".repeat(leadingOnesCount)` which is `"1".repeat(1)` = `"1"`.
 *   8. `middlePart = "0".repeat(zeroBitsCount)` which is `"0".repeat(2)` = `"00"`.
 *   9. `lastPart = "1"`.
 *  10. `finalResult = firstPart + middlePart + lastPart = "1" + "00" + "1" = "1001"`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumOddBinaryNumber = function (s) {
  let oneCounter = 0;
  const strLength = s.length;

  for (let charIndex = 0; charIndex < strLength; charIndex++) {
    if (s[charIndex] === "1") {
      oneCounter++;
    }
  }

  const leadingOnesCount = oneCounter - 1;
  const zeroBitsCount = strLength - oneCounter;

  const firstPart = "1".repeat(leadingOnesCount);
  const middlePart = "0".repeat(zeroBitsCount);
  const lastPart = "1";

  const finalResult = firstPart + middlePart + lastPart;
  return finalResult;
};

/**
 * Decode Ways II
 * Intuition: Track ways to decode ending at the previous char (`waysEndingCurrent`) plus ways waiting for a second digit after a leading 1 or 2 (`waysEndingWithOne` / `waysEndingWithTwo`). `*` branches over 1–9 (and 10–26 for pairs).
 * Approach: 1. For each char, reset totals. 2. If `*`, add 9*current + 9*ones + 6*twos and set both pending-pair flags to current. 3. Else add current if not '0', always add ones, add twos if digit ≤ '6'; set next-one/two if digit is 1 or 2. 4. Roll the three states modulo 10^9+7.
 * Dry Run: s = "1*".
 *   - '1': total=1, nextWaysEndingWithOne=1. '*': 9*1 + 9*1 + 6*0 = 18. Return 18.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numDecodings = function (s) {
  const moduloValue = 1e9 + 7;
  let waysEndingCurrent = 1;
  let waysEndingWithOne = 0;
  let waysEndingWithTwo = 0;

  let calculatedTotalWays = 0;
  let nextWaysEndingWithOne = 0;
  let nextWaysEndingWithTwo = 0;

  for (const stringElement of s) {
    calculatedTotalWays = 0;
    nextWaysEndingWithOne = 0;
    nextWaysEndingWithTwo = 0;

    if (stringElement === "*") {
      calculatedTotalWays =
        (calculatedTotalWays + 9 * waysEndingCurrent) % moduloValue;

      calculatedTotalWays =
        (calculatedTotalWays + 9 * waysEndingWithOne) % moduloValue;

      calculatedTotalWays =
        (calculatedTotalWays + 6 * waysEndingWithTwo) % moduloValue;

      nextWaysEndingWithOne = waysEndingCurrent;
      nextWaysEndingWithTwo = waysEndingCurrent;
    } else {
      if (stringElement !== "0") {
        calculatedTotalWays =
          (calculatedTotalWays + waysEndingCurrent) % moduloValue;
      }

      calculatedTotalWays =
        (calculatedTotalWays + waysEndingWithOne) % moduloValue;

      if (stringElement <= "6") {
        calculatedTotalWays =
          (calculatedTotalWays + waysEndingWithTwo) % moduloValue;
      }

      if (stringElement === "1") {
        nextWaysEndingWithOne = waysEndingCurrent;
      }
      if (stringElement === "2") {
        nextWaysEndingWithTwo = waysEndingCurrent;
      }
    }

    waysEndingCurrent = calculatedTotalWays;
    waysEndingWithOne = nextWaysEndingWithOne;
    waysEndingWithTwo = nextWaysEndingWithTwo;
  }

  return waysEndingCurrent;
};

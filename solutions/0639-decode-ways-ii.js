/**
 * Decode Ways II
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

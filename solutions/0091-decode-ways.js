/**
 * Decode Ways
 * Intuition: A string of digits decodes like Fibonacci: a valid 1-digit (1–9) continues ways[i-1], a valid 2-digit (10–26) adds ways[i-2]; leading zero is impossible.
 * Approach: 1. Empty or leading '0' → 0. 2. dp[0]=1, dp[1]=1. 3. For i=2..n, add dp[i-1] if s[i-1] is 1–9, add dp[i-2] if s[i-2..i-1] is 10–26. 4. Return dp[n].
 * Dry Run: s="226" → dp: 1,1 → "2" ok →2; "22" ok → 1+2=3; "6" ok, "26" ok → 2+3=3
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numDecodings = function (s) {
  const stringLength = s.length;

  if (s === null || stringLength === 0) {
    return 0;
  }

  if (s[0] === "0") {
    return 0;
  }

  const memoizationTable = new Array(stringLength + 1).fill(0);
  memoizationTable[0] = 1;
  memoizationTable[1] = 1;

  for (
    let currentIteration = 2;
    currentIteration <= stringLength;
    currentIteration++
  ) {
    const singleDigitString = s.substring(
      currentIteration - 1,
      currentIteration
    );
    const parsedSingleDigit = Number(singleDigitString);
    if (parsedSingleDigit >= 1 && parsedSingleDigit <= 9) {
      memoizationTable[currentIteration] +=
        memoizationTable[currentIteration - 1];
    }

    const doubleDigitString = s.substring(
      currentIteration - 2,
      currentIteration
    );
    const parsedDoubleDigit = Number(doubleDigitString);
    if (parsedDoubleDigit >= 10 && parsedDoubleDigit <= 26) {
      memoizationTable[currentIteration] +=
        memoizationTable[currentIteration - 2];
    }
  }

  return memoizationTable[stringLength];
};

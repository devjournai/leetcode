/**
 * Count Different Palindromic Subsequences
 * Intuition: `dynamicProgrammingTable[i][j]` counts distinct palindromic subsequences in `s[i..j]`. If ends differ, inclusion-exclusion of the two smaller intervals. If they match letter `c`, double the inner count and add/subtract inner `c...c` palindromes depending how many times `c` appears inside.
 * Approach: 1. Precompute `nextLetterPosition` / `prevLetterPosition` for all 26 letters. 2. Length-1 intervals are 1. 3. Increasing length: unmatched ends combine inner DPs; matched ends use first/last inner `c` to choose +2, +1, or subtract the open inner interval. 4. Mod 1e9+7; return dp[0][n-1].
 * Dry Run: "bccb". Distinct palindromes include b, c, bb, cc, bcb, bccb → 6.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var countPalindromicSubsequences = function (s) {
  const MOD_VAL = 1e9 + 7;
  const stringLength = s.length;

  const dynamicProgrammingTable = new Array(stringLength)
    .fill(0)
    .map(() => new Array(stringLength).fill(0));

  const nextLetterPosition = new Array(stringLength)
    .fill(0)
    .map(() => new Array(26).fill(stringLength));
  const prevLetterPosition = new Array(stringLength)
    .fill(0)
    .map(() => new Array(26).fill(-1));

  for (let currentIdx = stringLength - 1; currentIdx >= 0; currentIdx--) {
    if (currentIdx < stringLength - 1) {
      for (let charCodeOffset = 0; charCodeOffset < 26; charCodeOffset++) {
        nextLetterPosition[currentIdx][charCodeOffset] =
          nextLetterPosition[currentIdx + 1][charCodeOffset];
      }
    }
    const currentCharacterCode = s.charCodeAt(currentIdx) - "a".charCodeAt(0);
    nextLetterPosition[currentIdx][currentCharacterCode] = currentIdx;
  }

  for (let currentIdx = 0; currentIdx < stringLength; currentIdx++) {
    if (currentIdx > 0) {
      for (let charCodeOffset = 0; charCodeOffset < 26; charCodeOffset++) {
        prevLetterPosition[currentIdx][charCodeOffset] =
          prevLetterPosition[currentIdx - 1][charCodeOffset];
      }
    }
    const currentCharacterCode = s.charCodeAt(currentIdx) - "a".charCodeAt(0);
    prevLetterPosition[currentIdx][currentCharacterCode] = currentIdx;
  }

  for (let singleCharIdx = 0; singleCharIdx < stringLength; singleCharIdx++) {
    dynamicProgrammingTable[singleCharIdx][singleCharIdx] = 1;
  }

  for (let currentLength = 2; currentLength <= stringLength; currentLength++) {
    for (
      let startIndex = 0;
      startIndex <= stringLength - currentLength;
      startIndex++
    ) {
      const endIndex = startIndex + currentLength - 1;
      const startCharacterCode = s.charCodeAt(startIndex) - "a".charCodeAt(0);
      const endCharacterCode = s.charCodeAt(endIndex) - "a".charCodeAt(0);

      if (startCharacterCode !== endCharacterCode) {
        let sumWithoutMatch =
          (dynamicProgrammingTable[startIndex + 1][endIndex] +
            dynamicProgrammingTable[startIndex][endIndex - 1] -
            dynamicProgrammingTable[startIndex + 1][endIndex - 1]) %
          MOD_VAL;
        if (sumWithoutMatch < 0) sumWithoutMatch += MOD_VAL;
        dynamicProgrammingTable[startIndex][endIndex] = sumWithoutMatch;
      } else {
        const firstInnerMatch =
          nextLetterPosition[startIndex + 1][startCharacterCode];
        const lastInnerMatch =
          prevLetterPosition[endIndex - 1][startCharacterCode];

        if (firstInnerMatch > lastInnerMatch) {
          let resultNoInnerMatch =
            (2 * dynamicProgrammingTable[startIndex + 1][endIndex - 1] + 2) %
            MOD_VAL;
          if (resultNoInnerMatch < 0) resultNoInnerMatch += MOD_VAL;
          dynamicProgrammingTable[startIndex][endIndex] = resultNoInnerMatch;
        } else if (firstInnerMatch === lastInnerMatch) {
          let resultSingleInnerMatch =
            (2 * dynamicProgrammingTable[startIndex + 1][endIndex - 1] + 1) %
            MOD_VAL;
          if (resultSingleInnerMatch < 0) resultSingleInnerMatch += MOD_VAL;
          dynamicProgrammingTable[startIndex][endIndex] =
            resultSingleInnerMatch;
        } else {
          let resultMultipleInnerMatch =
            (2 * dynamicProgrammingTable[startIndex + 1][endIndex - 1] -
              dynamicProgrammingTable[firstInnerMatch + 1][
                lastInnerMatch - 1
              ]) %
            MOD_VAL;
          if (resultMultipleInnerMatch < 0) resultMultipleInnerMatch += MOD_VAL;
          dynamicProgrammingTable[startIndex][endIndex] =
            resultMultipleInnerMatch;
        }
      }
    }
  }

  return dynamicProgrammingTable[0][stringLength - 1];
};

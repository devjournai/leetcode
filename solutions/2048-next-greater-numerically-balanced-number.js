/**
 * Next Greater Numerically Balanced Number
 * Intuition: Numerically balanced numbers are sparse, and their magnitude doesn't grow excessively large for inputs up to 10^6. The problem asks for the smallest balanced number strictly greater than n. A direct search starting from n+1 up to a reasonable upper bound (like 10^7, which covers all 7-digit balanced numbers) combined with a robust `isBalanced` check is a viable approach.
 * Approach: 1. Initialize a `currentCandidate` to `n + 1`. 2. Iterate `currentCandidate` upwards, checking each number until a numerically balanced number is found or an upper limit (e.g., 10,000,000) is reached. 3. The `isBalanced` helper function verifies if a number meets the criteria: convert the number to a string, count the frequency of each digit, then iterate through the digit frequencies to confirm that for every digit 'd' present in the number, its count is exactly 'd'. This also naturally disallows the digit '0' (as 0 occurrences of '0' means it shouldn't be in the number, but if it is, its count must be 0, which is a contradiction if it's present).
 * Dry Run: n = 1
 *   1. `nextBeautifulNumber(1)` is called. `currentCandidate` is set to `1 + 1 = 2`. `searchLimit` is `10000000`.
 *   2. Loop starts: `currentCandidate` is `2`.
 *      - Call `isBalanced(2)`:
 *        - `numberToVerify` = `2`. `digitFrequencyArray` = `[0,0,0,0,0,0,0,0,0,0]`. `numberAsString` = `"2"`.
 *        - First loop: `characterIndex = 0`. `digitCharacter` = `"2"`. `parsedDigit` = `2`. `digitFrequencyArray[2]` becomes `1`.
 *        - Second loop:
 *          - `frequencyIndex = 0`: `currentFrequency` = `0`. No condition met.
 *          - `frequencyIndex = 1`: `currentFrequency` = `0`. No condition met.
 *          - `frequencyIndex = 2`: `currentFrequency` = `1`. Condition `(1 > 0 && 1 !== 2)` is true. `isBalanced` returns `false`.
 *   3. `isBalanced(2)` returned `false`. `currentCandidate` increments to `3`.
 *   4. ... This continues for `3` through `21`, all return `false` from `isBalanced`.
 *   5. `currentCandidate` is `22`.
 *      - Call `isBalanced(22)`:
 *        - `numberToVerify` = `22`. `digitFrequencyArray` = `[0,0,0,0,0,0,0,0,0,0]`. `numberAsString` = `"22"`.
 *        - First loop:
 *          - `characterIndex = 0`. `digitCharacter` = `"2"`. `parsedDigit` = `2`. `digitFrequencyArray[2]` becomes `1`.
 *          - `characterIndex = 1`. `digitCharacter` = `"2"`. `parsedDigit` = `2`. `digitFrequencyArray[2]` becomes `2`.
 *          - `digitFrequencyArray` is `[0,0,2,0,0,0,0,0,0,0]`.
 *        - Second loop:
 *          - `frequencyIndex = 0`: `currentFrequency` = `0`. No condition met.
 *          - `frequencyIndex = 1`: `currentFrequency` = `0`. No condition met.
 *          - `frequencyIndex = 2`: `currentFrequency` = `2`. Condition `(2 > 0 && 2 !== 2)` is false. Continue.
 *          - `frequencyIndex = 3` to `9`: `currentFrequency` = `0`. No condition met.
 *        - Second loop finishes. `isBalanced` returns `true`.
 *   6. `isBalanced(22)` returned `true`. The `nextBeautifulNumber` function returns `currentCandidate`, which is `22`.
 * Time Complexity: O(M * log10(M))
 * Space Complexity: O(log10(M))
 */
var nextBeautifulNumber = function (n) {
  const checkBalance = (numberToVerify) => {
    const digitFrequencyArray = new Array(10).fill(0);
    const numberAsString = numberToVerify.toString();

    for (
      let characterIndex = 0;
      characterIndex < numberAsString.length;
      characterIndex++
    ) {
      const digitCharacter = numberAsString[characterIndex];
      const parsedDigit = parseInt(digitCharacter);
      digitFrequencyArray[parsedDigit]++;
    }

    for (
      let frequencyIndex = 0;
      frequencyIndex < digitFrequencyArray.length;
      frequencyIndex++
    ) {
      const currentFrequency = digitFrequencyArray[frequencyIndex];
      if (currentFrequency > 0 && currentFrequency !== frequencyIndex) {
        return false;
      }
    }

    return true;
  };

  let currentCandidate = n + 1;
  const searchLimit = 10000000;
  const resultIfNotFound = -1;

  while (currentCandidate <= searchLimit) {
    if (checkBalance(currentCandidate)) {
      return currentCandidate;
    }
    currentCandidate++;
  }

  return resultIfNotFound;
};

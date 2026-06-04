/**
 * Find Palindrome With Fixed Length
 * Intuition: Palindromes are symmetric, meaning their structure is determined by their first half. We can generate the K-th smallest palindrome of a given length by finding the K-th smallest number that can form its first half and then mirroring it.
 * Approach: 1. Calculate the `halfComponentLength`, which is `ceil(intLength / 2)`. This represents the number of digits in the first half of the palindrome. 2. Determine `firstHalfBase`, the smallest number with `halfComponentLength` digits (e.g., 10 for `halfComponentLength = 2`). This is `10^(halfComponentLength - 1)`. 3. Calculate `maximumCount`, the total number of unique valid first halves possible. This is `9 * firstHalfBase`. If a query value exceeds `maximumCount`, no such palindrome exists, and -1 is returned. 4. For each `currentQueryValue` in `queriesInput`: a. Compute `initialHalfConstruct` as `firstHalfBase + currentQueryValue - 1`. This is the `currentQueryValue`-th smallest number eligible to be the palindrome's first half. b. Initialize `finalPalindromeNumber` with `initialHalfConstruct`. c. Prepare `partToReverse`. If `intLength` is odd, the middle digit of the palindrome is the last digit of `initialHalfConstruct`, so `partToReverse` becomes `floor(initialHalfConstruct / 10)` to exclude this middle digit from the reversal. If `intLength` is even, `partToReverse` is `initialHalfConstruct` itself. d. Construct the palindrome by iterating through `partToReverse` using a `for` loop. In each iteration, extract the last digit of `tempReverseSource`, append it to `finalPalindromeNumber` by multiplying by 10 and adding the digit, then remove the last digit from `tempReverseSource` by integer division. e. The `finalPalindromeNumber` is the result for the current query.
 * Dry Run: queriesInput = [1, 5], lengthOfInt = 4
 * 1. `halfComponentLength = ceil(4 / 2) = 2`
 * 2. `firstHalfBase = 10^(2 - 1) = 10`
 * 3. `maximumCount = 10 * 9 = 90`
 *
 * For `currentQueryValue = 1`:
 *    - `1 > 90` is false.
 *    - `initialHalfConstruct = 10 + 1 - 1 = 10`.
 *    - `finalPalindromeNumber = 10`.
 *    - `lengthOfInt` (4) is even, so `partToReverse = 10`.
 *    - `for (tempReverseSource = 10; tempReverseSource > 0; ...)`:
 *        - `tempReverseSource = 10`: `digitToAppend = 0`. `finalPalindromeNumber = 10 * 10 + 0 = 100`. `tempReverseSource = floor(10 / 10) = 1`.
 *        - `tempReverseSource = 1`: `digitToAppend = 1`. `finalPalindromeNumber = 100 * 10 + 1 = 1001`. `tempReverseSource = floor(1 / 10) = 0`.
 *    - Loop ends. Returns `1001`.
 *
 * For `currentQueryValue = 5`:
 *    - `5 > 90` is false.
 *    - `initialHalfConstruct = 10 + 5 - 1 = 14`.
 *    - `finalPalindromeNumber = 14`.
 *    - `lengthOfInt` (4) is even, so `partToReverse = 14`.
 *    - `for (tempReverseSource = 14; tempReverseSource > 0; ...)`:
 *        - `tempReverseSource = 14`: `digitToAppend = 4`. `finalPalindromeNumber = 14 * 10 + 4 = 144`. `tempReverseSource = floor(14 / 10) = 1`.
 *        - `tempReverseSource = 1`: `digitToAppend = 1`. `finalPalindromeNumber = 144 * 10 + 1 = 1441`. `tempReverseSource = floor(1 / 10) = 0`.
 *    - Loop ends. Returns `1441`.
 *
 * Result: `[1001, 1441]`
 * Time Complexity: O(Q * intLength)
 * Space Complexity: O(Q)
 */
var kthPalindrome = function (queriesInput, lengthOfInt) {
  const halfComponentLength = Math.ceil(lengthOfInt / 2);
  const firstHalfBase = Math.pow(10, halfComponentLength - 1);
  const maximumCount = firstHalfBase * 9;

  const processQuery = (currentQueryValue) => {
    if (currentQueryValue > maximumCount) {
      return -1;
    }

    const initialHalfConstruct = firstHalfBase + currentQueryValue - 1;
    let finalPalindromeNumber = initialHalfConstruct;

    let partToReverse = initialHalfConstruct;
    if (lengthOfInt % 2 === 1) {
      partToReverse = Math.floor(partToReverse / 10);
    }

    for (
      let tempReverseSource = partToReverse;
      tempReverseSource > 0;
      tempReverseSource = Math.floor(tempReverseSource / 10)
    ) {
      const digitToAppend = tempReverseSource % 10;
      finalPalindromeNumber = finalPalindromeNumber * 10 + digitToAppend;
    }

    return finalPalindromeNumber;
  };

  return queriesInput.map(processQuery);
};

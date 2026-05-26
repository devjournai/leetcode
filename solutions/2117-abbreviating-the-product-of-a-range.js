/**
 * Abbreviating The Product Of A Range
 * Intuition: The problem involves calculating a potentially colossal product and then abbreviating it based on specific rules for trailing zeros, total digits, and leading/trailing segments. The core idea is to separately calculate the total count of trailing zeros, estimate the total number of digits using logarithms, and then handle two main cases: if the number of significant digits is small, compute the exact value; otherwise, use floating-point arithmetic for leading digits and BigInt modulo arithmetic for trailing digits.
 * Approach:
 * 1. Initialize `twoFactorCount` and `fiveFactorCount` to determine the total number of trailing zeros. Iterate from `left` to `right` using `currentNum`. For each `currentNum`, find and sum up its factors of 2 and 5 by repeatedly dividing temporary copies (`tempNumberForTwo`, `tempNumberForFive`). The minimum of `twoFactorCount` and `fiveFactorCount` is `totalTrailingZeros (C)`.
 * 2. Estimate the total number of digits (`d_gross`) in the product. Iterate from `left` to `right` using `currentLogNumber`. Sum `Math.log10(currentLogNumber)` into `logSumOfNumbers`. `d_gross` is `Math.floor(logSumOfNumbers) + 1`.
 * 3. Calculate `effectiveDigits`, which is `d_gross - totalTrailingZeros`. If `effectiveDigits` is 10 or less, proceed to calculate the full product. Otherwise, proceed with abbreviation.
 * 4. Case 1: `effectiveDigits <= 10` (No abbreviation for the core number).
 *    a. Initialize `fullProductValue` as `1n` (BigInt).
 *    b. Iterate from `left` to `right` using `productIterator`, multiplying `fullProductValue` by `BigInt(productIterator)`.
 *    c. Remove `totalTrailingZeros` from `fullProductValue` by dividing it by `10n` `totalTrailingZeros` times using `zeroRemovalCount` loop.
 *    d. Return `fullProductValue.toString() + 'e' + totalTrailingZeros`.
 * 5. Case 2: `effectiveDigits > 10` (Abbreviation required).
 *    a. **Calculate Prefix (first 5 digits):**
 *       i. Initialize `leadingProductCollector` as `1.0`.
 *       ii. Iterate from `left` to `right` using `prefixIterator`. Multiply `leadingProductCollector` by `prefixIterator`.
 *       iii. To keep `leadingProductCollector` manageable and ensure it retains leading digits, if it exceeds `1e12` (a large float threshold), repeatedly divide it by 10 until it is below the threshold.
 *       iv. Extract the first 5 digits by taking `Math.floor(leadingProductCollector).toString().slice(0, 5)`.
 *    b. **Calculate Suffix (last 5 digits):**
 *       i. Initialize `finalSuffixCollector` as `1n`.
 *       ii. Iterate from `left` to `right` using `reverseSuffixIterator`. Multiply `finalSuffixCollector` by `BigInt(reverseSuffixIterator)`.
 *       iii. After each multiplication, repeatedly divide `finalSuffixCollector` by `10n` as long as it has trailing zeros, to remove the factors of 10 that contribute to `totalTrailingZeros` and keep the number representing the product *without its own trailing zeros*.
 *       iv. To prevent `finalSuffixCollector` from growing excessively large, apply modulo `10n**15n` after removing trailing zeros. This `10n**15n` is a sufficiently large modulus to ensure the last 5 digits are preserved during intermediate steps.
 *       v. Convert `finalSuffixCollector` to a string. Pad it with leading zeros until its length is at least 5 using `suffixStringValue`. Take the last 5 characters (`finalSuffixString`).
 *    c. Return the combined string `prefixString + '...' + finalSuffixString + 'e' + totalTrailingZeros`.
 * Dry Run: left = 1, right = 10
 * 1. Count Trailing Zeros:
 *    - `currentNum` loop (1 to 10):
 *      - Factors of 2 in numbers: 2(1), 4(2), 6(1), 8(3), 10(1) -> `twoFactorCount` = 1+2+1+3+1 = 8
 *      - Factors of 5 in numbers: 5(1), 10(1) -> `fiveFactorCount` = 1+1 = 2
 *    - `totalTrailingZeros` = min(8, 2) = 2.
 * 2. Estimate Total Digits:
 *    - `currentLogNumber` loop (1 to 10):
 *      - `logSumOfNumbers` = log10(1) + ... + log10(10) = log10(10!) = log10(3628800) ≈ 6.559.
 *    - `totalDigitsGross` = floor(6.559) + 1 = 7.
 * 3. Check for Abbreviation:
 *    - `effectiveDigits` = `totalDigitsGross` - `totalTrailingZeros` = 7 - 2 = 5.
 *    - 5 <= 10. Abbreviation for core product not needed.
 * 4. Case 1: `effectiveDigits <= 10`
 *    - `fullProductValue` initialized to `1n`.
 *    - `productIterator` loop (1 to 10):
 *      - `fullProductValue` becomes 10! = `3628800n`.
 *    - `zeroRemovalCount` loop (0 to 1):
 *      - `fullProductValue` = `3628800n / 10n` = `362880n` (first iteration).
 *      - `fullProductValue` = `362880n / 10n` = `36288n` (second iteration).
 *    - Return `36288n.toString() + 'e' + 2` which is `"36288e2"`.
 * Time Complexity: O((right - left + 1) * D_max_product)
 * Space Complexity: O(D_max_product)
 */
var abbreviateProduct = function (left, right) {
  let twoFactorCount = 0;
  let fiveFactorCount = 0;

  for (let currentNum = left; currentNum <= right; currentNum++) {
    let tempNumberForTwo = currentNum;
    while (tempNumberForTwo > 0 && tempNumberForTwo % 2 === 0) {
      twoFactorCount++;
      tempNumberForTwo /= 2;
    }

    let tempNumberForFive = currentNum;
    while (tempNumberForFive > 0 && tempNumberForFive % 5 === 0) {
      fiveFactorCount++;
      tempNumberForFive /= 5;
    }
  }
  let totalTrailingZeros = Math.min(twoFactorCount, fiveFactorCount);

  let logSumOfNumbers = 0;
  for (
    let currentLogNumber = left;
    currentLogNumber <= right;
    currentLogNumber++
  ) {
    logSumOfNumbers += Math.log10(currentLogNumber);
  }
  let totalDigitsGross = Math.floor(logSumOfNumbers) + 1;

  const thresholdLength = 10;
  let effectiveDigits = totalDigitsGross - totalTrailingZeros;

  if (effectiveDigits <= thresholdLength) {
    let fullProductValue = 1n;
    for (
      let productIterator = left;
      productIterator <= right;
      productIterator++
    ) {
      fullProductValue *= BigInt(productIterator);
    }

    for (
      let zeroRemovalCount = 0;
      zeroRemovalCount < totalTrailingZeros;
      zeroRemovalCount++
    ) {
      fullProductValue /= 10n;
    }
    return fullProductValue.toString() + "e" + totalTrailingZeros;
  } else {
    let leadingProductCollector = 1.0;
    const prefixMultiplierThreshold = 1e12;
    for (let prefixIterator = left; prefixIterator <= right; prefixIterator++) {
      leadingProductCollector *= prefixIterator;
      while (leadingProductCollector >= prefixMultiplierThreshold) {
        leadingProductCollector /= 10;
      }
    }
    let prefixString = Math.floor(leadingProductCollector)
      .toString()
      .slice(0, 5);

    let finalSuffixCollector = 1n;
    const modulusForSuffixValue = 10n ** 15n;
    const minimumLengthForSuffix = 5;

    for (
      let reverseSuffixIterator = left;
      reverseSuffixIterator <= right;
      reverseSuffixIterator++
    ) {
      finalSuffixCollector =
        finalSuffixCollector * BigInt(reverseSuffixIterator);
      while (finalSuffixCollector > 0n && finalSuffixCollector % 10n === 0n) {
        finalSuffixCollector /= 10n;
      }
      finalSuffixCollector %= modulusForSuffixValue;
    }

    let suffixStringValue = finalSuffixCollector.toString();
    while (suffixStringValue.length < minimumLengthForSuffix) {
      suffixStringValue = "0" + suffixStringValue;
    }
    let finalSuffixString = suffixStringValue.slice(-minimumLengthForSuffix);

    return prefixString + "..." + finalSuffixString + "e" + totalTrailingZeros;
  }
};

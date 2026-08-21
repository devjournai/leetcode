/**
 * Count The Number Of Powerful Integers
 * Intuition: The problem asks to count numbers in a range [start, finish] that satisfy two conditions: they end with a given suffix, and all their digits are at most a given limit. This is a classic range query problem, solvable by counting all valid numbers up to 'finish' and subtracting all valid numbers up to 'start - 1'. The core challenge then becomes implementing a function `count(N, limit, suffix)` that counts powerful integers less than or equal to N.
 * Approach:
 * 1. Define a main function `numberOfPowerfulInt` that takes `start`, `finish`, `limit`, and `suffix`.
 * 2. Inside `numberOfPowerfulInt`, subtract 1 from `start` to get `adjustedStartValue`.
 * 3. Call a helper function `determinePowerfulCountUpTo` twice: once with `finish` and once with `adjustedStartValue`.
 * 4. The `determinePowerfulCountUpTo(targetNumberValue, digitMaximum, endingString)` helper function is responsible for counting powerful integers <= `targetNumberValue`.
 *    a. First, check if any digit in `endingString` itself exceeds `digitMaximum`. If so, return 0 as no powerful integer can be formed.
 *    b. Calculate the `basePrefix` value. A powerful number `x` is `prefix * 10^k + suffixValue`. Given `targetNumberValue`, `basePrefix` is the largest integer such that `basePrefix * 10^k + suffixValue <= targetNumberValue`. This involves careful calculation based on `targetNumberValue`, `suffixNumericalRepresentation`, and `suffixPlaceValuePower`.
 *    c. If `basePrefix` is less than or equal to 0, return `basePrefix + 1` (handles cases where no valid prefix exists or only '0' is valid).
 *    d. Convert `basePrefix` to a string (`prefixStringForm`) to perform digit-by-digit counting.
 *    e. Implement a digit DP logic to count non-negative integers `x` such that `x <= basePrefix` and all digits of `x` are `<= digitMaximum`. This logic handles numbers shorter than `prefixStringForm` implicitly, and numbers of the same length by iterating through digits of `prefixStringForm`, counting numbers that are strictly smaller than `basePrefix` at each position, and finally adding 1 if `basePrefix` itself is valid. A special case exists if the first digit of `prefixStringForm` is greater than `digitMaximum`.
 * 5. Return the difference between the two counts from step 3.
 * Dry Run: `start = 1`, `finish = 100`, `limit = 2`, `s = "1"`
 * 1. `adjustedStartValue = 0`.
 * 2. Call `determinePowerfulCountUpTo(100, 2, "1")`:
 *    - `endingString = "1"`, `digitMaximum = 2`. `1 <= 2`. Valid.
 *    - `suffixNumericalRepresentation = 1`, `suffixPlaceValuePower = 10`.
 *    - `basePrefix = Math.floor(100 / 10) = 10`.
 *    - `remainderPart = 100 % 10 = 0`.
 *    - `0 < 1` is true. `basePrefix` becomes `10 - 1 = 9`.
 *    - `basePrefix = 9` (not <= 0).
 *    - `prefixStringForm = "9"`, `stringLength = 1`.
 *    - `initialPrefixDigit = 9`.
 *    - `initialPrefixDigit (9) > digitMaximum (2)` is true.
 *    - Returns `(digitMaximum + 1) ** stringLength = (2 + 1) ** 1 = 3`.
 *    - `finish powerful count = 3`. (Powerful numbers <= 100 ending with "1" and digits <= 2 are "1", "11", "21").
 * 3. Call `determinePowerfulCountUpTo(0, 2, "1")`:
 *    - `endingString = "1"`, `digitMaximum = 2`. `1 <= 2`. Valid.
 *    - `suffixNumericalRepresentation = 1`, `suffixPlaceValuePower = 10`.
 *    - `basePrefix = Math.floor(0 / 10) = 0`.
 *    - `remainderPart = 0 % 10 = 0`.
 *    - `0 < 1` is true. `basePrefix` becomes `0 - 1 = -1`.
 *    - `basePrefix = -1` (is <= 0).
 *    - Returns `basePrefix + 1 = -1 + 1 = 0`.
 *    - `start powerful count = 0`.
 * 4. Final result: `3 - 0 = 3`.
 * Time Complexity: O(log(finish) + suffix.length)
 * Space Complexity: O(log(finish))
 */
var numberOfPowerfulInt = function (
  startValue,
  finishValue,
  digitLimitValue,
  suffixStringValue
) {
  let adjustedStartValue = startValue - 1;
  const finishPowerfulCount = determinePowerfulCountUpTo(
    finishValue,
    digitLimitValue,
    suffixStringValue
  );
  const startPowerfulCount = determinePowerfulCountUpTo(
    adjustedStartValue,
    digitLimitValue,
    suffixStringValue
  );

  return finishPowerfulCount - startPowerfulCount;
};

function determinePowerfulCountUpTo(
  targetNumberValue,
  digitMaximum,
  endingString
) {
  for (
    let currentSuffixCharIndex = 0;
    currentSuffixCharIndex < endingString.length;
    currentSuffixCharIndex++
  ) {
    const charToNum = endingString.charCodeAt(currentSuffixCharIndex) - 48;
    if (charToNum > digitMaximum) {
      return 0;
    }
  }

  const suffixNumericalRepresentation = parseInt(endingString, 10);
  const suffixPlaceValuePower = 10 ** endingString.length;

  let basePrefix = Math.floor(targetNumberValue / suffixPlaceValuePower);
  const remainderPart = targetNumberValue % suffixPlaceValuePower;

  if (remainderPart < suffixNumericalRepresentation) {
    basePrefix--;
  }

  if (basePrefix <= 0) {
    return basePrefix + 1;
  }

  const prefixStringForm = basePrefix.toString();
  const stringLength = prefixStringForm.length;

  let totalPrefixesCalculated = 0;
  let currentMatchExact = true;

  const initialPrefixDigit = prefixStringForm.charCodeAt(0) - 48;

  if (initialPrefixDigit > digitMaximum) {
    return (digitMaximum + 1) ** stringLength;
  }

  totalPrefixesCalculated = initialPrefixDigit;

  for (
    let prefixPositionIndex = 1;
    prefixPositionIndex < stringLength;
    prefixPositionIndex++
  ) {
    totalPrefixesCalculated *= digitMaximum + 1;

    if (currentMatchExact) {
      const currentNumericalCharacter =
        prefixStringForm.charCodeAt(prefixPositionIndex) - 48;
      if (currentNumericalCharacter > digitMaximum) {
        currentMatchExact = false;
        totalPrefixesCalculated += digitMaximum + 1;
      } else {
        totalPrefixesCalculated += currentNumericalCharacter;
      }
    }
  }

  return totalPrefixesCalculated + (currentMatchExact ? 1 : 0);
}

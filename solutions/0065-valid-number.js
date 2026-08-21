/**
 * Valid Number
 * Intuition: A valid number is an optional sign, a mantissa with digits (and at most one '.'), then an optional exponent 'e'/'E' with its own optional sign and digits. A linear scan enforces that grammar.
 * Approach: 1. Trim spaces; reject empty. 2. Skip a leading +/−. 3. Consume digits, optionally a '.', then more digits; require at least one digit so far. 4. If 'e'/'E' appears, skip an optional sign and require at least one exponent digit. 5. Accept only if the pointer consumed the whole string.
 * Dry Run: s = " -90E3 ".
 *   - Trim → "-90E3". Skip '-', digits "90", then 'E', skip no sign, digits "3", pointer at end → true.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var isNumber = function (s) {
  const trimmedInput = s.trim();
  const inputLength = trimmedInput.length;

  if (inputLength === 0) {
    return false;
  }

  let currentPointerIndex = 0;
  let hasSeenAnyDigit = false;

  const initialCharacter = trimmedInput[currentPointerIndex];
  if (initialCharacter === "+" || initialCharacter === "-") {
    currentPointerIndex++;
  }

  while (
    currentPointerIndex < inputLength &&
    trimmedInput[currentPointerIndex] >= "0" &&
    trimmedInput[currentPointerIndex] <= "9"
  ) {
    hasSeenAnyDigit = true;
    currentPointerIndex++;
  }

  if (
    currentPointerIndex < inputLength &&
    trimmedInput[currentPointerIndex] === "."
  ) {
    hasSeenDecimalPoint = true;
    currentPointerIndex++;
    while (
      currentPointerIndex < inputLength &&
      trimmedInput[currentPointerIndex] >= "0" &&
      trimmedInput[currentPointerIndex] <= "9"
    ) {
      hasSeenAnyDigit = true;
      currentPointerIndex++;
    }
  }

  if (!hasSeenAnyDigit) {
    return false;
  }

  if (
    currentPointerIndex < inputLength &&
    (trimmedInput[currentPointerIndex] === "e" ||
      trimmedInput[currentPointerIndex] === "E")
  ) {
    hasSeenExponentMarker = true;
    currentPointerIndex++;

    const exponentSignCharacter = trimmedInput[currentPointerIndex];
    if (exponentSignCharacter === "+" || exponentSignCharacter === "-") {
      currentPointerIndex++;
    }

    let hasSeenExponentDigits = false;
    while (
      currentPointerIndex < inputLength &&
      trimmedInput[currentPointerIndex] >= "0" &&
      trimmedInput[currentPointerIndex] <= "9"
    ) {
      hasSeenExponentDigits = true;
      currentPointerIndex++;
    }

    if (!hasSeenExponentDigits) {
      return false;
    }
  }

  return currentPointerIndex === inputLength;
};

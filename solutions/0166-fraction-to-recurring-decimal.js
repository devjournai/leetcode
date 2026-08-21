/**
 * Fraction To Recurring Decimal
 * Intuition: Long division of the remainder produces decimal digits. If a remainder repeats, the digits from that index form a cycle and should be wrapped in parentheses.
 * Approach: 1. If `numerator` is 0, return "0". 2. Prefix "-" when signs differ. 3. Work with absolute values; append the integer quotient; if remainder is 0, return. 4. Append ".". 5. Map remainder → index in `fractionalDigitsBuffer`. 6. While remainder ≠ 0, if seen, splice "(" at that index and push ")"; else record remainder, multiply by 10, push the next digit, remainder %= denominator. 7. Join buffer onto the string.
 * Dry Run: numerator = 4, denominator = 333
 * Integer 0, remainder 4 → digits 0,1,2 with remainders cycling at 4 → "0.(012)"
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var fractionToDecimal = function (numerator, denominator) {
  if (numerator === 0) {
    return "0";
  }

  let finalOutputString = "";

  let isNegative = numerator < 0 !== denominator < 0;
  if (isNegative) {
    finalOutputString += "-";
  }

  let absoluteNumerator = Math.abs(numerator);
  let absoluteDenominator = Math.abs(denominator);

  let integerPart = Math.floor(absoluteNumerator / absoluteDenominator);
  finalOutputString += integerPart;

  let currentIterationRemainder = absoluteNumerator % absoluteDenominator;
  if (currentIterationRemainder === 0) {
    return finalOutputString;
  }

  finalOutputString += ".";

  let remainderLookupMap = new Map();
  let fractionalDigitsBuffer = [];

  while (currentIterationRemainder !== 0) {
    if (remainderLookupMap.has(currentIterationRemainder)) {
      let cycleStartingIndex = remainderLookupMap.get(
        currentIterationRemainder
      );
      fractionalDigitsBuffer.splice(cycleStartingIndex, 0, "(");
      fractionalDigitsBuffer.push(")");
      break;
    }

    remainderLookupMap.set(
      currentIterationRemainder,
      fractionalDigitsBuffer.length
    );

    currentIterationRemainder *= 10;
    let nextDecimalDigit = Math.floor(
      currentIterationRemainder / absoluteDenominator
    );
    fractionalDigitsBuffer.push(nextDecimalDigit);

    currentIterationRemainder %= absoluteDenominator;
  }

  finalOutputString += fractionalDigitsBuffer.join("");
  return finalOutputString;
};

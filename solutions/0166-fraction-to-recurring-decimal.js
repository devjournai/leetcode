/**
 * Fraction To Recurring Decimal
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
        currentIterationRemainder,
      );
      fractionalDigitsBuffer.splice(cycleStartingIndex, 0, "(");
      fractionalDigitsBuffer.push(")");
      break;
    }

    remainderLookupMap.set(
      currentIterationRemainder,
      fractionalDigitsBuffer.length,
    );

    currentIterationRemainder *= 10;
    let nextDecimalDigit = Math.floor(
      currentIterationRemainder / absoluteDenominator,
    );
    fractionalDigitsBuffer.push(nextDecimalDigit);

    currentIterationRemainder %= absoluteDenominator;
  }

  finalOutputString += fractionalDigitsBuffer.join("");
  return finalOutputString;
};

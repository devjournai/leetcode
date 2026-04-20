/**
 * Equal Rational Numbers
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var isRationalEqual = function (s, t) {
  const firstValueConverted = convertDecimalToFloat(s);
  const secondValueConverted = convertDecimalToFloat(t);

  const toleranceThreshold = 1e-10;

  return (
    Math.abs(firstValueConverted - secondValueConverted) < toleranceThreshold
  );

  function convertDecimalToFloat(inputRepresentation) {
    const partsOfNumber = inputRepresentation.split(".");

    const integerPartStr = partsOfNumber[0];
    const parsedInteger = parseInt(integerPartStr, 10);

    if (partsOfNumber.length === 1) {
      return parsedInteger;
    }

    const fractionalPartStr = partsOfNumber[1];
    const parenthesisPosition = fractionalPartStr.indexOf("(");

    if (parenthesisPosition === -1) {
      const nonRepeatingDecimalStr = `0.${fractionalPartStr}`;
      const nonRepeatingDecimalVal = parseFloat(nonRepeatingDecimalStr);
      return parsedInteger + nonRepeatingDecimalVal;
    }

    const preRepeatDigits = fractionalPartStr.slice(0, parenthesisPosition);
    const cycleDigits = fractionalPartStr.slice(
      parenthesisPosition + 1,
      fractionalPartStr.length - 1,
    );

    let preRepeatNumeric = 0;
    if (preRepeatDigits.length > 0) {
      const decimalForPreRepeat = `0.${preRepeatDigits}`;
      preRepeatNumeric = parseFloat(decimalForPreRepeat);
    }

    const cycleNumeric = parseInt(cycleDigits, 10);
    const cycleDenominator = Math.pow(10, cycleDigits.length) - 1;
    const preRepeatPowerShift = Math.pow(10, preRepeatDigits.length);

    const cycleContribution =
      cycleNumeric / cycleDenominator / preRepeatPowerShift;

    return parsedInteger + preRepeatNumeric + cycleContribution;
  }
};

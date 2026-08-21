/**
 * Equal Rational Numbers
 * Intuition: Convert each string to a float: integer part plus non-repeating decimals plus repeating block as `cycleNumeric / (10^len−1)` shifted by the pre-repeat length, then compare within `1e-10`.
 * Approach: 1. `convertDecimalToFloat` splits on `.`. 2. No fraction → integer. 3. No `(` → parseFloat of `0.frac`. 4. Else parse pre-repeat and repeating group via the geometric-series formula. 5. Return abs(s−t) < tolerance.
 * Dry Run: s = "0.9(9)", t = "1.". 0.9 + 9/9/10 = 1.0, t is 1. Difference 0 < 1e-10. True.
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
      fractionalPartStr.length - 1
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

/**
 * Complex Number Multiplication
 * Intuition: Parse `a+bi` strings, then multiply as `(a+bi)(c+di) = (ac-bd) + (ad+bc)i`.
 * Approach: 1. Split each string at `+`; real is before, imaginary is between `+` and trailing `i`. 2. `parseInt` both parts. 3. Real = ac-bd, imag = ad+bc. 4. Format `${real}+${imag}i`.
 * Dry Run: "1+1i" * "1+1i".
 *   - (1*1 - 1*1) + (1*1 + 1*1)i = 0+2i. Return "0+2i".
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var complexNumberMultiply = function (num1, num2) {
  const firstPlusIndex = num1.indexOf("+");
  const firstRealSubstr = num1.substring(0, firstPlusIndex);
  const firstImaginarySubstr = num1.substring(
    firstPlusIndex + 1,
    num1.length - 1
  );
  const realValueOne = parseInt(firstRealSubstr);
  const imaginaryValueOne = parseInt(firstImaginarySubstr);

  const secondPlusIndex = num2.indexOf("+");
  const secondRealSubstr = num2.substring(0, secondPlusIndex);
  const secondImaginarySubstr = num2.substring(
    secondPlusIndex + 1,
    num2.length - 1
  );
  const realValueTwo = parseInt(secondRealSubstr);
  const imaginaryValueTwo = parseInt(secondImaginarySubstr);

  const resultRealPart =
    realValueOne * realValueTwo - imaginaryValueOne * imaginaryValueTwo;
  const resultImaginaryPart =
    realValueOne * imaginaryValueTwo + realValueTwo * imaginaryValueOne;

  const finalOutputString = `${resultRealPart}+${resultImaginaryPart}i`;

  return finalOutputString;
};

/**
 * Complex Number Multiplication
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var complexNumberMultiply = function (num1, num2) {
  const firstPlusIndex = num1.indexOf("+");
  const firstRealSubstr = num1.substring(0, firstPlusIndex);
  const firstImaginarySubstr = num1.substring(
    firstPlusIndex + 1,
    num1.length - 1,
  );
  const realValueOne = parseInt(firstRealSubstr);
  const imaginaryValueOne = parseInt(firstImaginarySubstr);

  const secondPlusIndex = num2.indexOf("+");
  const secondRealSubstr = num2.substring(0, secondPlusIndex);
  const secondImaginarySubstr = num2.substring(
    secondPlusIndex + 1,
    num2.length - 1,
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

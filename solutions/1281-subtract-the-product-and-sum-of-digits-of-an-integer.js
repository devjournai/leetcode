/**
 * Subtract The Product And Sum Of Digits Of An Integer
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var subtractProductAndSum = function (n) {
  let stringVersion = String(n);
  let productAccumulator = 1;
  let sumAccumulator = 0;

  for (const digitChar of stringVersion) {
    let currentNumericalDigit = Number(digitChar);
    productAccumulator *= currentNumericalDigit;
    sumAccumulator += currentNumericalDigit;
  }

  return productAccumulator - sumAccumulator;
};

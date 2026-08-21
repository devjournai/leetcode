/**
 * Subtract The Product And Sum Of Digits Of An Integer
 * Intuition: Convert n to digits, multiply them and add them, then subtract.
 * Approach: 1. String(n). 2. For each digit char, multiply into productAccumulator and add into sumAccumulator. 3. Return product - sum.
 * Dry Run: n = 234
 *   digits 2,3,4. product=24, sum=9. Return 15.
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

/**
 * Most Expensive Item That Can Not Be Bought
 * Intuition: This problem is a direct application of the Frobenius Coin Problem (also known as the McNugget problem) for two relatively prime positive integers. The problem asks for the largest amount that cannot be formed by sums of positive multiples of the given denominations. Since primeOne and primeTwo are distinct prime numbers, they are always relatively prime.
 * Approach: 1. Recognize that the problem is a standard instance of finding the Frobenius number for two relatively prime integers. 2. Apply the Frobenius number formula for two integers 'a' and 'b', which states that the largest integer that cannot be expressed in the form ax + by for non-negative integers x and y is (a * b) - a - b. 3. Substitute primeOne for 'a' and primeTwo for 'b' into the formula.
 * Dry Run: Given primeOne = 3, primeTwo = 5.
 *         Applying the formula: (primeOne * primeTwo) - primeOne - primeTwo
 *         Substitute values: (3 * 5) - 3 - 5
 *         Calculate product: 15 - 3 - 5
 *         Subtract first term: 12 - 5
 *         Subtract second term: 7
 *         The most expensive item that cannot be bought is 7.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var mostExpensiveItem = function (primeOne, primeTwo) {
  const productOfPrimes = primeOne * primeTwo;
  const sumOfPrimes = primeOne + primeTwo;
  const frobeniusNumber = productOfPrimes - sumOfPrimes;
  return frobeniusNumber;
};

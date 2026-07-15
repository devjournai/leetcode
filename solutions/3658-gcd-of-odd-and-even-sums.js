/**
 * GCD of Odd and Even Sums
 * Intuition: The problem asks for the GCD of two sums: sumOdd (sum of first n positive odd numbers) and sumEven (sum of first n positive even numbers). By finding the general formulas for these sums, we can simplify the GCD computation.
 * Approach: 1. First, determine the formula for sumOdd. The sum of the first n positive odd numbers (1, 3, 5, ..., 2n-1) is n^2.
 *           2. Next, determine the formula for sumEven. The sum of the first n positive even numbers (2, 4, 6, ..., 2n) is n * (n + 1).
 *           3. The problem then reduces to finding GCD(n^2, n * (n + 1)).
 *           4. Using the property GCD(k*a, k*b) = k * GCD(a, b), we can factor out 'n': GCD(n * n, n * (n + 1)) = n * GCD(n, n + 1).
 *           5. The GCD of two consecutive integers, n and n + 1, is always 1. This is because any common divisor of n and n + 1 must also divide their difference, which is (n + 1) - n = 1. The only positive integer that divides 1 is 1.
 *           6. Therefore, GCD(sumOdd, sumEven) = n * 1 = n.
 *           The final result is simply n.
 * Dry Run:
 *   Input: n = 4
 *   1. sumOdd = 1 + 3 + 5 + 7 = 16. Formula: 4^2 = 16.
 *   2. sumEven = 2 + 4 + 6 + 8 = 20. Formula: 4 * (4 + 1) = 4 * 5 = 20.
 *   3. Compute GCD(16, 20).
 *   4. Using derived result: GCD(16, 20) should be n = 4.
 *   5. GCD(16, 20) = 4. Matches the expected output.
 *
 *   Input: n = 5
 *   1. sumOdd = 1 + 3 + 5 + 7 + 9 = 25. Formula: 5^2 = 25.
 *   2. sumEven = 2 + 4 + 6 + 8 + 10 = 30. Formula: 5 * (5 + 1) = 5 * 6 = 30.
 *   3. Compute GCD(25, 30).
 *   4. Using derived result: GCD(25, 30) should be n = 5.
 *   5. GCD(25, 30) = 5. Matches the expected output.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var gcdOfOddEvenSums = function (n) {
  return n;
};

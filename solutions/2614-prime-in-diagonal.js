/**
 * Prime In Diagonal
 *
 * Intuition:
 * Only the elements on the two diagonals can contribute to the answer.
 *
 * Traverse both diagonals, check whether each value is prime, and keep track
 * of the largest prime encountered.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      answer = 0
 *
 * 2. Define an `isPrime` function.
 *
 *      A number is prime if:
 *
 *      • It is greater than 1.
 *      • It has no divisor from
 *            2 to √number.
 *
 * 3. Traverse every row.
 *
 *      Check:
 *
 *          nums[i][i]
 *
 *      and
 *
 *          nums[i][n-i-1]
 *
 *      If either value is prime,
 *      update the answer.
 *
 * 4. Return the largest prime found.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [
 *  [1,2,3],
 *  [5,17,7],
 *  [9,11,10]
 * ]
 *
 * Main diagonal:
 *
 * 1
 * 17
 * 10
 *
 * Secondary diagonal:
 *
 * 3
 * 17
 * 9
 *
 * Prime values:
 *
 * 17
 * 3
 *
 * Maximum:
 *
 * 17
 *
 * Return 17.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × √M)
 * Space Complexity: O(1)
 */

var diagonalPrime = function (nums) {
  const n = nums.length;

  let answer = 0;

  const isPrime = (num) => {
    if (num < 2) {
      return false;
    }

    if (num === 2) {
      return true;
    }

    if (num % 2 === 0) {
      return false;
    }

    for (let i = 3; i * i <= num; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < n; i++) {
    const mainDiagonal = nums[i][i];
    const secondaryDiagonal = nums[i][n - i - 1];

    if (isPrime(mainDiagonal)) {
      answer = Math.max(answer, mainDiagonal);
    }

    if (isPrime(secondaryDiagonal)) {
      answer = Math.max(answer, secondaryDiagonal);
    }
  }

  return answer;
};

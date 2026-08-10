/**
 * Divisible And Non Divisible Sums Difference
 * Intuition: Instead of iterating through each number, we can use arithmetic series formulas to directly calculate the total sum of numbers from 1 to n, and the sum of numbers divisible by m. The sum of non-divisible numbers can then be derived by subtracting the sum of divisible numbers from the total sum.
 * Approach: 1. Calculate the total sum of all integers from 1 to n using the formula `n * (n + 1) / 2`. 2. Determine how many multiples of m are there up to n (k = floor(n / m)). 3. Calculate the sum of these multiples of m using the formula `m * (k * (k + 1) / 2)`. This value represents num2. 4. Calculate num1 by subtracting num2 from the total sum. 5. Return the difference num1 - num2.
 * Dry Run: n = 10, m = 3
 * 1. totalSequenceSum = 10 * (10 + 1) / 2 = 55.
 * 2. numberOfMultiples = floor(10 / 3) = 3. (Multiples are 3, 6, 9)
 * 3. sumOfMultiples = 3 * (3 * (3 + 1) / 2) = 3 * (3 * 4 / 2) = 3 * 6 = 18. (This is num2)
 * 4. sumOfNonMultiples = totalSequenceSum - sumOfMultiples = 55 - 18 = 37. (This is num1)
 * 5. finalDifference = sumOfNonMultiples - sumOfMultiples = 37 - 18 = 19.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var differenceOfSums = function (n, m) {
  let totalSequenceSum = (n * (n + 1)) / 2;

  let numberOfMultiples = Math.floor(n / m);
  let sumOfMultiples = m * ((numberOfMultiples * (numberOfMultiples + 1)) / 2);

  let sumOfNonMultiples = totalSequenceSum - sumOfMultiples;

  let finalDifference = sumOfNonMultiples - sumOfMultiples;

  return finalDifference;
};

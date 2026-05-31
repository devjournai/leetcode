/**
 * Count Integers With Even Digit Sum
 * Intuition: Iterate through each positive integer from 1 up to the given number. For each integer, calculate the sum of its digits. If this digit sum is even, increment a counter.
 * Approach: 1. Initialize a counter, `evenSumCount`, to zero. 2. Start a loop that iterates `numberCandidate` from 1 up to `num`. 3. Inside this loop, for each `numberCandidate`, initialize `currentSumOfDigits` to zero and `tempNumberForDigits` with the value of `numberCandidate`. 4. Use a nested `while` loop to extract digits from `tempNumberForDigits`: add `tempNumberForDigits % 10` to `currentSumOfDigits`, then update `tempNumberForDigits` by integer division (`Math.floor(tempNumberForDigits / 10)`) until `tempNumberForDigits` becomes zero. 5. After the inner loop, check if `currentSumOfDigits` is even (`currentSumOfDigits % 2 === 0`). 6. If it is even, increment `evenSumCount`. 7. After the outer loop completes, return `evenSumCount`.
 * Dry Run: num = 10
 * evenSumCount = 0
 * numberCandidate = 1: tempNumberForDigits = 1, currentSumOfDigits = 0 -> currentSumOfDigits = 1 (1%10), tempNumberForDigits = 0. sum = 1 (odd).
 * numberCandidate = 2: tempNumberForDigits = 2, currentSumOfDigits = 0 -> currentSumOfDigits = 2 (2%10), tempNumberForDigits = 0. sum = 2 (even). evenSumCount = 1.
 * numberCandidate = 3: tempNumberForDigits = 3, currentSumOfDigits = 0 -> currentSumOfDigits = 3 (3%10), tempNumberForDigits = 0. sum = 3 (odd).
 * numberCandidate = 4: tempNumberForDigits = 4, currentSumOfDigits = 0 -> currentSumOfDigits = 4 (4%10), tempNumberForDigits = 0. sum = 4 (even). evenSumCount = 2.
 * numberCandidate = 5: tempNumberForDigits = 5, currentSumOfDigits = 0 -> currentSumOfDigits = 5 (5%10), tempNumberForDigits = 0. sum = 5 (odd).
 * numberCandidate = 6: tempNumberForDigits = 6, currentSumOfDigits = 0 -> currentSumOfDigits = 6 (6%10), tempNumberForDigits = 0. sum = 6 (even). evenSumCount = 3.
 * numberCandidate = 7: tempNumberForDigits = 7, currentSumOfDigits = 0 -> currentSumOfDigits = 7 (7%10), tempNumberForDigits = 0. sum = 7 (odd).
 * numberCandidate = 8: tempNumberForDigits = 8, currentSumOfDigits = 0 -> currentSumOfDigits = 8 (8%10), tempNumberForDigits = 0. sum = 8 (even). evenSumCount = 4.
 * numberCandidate = 9: tempNumberForDigits = 9, currentSumOfDigits = 0 -> currentSumOfDigits = 9 (9%10), tempNumberForDigits = 0. sum = 9 (odd).
 * numberCandidate = 10: tempNumberForDigits = 10, currentSumOfDigits = 0 -> currentSumOfDigits = 0 (10%10), tempNumberForDigits = 1 -> currentSumOfDigits = 1 (1%10), tempNumberForDigits = 0. sum = 1 (odd).
 * Loop ends. Return evenSumCount = 4.
 * Time Complexity: O(num * log10(num))
 * Space Complexity: O(1)
 */
var countEven = function (num) {
  let evenSumCount = 0;

  for (let numberCandidate = 1; numberCandidate <= num; numberCandidate++) {
    let currentSumOfDigits = 0;
    let tempNumberForDigits = numberCandidate;

    while (tempNumberForDigits > 0) {
      currentSumOfDigits += tempNumberForDigits % 10;
      tempNumberForDigits = Math.floor(tempNumberForDigits / 10);
    }

    if (currentSumOfDigits % 2 === 0) {
      evenSumCount++;
    }
  }

  return evenSumCount;
};

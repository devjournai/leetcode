/**
 * Smallest Greater Multiple Made Of Two Digits
 * Intuition: The problem asks for the *smallest* integer satisfying certain conditions. This is a classic indicator for a Breadth-First Search (BFS) approach, as BFS explores states (numbers) in increasing order of their 'distance' (number of digits in this context). By generating numbers digit by digit and adding them to a queue, we ensure that smaller numbers (fewer digits, or numerically smaller among same-length numbers) are processed first. The first number found that meets all criteria will necessarily be the smallest.
 * Approach:
 * 1. Identify the two unique digits available for construction: `minAllowedDigit` and `maxAllowedDigit`.
 * 2. Initialize a `bfsQueue` to store numbers to be processed.
 * 3. Add initial single-digit numbers to the `bfsQueue`: `minAllowedDigit` (if it's not 0 or if `maxAllowedDigit` is also 0), and `maxAllowedDigit` (if it's distinct from `minAllowedDigit`). The initial handling of 0 is crucial; numbers usually don't start with 0 unless it's the only digit (like 0 itself). However, the BFS handles `currentNumber === 0` by skipping it, which effectively means 0 is not a valid answer but can be a starting point to generate numbers like 10, 20 etc.
 * 4. Define `maximumSignedInt` as `2147483647` (2^31 - 1).
 * 5. While the `bfsQueue` is not empty:
 *    a. Dequeue `currentNumber` from the front of the `bfsQueue`.
 *    b. If `currentNumber` is `0` (cannot be a multiple of `k` if `k >= 1`, and `k` is always `>=1`) or `currentNumber` exceeds `maximumSignedInt`, skip this number and continue to the next iteration.
 *    c. If `currentNumber` is greater than `inputK` AND `currentNumber` is perfectly divisible by `inputK` (i.e., `currentNumber % inputK === 0`), then `currentNumber` is the smallest valid integer. Return it.
 *    d. Otherwise, generate two new candidate numbers by appending `minAllowedDigit` and `maxAllowedDigit` to `currentNumber`:
 *       - `candidateOne = currentNumber * 10 + minAllowedDigit`
 *       - `candidateTwo = currentNumber * 10 + maxAllowedDigit`
 *    e. Enqueue `candidateOne`.
 *    f. If `minAllowedDigit` and `maxAllowedDigit` are different, enqueue `candidateTwo`.
 * 6. If the `bfsQueue` becomes empty and no solution is found, return -1.
 * Dry Run: k = 10, digit1 = 0, digit2 = 1
 * maxSignedValue = 2147483647
 * minAllowedDigit = 0, maxAllowedDigit = 1
 * bfsQueue = [0, 1]
 *
 * 1. Pop 0. currentNumber = 0. currentNumber === 0 is true. Continue.
 *    bfsQueue = [1]
 *
 * 2. Pop 1. currentNumber = 1.
 *    currentNumber === 0 is false.
 *    currentNumber > maxSignedValue is false.
 *    currentNumber > k (1 > 10) is false.
 *    candidateOne = 1 * 10 + 0 = 10
 *    candidateTwo = 1 * 10 + 1 = 11
 *    bfsQueue.push(10) -> [1, 10]
 *    minAllowedDigit !== maxAllowedDigit. bfsQueue.push(11) -> [10, 11]
 *    bfsQueue = [10, 11]
 *
 * 3. Pop 10. currentNumber = 10.
 *    currentNumber === 0 is false.
 *    currentNumber > maxSignedValue is false.
 *    currentNumber > k (10 > 10) is false.
 *    candidateOne = 10 * 10 + 0 = 100
 *    candidateTwo = 10 * 10 + 1 = 101
 *    bfsQueue.push(100) -> [11, 100]
 *    minAllowedDigit !== maxAllowedDigit. bfsQueue.push(101) -> [11, 100, 101]
 *    bfsQueue = [11, 100, 101]
 *
 * 4. Pop 11. currentNumber = 11.
 *    currentNumber === 0 is false.
 *    currentNumber > maxSignedValue is false.
 *    currentNumber > k (11 > 10) is true.
 *    currentNumber % k (11 % 10) is 1, which is not 0.
 *    candidateOne = 11 * 10 + 0 = 110
 *    candidateTwo = 11 * 10 + 1 = 111
 *    bfsQueue.push(110) -> [100, 101, 110]
 *    minAllowedDigit !== maxAllowedDigit. bfsQueue.push(111) -> [100, 101, 110, 111]
 *    bfsQueue = [100, 101, 110, 111]
 *
 * 5. Pop 100. currentNumber = 100.
 *    currentNumber === 0 is false.
 *    currentNumber > maxSignedValue is false.
 *    currentNumber > k (100 > 10) is true.
 *    currentNumber % k (100 % 10) is 0, which is true.
 *    Return 100.
 *
 * Time Complexity: O(D^L * log(M))
 * Space Complexity: O(D^L)
 */
var findInteger = function (k, digit1, digit2) {
  const minAllowedDigit = Math.min(digit1, digit2);
  const maxAllowedDigit = Math.max(digit1, digit2);
  const bfsQueue = [];

  if (minAllowedDigit === maxAllowedDigit) {
    bfsQueue.push(minAllowedDigit);
  } else {
    bfsQueue.push(minAllowedDigit);
    bfsQueue.push(maxAllowedDigit);
  }

  const maximumSignedValue = 2147483647;

  while (bfsQueue.length > 0) {
    const currentNumber = bfsQueue.shift();

    if (currentNumber === 0 || currentNumber > maximumSignedValue) {
      continue;
    }

    if (currentNumber > k && currentNumber % k === 0) {
      return currentNumber;
    }

    const nextCandidateOne = currentNumber * 10 + minAllowedDigit;
    const nextCandidateTwo = currentNumber * 10 + maxAllowedDigit;

    bfsQueue.push(nextCandidateOne);
    if (minAllowedDigit !== maxAllowedDigit) {
      bfsQueue.push(nextCandidateTwo);
    }
  }

  return -1;
};

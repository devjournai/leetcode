/**
 * Find The Least Frequent Digit
 * Intuition: Count digits 0–9, then pick the digit with the smallest positive frequency, breaking ties toward the smaller digit.
 * Approach: 1. Peel n from the right, incrementing a 10-slot frequency table. 2. Scan digits 0..9 and keep the digit whose count is positive and strictly smaller than the best frequency so far. 3. Return that digit.
 * Dry Run: n = 1553322. Counts: 1→1, 5→2, 3→2, 2→2. Least frequent is 1.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var getLeastFrequentDigit = function (n) {
  const frequency = new Array(10).fill(0);
  let remaining = n;

  while (remaining > 0) {
    frequency[remaining % 10]++;
    remaining = Math.floor(remaining / 10);
  }

  let answerDigit = 0;
  let leastFrequency = Number.MAX_SAFE_INTEGER;

  for (let digit = 0; digit < 10; digit++) {
    if (frequency[digit] > 0 && frequency[digit] < leastFrequency) {
      leastFrequency = frequency[digit];
      answerDigit = digit;
    }
  }

  return answerDigit;
};

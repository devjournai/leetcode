/**
 * Count Numbers With Unique Digits II
 * Intuition: Iterate through each number in the given range and check if its digits are unique. A set can efficiently track seen digits.
 * Approach: 1. Initialize a counter for unique digit numbers. 2. Loop through each number from 'a' to 'b' (inclusive). 3. For each number, call a helper function to determine if it has unique digits. 4. If the helper function returns true, increment the counter. 5. Return the final counter.
 * Dry Run: a = 1, b = 15
 *   totalUniqueCount = 0
 *   currentProcessingNumber = 1: checkDigitUniqueness(1) -> seenDigitsSet = {}, oneDigit = 1, seenDigitsSet.add(1). remainingDigitsVal = 0. Returns true. totalUniqueCount = 1.
 *   currentProcessingNumber = 2: checkDigitUniqueness(2) -> returns true. totalUniqueCount = 2.
 *   ...
 *   currentProcessingNumber = 9: checkDigitUniqueness(9) -> returns true. totalUniqueCount = 9.
 *   currentProcessingNumber = 10: checkDigitUniqueness(10) -> seenDigitsSet = {}, oneDigit = 0, seenDigitsSet.add(0). remainingDigitsVal = 1. oneDigit = 1, seenDigitsSet.add(1). remainingDigitsVal = 0. Returns true. totalUniqueCount = 10.
 *   currentProcessingNumber = 11: checkDigitUniqueness(11) -> seenDigitsSet = {}, oneDigit = 1, seenDigitsSet.add(1). remainingDigitsVal = 1. oneDigit = 1, seenDigitsSet.has(1) is true. Returns false. totalUniqueCount remains 10.
 *   currentProcessingNumber = 12: checkDigitUniqueness(12) -> returns true. totalUniqueCount = 11.
 *   ...
 *   currentProcessingNumber = 15: checkDigitUniqueness(15) -> returns true. totalUniqueCount = 14.
 *   Final result: 14.
 * Time Complexity: O((b - a + 1) * log10(b))
 * Space Complexity: O(1)
 */
var numberCount = function (a, b) {
  let totalUniqueCount = 0;

  function checkDigitUniqueness(inputNumber) {
    const seenDigitsSet = new Set();
    let remainingDigitsVal = inputNumber;

    while (remainingDigitsVal > 0) {
      const oneDigit = remainingDigitsVal % 10;
      if (seenDigitsSet.has(oneDigit)) {
        return false;
      }
      seenDigitsSet.add(oneDigit);
      remainingDigitsVal = Math.floor(remainingDigitsVal / 10);
    }

    return true;
  }

  for (
    let currentProcessingNumber = a;
    currentProcessingNumber <= b;
    currentProcessingNumber++
  ) {
    if (checkDigitUniqueness(currentProcessingNumber)) {
      totalUniqueCount++;
    }
  }

  return totalUniqueCount;
};

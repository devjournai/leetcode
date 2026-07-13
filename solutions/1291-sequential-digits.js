/**
 * Sequential Digits
 * Intuition: Sequential digits are formed by appending consecutive digits (e.g., 1, then 2 makes 12; 12, then 3 makes 123). We can generate all such numbers by iterating through possible starting digits and extending them.
 * Approach: 1. Iterate through possible starting digits from 1 to 9. 2. For each starting digit, build sequential numbers by appending the next consecutive digit (e.g., starting with 1, build 1, then 12, then 123, etc.) until the next digit is 10. 3. Store all generated sequential numbers in a list. 4. Filter this list to include only numbers that fall within the given `low` and `high` range. 5. Sort the filtered list in ascending order.
 * Dry Run: low = 100, high = 300
 *   generatedNumbers = []
 *   firstDigit = 1:
 *     currentSequence = 1
 *     generatedNumbers.push(1) -> [1]
 *     nextAppendedDigit = 2: currentSequence = 1*10+2 = 12. generatedNumbers.push(12) -> [1, 12]
 *     nextAppendedDigit = 3: currentSequence = 12*10+3 = 123. generatedNumbers.push(123) -> [1, 12, 123]
 *     nextAppendedDigit = 4: currentSequence = 123*10+4 = 1234. generatedNumbers.push(1234) -> [1, 12, 123, 1234] ... (continues for 12345, ..., 123456789)
 *   firstDigit = 2:
 *     currentSequence = 2
 *     generatedNumbers.push(2) -> [..., 2]
 *     nextAppendedDigit = 3: currentSequence = 2*10+3 = 23. generatedNumbers.push(23) -> [..., 23]
 *     nextAppendedDigit = 4: currentSequence = 23*10+4 = 234. generatedNumbers.push(234) -> [..., 234] ... (continues for 2345, ..., 23456789)
 *   ... This process continues for all firstDigits up to 9.
 *   After generation, generatedNumbers will contain numbers like [1, 12, 123, 1234, ..., 2, 23, 234, ..., 9]. (Order is not strictly sorted yet)
 *
 *   Filter: resultNumbers = []
 *   Iterate through generatedNumbers:
 *     candidateNumber = 1: Not >= 100.
 *     candidateNumber = 12: Not >= 100.
 *     candidateNumber = 123: 123 >= 100 && 123 <= 300. resultNumbers.push(123) -> [123]
 *     candidateNumber = 1234: Not <= 300.
 *     ...
 *     candidateNumber = 2: Not >= 100.
 *     candidateNumber = 23: Not >= 100.
 *     candidateNumber = 234: 234 >= 100 && 234 <= 300. resultNumbers.push(234) -> [123, 234]
 *     candidateNumber = 2345: Not <= 300.
 *     ...
 *   After filtering, resultNumbers = [123, 234].
 *   Sort: resultNumbers.sort((valA, valB) => valA - valB) -> [123, 234] (already sorted).
 *   Return [123, 234].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sequentialDigits = function (low, high) {
  let generatedNumbers = [];

  for (let firstDigit = 1; firstDigit <= 9; firstDigit++) {
    let currentSequence = firstDigit;
    generatedNumbers.push(currentSequence);

    for (
      let nextAppendedDigit = firstDigit + 1;
      nextAppendedDigit <= 9;
      nextAppendedDigit++
    ) {
      currentSequence = currentSequence * 10 + nextAppendedDigit;
      generatedNumbers.push(currentSequence);
    }
  }

  let resultNumbers = [];
  for (
    let currentNumberIndex = 0;
    currentNumberIndex < generatedNumbers.length;
    currentNumberIndex++
  ) {
    let candidateNumber = generatedNumbers[currentNumberIndex];
    if (candidateNumber >= low && candidateNumber <= high) {
      resultNumbers.push(candidateNumber);
    }
  }

  resultNumbers.sort((valA, valB) => valA - valB);

  return resultNumbers;
};

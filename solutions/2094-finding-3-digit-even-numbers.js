/**
 * Finding 3 Digit Even Numbers
 * Intuition: The problem asks for unique 3-digit even numbers formed from given digits. Instead of generating permutations of digits, which can be complex with uniqueness and leading zero constraints, it's simpler to iterate through all possible 3-digit even numbers and check if their constituent digits are available in the input pool.
 * Approach:
 * 1. Create a frequency map (an array of size 10) to store counts of each digit present in the input `digits` array.
 * 2. Initialize an empty Set to collect unique valid even numbers.
 * 3. Iterate through all integers from 100 to 999 (inclusive). These are all possible 3-digit numbers.
 * 4. For each integer, first check if it's an even number. If not, skip to the next integer.
 * 5. If it's even, extract its hundreds, tens, and ones digits.
 * 6. For this number, simulate using the digits from the input pool. Create a temporary copy of the initial digit frequency map.
 * 7. Decrement the counts of the hundreds, tens, and ones digits from this temporary frequency map.
 * 8. Check if all decremented counts are still non-negative. If they are, it means we have enough of each digit to form this number, so add it to the unique numbers Set.
 * 9. After iterating through all possible 3-digit numbers, convert the Set to an array and sort it in ascending order.
 * Dry Run: digits = [1, 2, 3]
 * 1. inputDigitCounts = [0, 1, 1, 1, 0, 0, 0, 0, 0, 0] (counts for 0-9)
 * 2. uniqueEvenNumbers = Set {}
 * 3. Loop currentPotentialNumber from 100 to 999:
 *    - currentPotentialNumber = 100: is even.
 *      - currentHundredsDigit = 1, currentTensDigit = 0, currentOnesDigit = 0
 *      - availableCounts (copy of inputDigitCounts) = [0, 1, 1, 1, ...]
 *      - Decrement: availableCounts[1]--, availableCounts[0]--, availableCounts[0]--
 *      - Result: availableCounts = [-2, 0, 1, 1, ...].
 *      - Check: availableCounts[0] is -2, so condition (all counts >= 0) is false. Skip.
 *    - ...
 *    - currentPotentialNumber = 132: is even.
 *      - currentHundredsDigit = 1, currentTensDigit = 3, currentOnesDigit = 2
 *      - availableCounts (copy) = [0, 1, 1, 1, ...]
 *      - Decrement: availableCounts[1]-- (0), availableCounts[3]-- (0), availableCounts[2]-- (0)
 *      - Result: availableCounts = [0, 0, 0, 0, ...]. All counts are >= 0.
 *      - Add 132 to uniqueEvenNumbers. uniqueEvenNumbers = Set {132}
 *    - ...
 *    - currentPotentialNumber = 312: is even.
 *      - currentHundredsDigit = 3, currentTensDigit = 1, currentOnesDigit = 2
 *      - availableCounts (copy) = [0, 1, 1, 1, ...]
 *      - Decrement: availableCounts[3]-- (0), availableCounts[1]-- (0), availableCounts[2]-- (0)
 *      - Result: availableCounts = [0, 0, 0, 0, ...]. All counts are >= 0.
 *      - Add 312 to uniqueEvenNumbers. uniqueEvenNumbers = Set {132, 312}
 *    - ... (continue until 999)
 * 4. Convert uniqueEvenNumbers to array: [132, 312]
 * 5. Sort array: [132, 312]
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var findEvenNumbers = function (digits) {
  const inputDigitCounts = new Array(10).fill(0);

  for (const originalDigit of digits) {
    inputDigitCounts[originalDigit]++;
  }

  const uniqueEvenNumbers = new Set();

  for (
    let currentPotentialNumber = 100;
    currentPotentialNumber <= 999;
    currentPotentialNumber++
  ) {
    if (currentPotentialNumber % 2 !== 0) {
      continue;
    }

    const currentHundredsDigit = Math.floor(currentPotentialNumber / 100);
    const currentRemainder = currentPotentialNumber % 100;
    const currentTensDigit = Math.floor(currentRemainder / 10);
    const currentOnesDigit = currentRemainder % 10;

    const availableCounts = [...inputDigitCounts];

    availableCounts[currentHundredsDigit]--;
    availableCounts[currentTensDigit]--;
    availableCounts[currentOnesDigit]--;

    if (
      availableCounts[currentHundredsDigit] >= 0 &&
      availableCounts[currentTensDigit] >= 0 &&
      availableCounts[currentOnesDigit] >= 0
    ) {
      uniqueEvenNumbers.add(currentPotentialNumber);
    }
  }

  const resultList = Array.from(uniqueEvenNumbers);
  resultList.sort((firstValue, secondValue) => firstValue - secondValue);

  return resultList;
};

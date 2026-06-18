/**
 * Count Special Integers
 * Intuition: The problem asks to count numbers with distinct digits up to a given 'n'. This can be solved by digit DP. Break down the problem into counting special numbers with fewer digits than 'n' and then counting special numbers with the same number of digits as 'n' up to 'n' itself.
 * Approach: 1. Convert 'n' into an array of its digits. Determine its length. 2. Calculate the count of all special integers that have fewer digits than 'n'. For a length 'L', the first digit has 9 choices (1-9), the second has 9 choices (0-9, excluding the first), the third has 8 choices, and so on. This is a permutation P(9, L-1) * 9. 3. Iterate through the digits of 'n' from left to right (most significant to least significant). For each position, consider digits smaller than the current digit of 'n'. If such a smaller digit hasn't been used yet (tracked by a Set), calculate how many ways the remaining suffix digits can be filled with distinct digits. Add this count to the total. 4. After processing a digit position from 'n', add the digit itself to the set of used digits. If the current digit from 'n' was already in the set, it means 'n' itself is not a special number or a prefix leading to special numbers is no longer possible, so stop further processing for numbers of 'n's length. 5. Finally, if all digits of 'n' itself are distinct (meaning no early break due to repeated digits), increment the total count to include 'n'.
 * Dry Run: n = 237
 *   numberDigitsArray = [2, 3, 7], digitCount = 3, resultAccumulator = 0.
 *   Part 1: Numbers with fewer digits than 237.
 *     lengthIterator = 1: permutationCountForLength = 9. Loop (permutationFactorIndex) doesn't run. resultAccumulator = 9. (1-digit special numbers: 1-9)
 *     lengthIterator = 2: permutationCountForLength = 9. availableDigits = 9.
 *       permutationFactorIndex = 1: permutationCountForLength = 9 * 9 = 81. availableDigits = 8.
 *     resultAccumulator = 9 + 81 = 90. (2-digit special numbers: 9*9=81, e.g., 10, 12..19, 20..98 unique)
 *   Part 2: Numbers with same number of digits as 237.
 *     distinctDigitsTracker = {}.
 *     currentDigitPosition = 0 (for digit '2'):
 *       smallerDigitCandidate = 1 (1 < 2): !distinctDigitsTracker.has(1) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 1. currentAvailable = 10 - 0 - 1 = 9.
 *         while (1 < 3): suffixPermutation = 9. currentAvailable = 8. suffixPositionIndex = 2.
 *         while (2 < 3): suffixPermutation = 72. currentAvailable = 7. suffixPositionIndex = 3.
 *         while (3 < 3) is false.
 *         resultAccumulator = 90 + 72 = 162. (Numbers like 1XX where X are distinct from 1, e.g., 102, 103, ..., 198)
 *       smallerDigitCandidate loop ends.
 *       distinctDigitsTracker.has(2) is false. distinctDigitsTracker.add(2). distinctDigitsTracker = {2}.
 *     currentDigitPosition = 1 (for digit '3'):
 *       smallerDigitCandidate = 0 (0 < 3): !distinctDigitsTracker.has(0) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 2. currentAvailable = 10 - 1 - 1 = 8.
 *         while (2 < 3): suffixPermutation = 8. currentAvailable = 7. suffixPositionIndex = 3.
 *         while (3 < 3) is false.
 *         resultAccumulator = 162 + 8 = 170. (Numbers like 20X, e.g., 201, 204, ..., 209)
 *       smallerDigitCandidate = 1 (1 < 3): !distinctDigitsTracker.has(1) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 2. currentAvailable = 10 - 1 - 1 = 8.
 *         while (2 < 3): suffixPermutation = 8. currentAvailable = 7. suffixPositionIndex = 3.
 *         while (3 < 3) is false.
 *         resultAccumulator = 170 + 8 = 178. (Numbers like 21X, e.g., 210, 213, ..., 219)
 *       smallerDigitCandidate = 2 (2 < 3): distinctDigitsTracker.has(2) is true. Skip.
 *       smallerDigitCandidate loop ends.
 *       distinctDigitsTracker.has(3) is false. distinctDigitsTracker.add(3). distinctDigitsTracker = {2, 3}.
 *     currentDigitPosition = 2 (for digit '7'):
 *       smallerDigitCandidate = 0 (0 < 7): !distinctDigitsTracker.has(0) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 3. currentAvailable = 10 - 2 - 1 = 7.
 *         while (3 < 3) is false.
 *         resultAccumulator = 178 + 1 = 179. (Number 230)
 *       smallerDigitCandidate = 1 (1 < 7): !distinctDigitsTracker.has(1) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 3. currentAvailable = 10 - 2 - 1 = 7.
 *         while (3 < 3) is false.
 *         resultAccumulator = 179 + 1 = 180. (Number 231)
 *       smallerDigitCandidate = 2 (2 < 7): distinctDigitsTracker.has(2) is true. Skip.
 *       smallerDigitCandidate = 3 (3 < 7): distinctDigitsTracker.has(3) is true. Skip.
 *       smallerDigitCandidate = 4 (4 < 7): !distinctDigitsTracker.has(4) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 3. currentAvailable = 10 - 2 - 1 = 7.
 *         while (3 < 3) is false.
 *         resultAccumulator = 180 + 1 = 181. (Number 234)
 *       smallerDigitCandidate = 5 (5 < 7): !distinctDigitsTracker.has(5) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 3. currentAvailable = 10 - 2 - 1 = 7.
 *         while (3 < 3) is false.
 *         resultAccumulator = 181 + 1 = 182. (Number 235)
 *       smallerDigitCandidate = 6 (6 < 7): !distinctDigitsTracker.has(6) is true.
 *         suffixPermutation = 1. suffixPositionIndex = 3. currentAvailable = 10 - 2 - 1 = 7.
 *         while (3 < 3) is false.
 *         resultAccumulator = 182 + 1 = 183. (Number 236)
 *       smallerDigitCandidate loop ends.
 *       distinctDigitsTracker.has(7) is false. distinctDigitsTracker.add(7). distinctDigitsTracker = {2, 3, 7}.
 *     currentDigitPosition loop ends.
 *   Final Check: distinctDigitsTracker.size (3) === digitCount (3) is true.
 *   resultAccumulator = 183 + 1 = 184. (Includes 237 itself)
 *   Return 184.
 * Time Complexity: O((log N)^2)
 * Space Complexity: O(log N)
 */
var countSpecialNumbers = function (inputNumber) {
  const numberDigitsArray = String(inputNumber).split("").map(Number);
  const digitCount = numberDigitsArray.length;
  let resultAccumulator = 0;

  for (let lengthIterator = 1; lengthIterator < digitCount; ++lengthIterator) {
    let permutationCountForLength = 9;
    let availableDigitsForPermutation = 9;
    for (
      let permutationFactorIndex = 1;
      permutationFactorIndex < lengthIterator;
      ++permutationFactorIndex
    ) {
      permutationCountForLength *= availableDigitsForPermutation;
      --availableDigitsForPermutation;
    }
    resultAccumulator += permutationCountForLength;
  }

  const distinctDigitsTracker = new Set();
  for (
    let currentDigitPosition = 0;
    currentDigitPosition < digitCount;
    ++currentDigitPosition
  ) {
    let smallerDigitCandidate = currentDigitPosition === 0 ? 1 : 0;
    while (smallerDigitCandidate < numberDigitsArray[currentDigitPosition]) {
      if (!distinctDigitsTracker.has(smallerDigitCandidate)) {
        let suffixPermutation = 1;
        let suffixPositionIndex = currentDigitPosition + 1;
        let digitsRemainingForSuffix = 10 - distinctDigitsTracker.size - 1; // 10 total - used by previous digits of 'n' - current smallerDigitCandidate
        while (suffixPositionIndex < digitCount) {
          suffixPermutation *= digitsRemainingForSuffix;
          --digitsRemainingForSuffix;
          ++suffixPositionIndex;
        }
        resultAccumulator += suffixPermutation;
      }
      ++smallerDigitCandidate;
    }
    if (distinctDigitsTracker.has(numberDigitsArray[currentDigitPosition])) {
      break;
    }
    distinctDigitsTracker.add(numberDigitsArray[currentDigitPosition]);
  }

  if (distinctDigitsTracker.size === digitCount) {
    resultAccumulator++;
  }

  return resultAccumulator;
};

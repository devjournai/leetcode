/**
 * Subsequence Of Size K With The Largest Even Sum
 * Intuition: To find the largest even sum, we need to iterate through all possible combinations of even and odd numbers that sum up to k elements. The total sum of numbers must be even, which implies that the count of odd numbers chosen must be even. Sorting numbers in descending order allows us to always pick the largest available numbers. Precomputing prefix sums makes sum calculation efficient.
 * Approach:
 * 1. Initialize `largestPossibleEvenSum` to -1.
 * 2. Separate the input `numbersArray` into two lists: `sortedEvenNumbers` and `sortedOddNumbers`, both sorted in descending order.
 * 3. Compute prefix sums for `sortedEvenNumbers` storing them in `evenSumsAccumulated`. This array will have `evenSumsAccumulated[i]` representing the sum of the first `i` largest even numbers.
 * 4. Compute prefix sums for `sortedOddNumbers` storing them in `oddSumsAccumulated`. This array will have `oddSumsAccumulated[i]` representing the sum of the first `i` largest odd numbers.
 * 5. Iterate through possible counts of even numbers, `currentEvenSelections`, from 0 up to `totalRequiredElements` (k).
 * 6. For each `currentEvenSelections`, determine the `currentOddSelections` required: `totalRequiredElements - currentEvenSelections`.
 * 7. Validate the current combination:
 *    a. Ensure `currentEvenSelections` does not exceed the available `sortedEvenNumbers.length`.
 *    b. Ensure `currentOddSelections` does not exceed the available `sortedOddNumbers.length`.
 *    c. Crucially, ensure `currentOddSelections` is an even number, as an odd count of odd numbers would result in an odd sum, making the total sum odd.
 * 8. If the combination is valid, calculate the `currentCombinationValue` by summing the `evenSumsAccumulated[currentEvenSelections]` and `oddSumsAccumulated[currentOddSelections]`.
 * 9. Update `largestPossibleEvenSum` with `Math.max(largestPossibleEvenSum, currentCombinationValue)`.
 * 10. After iterating through all combinations, return `largestPossibleEvenSum`.
 * Dry Run: nums = [4, 1, 2, 3], k = 2
 * 1. Initialize `largestPossibleEvenSum = -1`.
 * 2. `sortedEvenNumbers = [4, 2]`. `sortedOddNumbers = [3, 1]`.
 * 3. `evenSumsAccumulated = [0, 4, 6]`. (0 for 0 elements, 4 for [4], 6 for [4,2])
 * 4. `oddSumsAccumulated = [0, 3, 4]`. (0 for 0 elements, 3 for [3], 4 for [3,1])
 * 5. Outer loop for `currentEvenSelections` from 0 to 2:
 *    - `currentEvenSelections = 0`:
 *      - `currentOddSelections = 2 - 0 = 2`.
 *      - Valid? `0 <= 2` (even len), `2 <= 2` (odd len), `2 % 2 === 0` (odd count even) -> Yes.
 *      - `currentCombinationValue = evenSumsAccumulated[0] + oddSumsAccumulated[2] = 0 + 4 = 4`.
 *      - `largestPossibleEvenSum = Math.max(-1, 4) = 4`.
 *    - `currentEvenSelections = 1`:
 *      - `currentOddSelections = 2 - 1 = 1`.
 *      - Valid? `1 <= 2`, `1 <= 2`, `1 % 2 === 0` -> No (1 is odd). Skip.
 *    - `currentEvenSelections = 2`:
 *      - `currentOddSelections = 2 - 2 = 0`.
 *      - Valid? `2 <= 2`, `0 <= 2`, `0 % 2 === 0` -> Yes.
 *      - `currentCombinationValue = evenSumsAccumulated[2] + oddSumsAccumulated[0] = 6 + 0 = 6`.
 *      - `largestPossibleEvenSum = Math.max(4, 6) = 6`.
 * 6. Loop ends. Return `largestPossibleEvenSum = 6`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var largestEvenSum = function (numbersArray, totalRequiredElements) {
  const sortedEvenNumbers = numbersArray
    .filter((numValue) => numValue % 2 === 0)
    .sort((firstValue, secondValue) => secondValue - firstValue);
  const sortedOddNumbers = numbersArray
    .filter((numValue) => numValue % 2 === 1)
    .sort((firstValue, secondValue) => secondValue - firstValue);

  const evenSumsAccumulated = [0];
  let currentCumulativeEven = 0;
  for (
    let currentEvenIdx = 0;
    currentEvenIdx < sortedEvenNumbers.length;
    currentEvenIdx++
  ) {
    currentCumulativeEven += sortedEvenNumbers[currentEvenIdx];
    evenSumsAccumulated.push(currentCumulativeEven);
  }

  const oddSumsAccumulated = [0];
  let currentCumulativeOdd = 0;
  let oddListPointer = 0;
  while (oddListPointer < sortedOddNumbers.length) {
    currentCumulativeOdd += sortedOddNumbers[oddListPointer];
    oddSumsAccumulated.push(currentCumulativeOdd);
    oddListPointer++;
  }

  let largestPossibleEvenSum = -1;

  const maxEvenSelectionsAllowed = Math.min(
    totalRequiredElements,
    sortedEvenNumbers.length
  );
  for (
    let currentEvenSelections = 0;
    currentEvenSelections <= maxEvenSelectionsAllowed;
    currentEvenSelections++
  ) {
    const currentOddSelections = totalRequiredElements - currentEvenSelections;

    const maxOddLength = sortedOddNumbers.length;
    if (
      currentOddSelections < 0 ||
      currentOddSelections > maxOddLength ||
      currentOddSelections % 2 !== 0
    ) {
      continue;
    }

    const currentCombinationValue =
      evenSumsAccumulated[currentEvenSelections] +
      oddSumsAccumulated[currentOddSelections];
    largestPossibleEvenSum = Math.max(
      largestPossibleEvenSum,
      currentCombinationValue
    );
  }

  return largestPossibleEvenSum;
};

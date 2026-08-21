/**
 * Count Number Of Distinct Integers After Reverse Operations
 * Intuition: To efficiently count distinct elements, a Set data structure is ideal as it automatically handles uniqueness. The problem requires considering both original numbers and their reversed counterparts.
 * Approach: 1. Initialize a Set with all numbers from the input array `nums` to account for initial distinct values. 2. Iterate through each number in the original `nums` array. 3. For each number, calculate its reverse by repeatedly extracting the last digit, building the reversed number, and reducing the original number. 4. Add the calculated reversed number to the Set. 5. The final size of the Set represents the total number of distinct integers.
 * Dry Run: nums = [13, 21]
 * 1. distinctElementsCollection initialized with [13, 21]. Set: {13, 21}
 * 2. numberIterationIndex = 0. currentOriginalNumber = 13.
 *    - reversedDigitsAccumulator = 0. processingNumberForReversal = 13.
 *    - While processingNumberForReversal (13) > 0:
 *      - extractedDigit = 13 % 10 = 3.
 *      - reversedDigitsAccumulator = 0 * 10 + 3 = 3.
 *      - processingNumberForReversal = Math.floor(13 / 10) = 1.
 *    - While processingNumberForReversal (1) > 0:
 *      - extractedDigit = 1 % 10 = 1.
 *      - reversedDigitsAccumulator = 3 * 10 + 1 = 31.
 *      - processingNumberForReversal = Math.floor(1 / 10) = 0.
 *    - Loop ends as processingNumberForReversal is 0.
 *    - distinctElementsCollection.add(31). Set: {13, 21, 31}
 * 3. numberIterationIndex = 1. currentOriginalNumber = 21.
 *    - reversedDigitsAccumulator = 0. processingNumberForReversal = 21.
 *    - While processingNumberForReversal (21) > 0:
 *      - extractedDigit = 21 % 10 = 1.
 *      - reversedDigitsAccumulator = 0 * 10 + 1 = 1.
 *      - processingNumberForReversal = Math.floor(21 / 10) = 2.
 *    - While processingNumberForReversal (2) > 0:
 *      - extractedDigit = 2 % 10 = 2.
 *      - reversedDigitsAccumulator = 1 * 10 + 2 = 12.
 *      - processingNumberForReversal = Math.floor(2 / 10) = 0.
 *    - Loop ends as processingNumberForReversal is 0.
 *    - distinctElementsCollection.add(12). Set: {13, 21, 31, 12}
 * 4. Loop finishes.
 * 5. Return distinctElementsCollection.size = 4.
 * Time Complexity: O(N * D)
 * Space Complexity: O(N)
 */
var countDistinctIntegers = function (nums) {
  const distinctElementsCollection = new Set(nums);

  for (
    let numberIterationIndex = 0;
    numberIterationIndex < nums.length;
    numberIterationIndex++
  ) {
    const currentOriginalNumber = nums[numberIterationIndex];
    let reversedDigitsAccumulator = 0;
    let processingNumberForReversal = currentOriginalNumber;

    while (processingNumberForReversal > 0) {
      const extractedDigit = processingNumberForReversal % 10;
      reversedDigitsAccumulator =
        reversedDigitsAccumulator * 10 + extractedDigit;
      processingNumberForReversal = Math.floor(
        processingNumberForReversal / 10
      );
    }
    distinctElementsCollection.add(reversedDigitsAccumulator);
  }

  const resultSize = distinctElementsCollection.size;
  return resultSize;
};

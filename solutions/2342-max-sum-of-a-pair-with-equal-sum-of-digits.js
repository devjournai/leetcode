/**
 * Max Sum Of A Pair With Equal Sum Of Digits
 * Intuition: To efficiently find pairs of numbers with the same digit sum and maximize their sum, we can group numbers by their digit sum. A hash map serves this purpose well, storing the largest number seen so far for each unique digit sum encountered.
 * Approach: 1. Initialize `maximumAchievedSum` to -1 to track the highest sum found. 2. Create a map, `digitSumToGreatestValueMap`, to store the greatest number encountered for each digit sum. 3. Iterate through each `elementValue` in the input `nums` array. 4. For each `elementValue`, calculate its `computedDigitSum` by repeatedly taking the modulo 10 and dividing by 10 until the number becomes zero. 5. If `digitSumToGreatestValueMap` already contains `computedDigitSum` as a key: a. Retrieve the `priorMaxElement` associated with `computedDigitSum`. b. Update `maximumAchievedSum` with the maximum of its current value and the sum of `elementValue` and `priorMaxElement`. c. Update `digitSumToGreatestValueMap` for `computedDigitSum` to store the maximum between `priorMaxElement` and `elementValue`. 6. Else (if `computedDigitSum` is not yet in the map): a. Add `computedDigitSum` to `digitSumToGreatestValueMap` with `elementValue` as its value. 7. After processing all elements, return `maximumAchievedSum`.
 * Dry Run: nums = [18, 43, 36, 17, 9]
 * 1. Initialize `maximumAchievedSum = -1`, `digitSumToGreatestValueMap = {}`.
 * 2. Process `elementValue = 18`:
 *    - `numberForDigitSum = 18`. `computedDigitSum = 0`.
 *    - Loop: `computedDigitSum = 8` (`numberForDigitSum = 1`), `computedDigitSum = 9` (`numberForDigitSum = 0`). `computedDigitSum` is 9.
 *    - `digitSumToGreatestValueMap` does not have 9.
 *    - `digitSumToGreatestValueMap` becomes `{9: 18}`.
 * 3. Process `elementValue = 43`:
 *    - `numberForDigitSum = 43`. `computedDigitSum = 0`.
 *    - Loop: `computedDigitSum = 3` (`numberForDigitSum = 4`), `computedDigitSum = 7` (`numberForDigitSum = 0`). `computedDigitSum` is 7.
 *    - `digitSumToGreatestValueMap` does not have 7.
 *    - `digitSumToGreatestValueMap` becomes `{9: 18, 7: 43}`.
 * 4. Process `elementValue = 36`:
 *    - `numberForDigitSum = 36`. `computedDigitSum = 0`.
 *    - Loop: `computedDigitSum = 6` (`numberForDigitSum = 3`), `computedDigitSum = 9` (`numberForDigitSum = 0`). `computedDigitSum` is 9.
 *    - `digitSumToGreatestValueMap` has 9. `priorMaxElement = 18`.
 *    - `maximumAchievedSum = Math.max(-1, 36 + 18) = 54`.
 *    - `digitSumToGreatestValueMap.set(9, Math.max(18, 36))` results in `digitSumToGreatestValueMap.set(9, 36)`.
 *    - `digitSumToGreatestValueMap` is `{9: 36, 7: 43}`.
 * 5. Process `elementValue = 17`:
 *    - `numberForDigitSum = 17`. `computedDigitSum = 0`.
 *    - Loop: `computedDigitSum = 7` (`numberForDigitSum = 1`), `computedDigitSum = 8` (`numberForDigitSum = 0`). `computedDigitSum` is 8.
 *    - `digitSumToGreatestValueMap` does not have 8.
 *    - `digitSumToGreatestValueMap` becomes `{9: 36, 7: 43, 8: 17}`.
 * 6. Process `elementValue = 9`:
 *    - `numberForDigitSum = 9`. `computedDigitSum = 0`.
 *    - Loop: `computedDigitSum = 9` (`numberForDigitSum = 0`). `computedDigitSum` is 9.
 *    - `digitSumToGreatestValueMap` has 9. `priorMaxElement = 36`.
 *    - `maximumAchievedSum = Math.max(54, 9 + 36) = 54`.
 *    - `digitSumToGreatestValueMap.set(9, Math.max(36, 9))` results in `digitSumToGreatestValueMap.set(9, 36)`.
 *    - `digitSumToGreatestValueMap` remains `{9: 36, 7: 43, 8: 17}`.
 * 7. All elements processed. Return `maximumAchievedSum = 54`.
 * Time Complexity: O(N * D)
 * Space Complexity: O(1)
 */
var maximumSum = function (nums) {
  let maximumAchievedSum = -1;
  const digitSumToGreatestValueMap = new Map();

  for (const elementValue of nums) {
    let numberForDigitSum = elementValue;
    let computedDigitSum = 0;

    while (numberForDigitSum > 0) {
      computedDigitSum += numberForDigitSum % 10;
      numberForDigitSum = Math.floor(numberForDigitSum / 10);
    }

    if (digitSumToGreatestValueMap.has(computedDigitSum)) {
      const priorMaxElement = digitSumToGreatestValueMap.get(computedDigitSum);
      maximumAchievedSum = Math.max(
        maximumAchievedSum,
        elementValue + priorMaxElement,
      );
      digitSumToGreatestValueMap.set(
        computedDigitSum,
        Math.max(priorMaxElement, elementValue),
      );
    } else {
      digitSumToGreatestValueMap.set(computedDigitSum, elementValue);
    }
  }

  return maximumAchievedSum;
};

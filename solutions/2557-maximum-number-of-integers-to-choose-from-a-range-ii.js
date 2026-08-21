/**
 * Maximum Number Of Integers To Choose From A Range Ii
 * Intuition: The problem asks for the maximum count of integers from 1 to 'n' that are not in 'banned' and whose sum doesn't exceed 'maxSum'. The sum of the first 'k' positive integers is k*(k+1)/2. We can leverage this to find an initial estimate for 'k' by solving the quadratic equation k*(k+1)/2 <= maxSum. This gives us an initial upper bound on how many integers we can potentially choose. From this initial set, we subtract the banned numbers and then incrementally add non-banned numbers beyond this initial bound as long as the total sum does not exceed 'maxSum'.
 * Approach: 1. Calculate an initial upper bound 'initialTopValue' for the count of chosen integers. This is derived from the largest 'k' such that the sum of 1 to 'k' does not exceed 'maxSum', clamped by 'n'. 2. Create a Set 'prohibitedNumbersSet' from the 'banned' array for efficient O(1) average-time lookups. 3. Initialize 'currentCumulativeSum' with the sum of integers from 1 to 'initialTopValue' and 'totalChosenElements' with 'initialTopValue'. 4. Iterate through 'prohibitedNumbersSet'. For each 'forbiddenValue' that is less than or equal to 'initialTopValue', subtract 'forbiddenValue' from 'currentCumulativeSum' and decrement 'totalChosenElements'. 5. Iterate from 'initialTopValue + 1' up to 'n'. For each 'potentialNumber', check if adding it would exceed 'maxSum'. If it does, return the current 'totalChosenElements'. If 'potentialNumber' is not in 'prohibitedNumbersSet', add it to 'currentCumulativeSum' and increment 'totalChosenElements'. 6. After the loop, return 'totalChosenElements'.
 * Dry Run: banned = [1, 2, 3], n = 5, maxSum = 5
 * 1. initialTopValue calculation:
 *    k * (k + 1) / 2 <= 5  => k^2 + k - 10 <= 0
 *    Roots of k^2 + k - 10 = 0 are (-1 +/- sqrt(1 - 4*1*(-10))) / 2 = (-1 +/- sqrt(41)) / 2
 *    Positive root approx (-1 + 6.403) / 2 = 2.7015
 *    floor(2.7015) = 2.
 *    initialTopValue = Math.min(5, 2) = 2.
 * 2. prohibitedNumbersSet = Set([1, 2, 3]).
 * 3. currentCumulativeSum = 1 + 2 = 3.
 * 4. totalChosenElements = 2.
 * 5. Adjust for banned numbers within initialTopValue:
 *    - prohibitedNumber = 1: 1 <= 2. currentCumulativeSum = 3 - 1 = 2. totalChosenElements = 2 - 1 = 1.
 *    - prohibitedNumber = 2: 2 <= 2. currentCumulativeSum = 2 - 2 = 0. totalChosenElements = 1 - 1 = 0.
 *    - prohibitedNumber = 3: 3 > 2. (Skipped).
 *    Current state: currentCumulativeSum = 0, totalChosenElements = 0.
 * 6. Extend selection beyond initialTopValue:
 *    - potentialNumber = 3 (initialTopValue + 1):
 *      - currentCumulativeSum + potentialNumber (0 + 3 = 3) is not > maxSum (5).
 *      - prohibitedNumbersSet.has(3) is true. (Skipped).
 *    - potentialNumber = 4:
 *      - currentCumulativeSum + potentialNumber (0 + 4 = 4) is not > maxSum (5).
 *      - prohibitedNumbersSet.has(4) is false.
 *      - currentCumulativeSum = 0 + 4 = 4. totalChosenElements = 0 + 1 = 1.
 *    - potentialNumber = 5:
 *      - currentCumulativeSum + potentialNumber (4 + 5 = 9) is > maxSum (5).
 *      - Return totalChosenElements = 1.
 *    Final result: 1 (The number 4 is chosen).
 * Time Complexity: O(B + N)
 * Space Complexity: O(B)
 */
var maxCount = function (inputBannedNumbers, rangeLimit, maximumPossibleSum) {
  const initialTopValue = Math.min(
    rangeLimit,
    Math.floor((-1 + Math.sqrt(1 + 8 * maximumPossibleSum)) / 2)
  );
  const prohibitedNumbersSet = new Set(inputBannedNumbers);

  let currentCumulativeSum = (initialTopValue * (initialTopValue + 1)) / 2;
  let totalChosenElements = initialTopValue;

  for (const forbiddenValue of prohibitedNumbersSet) {
    if (forbiddenValue > 0 && forbiddenValue <= initialTopValue) {
      currentCumulativeSum -= forbiddenValue;
      totalChosenElements -= 1;
    }
  }

  for (
    let potentialNumber = initialTopValue + 1;
    potentialNumber <= rangeLimit;
    potentialNumber++
  ) {
    if (currentCumulativeSum + potentialNumber > maximumPossibleSum) {
      return totalChosenElements;
    }

    if (!prohibitedNumbersSet.has(potentialNumber)) {
      currentCumulativeSum += potentialNumber;
      totalChosenElements += 1;
    }
  }

  return totalChosenElements;
};

/**
 * Minimum Number Of Operations To Convert Time
 * Intuition: The problem asks for the minimum number of operations to reach a target time using fixed increments (1, 5, 15, 60 minutes). This is a classic change-making problem where a greedy approach works because the denominations (increments) are well-suited (e.g., 1 is the smallest, and others are multiples or cover gaps efficiently such that taking the largest possible denomination first always leads to an optimal solution).
 * Approach:
 * 1. Convert both the `current` and `correct` times from "HH:MM" string format into total minutes from 00:00. This simplifies calculations as we're dealing with a single integer value representing time.
 * 2. Calculate the difference in minutes between `correct` and `current`. This is the total number of minutes that need to be added.
 * 3. Initialize a counter for the total operations to zero.
 * 4. Define the allowed increments in descending order: [60, 15, 5, 1].
 * 5. Iterate through these increments: For each increment, determine how many times it can fully divide the remaining minute difference. Add this count to the total operations. Then, update the remaining minute difference by taking its modulo with the current increment, effectively removing the minutes accounted for.
 * 6. The final total operations count will be the minimum required.
 * Dry Run:
 * current = "02:30", correct = "04:35"
 * 1. Convert to minutes:
 *    currentTotalMinutesValue = (2 * 60) + 30 = 120 + 30 = 150 minutes
 *    correctTotalMinutesValue = (4 * 60) + 35 = 240 + 35 = 275 minutes
 * 2. Calculate difference:
 *    totalMinuteDifference = 275 - 150 = 125 minutes
 * 3. Initialize totalOperationCount = 0
 * 4. possibleIncrements = [60, 15, 5, 1]
 * 5. Iterate:
 *    - For singleIncrementValue = 60:
 *      countForIncrement = Math.floor(125 / 60) = Math.floor(2.08) = 2
 *      totalOperationCount = 0 + 2 = 2
 *      totalMinuteDifference = 125 % 60 = 5
 *    - For singleIncrementValue = 15:
 *      countForIncrement = Math.floor(5 / 15) = Math.floor(0.33) = 0
 *      totalOperationCount = 2 + 0 = 2
 *      totalMinuteDifference = 5 % 15 = 5
 *    - For singleIncrementValue = 5:
 *      countForIncrement = Math.floor(5 / 5) = 1
 *      totalOperationCount = 2 + 1 = 3
 *      totalMinuteDifference = 5 % 5 = 0
 *    - For singleIncrementValue = 1:
 *      countForIncrement = Math.floor(0 / 1) = 0
 *      totalOperationCount = 3 + 0 = 3
 *      totalMinuteDifference = 0 % 1 = 0
 * 6. Return totalOperationCount = 3
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var convertTime = function (currentInput, correctInput) {
  const minutesConvertFunc = (timeStringParam) => {
    const [hoursPart, minutesPart] = timeStringParam.split(":").map(Number);
    const resultTotalMinutes = hoursPart * 60 + minutesPart;
    return resultTotalMinutes;
  };

  const currentTotalMinutesValue = minutesConvertFunc(currentInput);
  const correctTotalMinutesValue = minutesConvertFunc(correctInput);

  let totalMinuteDifference =
    correctTotalMinutesValue - currentTotalMinutesValue;
  const possibleIncrements = [60, 15, 5, 1];
  let totalOperationCount = 0;

  for (const singleIncrementValue of possibleIncrements) {
    const countForIncrement = Math.floor(
      totalMinuteDifference / singleIncrementValue,
    );
    totalOperationCount += countForIncrement;
    totalMinuteDifference %= singleIncrementValue;
  }

  return totalOperationCount;
};

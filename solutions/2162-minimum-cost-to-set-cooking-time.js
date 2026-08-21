/**
 * Minimum Cost To Set Cooking Time
 * Intuition: The target cooking time can be represented in at most two valid MM:SS formats due to the microwave's 99-minute, 99-second limit and the option to "borrow" 60 seconds from a minute. We must calculate the cost for each valid representation and find the minimum.
 * Approach: 1. Calculate the first possible (minutes, seconds) representation (e.g., 1 min 10 secs for 70 seconds). 2. If this representation is valid (minutes <= 99), convert it to a sequence of digits to be pressed, omitting leading non-significant zeros, and calculate its cost. 3. Calculate the second possible (minutes, seconds) representation by decrementing minutes and incrementing seconds (e.g., 0 min 70 secs for 70 seconds). 4. If this representation is also valid (minutes >= 0, minutes <= 99, seconds <= 99), convert it to a digit sequence and calculate its cost. 5. Return the minimum of all valid costs.
 * Dry Run: startAt = 0, moveCost = 1, pushCost = 2, targetSeconds = 70
 *   - Initialize minimumPossibleCost = Infinity.
 *   - First representation: firstMinutesOption = 1, firstSecondsOption = 10 (from 70 seconds).
 *   - This is valid (1 <= 99).
 *   - obtainDigits(1, 10) -> [1, 1, 0] (for "1 minute 10 seconds").
 *   - calculateInputCost([1, 1, 0], 0, 1, 2):
 *     - Start at 0, move to 1 (cost +1), push 1 (cost +2). Total = 3. Current position = 1.
 *     - Stay at 1, push 1 (cost +2). Total = 5. Current position = 1.
 *     - Move to 0 (cost +1), push 0 (cost +2). Total = 8. Current position = 0.
 *     - costForOption1 = 8.
 *   - minimumPossibleCost = min(Infinity, 8) = 8.
 *   - Second representation: secondMinutesOption = 1 - 1 = 0, secondSecondsOption = 10 + 60 = 70.
 *   - This is valid (0 >= 0 && 0 <= 99 && 70 <= 99).
 *   - obtainDigits(0, 70) -> [7, 0] (for "0 minutes 70 seconds").
 *   - calculateInputCost([7, 0], 0, 1, 2):
 *     - Start at 0, move to 7 (cost +1), push 7 (cost +2). Total = 3. Current position = 7.
 *     - Move to 0 (cost +1), push 0 (cost +2). Total = 6. Current position = 0.
 *     - costForOption2 = 6.
 *   - minimumPossibleCost = min(8, 6) = 6.
 *   - Return 6.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minCostSetTime = function (startAt, moveCost, pushCost, targetSeconds) {
  let minimumPossibleCost = Infinity;

  function obtainDigits(minutesValue, secondsValue) {
    let processedDigits = [];

    if (minutesValue > 0) {
      if (minutesValue >= 10) {
        processedDigits.push(Math.floor(minutesValue / 10));
      }
      processedDigits.push(minutesValue % 10);
    }

    if (minutesValue > 0 || secondsValue >= 10) {
      processedDigits.push(Math.floor(secondsValue / 10));
    }
    processedDigits.push(secondsValue % 10);

    return processedDigits;
  }

  function calculateInputCost(
    digitArrayForCost,
    initialFingerPosition,
    movementPrice,
    pressPrice
  ) {
    let totalFatigueUnits = 0;
    let currentFingerLocation = initialFingerPosition;

    for (const pressedDigit of digitArrayForCost) {
      if (pressedDigit !== currentFingerLocation) {
        totalFatigueUnits += movementPrice;
        currentFingerLocation = pressedDigit;
      }
      totalFatigueUnits += pressPrice;
    }
    return totalFatigueUnits;
  }

  const firstMinutesOption = Math.floor(targetSeconds / 60);
  const firstSecondsOption = targetSeconds % 60;

  if (firstMinutesOption <= 99) {
    const sequenceOfDigits1 = obtainDigits(
      firstMinutesOption,
      firstSecondsOption
    );
    const costForOption1 = calculateInputCost(
      sequenceOfDigits1,
      startAt,
      moveCost,
      pushCost
    );
    minimumPossibleCost = Math.min(minimumPossibleCost, costForOption1);
  }

  const secondMinutesOption = firstMinutesOption - 1;
  const secondSecondsOption = firstSecondsOption + 60;

  if (
    secondMinutesOption >= 0 &&
    secondMinutesOption <= 99 &&
    secondSecondsOption <= 99
  ) {
    const sequenceOfDigits2 = obtainDigits(
      secondMinutesOption,
      secondSecondsOption
    );
    const costForOption2 = calculateInputCost(
      sequenceOfDigits2,
      startAt,
      moveCost,
      pushCost
    );
    minimumPossibleCost = Math.min(minimumPossibleCost, costForOption2);
  }

  return minimumPossibleCost;
};

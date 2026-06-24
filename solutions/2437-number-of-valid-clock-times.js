/**
 * Number Of Valid Clock Times
 * Intuition: The number of valid clock times can be determined independently for the hour and minute components. The total count is the product of the valid hour combinations and valid minute combinations.
 * Approach: 1. Extract the first two characters for the hour and the last two for the minute. 2. Calculate the number of valid hour combinations based on whether '?' appears in the first digit, second digit, or both. This involves checking specific ranges (e.g., '0'-'2' for the first hour digit if the second is '0'-'3', or '0'-'1' if the second is '4'-'9'). 3. Calculate the number of valid minute combinations similarly. The first minute digit can be '0'-'5' and the second '0'-'9'. 4. Multiply the valid hour combinations by the valid minute combinations to get the final answer.
 * Dry Run:
 * Input: time = "?0:??"
 *
 * Hour Calculation:
 * hourDigitOne = '?'
 * hourDigitTwo = '0'
 * 1. `if (hourDigitOne === '?')` is true.
 * 2. `if (hourDigitTwo === '?')` is false.
 * 3. The `else` branch executes: `if (hourDigitTwo <= '3')` ('0' <= '3') is true.
 * 4. `validHourCount` becomes 3 (00, 10, 20 are valid for ?0).
 *
 * Minute Calculation:
 * minuteDigitOne = '?'
 * minuteDigitTwo = '?'
 * 1. `if (minuteDigitOne !== '?')` is false.
 * 2. The `else` branch executes: `if (minuteDigitTwo !== '?')` is false.
 * 3. The inner `else` branch executes.
 * 4. `validMinuteCount` becomes 60 (00-59 are valid for ??).
 *
 * Final Result:
 * `finalResult = validHourCount * validMinuteCount = 3 * 60 = 180`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var countTime = function (inputTime) {
  let hourDigitOne = inputTime[0];
  let hourDigitTwo = inputTime[1];
  let validHourCount;

  if (hourDigitOne === "?") {
    if (hourDigitTwo === "?") {
      validHourCount = 24;
    } else {
      if (hourDigitTwo <= "3") {
        validHourCount = 3;
      } else {
        validHourCount = 2;
      }
    }
  } else {
    if (hourDigitTwo === "?") {
      if (hourDigitOne === "2") {
        validHourCount = 4;
      } else {
        validHourCount = 10;
      }
    } else {
      validHourCount = 1;
    }
  }

  let minuteDigitOne = inputTime[3];
  let minuteDigitTwo = inputTime[4];
  let validMinuteCount;

  if (minuteDigitOne !== "?") {
    if (minuteDigitTwo !== "?") {
      validMinuteCount = 1;
    } else {
      validMinuteCount = 10;
    }
  } else {
    if (minuteDigitTwo !== "?") {
      validMinuteCount = 6;
    } else {
      validMinuteCount = 60;
    }
  }

  let finalResult = validHourCount * validMinuteCount;
  return finalResult;
};

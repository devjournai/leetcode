/**
 * Smallest Value Of The Rearranged Number
 * Intuition: To minimize a positive number, its digits should be arranged in ascending order, with the smallest non-zero digit at the leading position to avoid leading zeros. To minimize a negative number, its absolute value must be maximized; this is achieved by arranging its digits in descending order.
 * Approach: 1. Determine the sign of the input number. 2. Convert the absolute value of the number into an array of its constituent digits. 3. If the original number was negative, sort the digit array in descending order, join them, parse into a number, and then negate the result. 4. If the original number was positive, sort the digit array in ascending order. 5. In the positive case, if the first digit is zero and there are other non-zero digits, find the index of the first non-zero digit and swap it with the current first digit (which is zero) to prevent leading zeros. 6. Finally, join the digits back into a string, convert to an integer, and return.
 * Dry Run: num = 3104
 *   1. inputNumber is 3104. isNumberNegative = false.
 *   2. absoluteValueString = "3104". digitCharacters = ["3", "1", "0", "4"]. numericDigits = [3, 1, 0, 4].
 *   3. Not negative path.
 *   4. numericDigits sorted ascending becomes [0, 1, 3, 4].
 *   5. To find first non-zero:
 *      firstNonZeroElementIndex initialized to -1. iterationCounter = 0. totalDigitsCount = 4.
 *      While loop:
 *      - iterationCounter = 0: numericDigits[0] (0) is 0. Continue. iterationCounter = 1.
 *      - iterationCounter = 1: numericDigits[1] (1) is not 0. firstNonZeroElementIndex = 1. Break.
 *      firstNonZeroElementIndex is 1.
 *   6. Check for swap: numericDigits[0] (0) === 0 (true) && firstNonZeroElementIndex (1) !== -1 (true) && firstNonZeroElementIndex (1) > 0 (true).
 *      Condition is true, perform swap:
 *      - tempValueStorage = numericDigits[0] (0).
 *      - numericDigits[0] = numericDigits[1] (1). numericDigits is now [1, 1, 3, 4].
 *      - numericDigits[1] = tempValueStorage (0). numericDigits is now [1, 0, 3, 4].
 *   7. finalDigitArrangement = "1034".
 *   8. resultNumber = 1034.
 *   9. Return 1034.
 *
 * Dry Run: num = -765
 *   1. inputNumber is -765. isNumberNegative = true.
 *   2. absoluteValueString = "765". digitCharacters = ["7", "6", "5"]. numericDigits = [7, 6, 5].
 *   3. Negative path:
 *   4. numericDigits sorted descending becomes [7, 6, 5].
 *   5. joinedNegativeDigits = "765".
 *   6. positiveParsedValue = 765.
 *   7. Return -positiveParsedValue = -765.
 *
 * Dry Run: num = 0
 *   1. inputNumber is 0. isNumberNegative = false.
 *   2. absoluteValueString = "0". digitCharacters = ["0"]. numericDigits = [0].
 *   3. Not negative path.
 *   4. numericDigits sorted ascending remains [0].
 *   5. To find first non-zero:
 *      firstNonZeroElementIndex initialized to -1. iterationCounter = 0. totalDigitsCount = 1.
 *      While loop:
 *      - iterationCounter = 0: numericDigits[0] (0) is 0. Continue. iterationCounter = 1.
 *      Loop condition (1 < 1) is false. Loop ends.
 *      firstNonZeroElementIndex remains -1.
 *   6. Check for swap: numericDigits[0] (0) === 0 (true) && firstNonZeroElementIndex (-1) !== -1 (false).
 *      Condition is false, no swap.
 *   7. finalDigitArrangement = "0".
 *   8. resultNumber = 0.
 *   9. Return 0.
 *
 * Time Complexity: O(D log D)
 * Space Complexity: O(D)
 */
var smallestNumber = function (num) {
  const isNumberNegative = num < 0;
  const absoluteValueString = Math.abs(num).toString();
  const digitCharacters = absoluteValueString.split("");
  const numericDigits = digitCharacters.map(Number);

  if (isNumberNegative) {
    numericDigits.sort((firstDigit, secondDigit) => secondDigit - firstDigit);
    const joinedNegativeDigits = numericDigits.join("");
    const positiveParsedValue = parseInt(joinedNegativeDigits, 10);
    return -positiveParsedValue;
  } else {
    numericDigits.sort((firstValue, secondValue) => firstValue - secondValue);

    let firstNonZeroElementIndex = -1;
    let iterationCounter = 0;
    const totalDigitsCount = numericDigits.length;
    while (iterationCounter < totalDigitsCount) {
      if (numericDigits[iterationCounter] !== 0) {
        firstNonZeroElementIndex = iterationCounter;
        break;
      }
      iterationCounter++;
    }

    if (
      numericDigits[0] === 0 &&
      firstNonZeroElementIndex !== -1 &&
      firstNonZeroElementIndex > 0
    ) {
      const tempValueStorage = numericDigits[0];
      numericDigits[0] = numericDigits[firstNonZeroElementIndex];
      numericDigits[firstNonZeroElementIndex] = tempValueStorage;
    }

    const finalDigitArrangement = numericDigits.join("");
    const resultNumber = parseInt(finalDigitArrangement, 10);
    return resultNumber;
  }
};

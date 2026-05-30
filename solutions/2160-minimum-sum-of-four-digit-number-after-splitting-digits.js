/**
 * Minimum Sum Of Four Digit Number After Splitting Digits
 * Intuition: To minimize the sum of two numbers formed by four digits, the most significant digits (tens places) of these new numbers should be as small as possible. Therefore, the two smallest available digits from the input number should be assigned to the tens places, and the remaining two larger digits should be assigned to the units places. The exact pairing of the units digits does not affect the total sum, as their sum remains constant regardless of which tens digit they are paired with.
 * Approach: 1. Convert the given four-digit integer `num` into its individual digits, typically by first converting it to a string, then splitting it into characters, and finally parsing each character back to a number. 2. Sort these four extracted digits in non-decreasing (ascending) order. 3. Construct the first new number (`new1`) by using the smallest digit as its tens digit and the third smallest digit as its units digit. 4. Construct the second new number (`new2`) by using the second smallest digit as its tens digit and the largest digit as its units digit. 5. Return the sum of `new1` and `new2`.
 * Dry Run: For num = 2932:
 *   1. Convert `num` to a string: "2932".
 *   2. Split the string into an array of character digits: ['2', '9', '3', '2'].
 *   3. Map the character digits to numeric values: [2, 9, 3, 2].
 *   4. Sort the numeric digits: `orderedDigits` becomes [2, 2, 3, 9].
 *      - `digitA` (smallest) is 2.
 *      - `digitB` (second smallest) is 2.
 *      - `digitC` (third smallest) is 3.
 *      - `digitD` (largest) is 9.
 *   5. Form `composedNumberOne`: (digitA * 10) + digitC = (2 * 10) + 3 = 20 + 3 = 23.
 *   6. Form `composedNumberTwo`: (digitB * 10) + digitD = (2 * 10) + 9 = 20 + 9 = 29.
 *   7. Calculate `totalResult`: composedNumberOne + composedNumberTwo = 23 + 29 = 52.
 *   Result: 52.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minimumSum = function (num) {
  const numStringRepresentation = String(num);
  const charArrayFromNum = numStringRepresentation.split("");
  const numberArrayFromChars = charArrayFromNum.map((aChar) => Number(aChar));
  const orderedDigits = numberArrayFromChars.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );

  const digitA = orderedDigits[0];
  const digitB = orderedDigits[1];
  const digitC = orderedDigits[2];
  const digitD = orderedDigits[3];

  const composedNumberOne = digitA * 10 + digitC;
  const composedNumberTwo = digitB * 10 + digitD;

  const totalResult = composedNumberOne + composedNumberTwo;
  return totalResult;
};

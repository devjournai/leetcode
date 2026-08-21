/**
 * Add Binary
 * Intuition: Add from the least significant bits with a carry, the same as decimal addition but modulo 2. Continue while either string or the carry remains.
 * Approach: 1. Point at the last char of both strings, carry = 0. 2. While either index is valid or carry is 1, add the two bits (0 if exhausted) plus carry, push sum % 2, set carry to floor(sum/2). 3. Reverse the collected bits and join.
 * Dry Run: a = "11", b = "1".
 *   - 1+1+0 = 2 → bit 0, carry 1. Next 1+0+1 = 2 → bit 0, carry 1. Then carry 1 → bit 1. Reverse → "100".
 * Time Complexity: O(max(a.length, b.length))
 * Space Complexity: O(max(a.length, b.length))
 */
var addBinary = function (a, b) {
  let pointerA = a.length - 1;
  let pointerB = b.length - 1;
  let carryValue = 0;
  const resultDigits = [];

  while (pointerA >= 0 || pointerB >= 0 || carryValue === 1) {
    let currentDigitA = 0;
    if (pointerA >= 0) {
      currentDigitA = parseInt(a[pointerA]);
    }

    let currentDigitB = 0;
    if (pointerB >= 0) {
      currentDigitB = parseInt(b[pointerB]);
    }

    const sumIteration = currentDigitA + currentDigitB + carryValue;
    const currentResultDigit = sumIteration % 2;
    carryValue = Math.floor(sumIteration / 2);

    resultDigits.push(currentResultDigit);

    pointerA--;
    pointerB--;
  }

  return resultDigits.reverse().join("");
};

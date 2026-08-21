/**
 * Number Of Digit One
 * Intuition: Count 1s by decimal place. At place p, complete higher cycles contribute floor(n/10p)*p ones; the leftover digit at that place adds either 0, (n%p)+1, or a full p ones.
 * Approach: 1. If n < 0 return 0. 2. For place = 1,10,100,... while place <= n: add fullCycles * place. 3. If the digit at this place > 1, add place; if it is 1, add (lower digits)+1. 4. Return the total.
 * Dry Run: n = 13, place = 1 then 10.
 *   - Ones place: 1 full cycle → +1; digit 3 > 1 → +1 (total 2).
 *   - Tens: 0 cycles; digit 1 → + (3+1) = 4; total 6 (ones in 1,10,11,12,13).
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var countDigitOne = function (n) {
  if (n < 0) {
    return 0;
  }

  let totalOnesCount = 0;
  let currentDecimalPlace = 1;

  while (currentDecimalPlace <= n) {
    let nextDecimalPlace = currentDecimalPlace * 10;
    let fullCyclesAmount = Math.floor(n / nextDecimalPlace);
    totalOnesCount += fullCyclesAmount * currentDecimalPlace;

    let remainingPartDigits = n % nextDecimalPlace;
    let currentDigitValue = Math.floor(
      remainingPartDigits / currentDecimalPlace
    );

    if (currentDigitValue > 1) {
      totalOnesCount += currentDecimalPlace;
    } else if (currentDigitValue === 1) {
      let lowerOrderDigits = remainingPartDigits % currentDecimalPlace;
      totalOnesCount += lowerOrderDigits + 1;
    }

    currentDecimalPlace *= 10;
  }

  return totalOnesCount;
};

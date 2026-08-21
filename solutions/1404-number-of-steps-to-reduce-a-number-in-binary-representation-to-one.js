/**
 * Number of Steps to Reduce a Number in Binary Representation to One
 * Intuition: Even numbers (end with 0) are halved by dropping the last bit; odd numbers are incremented (binary add 1 with carry). Repeat until the string is "1".
 * Approach: 1. Work on a char array. 2. While not "1": if last bit 0, pop; else add 1 from the right, possibly unshift a new '1'. 3. Count each operation.
 * Dry Run: s = "1101" (13).
 *   - Odd → 1110; even → 111; odd → 1000; even three times → 1. Six steps.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numSteps = function (s) {
  let currentBinaryDigits = s.split("");
  let operationCount = 0;

  while (currentBinaryDigits.length > 1 || currentBinaryDigits[0] !== "1") {
    operationCount++;
    let lastBinaryDigit = currentBinaryDigits[currentBinaryDigits.length - 1];

    if (lastBinaryDigit === "0") {
      currentBinaryDigits.pop();
    } else {
      let currentCarry = 1;
      let bitPointer = currentBinaryDigits.length - 1;

      while (bitPointer >= 0 && currentCarry === 1) {
        if (currentBinaryDigits[bitPointer] === "1") {
          currentBinaryDigits[bitPointer] = "0";
        } else {
          currentBinaryDigits[bitPointer] = "1";
          currentCarry = 0;
        }
        bitPointer--;
      }

      if (currentCarry === 1) {
        currentBinaryDigits.unshift("1");
      }
    }
  }

  return operationCount;
};

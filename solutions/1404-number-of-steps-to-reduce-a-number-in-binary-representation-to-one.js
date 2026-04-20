/**
 * Number of Steps to Reduce a Number in Binary Representation to One
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

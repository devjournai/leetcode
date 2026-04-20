/**
 * Minimum Changes To Make Alternating Binary String
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (s) {
  let operationsForZeroStart = 0;
  let operationsForOneStart = 0;
  let stringLength = s.length;

  for (let currentIdx = 0; currentIdx < stringLength; currentIdx++) {
    let expectedCharForZeroStart;
    let expectedCharForOneStart;

    if (currentIdx % 2 === 0) {
      expectedCharForZeroStart = "0";
      expectedCharForOneStart = "1";
    } else {
      expectedCharForZeroStart = "1";
      expectedCharForOneStart = "0";
    }

    let actualChar = s[currentIdx];

    if (actualChar !== expectedCharForZeroStart) {
      operationsForZeroStart++;
    }
    if (actualChar !== expectedCharForOneStart) {
      operationsForOneStart++;
    }
  }

  return Math.min(operationsForZeroStart, operationsForOneStart);
};

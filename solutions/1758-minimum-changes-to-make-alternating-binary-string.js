/**
 * Minimum Changes To Make Alternating Binary String
 * Intuition: An alternating string is either 0101… or 1010…. Count mismatches against both patterns and take the min.
 * Approach: 1. For each index, expected bits for zero-start and one-start. 2. Increment `operationsForZeroStart` / `operationsForOneStart` on mismatch. 3. Return the min.
 * Dry Run: s = "0100"
 * vs 0101: last bit 1 change → 1; vs 1010: three changes. Min = 1.
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

/**
 * Perform String Shifts
 * Intuition: Left and right shifts cancel. Collapse every operation into one net right rotation, normalize modulo n, then cut the string once.
 * Approach: 1. For each [direction, amount], subtract amount for left (0) and add for right (1). 2. Normalize net shift into [0, n). 3. Split at n - shift: last shift chars move to the front. 4. Concatenate the two segments.
 * Dry Run: s = "abc", shift = [[0,1],[1,2]]
 *   - net = -1 + 2 = +1 (one right rotation)
 *   - divisionPoint = 3-1 = 2
 *   - "c" + "ab" = "cab"
 * Time Complexity: O(M + N)
 * Space Complexity: O(N)
 */
var stringShift = function (s, shift) {
  let accumulatedNetShift = 0;

  for (const [currentMoveDirection, currentShiftAmount] of shift) {
    if (currentMoveDirection === 0) {
      accumulatedNetShift -= currentShiftAmount;
    } else {
      accumulatedNetShift += currentShiftAmount;
    }
  }

  const stringCharacterCount = s.length;
  let rawEffectiveShift = accumulatedNetShift % stringCharacterCount;
  let finalNormalizedShift =
    (rawEffectiveShift + stringCharacterCount) % stringCharacterCount;

  let divisionPoint = stringCharacterCount - finalNormalizedShift;

  let segmentOne = s.substring(divisionPoint);
  let segmentTwo = s.substring(0, divisionPoint);

  let resultingString = segmentOne + segmentTwo;

  return resultingString;
};

/**
 * Perform String Shifts
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

/**
 * Can Convert String In K Moves
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var canConvertString = function (sourceString, targetString, maxAllowedMoves) {
  const sourceLength = sourceString.length;
  const targetLength = targetString.length;

  if (sourceLength !== targetLength) {
    return false;
  }

  const requiredShiftsMap = new Array(26).fill(0);

  for (let currentIdx = 0; currentIdx < sourceLength; ++currentIdx) {
    const sourceCharAscii = sourceString.charCodeAt(currentIdx);
    const targetCharAscii = targetString.charCodeAt(currentIdx);
    let calculatedShiftAmount = (targetCharAscii - sourceCharAscii + 26) % 26;

    if (calculatedShiftAmount > 0) {
      requiredShiftsMap[calculatedShiftAmount]++;
    }
  }

  for (
    let shiftValueConsidered = 1;
    shiftValueConsidered < 26;
    ++shiftValueConsidered
  ) {
    const numberOfOccurrences = requiredShiftsMap[shiftValueConsidered];

    if (numberOfOccurrences === 0) {
      continue;
    }

    const lastMoveCostForShift =
      shiftValueConsidered + 26 * (numberOfOccurrences - 1);

    if (lastMoveCostForShift > maxAllowedMoves) {
      return false;
    }
  }

  return true;
};

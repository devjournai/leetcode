/**
 * Can Convert String In K Moves
 * Intuition: Each position needs a shift 0..25. The t-th use of shift s costs s+26*(t-1) and must be ≤ k; shift 0 is free.
 * Approach: 1. Lengths must match. 2. Count needed shifts 1..25. 3. For each s, last cost s+26*(cnt-1) ≤ k.
 * Dry Run: s = "input", t = "output", k = 9.
 *   - Shift 6 is needed twice; last cost 32 > 9 → false.
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

/**
 * Move Pieces To Obtain A String
 * Intuition: 'L' pieces can only move left, and 'R' pieces can only move right. This implies two crucial constraints: 1. The relative order of 'L' and 'R' pieces must be maintained from 'start' to 'target'. 2. Each 'L' piece must end up at an index less than or equal to its starting index, and each 'R' piece must end up at an index greater than or equal to its starting index. We can verify these conditions by comparing corresponding non-blank pieces using a two-pointer approach.
 * Approach: 1. Initialize two pointers, one for 'start' (startSearchPointer) and one for 'target' (targetSearchPointer), both at index 0. 2. Iterate while either pointer is within the bounds of the string length. 3. Within each iteration, advance startSearchPointer past any '_' characters in 'start', and similarly advance targetSearchPointer past any '_' characters in 'target'. 4. After advancing, check if both pointers have reached the end of their respective strings. If so, all pieces have been matched and conditions met, so we can break. 5. If one pointer has reached the end but the other has not, it means there's an unequal number of non-blank pieces, so return false. 6. If both pointers point to valid non-blank characters, check if the characters at start[startSearchPointer] and target[targetSearchPointer] are different. If they are, their relative order or type has changed, so return false. 7. Apply the movement rules: if the character is 'L', its start index (startSearchPointer) must be greater than or equal to its target index (targetSearchPointer). If 'L' moved right (startSearchPointer < targetSearchPointer), return false. 8. If the character is 'R', its start index (startSearchPointer) must be less than or equal to its target index (targetSearchPointer). If 'R' moved left (startSearchPointer > targetSearchPointer), return false. 9. If all checks pass for the current pair, increment both pointers to move to the next pair of non-blank pieces. 10. If the loop completes without returning false, it means 'target' can be obtained from 'start', so return true.
 * Dry Run: start = "_L__R_", target = "L___R"
 * totalLength = 6
 * startSearchPointer = 0, targetSearchPointer = 0
 *
 * Loop 1:
 * - startSearchPointer advances: start[0] is '_', startSearchPointer becomes 1 (start[1] is 'L').
 * - targetSearchPointer advances: target[0] is 'L'.
 * - Pointers: startSearchPointer = 1, targetSearchPointer = 0. Neither at end.
 * - start[1] ('L') === target[0] ('L'). Match.
 * - currentPiece = 'L'. startSearchPointer (1) < targetSearchPointer (0) is false. Valid.
 * - Increment startSearchPointer to 2, targetSearchPointer to 1.
 *
 * Loop 2:
 * - startSearchPointer advances: start[2] is '_', becomes 3; start[3] is '_', becomes 4 (start[4] is 'R').
 * - targetSearchPointer advances: target[1] is '_', becomes 2; target[2] is '_', becomes 3; target[3] is '_', becomes 4 (target[4] is 'R').
 * - Pointers: startSearchPointer = 4, targetSearchPointer = 4. Neither at end.
 * - start[4] ('R') === target[4] ('R'). Match.
 * - currentPiece = 'R'. startSearchPointer (4) > targetSearchPointer (4) is false. Valid.
 * - Increment startSearchPointer to 5, targetSearchPointer to 5.
 *
 * Loop 3:
 * - startSearchPointer advances: start[5] is '_', becomes 6. Reaches totalLength.
 * - targetSearchPointer advances: target[5] is '_', becomes 6. Reaches totalLength.
 * - Pointers: startSearchPointer = 6, targetSearchPointer = 6. Both at end. Break.
 *
 * Return true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var canChange = function (start, target) {
  const totalLength = start.length;
  let startSearchPointer = 0;
  let targetSearchPointer = 0;

  while (
    startSearchPointer < totalLength ||
    targetSearchPointer < totalLength
  ) {
    while (
      startSearchPointer < totalLength &&
      start[startSearchPointer] === "_"
    ) {
      startSearchPointer++;
    }

    while (
      targetSearchPointer < totalLength &&
      target[targetSearchPointer] === "_"
    ) {
      targetSearchPointer++;
    }

    if (
      startSearchPointer === totalLength &&
      targetSearchPointer === totalLength
    ) {
      break;
    }

    if (
      startSearchPointer === totalLength ||
      targetSearchPointer === totalLength
    ) {
      return false;
    }

    if (start[startSearchPointer] !== target[targetSearchPointer]) {
      return false;
    }

    const currentPiece = start[startSearchPointer];
    if (currentPiece === "L") {
      if (startSearchPointer < targetSearchPointer) {
        return false;
      }
    } else {
      if (startSearchPointer > targetSearchPointer) {
        return false;
      }
    }

    startSearchPointer++;
    targetSearchPointer++;
  }

  return true;
};

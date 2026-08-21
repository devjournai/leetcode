/**
 * Strobogrammatic Number
 * Intuition: A number looks the same upside down only if each digit maps to a valid rotated partner and that partner is exactly the digit at the mirrored position (0↔0, 1↔1, 6↔9, 8↔8, 9↔6).
 * Approach: 1. Build the rotation map. 2. Two pointers from the ends. 3. If the left digit is unmapped, false. 4. If its rotation is not the right digit, false. 5. Move inward until they cross; then true.
 * Dry Run: num = "69".
 *   - Left '6' maps to '9', which equals right → pointers meet. Return true. "68" fails because '6' expects '9' not '8'.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isStrobogrammatic = function (num) {
  const rotationMappings = new Map();
  rotationMappings.set("0", "0");
  rotationMappings.set("1", "1");
  rotationMappings.set("6", "9");
  rotationMappings.set("8", "8");
  rotationMappings.set("9", "6");

  let startingPointer = 0;
  let endingPointer = num.length - 1;

  while (startingPointer <= endingPointer) {
    const characterAtStart = num[startingPointer];
    const characterAtEnd = num[endingPointer];

    if (!rotationMappings.has(characterAtStart)) {
      return false;
    }

    const expectedRotatedCharacter = rotationMappings.get(characterAtStart);

    if (expectedRotatedCharacter !== characterAtEnd) {
      return false;
    }

    startingPointer++;
    endingPointer--;
  }

  return true;
};

/**
 * Strobogrammatic Number
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var isStrobogrammatic = function (num) {
  const rotationMappings = new Map();
  rotationMappings.set('0', '0');
  rotationMappings.set('1', '1');
  rotationMappings.set('6', '9');
  rotationMappings.set('8', '8');
  rotationMappings.set('9', '6');

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
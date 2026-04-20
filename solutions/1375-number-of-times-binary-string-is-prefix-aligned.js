/**
 * Number Of Times Binary String Is Prefix Aligned
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numTimesAllBlue = function (light) {
  let maximumFlippedPosition = 0;
  let alignmentOccurrences = 0;

  for (
    let currentFlipIndex = 0;
    currentFlipIndex < light.length;
    currentFlipIndex++
  ) {
    let bulbIndexToFlip = light[currentFlipIndex];
    maximumFlippedPosition = Math.max(maximumFlippedPosition, bulbIndexToFlip);
    if (maximumFlippedPosition === currentFlipIndex + 1) {
      alignmentOccurrences++;
    }
  }

  return alignmentOccurrences;
};

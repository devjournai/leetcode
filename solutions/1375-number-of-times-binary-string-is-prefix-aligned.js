/**
 * Number Of Times Binary String Is Prefix Aligned
 * Intuition: After k flips the prefix [1..k] is all 1s iff the largest flipped bulb index equals k. Track that running max.
 * Approach: 1. For each flip i (0-based), update maxFlipped = max(maxFlipped, light[i]). 2. If maxFlipped === i+1, increment the alignment count.
 * Dry Run: light = [2, 1, 3, 5, 4].
 *   - Flip 2: max=2 ≠ 1. Flip 1: max=2 == 2 → count 1. Flip 3: max=3 == 3 → count 2. Flip 5: max=5 ≠ 4. Flip 4: max=5 == 5 → count 3. Return 3.
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

/**
 * Self Crossing
 * Intuition: A north-east-south-west spiral can cross in three local patterns: the current segment hits the one three steps back, touches the one four steps back, or crosses the one five steps back.
 * Approach: 1. From index 3 onward compare the last few lengths. 2. Cross i-3 if current >= i-2 and i-1 <= i-3. 3. From index 4, touch i-4 if i-1 === i-3 and current + i-4 >= i-2. 4. From index 5, cross i-5 when i-2 >= i-4, current + i-4 >= i-2, i-1 <= i-3, and i-1 + i-5 >= i-3. Return false if none fire.
 * Dry Run: distanceSteps = [2, 1, 1, 2].
 *   - At index 3: 2 >= 1 and 1 <= 2 → true (current hits the first segment).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isSelfCrossing = function (distanceSteps) {
  const totalSteps = distanceSteps.length;

  for (
    let currentMoveIndex = 3;
    currentMoveIndex < totalSteps;
    currentMoveIndex++
  ) {
    const currentLength = distanceSteps[currentMoveIndex];
    const previousLengthOne = distanceSteps[currentMoveIndex - 1];
    const previousLengthTwo = distanceSteps[currentMoveIndex - 2];
    const previousLengthThree = distanceSteps[currentMoveIndex - 3];

    if (
      currentLength >= previousLengthTwo &&
      previousLengthOne <= previousLengthThree
    ) {
      return true;
    }
    if (currentMoveIndex >= 4) {
      const previousLengthFour = distanceSteps[currentMoveIndex - 4];
      if (
        previousLengthOne === previousLengthThree &&
        currentLength + previousLengthFour >= previousLengthTwo
      ) {
        return true;
      }
    }

    if (currentMoveIndex >= 5) {
      const previousLengthFour = distanceSteps[currentMoveIndex - 4];
      const previousLengthFive = distanceSteps[currentMoveIndex - 5];

      if (
        previousLengthTwo >= previousLengthFour &&
        currentLength + previousLengthFour >= previousLengthTwo &&
        previousLengthOne <= previousLengthThree &&
        previousLengthOne + previousLengthFive >= previousLengthThree
      ) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Minimum Distance To Type A Word Using Two Fingers
 * Time Complexity: O(N * (A+1)^2)
 * Space Complexity: O(N * (A+1)^2)
 */
var minimumDistance = function (word) {
  const memoizationCache = {};
  const keyboardLayoutWidth = 6;
  const asciiCodeForA = 65;

  function fetchCharacterCoordinates(charInput) {
    const characterNumericalValue = charInput.charCodeAt(0) - asciiCodeForA;
    const xCoordinateValue = Math.floor(
      characterNumericalValue / keyboardLayoutWidth,
    );
    const yCoordinateValue = characterNumericalValue % keyboardLayoutWidth;
    return [xCoordinateValue, yCoordinateValue];
  }

  function calculateFingerMovementDistance(fromCharInput, toCharInput) {
    if (fromCharInput === null) {
      return 0;
    }
    const [sourceXCoordinate, sourceYCoordinate] =
      fetchCharacterCoordinates(fromCharInput);
    const [destinationXCoordinate, destinationYCoordinate] =
      fetchCharacterCoordinates(toCharInput);
    const horizontalDistance = Math.abs(
      sourceXCoordinate - destinationXCoordinate,
    );
    const verticalDistance = Math.abs(
      sourceYCoordinate - destinationYCoordinate,
    );
    return horizontalDistance + verticalDistance;
  }

  function computeMinimumTypingDistance(
    wordPositionIndex,
    currentFingerOneChar,
    currentFingerTwoChar,
  ) {
    if (wordPositionIndex === word.length) {
      return 0;
    }

    const stateLookupKey = `${wordPositionIndex},${currentFingerOneChar},${currentFingerTwoChar}`;
    if (memoizationCache[stateLookupKey] !== undefined) {
      return memoizationCache[stateLookupKey];
    }

    const targetCharacter = word[wordPositionIndex];

    const distanceIfOneMoves = calculateFingerMovementDistance(
      currentFingerOneChar,
      targetCharacter,
    );
    const totalCostMovingFingerOne =
      distanceIfOneMoves +
      computeMinimumTypingDistance(
        wordPositionIndex + 1,
        targetCharacter,
        currentFingerTwoChar,
      );

    const distanceIfTwoMoves = calculateFingerMovementDistance(
      currentFingerTwoChar,
      targetCharacter,
    );
    const totalCostMovingFingerTwo =
      distanceIfTwoMoves +
      computeMinimumTypingDistance(
        wordPositionIndex + 1,
        currentFingerOneChar,
        targetCharacter,
      );

    const smallestDistanceForCurrentState = Math.min(
      totalCostMovingFingerOne,
      totalCostMovingFingerTwo,
    );
    memoizationCache[stateLookupKey] = smallestDistanceForCurrentState;
    return smallestDistanceForCurrentState;
  }

  return computeMinimumTypingDistance(0, null, null);
};

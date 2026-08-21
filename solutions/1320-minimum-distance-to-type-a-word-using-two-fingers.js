/**
 * Minimum Distance To Type A Word Using Two Fingers
 * Intuition: Each next letter is typed by finger 1 or 2. State (index, finger1 pos, finger2 pos) with Manhattan keyboard distance memoizes the min remaining cost.
 * Approach: 1. Map A–Z onto a 6-wide grid. 2. Distance from a parked finger is 0 if unused. 3. Recurse: try moving each finger to word[i], take min, cache the triple. 4. Start both fingers unused.
 * Dry Run: word = "CAKE". Optimal uses two fingers around C/A then K/E; min Manhattan total is 3.
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
      characterNumericalValue / keyboardLayoutWidth
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
      sourceXCoordinate - destinationXCoordinate
    );
    const verticalDistance = Math.abs(
      sourceYCoordinate - destinationYCoordinate
    );
    return horizontalDistance + verticalDistance;
  }

  function computeMinimumTypingDistance(
    wordPositionIndex,
    currentFingerOneChar,
    currentFingerTwoChar
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
      targetCharacter
    );
    const totalCostMovingFingerOne =
      distanceIfOneMoves +
      computeMinimumTypingDistance(
        wordPositionIndex + 1,
        targetCharacter,
        currentFingerTwoChar
      );

    const distanceIfTwoMoves = calculateFingerMovementDistance(
      currentFingerTwoChar,
      targetCharacter
    );
    const totalCostMovingFingerTwo =
      distanceIfTwoMoves +
      computeMinimumTypingDistance(
        wordPositionIndex + 1,
        currentFingerOneChar,
        targetCharacter
      );

    const smallestDistanceForCurrentState = Math.min(
      totalCostMovingFingerOne,
      totalCostMovingFingerTwo
    );
    memoizationCache[stateLookupKey] = smallestDistanceForCurrentState;
    return smallestDistanceForCurrentState;
  }

  return computeMinimumTypingDistance(0, null, null);
};

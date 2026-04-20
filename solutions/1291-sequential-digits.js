/**
 * Sequential Digits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sequentialDigits = function (low, high) {
  const collectedSequentials = [];
  const numberGenerationQueue = [];

  for (let startingDigit = 1; startingDigit <= 9; startingDigit++) {
    numberGenerationQueue.push(startingDigit);
  }

  while (numberGenerationQueue.length > 0) {
    const currentNumericalValue = numberGenerationQueue.shift();

    if (currentNumericalValue >= low && currentNumericalValue <= high) {
      collectedSequentials.push(currentNumericalValue);
    }

    const currentLastDigit = currentNumericalValue % 10;

    if (currentLastDigit < 9) {
      const nextDigitToAppend = currentLastDigit + 1;
      const nextSequentialCandidate =
        currentNumericalValue * 10 + nextDigitToAppend;

      if (nextSequentialCandidate <= high) {
        numberGenerationQueue.push(nextSequentialCandidate);
      }
    }
  }

  return collectedSequentials;
};

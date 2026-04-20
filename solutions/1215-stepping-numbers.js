/**
 * Stepping Numbers
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countSteppingNumbers = function (low, high) {
  const steppingNumbersResult = [];

  if (low === 0) {
    steppingNumbersResult.push(0);
  }

  const generationQueue = [];

  for (let startingDigit = 1; startingDigit <= 9; startingDigit++) {
    generationQueue.push(startingDigit);
  }

  while (generationQueue.length > 0) {
    const currentGeneratedNumber = generationQueue.shift();

    if (currentGeneratedNumber >= low && currentGeneratedNumber <= high) {
      steppingNumbersResult.push(currentGeneratedNumber);
    }

    if (currentGeneratedNumber > high) {
      continue;
    }

    const lastDigitOfCurrent = currentGeneratedNumber % 10;

    if (lastDigitOfCurrent > 0) {
      const nextSmallerDigitNumber =
        currentGeneratedNumber * 10 + (lastDigitOfCurrent - 1);
      generationQueue.push(nextSmallerDigitNumber);
    }

    if (lastDigitOfCurrent < 9) {
      const nextLargerDigitNumber =
        currentGeneratedNumber * 10 + (lastDigitOfCurrent + 1);
      generationQueue.push(nextLargerDigitNumber);
    }
  }

  steppingNumbersResult.sort((numberA, numberB) => numberA - numberB);
  return steppingNumbersResult;
};

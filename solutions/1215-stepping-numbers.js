/**
 * Stepping Numbers
 * Intuition: Every stepping number grows by appending lastDigit±1, so BFS from 1–9 generates them all in order of length.
 * Approach: 1. Include 0 if low==0. 2. Queue digits 1–9. 3. Dequeue; if in [low,high] record; append last±1 when in 0–9 and the number has not exceeded high. 4. Sort the result.
 * Dry Run: low=10, high=15. From 1 we get 10,12 among others; in range: 10,12.
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

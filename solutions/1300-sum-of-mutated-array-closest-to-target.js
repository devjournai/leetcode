/**
 * Sum Of Mutated Array Closest To Target
 * Time Complexity: O(N log R)
 * Space Complexity: O(1)
 */
var findBestValue = function (arr, target) {
  const calculateSumWithCap = (inputArray, capLimit) => {
    let currentSumHolder = 0;
    const arrayLength = inputArray.length;
    for (let indexPointer = 0; indexPointer < arrayLength; indexPointer++) {
      const elementValue = inputArray[indexPointer];
      currentSumHolder += Math.min(elementValue, capLimit);
    }
    return currentSumHolder;
  };

  let lowerBound = 0;
  let upperBound = 100000;

  let currentBestDifference = Infinity;
  let optimalAnswer = 0;

  while (lowerBound <= upperBound) {
    let midPointValue = lowerBound + Math.floor((upperBound - lowerBound) / 2);
    let temporarySum = calculateSumWithCap(arr, midPointValue);
    let currentAbsoluteDifference = Math.abs(temporarySum - target);

    if (currentAbsoluteDifference < currentBestDifference) {
      currentBestDifference = currentAbsoluteDifference;
      optimalAnswer = midPointValue;
    } else if (currentAbsoluteDifference === currentBestDifference) {
      optimalAnswer = Math.min(optimalAnswer, midPointValue);
    }

    if (temporarySum < target) {
      lowerBound = midPointValue + 1;
    } else {
      upperBound = midPointValue - 1;
    }
  }

  return optimalAnswer;
};

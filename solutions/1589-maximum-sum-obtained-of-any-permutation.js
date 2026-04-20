/**
 * Maximum Sum Obtained Of Any Permutation
 * Time Complexity: O(N log N + M)
 * Space Complexity: O(N)
 */
var maxSumRangeQuery = function (numsInputArray, requestCoordinates) {
  const moduloValue = 1e9 + 7;
  const arraySize = numsInputArray.length;

  const frequencyDeltaArray = new Array(arraySize + 1).fill(0);

  for (const currentRequest of requestCoordinates) {
    const rangeStart = currentRequest[0];
    const rangeEnd = currentRequest[1];
    frequencyDeltaArray[rangeStart]++;
    frequencyDeltaArray[rangeEnd + 1]--;
  }

  const actualFrequencies = new Array(arraySize).fill(0);
  let runningFrequencySum = 0;
  for (
    let currentPosition = 0;
    currentPosition < arraySize;
    currentPosition++
  ) {
    runningFrequencySum += frequencyDeltaArray[currentPosition];
    actualFrequencies[currentPosition] = runningFrequencySum;
  }

  numsInputArray.sort((valA, valB) => valB - valA);
  actualFrequencies.sort((freqA, freqB) => freqB - freqA);

  let cumulativeMaximumSum = 0;
  for (let sumIndex = 0; sumIndex < arraySize; sumIndex++) {
    const productTerm =
      (numsInputArray[sumIndex] * actualFrequencies[sumIndex]) % moduloValue;
    cumulativeMaximumSum = (cumulativeMaximumSum + productTerm) % moduloValue;
  }

  return cumulativeMaximumSum;
};

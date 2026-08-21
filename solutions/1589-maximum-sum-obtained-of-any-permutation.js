/**
 * Maximum Sum Obtained Of Any Permutation
 * Intuition: Assign largest nums to indices requested most often. A difference array builds frequencies, then sort both descending.
 * Approach: 1. +1 at L, -1 at R+1. 2. Prefix to frequencies. 3. Sort nums and freq descending; sum products mod 1e9+7.
 * Dry Run: nums = [1,2,3,4,5], requests = [[1,3],[0,1]].
 *   - Pair largest values with highest frequencies → 19.
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

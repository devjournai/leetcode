/**
 * Maximum Length Of Subarray With Positive Product
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getMaxLen = function (numbersArray) {
  let maximumLengthFound = 0;
  let currentPositives = 0;
  let currentNegatives = 0;

  for (
    let iteratorIndex = 0;
    iteratorIndex < numbersArray.length;
    iteratorIndex++
  ) {
    const currentValue = numbersArray[iteratorIndex];

    if (currentValue === 0) {
      currentPositives = 0;
      currentNegatives = 0;
    } else if (currentValue > 0) {
      currentPositives++;
      currentNegatives = currentNegatives > 0 ? currentNegatives + 1 : 0;
    } else {
      const temporaryPositive = currentPositives;
      const temporaryNegative = currentNegatives;

      currentPositives = temporaryNegative > 0 ? temporaryNegative + 1 : 0;
      currentNegatives = temporaryPositive + 1;
    }
    maximumLengthFound = Math.max(maximumLengthFound, currentPositives);
  }
  return maximumLengthFound;
};

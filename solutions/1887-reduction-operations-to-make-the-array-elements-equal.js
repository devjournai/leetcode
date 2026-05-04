/**
 * Reduction Operations To Make The Array Elements Equal
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var reductionOperations = function (nums) {
  const sortedNumbers = [...nums];
  sortedNumbers.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );

  let overallOperations = 0;
  let currentReductionSteps = 0;

  let elementIndex = 1;

  while (elementIndex < sortedNumbers.length) {
    if (sortedNumbers[elementIndex] !== sortedNumbers[elementIndex - 1]) {
      currentReductionSteps++;
    }
    overallOperations += currentReductionSteps;

    elementIndex++;
  }

  return overallOperations;
};

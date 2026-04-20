/**
 * Sum Of Even Numbers After Queries
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var sumEvenAfterQueries = function (A, queries) {
  let currentOverallEvenSum = A.reduce(
    (accumulatorForSum, currentArrayElement) => {
      if (currentArrayElement % 2 === 0) {
        return accumulatorForSum + currentArrayElement;
      }
      return accumulatorForSum;
    },
    0,
  );

  const queryResultsStorage = [];
  const numberOfQueries = queries.length;

  for (
    let queryIterator = 0;
    queryIterator < numberOfQueries;
    queryIterator++
  ) {
    const currentQueryDetails = queries[queryIterator];
    const valueToBeAdded = currentQueryDetails[0];
    const arrayIndexToModify = currentQueryDetails[1];

    const previousElementValue = A[arrayIndexToModify];

    if (previousElementValue % 2 === 0) {
      currentOverallEvenSum -= previousElementValue;
    }

    A[arrayIndexToModify] += valueToBeAdded;
    const updatedElementValue = A[arrayIndexToModify];

    if (updatedElementValue % 2 === 0) {
      currentOverallEvenSum += updatedElementValue;
    }

    queryResultsStorage.push(currentOverallEvenSum);
  }

  return queryResultsStorage;
};

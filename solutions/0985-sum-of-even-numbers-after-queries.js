/**
 * Sum Of Even Numbers After Queries
 * Intuition: Maintain the even-sum of A. For each query, subtract the old value if even, apply the add, then add the new value if even.
 * Approach: 1. `currentOverallEvenSum` from reducing even elements. 2. For each `[valueToBeAdded, arrayIndexToModify]`, drop old even, mutate A, add new even. 3. Push the running even sum. 4. Return `queryResultsStorage`.
 * Dry Run: A = [1,2,3,4], queries = [[1,0]]. 1 is odd so even sum starts 6; 1+1=2 even → sum 8. Answer [8] for that one query.
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
    0
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

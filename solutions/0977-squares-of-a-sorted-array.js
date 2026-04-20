/**
 * Squares Of A Sorted Array
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var sortedSquares = function (A) {
  const totalElements = A.length;
  const finalCollection = new Array(totalElements);

  let firstPointer = 0;
  let secondPointer = totalElements - 1;
  let positionToWrite = totalElements - 1;

  while (firstPointer <= secondPointer) {
    const firstValueSquared = A[firstPointer] * A[firstPointer];
    const secondValueSquared = A[secondPointer] * A[secondPointer];

    if (firstValueSquared > secondValueSquared) {
      finalCollection[positionToWrite] = firstValueSquared;
      firstPointer++;
    } else {
      finalCollection[positionToWrite] = secondValueSquared;
      secondPointer--;
    }
    positionToWrite--;
  }

  return finalCollection;
};

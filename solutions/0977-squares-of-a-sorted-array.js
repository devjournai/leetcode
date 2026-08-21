/**
 * Squares Of A Sorted Array
 * Intuition: After squaring, extremes of a sorted (possibly negative) array are the largest. Two pointers fill `finalCollection` from the back.
 * Approach: 1. `firstPointer` at 0, `secondPointer` at n-1, `positionToWrite` at n-1. 2. Write the larger of the two squares and move that pointer. 3. Repeat until pointers cross. 4. Return the array.
 * Dry Run: A = [-4,-1,0,3,10]. Compare 16 vs 100 → write 100; 16 vs 9 → write 16; continue to [0,1,9,16,100].
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

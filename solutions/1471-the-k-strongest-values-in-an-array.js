/**
 * The K Strongest Values In An Array
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var getStrongest = function (arr, k) {
  const originalLength = arr.length;

  const dataSorted = arr.slice().sort((valA, valB) => valA - valB);

  const middleIndex = Math.floor((originalLength - 1) / 2);
  const medianValue = dataSorted[middleIndex];

  const strongestValuesCollection = [];
  let leftPointer = 0;
  let rightPointer = originalLength - 1;

  for (let valuesPicked = 0; valuesPicked < k; valuesPicked++) {
    const leftCandidateValue = dataSorted[leftPointer];
    const rightCandidateValue = dataSorted[rightPointer];

    const absoluteDifferenceLeft = Math.abs(leftCandidateValue - medianValue);
    const absoluteDifferenceRight = Math.abs(rightCandidateValue - medianValue);

    if (absoluteDifferenceLeft > absoluteDifferenceRight) {
      strongestValuesCollection.push(leftCandidateValue);
      leftPointer++;
    } else if (absoluteDifferenceRight > absoluteDifferenceLeft) {
      strongestValuesCollection.push(rightCandidateValue);
      rightPointer--;
    } else {
      strongestValuesCollection.push(rightCandidateValue);
      rightPointer--;
    }
  }

  return strongestValuesCollection;
};

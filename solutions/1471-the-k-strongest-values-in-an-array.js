/**
 * The K Strongest Values In An Array
 * Intuition: Strength is |x - median|. After sorting, the strongest values sit at the ends, so two pointers pick the farther end k times (ties prefer the larger value).
 * Approach: 1. Sort a copy. 2. Median is dataSorted[floor((n-1)/2)]. 3. left=0, right=n-1; k times compare |left-median| vs |right-median| and take the winner (right on ties). 4. Return the picked list.
 * Dry Run: arr = [1,2,3,4,5], k = 2, median 3
 *   - |1-3|=2 vs |5-3|=2 -> take 5
 *   - |1-3|=2 vs |4-3|=1 -> take 1
 *   - [5,1]
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

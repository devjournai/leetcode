/**
 * Intersection Of Three Sorted Arrays
 * Intuition: Three pointers on sorted arrays advance the smallest head until all three match or one array ends.
 * Approach: 1. While all pointers in range, compare the three current values. 2. If equal, record and advance all. 3. Else advance the pointer at the strictly smaller value (or the third if the first two are ≥ the third).
 * Dry Run: [1,2,3], [2,3,4], [2,3,5] → skip 1, match 2, match 3 → [2,3].
 * Time Complexity: O(N + M + K)
 * Space Complexity: O(min(N, M, K))
 */
var arraysIntersection = function (arr1, arr2, arr3) {
  let firstArrayIndex = 0;
  let secondArrayIndex = 0;
  let thirdArrayIndex = 0;
  const collectedIntersection = [];

  const lengthOne = arr1.length;
  const lengthTwo = arr2.length;
  const lengthThree = arr3.length;

  while (
    firstArrayIndex < lengthOne &&
    secondArrayIndex < lengthTwo &&
    thirdArrayIndex < lengthThree
  ) {
    const currentElementVal1 = arr1[firstArrayIndex];
    const currentElementVal2 = arr2[secondArrayIndex];
    const currentElementVal3 = arr3[thirdArrayIndex];

    if (
      currentElementVal1 === currentElementVal2 &&
      currentElementVal2 === currentElementVal3
    ) {
      collectedIntersection.push(currentElementVal1);
      firstArrayIndex++;
      secondArrayIndex++;
      thirdArrayIndex++;
    } else if (currentElementVal1 < currentElementVal2) {
      firstArrayIndex++;
    } else if (currentElementVal2 < currentElementVal3) {
      secondArrayIndex++;
    } else {
      thirdArrayIndex++;
    }
  }

  return collectedIntersection;
};

/**
 * Intersection Of Three Sorted Arrays
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

/**
 * Median of Two Sorted Arrays
 * Time Complexity: O(log(min(M, N)))
 * Space Complexity: O(1)
 */

var findMedianSortedArrays = function (arrA, arrB) {
  const totalLength = arrA.length + arrB.length;
  const isEven = totalLength % 2 === 0;
  const medianPos = Math.floor(totalLength / 2);

  if (arrA.length > arrB.length) {
    [arrA, arrB] = [arrB, arrA];
  }

  let low = 0;
  let high = arrA.length;

  while (low <= high) {
    const partitionA = Math.floor((low + high) / 2);
    const partitionB = medianPos - partitionA;

    const maxLeftA = partitionA === 0 ? -Infinity : arrA[partitionA - 1];
    const minRightA = partitionA === arrA.length ? Infinity : arrA[partitionA];

    const maxLeftB = partitionB === 0 ? -Infinity : arrB[partitionB - 1];
    const minRightB = partitionB === arrB.length ? Infinity : arrB[partitionB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      if (isEven) {
        return (
          (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
        );
      } else {
        return Math.min(minRightA, minRightB);
      }
    } else if (maxLeftA > minRightB) {
      high = partitionA - 1;
    } else {
      low = partitionA + 1;
    }
  }
  return -1;
};

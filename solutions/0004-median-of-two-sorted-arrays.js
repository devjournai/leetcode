/**
 * Median of Two Sorted Arrays
 * Intuition: Binary search the partition of the shorter array so the combined left half has `medianPos` elements and every left value is ≤ every right value; the median is then read from the four border values.
 * Approach: 1. Swap so `arrA` is the shorter array. 2. Binary search `partitionA` in [0, arrA.length] and set `partitionB = medianPos - partitionA`. 3. Compute `maxLeftA`/`minRightA` and `maxLeftB`/`minRightB` (using ±Infinity at edges). 4. If both sides are ordered, return the average of the two middle values when `isEven`, else `min(minRightA, minRightB)`. 5. If `maxLeftA > minRightB`, move `high` left; otherwise move `low` right.
 * Dry Run: arrA = [1, 3], arrB = [2], totalLength=3, medianPos=1.
 *   - partitionA=1, partitionB=0 → maxLeftA=1, minRightA=3, maxLeftB=-∞, minRightB=2. 1≤2 and -∞≤3, odd → return min(3, 2) = 2.
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

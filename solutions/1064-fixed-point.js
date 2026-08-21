/**
 * Fixed Point
 * Intuition: Distinct sorted values mean at most one crossing of arr[i] vs i. Binary search can move left of any match to find the smallest fixed point, and skip the half that cannot contain arr[i]=i.
 * Approach: 1. Search [lo, hi]. 2. If arr[mid]==mid, record mid and search left. 3. If arr[mid]<mid, search right (values still lag indices). 4. Else search left. 5. Return the recorded index or -1.
 * Dry Run: arr=[-10, -5, 0, 3, 7]. mid=2, arr[2]=0<2 → go right. mid=3, arr[3]=3, record 3, search left; no smaller match → 3.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var fixedPoint = function (arr) {
  let startIndex = 0;
  let endIndex = arr.length - 1;
  let smallestFixedPoint = -1;

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (arr[middleIndex] === middleIndex) {
      smallestFixedPoint = middleIndex;
      endIndex = middleIndex - 1;
    } else if (arr[middleIndex] < middleIndex) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return smallestFixedPoint;
};

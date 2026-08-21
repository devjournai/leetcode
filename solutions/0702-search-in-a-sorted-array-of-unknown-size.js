/**
 * Search In A Sorted Array Of Unknown Size
 * Intuition: Exponentially grow a right bound until the reader hits INT_MAX or a value ≥ target, then binary search that window.
 * Approach: 1. `firstPointer=0`, `secondPointer=1`; double second until `reader.get` is 2147483647 or ≥ target, sliding first. 2. Binary search `searchLower`..`searchUpper`; return mid on hit else -1.
 * Dry Run: secret=[-1,0,3,5,9,12], target=9. Expand secondPointer 1→2→4; get(4)=9 ≥ target. Binary search 2..4 hits 9 at index 4.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (reader, target) {
  let firstPointer = 0;
  let secondPointer = 1;

  while (true) {
    let checkedValue = reader.get(secondPointer);

    if (checkedValue === 2147483647 || checkedValue >= target) {
      break;
    }

    firstPointer = secondPointer;
    secondPointer = secondPointer * 2;
  }

  let searchLower = firstPointer;
  let searchUpper = secondPointer;

  while (searchLower <= searchUpper) {
    let currentMid = Math.floor((searchLower + searchUpper) / 2);
    let retrievedElement = reader.get(currentMid);

    if (retrievedElement === target) {
      return currentMid;
    } else if (retrievedElement < target) {
      searchLower = currentMid + 1;
    } else {
      searchUpper = currentMid - 1;
    }
  }
  return -1;
};

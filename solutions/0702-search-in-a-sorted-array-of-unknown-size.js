/**
 * Search In A Sorted Array Of Unknown Size
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

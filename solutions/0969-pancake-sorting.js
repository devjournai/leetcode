/**
 * Pancake Sorting
 * Intuition: Place n, then n-1, … by flipping the next-largest value to the front then to its final suffix position (`reverseSubarray`).
 * Approach: 1. For `currentUnsortedLength` from n down to 2, find `targetValue`. 2. If not already last, flip it to index 0 (unless already there) then flip the prefix of length `currentUnsortedLength`. 3. Record k values in `flipOperations`. 4. Return that list.
 * Dry Run: arr = [3,2,4,1]. 4 is at index 2 → flip 3 → [4,2,3,1], flip 4 → [1,3,2,4]. Place 3 similarly. Flips recorded, array sorted.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var pancakeSort = function (arr) {
  const flipOperations = [];
  let currentUnsortedLength = arr.length;

  while (currentUnsortedLength > 1) {
    const targetValue = currentUnsortedLength;
    let foundIndex = -1;
    let searchIterator = 0;
    while (searchIterator < currentUnsortedLength) {
      if (arr[searchIterator] === targetValue) {
        foundIndex = searchIterator;
        break;
      }
      searchIterator++;
    }

    if (foundIndex !== currentUnsortedLength - 1) {
      if (foundIndex !== 0) {
        flipOperations.push(foundIndex + 1);
        reverseSubarray(arr, foundIndex + 1);
      }
      flipOperations.push(currentUnsortedLength);
      reverseSubarray(arr, currentUnsortedLength);
    }
    currentUnsortedLength--;
  }

  return flipOperations;
};

function reverseSubarray(arrayReference, reverseK) {
  let leftBoundary = 0;
  let rightBoundary = reverseK - 1;

  while (leftBoundary < rightBoundary) {
    let tempStorage = arrayReference[leftBoundary];
    arrayReference[leftBoundary] = arrayReference[rightBoundary];
    arrayReference[rightBoundary] = tempStorage;
    leftBoundary++;
    rightBoundary--;
  }
}

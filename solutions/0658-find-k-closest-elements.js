/**
 * Find K Closest Elements
 * Intuition: Binary-search the leftmost insertion point of x, then expand left/right by absolute distance (left wins ties) until k elements are chosen.
 * Approach: 1. Bisect for first index with arr[mid] ≥ x (`insertionCandidateIndex`). 2. `leftExpansionPointer = idx-1`, `rightExpansionPointer = idx`. 3. Grow the window k times: prefer left if |arr[L]-x| ≤ |arr[R]-x|. 4. Slice `(left+1, right)`.
 * Dry Run: arr=[1,2,3,4,5], k=4, x=3.
 *   - Insert at index 2. Expand: take 3 (closer on the right), then 2 (tie prefers left), then 4, then 1. Return [1,2,3,4].
 * Time Complexity: O(logN + K)
 * Space Complexity: O(K)
 */
var findClosestElements = function (arr, k, x) {
  let initialLeftPosition = 0;
  let initialRightPosition = arr.length - 1;
  let insertionCandidateIndex = 0;

  while (initialLeftPosition <= initialRightPosition) {
    let midSearchIndex = Math.floor(
      initialLeftPosition + (initialRightPosition - initialLeftPosition) / 2
    );
    if (arr[midSearchIndex] >= x) {
      insertionCandidateIndex = midSearchIndex;
      initialRightPosition = midSearchIndex - 1;
    } else {
      initialLeftPosition = midSearchIndex + 1;
    }
  }

  let leftExpansionPointer = insertionCandidateIndex - 1;
  let rightExpansionPointer = insertionCandidateIndex;
  let currentWindowSize = 0;

  while (currentWindowSize < k) {
    if (leftExpansionPointer < 0) {
      rightExpansionPointer++;
    } else if (rightExpansionPointer >= arr.length) {
      leftExpansionPointer--;
    } else {
      let leftValueDifference = Math.abs(arr[leftExpansionPointer] - x);
      let rightValueDifference = Math.abs(arr[rightExpansionPointer] - x);

      if (leftValueDifference <= rightValueDifference) {
        leftExpansionPointer--;
      } else {
        rightExpansionPointer++;
      }
    }
    currentWindowSize++;
  }

  return arr.slice(leftExpansionPointer + 1, rightExpansionPointer);
};

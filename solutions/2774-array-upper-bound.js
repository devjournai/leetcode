/**
 * Array Upper Bound
 * Intuition: Binary search is highly efficient for finding elements in sorted arrays. To locate the last occurrence of a target value, we need to continue exploring the right half of the array even after a match is found, ensuring we capture the rightmost possible index.
 * Approach: 1. Initialize two range indicators, `startPointer` at the beginning and `endPointer` at the end of the array, and a `finalIndex` variable to store the result, initially -1. 2. Implement an iterative binary search using a `while` loop that continues as long as `startPointer` is less than or equal to `endPointer`. 3. Inside the loop, calculate the `middleIndex`. 4. If the element at `middleIndex` matches the `target`, update `finalIndex` with `middleIndex` and then shift `startPointer` to `middleIndex + 1` to search for subsequent occurrences in the right segment. 5. If the element at `middleIndex` is less than the `target`, it implies the target must be in the right segment, so update `startPointer` to `middleIndex + 1`. 6. If the element at `middleIndex` is greater than the `target`, the target must be in the left segment, so update `endPointer` to `middleIndex - 1`. 7. After the loop concludes, return the `finalIndex`.
 * Dry Run: For `[1, 2, 2, 3, 4]`, target `2`:
 *   - `startPointer = 0`, `endPointer = 4`, `finalIndex = -1`
 *   - Iteration 1: `middleIndex = Math.floor((0 + 4) / 2) = 2`. `this[2]` is `2` (== target). `finalIndex = 2`. `startPointer = 2 + 1 = 3`.
 *   - Iteration 2: `startPointer = 3`, `endPointer = 4`. `middleIndex = Math.floor((3 + 4) / 2) = 3`. `this[3]` is `3` (!= target, > target). `endPointer = 3 - 1 = 2`.
 *   - Iteration 3: `startPointer = 3`, `endPointer = 2`. Loop condition `startPointer <= endPointer` (3 <= 2) is false.
 *   - Return `finalIndex = 2`. (Correct, as index 2 is the last '2').
 *
 * For `[10, 20, 30, 40]`, target `25`:
 *   - `startPointer = 0`, `endPointer = 3`, `finalIndex = -1`
 *   - Iteration 1: `middleIndex = Math.floor((0 + 3) / 2) = 1`. `this[1]` is `20` (!= target, < target). `startPointer = 1 + 1 = 2`.
 *   - Iteration 2: `startPointer = 2`, `endPointer = 3`. `middleIndex = Math.floor((2 + 3) / 2) = 2`. `this[2]` is `30` (!= target, > target). `endPointer = 2 - 1 = 1`.
 *   - Iteration 3: `startPointer = 2`, `endPointer = 1`. Loop condition `startPointer <= endPointer` (2 <= 1) is false.
 *   - Return `finalIndex = -1`. (Correct, as '25' is not in the array).
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
Array.prototype.upperBound = function (target) {
  let startPointer = 0;
  let endPointer = this.length - 1;
  let finalIndex = -1;

  while (startPointer <= endPointer) {
    const middleIndex = Math.floor((startPointer + endPointer) / 2);

    if (this[middleIndex] === target) {
      finalIndex = middleIndex;
      startPointer = middleIndex + 1;
    } else if (this[middleIndex] < target) {
      startPointer = middleIndex + 1;
    } else {
      endPointer = middleIndex - 1;
    }
  }

  return finalIndex;
};

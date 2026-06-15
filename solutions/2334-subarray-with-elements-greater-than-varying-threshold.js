/**
 * Subarray With Elements Greater Than Varying Threshold
 * Intuition: The problem asks for *any* subarray of length `k` where every element `val` satisfies `val > threshold / k`. If we consider an element `nums[i]` as the *minimum* value within a potential valid subarray of length `k`, then all other elements in that subarray must be greater than or equal to `nums[i]`. Thus, if `nums[i]` itself satisfies `nums[i] > threshold / k`, the entire subarray will be valid. The core idea is to find, for each element `nums[i]`, the largest possible subarray for which `nums[i]` is the minimum. The length of such a subarray can be determined by finding the nearest element to its left that is strictly smaller than `nums[i]` and the nearest element to its right that is strictly smaller than `nums[i]`.
 * Approach: 1. Initialize two arrays, `prevSmallerIndices` and `nextSmallerIndices`, both of size `nums.length`. `prevSmallerIndices[j]` will store the index of the first element to the left of `j` that is strictly smaller than `nums[j]`, initialized to -1. `nextSmallerIndices[j]` will store the index of the first element to the right of `j` that is strictly smaller than `nums[j]`, initialized to `nums.length`. 2. First pass (left-to-right): Iterate through `nums` using `loopForwardIndex`. Use a `leftMonotonicStack` to find `prevSmallerIndices`. For each `nums[loopForwardIndex]`, pop elements from `leftMonotonicStack` that are greater than or equal to `nums[loopForwardIndex]`. If `leftMonotonicStack` is not empty, set `prevSmallerIndices[loopForwardIndex]` to its top element. Then, push `loopForwardIndex` onto `leftMonotonicStack`. 3. Second pass (right-to-left): Iterate through `nums` using `loopBackwardIndex` from `nums.length - 1` down to `0`. Use a `rightMonotonicStack` to find `nextSmallerIndices`. For each `nums[loopBackwardIndex]`, pop elements from `rightMonotonicStack` that are greater than or equal to `nums[loopBackwardIndex]`. If `rightMonotonicStack` is not empty, set `nextSmallerIndices[loopBackwardIndex]` to its top element. Then, push `loopBackwardIndex` onto `rightMonotonicStack`. 4. Final pass: Iterate through `nums` using `checkFinalIndex`. For each `nums[checkFinalIndex]`, calculate the `possibleLength` of the subarray where `nums[checkFinalIndex]` is the minimum: `nextSmallerIndices[checkFinalIndex] - prevSmallerIndices[checkFinalIndex] - 1`. 5. If `possibleLength` is greater than 0 and `nums[checkFinalIndex]` is strictly greater than `threshold / possibleLength`, then `possibleLength` is a valid answer. Return it immediately. 6. If no such subarray is found after checking all elements, return -1.
 * Dry Run: `nums = [1, 3, 4, 5, 2]`, `threshold = 7`
 *   `totalElements = 5`
 *   Initialize: `prevSmallerIndices = [-1, -1, -1, -1, -1]`, `nextSmallerIndices = [5, 5, 5, 5, 5]`
 *
 *   **Pass 1 (Calculate prevSmallerIndices):**
 *   `leftMonotonicStack = []`
 *   `loopForwardIndex = 0, nums[0] = 1`: `leftMonotonicStack` empty. `prevSmallerIndices[0] = -1`. Push `0`. `leftMonotonicStack = [0]`
 *   `loopForwardIndex = 1, nums[1] = 3`: `nums[0] = 1 < 3`. `prevSmallerIndices[1] = 0`. Push `1`. `leftMonotonicStack = [0, 1]`
 *   `loopForwardIndex = 2, nums[2] = 4`: `nums[1] = 3 < 4`. `prevSmallerIndices[2] = 1`. Push `2`. `leftMonotonicStack = [0, 1, 2]`
 *   `loopForwardIndex = 3, nums[3] = 5`: `nums[2] = 4 < 5`. `prevSmallerIndices[3] = 2`. Push `3`. `leftMonotonicStack = [0, 1, 2, 3]`
 *   `loopForwardIndex = 4, nums[4] = 2`:
 *     - `nums[3] = 5 >= 2`. Pop `3`. `leftMonotonicStack = [0, 1, 2]`
 *     - `nums[2] = 4 >= 2`. Pop `2`. `leftMonotonicStack = [0, 1]`
 *     - `nums[1] = 3 >= 2`. Pop `1`. `leftMonotonicStack = [0]`
 *     - `nums[0] = 1 < 2`. Stop while.
 *   `prevSmallerIndices[4] = 0`. Push `4`. `leftMonotonicStack = [0, 4]`
 *   After Pass 1: `prevSmallerIndices = [-1, 0, 1, 2, 0]`
 *
 *   **Pass 2 (Calculate nextSmallerIndices):**
 *   `rightMonotonicStack = []`
 *   `loopBackwardIndex = 4, nums[4] = 2`: `rightMonotonicStack` empty. `nextSmallerIndices[4] = 5`. Push `4`. `rightMonotonicStack = [4]`
 *   `loopBackwardIndex = 3, nums[3] = 5`: `nums[4] = 2 < 5`. `nextSmallerIndices[3] = 4`. Push `3`. `rightMonotonicStack = [4, 3]`
 *   `loopBackwardIndex = 2, nums[2] = 4`:
 *     - `nums[3] = 5 >= 4`. Pop `3`. `rightMonotonicStack = [4]`
 *     - `nums[4] = 2 < 4`. Stop while.
 *   `nextSmallerIndices[2] = 4`. Push `2`. `rightMonotonicStack = [4, 2]`
 *   `loopBackwardIndex = 1, nums[1] = 3`:
 *     - `nums[2] = 4 >= 3`. Pop `2`. `rightMonotonicStack = [4]`
 *     - `nums[4] = 2 < 3`. Stop while.
 *   `nextSmallerIndices[1] = 4`. Push `1`. `rightMonotonicStack = [4, 1]`
 *   `loopBackwardIndex = 0, nums[0] = 1`:
 *     - `nums[1] = 3 >= 1`. Pop `1`. `rightMonotonicStack = [4]`
 *     - `nums[4] = 2 >= 1`. Pop `4`. `rightMonotonicStack = []`
 *     - Stack is empty.
 *   `nextSmallerIndices[0] = 5`. Push `0`. `rightMonotonicStack = [0]`
 *   After Pass 2: `nextSmallerIndices = [5, 4, 4, 4, 5]`
 *
 *   **Pass 3 (Final Check):**
 *   `checkFinalIndex = 0, nums[0] = 1`: `possibleLength = nextSmallerIndices[0] - prevSmallerIndices[0] - 1 = 5 - (-1) - 1 = 5`. `nums[0] = 1`. `threshold / possibleLength = 7 / 5 = 1.4`. `1 > 1.4` is false.
 *   `checkFinalIndex = 1, nums[1] = 3`: `possibleLength = nextSmallerIndices[1] - prevSmallerIndices[1] - 1 = 4 - 0 - 1 = 3`. `nums[1] = 3`. `threshold / possibleLength = 7 / 3 = 2.33...`. `3 > 2.33...` is true. Return `3`.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var validSubarraySize = function (nums, threshold) {
  const totalElements = nums.length;
  const prevSmallerIndices = new Array(totalElements).fill(-1);
  const nextSmallerIndices = new Array(totalElements).fill(totalElements);

  const leftMonotonicStack = [];
  for (
    let loopForwardIndex = 0;
    loopForwardIndex < totalElements;
    loopForwardIndex++
  ) {
    while (
      leftMonotonicStack.length > 0 &&
      nums[leftMonotonicStack[leftMonotonicStack.length - 1]] >=
        nums[loopForwardIndex]
    ) {
      leftMonotonicStack.pop();
    }
    if (leftMonotonicStack.length > 0) {
      prevSmallerIndices[loopForwardIndex] =
        leftMonotonicStack[leftMonotonicStack.length - 1];
    }
    leftMonotonicStack.push(loopForwardIndex);
  }

  const rightMonotonicStack = [];
  for (
    let loopBackwardIndex = totalElements - 1;
    loopBackwardIndex >= 0;
    loopBackwardIndex--
  ) {
    while (
      rightMonotonicStack.length > 0 &&
      nums[rightMonotonicStack[rightMonotonicStack.length - 1]] >=
        nums[loopBackwardIndex]
    ) {
      rightMonotonicStack.pop();
    }
    if (rightMonotonicStack.length > 0) {
      nextSmallerIndices[loopBackwardIndex] =
        rightMonotonicStack[rightMonotonicStack.length - 1];
    }
    rightMonotonicStack.push(loopBackwardIndex);
  }

  for (
    let checkFinalIndex = 0;
    checkFinalIndex < totalElements;
    checkFinalIndex++
  ) {
    const possibleLength =
      nextSmallerIndices[checkFinalIndex] -
      prevSmallerIndices[checkFinalIndex] -
      1;
    if (
      possibleLength > 0 &&
      nums[checkFinalIndex] > threshold / possibleLength
    ) {
      return possibleLength;
    }
  }

  return -1;
};

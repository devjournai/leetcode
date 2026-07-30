/**
 * Maximal Range That Each Element Is Maximum In It
 * Intuition: For each number nums[i], we need to find the widest possible subarray [l, r] such that nums[i] is the maximum element within nums[l..r]. This implies that all elements nums[k] where l <= k < i must be less than nums[i], and similarly for i < k <= r. The boundaries l and r are therefore determined by the first element to the left of i that is greater than nums[i], and the first element to the right of i that is greater than nums[i].
 * Approach: 1. Initialize two arrays, `leftRangeStarts` and `rightRangeEnds`, of the same length as `nums`. These will store the starting and ending indices of the maximal range for each element. 2. Use a monotonic stack (specifically, a decreasing stack of indices) to find `leftRangeStarts`. Iterate from left to right. For each `nums[currentElementIndex]`, pop indices from the stack whose corresponding values in `nums` are less than `nums[currentElementIndex]`. The top of the stack (if not empty) then indicates the index of the first element to the left that is greater than `nums[currentElementIndex]`. The left boundary for `nums[currentElementIndex]` will be `stack.top() + 1`, or `0` if the stack is empty. Push `currentElementIndex` onto the stack. 3. Clear the stack. Use another monotonic stack (also decreasing) to find `rightRangeEnds`. Iterate from right to left. For each `nums[reverseElementIndex]`, pop indices from the stack whose corresponding values in `nums` are less than `nums[reverseElementIndex]`. The top of the stack (if not empty) then indicates the index of the first element to the right that is greater than `nums[reverseElementIndex]`. The right boundary for `nums[reverseElementIndex]` will be `stack.top() - 1`, or `numArrayLength - 1` if the stack is empty. Push `reverseElementIndex` onto the stack. 4. Initialize `finalResult` array. For each `calculationIndex` from `0` to `numArrayLength - 1`, calculate `finalResult[calculationIndex] = rightRangeEnds[calculationIndex] - leftRangeStarts[calculationIndex] + 1`. 5. Return `finalResult`.
 * Dry Run: nums = [1, 5, 2, 4, 3]
 *   numArrayLength = 5
 *   leftRangeStarts = [_, _, _, _, _], rightRangeEnds = [_, _, _, _, _]
 *
 *   // First Pass (leftRangeStarts)
 *   indexStack = []
 *   currentElementIndex = 0, nums[0] = 1: indexStack is empty, leftRangeStarts[0] = 0, indexStack = [0]
 *   currentElementIndex = 1, nums[1] = 5: nums[indexStack[0]] (nums[0]=1) < nums[1]=5, pop 0. indexStack is empty, leftRangeStarts[1] = 0, indexStack = [1]
 *   currentElementIndex = 2, nums[2] = 2: nums[indexStack[0]] (nums[1]=5) > nums[2]=2, no pop. leftRangeStarts[2] = indexStack[0] + 1 = 1 + 1 = 2, indexStack = [1, 2]
 *   currentElementIndex = 3, nums[3] = 4: nums[indexStack[1]] (nums[2]=2) < nums[3]=4, pop 2. indexStack = [1]. nums[indexStack[0]] (nums[1]=5) > nums[3]=4, no pop. leftRangeStarts[3] = indexStack[0] + 1 = 1 + 1 = 2, indexStack = [1, 3]
 *   currentElementIndex = 4, nums[4] = 3: nums[indexStack[1]] (nums[3]=4) > nums[4]=3, no pop. leftRangeStarts[4] = indexStack[1] + 1 = 3 + 1 = 4, indexStack = [1, 3, 4]
 *   leftRangeStarts after pass = [0, 0, 2, 2, 4]
 *
 *   // Second Pass (rightRangeEnds)
 *   monotonicStack = [] (cleared)
 *   reverseElementIndex = 4, nums[4] = 3: monotonicStack is empty, rightRangeEnds[4] = 5 - 1 = 4, monotonicStack = [4]
 *   reverseElementIndex = 3, nums[3] = 4: nums[monotonicStack[0]] (nums[4]=3) < nums[3]=4, pop 4. monotonicStack is empty, rightRangeEnds[3] = 5 - 1 = 4, monotonicStack = [3]
 *   reverseElementIndex = 2, nums[2] = 2: nums[monotonicStack[0]] (nums[3]=4) > nums[2]=2, no pop. rightRangeEnds[2] = monotonicStack[0] - 1 = 3 - 1 = 2, monotonicStack = [3, 2]
 *   reverseElementIndex = 1, nums[1] = 5: nums[monotonicStack[1]] (nums[2]=2) < nums[1]=5, pop 2. monotonicStack = [3]. nums[monotonicStack[0]] (nums[3]=4) < nums[1]=5, pop 3. monotonicStack is empty, rightRangeEnds[1] = 5 - 1 = 4, monotonicStack = [1]
 *   reverseElementIndex = 0, nums[0] = 1: nums[monotonicStack[0]] (nums[1]=5) > nums[0]=1, no pop. rightRangeEnds[0] = monotonicStack[0] - 1 = 1 - 1 = 0, monotonicStack = [1, 0]
 *   rightRangeEnds after pass = [0, 4, 2, 4, 4]
 *
 *   // Final Calculation
 *   finalResult = [_, _, _, _, _]
 *   calculationIndex = 0: finalResult[0] = rightRangeEnds[0] - leftRangeStarts[0] + 1 = 0 - 0 + 1 = 1
 *   calculationIndex = 1: finalResult[1] = rightRangeEnds[1] - leftRangeStarts[1] + 1 = 4 - 0 + 1 = 5
 *   calculationIndex = 2: finalResult[2] = rightRangeEnds[2] - leftRangeStarts[2] + 1 = 2 - 2 + 1 = 1
 *   calculationIndex = 3: finalResult[3] = rightRangeEnds[3] - leftRangeStarts[3] + 1 = 4 - 2 + 1 = 3
 *   calculationIndex = 4: finalResult[4] = rightRangeEnds[4] - leftRangeStarts[4] + 1 = 4 - 4 + 1 = 1
 *   finalResult = [1, 5, 1, 3, 1]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumLengthOfRanges = function (nums) {
  const numArrayLength = nums.length;
  const leftRangeStarts = new Array(numArrayLength);
  const rightRangeEnds = new Array(numArrayLength);
  const indexStack = [];

  for (
    let currentElementIndex = 0;
    currentElementIndex < numArrayLength;
    currentElementIndex++
  ) {
    while (
      indexStack.length > 0 &&
      nums[indexStack[indexStack.length - 1]] < nums[currentElementIndex]
    ) {
      indexStack.pop();
    }
    leftRangeStarts[currentElementIndex] =
      indexStack.length > 0 ? indexStack[indexStack.length - 1] + 1 : 0;
    indexStack.push(currentElementIndex);
  }

  const monotonicStack = [];

  for (
    let reverseElementIndex = numArrayLength - 1;
    reverseElementIndex >= 0;
    reverseElementIndex--
  ) {
    while (
      monotonicStack.length > 0 &&
      nums[monotonicStack[monotonicStack.length - 1]] <
        nums[reverseElementIndex]
    ) {
      monotonicStack.pop();
    }
    rightRangeEnds[reverseElementIndex] =
      monotonicStack.length > 0
        ? monotonicStack[monotonicStack.length - 1] - 1
        : numArrayLength - 1;
    monotonicStack.push(reverseElementIndex);
  }

  const finalResult = new Array(numArrayLength);
  for (
    let calculationIndex = 0;
    calculationIndex < numArrayLength;
    calculationIndex++
  ) {
    finalResult[calculationIndex] =
      rightRangeEnds[calculationIndex] - leftRangeStarts[calculationIndex] + 1;
  }

  return finalResult;
};

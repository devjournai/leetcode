/**
 * Sort Transformed Array
 * Intuition: `ax^2+bx+c` on a sorted array is unimodal (opens up if a ≥ 0, down if a < 0), so the next largest (or smallest) transformed value is always at one of the two ends.
 * Approach: 1. Evaluate `a*x*x + b*x + c`. 2. Two pointers on nums. 3. If a ≥ 0, write the larger transformed end into the result from the back. 4. If a < 0, write the smaller transformed end from the front.
 * Dry Run: nums = [-4,-2,2,4], a = 1, b = 3, c = 5. f = [9,3,15,33]; a ≥ 0 fills from back: 9 vs 33 write 33, 9 vs 15 write 15, 9 vs 3 write 9, then 3 → [3, 9, 15, 33].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var sortTransformedArray = function (nums, a, b, c) {
  const applyTransformation = (inputNumber) => {
    return a * inputNumber * inputNumber + b * inputNumber + c;
  };

  const inputLength = nums.length;
  const finalResultArray = new Array(inputLength);

  let leftPointer = 0;
  let rightPointer = inputLength - 1;
  let currentWriteIndex;

  if (a >= 0) {
    currentWriteIndex = inputLength - 1;
    while (leftPointer <= rightPointer) {
      const transformedLeftValue = applyTransformation(nums[leftPointer]);
      const transformedRightValue = applyTransformation(nums[rightPointer]);

      if (transformedLeftValue > transformedRightValue) {
        finalResultArray[currentWriteIndex] = transformedLeftValue;
        leftPointer++;
      } else {
        finalResultArray[currentWriteIndex] = transformedRightValue;
        rightPointer--;
      }
      currentWriteIndex--;
    }
  } else {
    currentWriteIndex = 0;
    while (leftPointer <= rightPointer) {
      const transformedLeftValue = applyTransformation(nums[leftPointer]);
      const transformedRightValue = applyTransformation(nums[rightPointer]);

      if (transformedLeftValue < transformedRightValue) {
        finalResultArray[currentWriteIndex] = transformedLeftValue;
        leftPointer++;
      } else {
        finalResultArray[currentWriteIndex] = transformedRightValue;
        rightPointer--;
      }
      currentWriteIndex++;
    }
  }

  return finalResultArray;
};

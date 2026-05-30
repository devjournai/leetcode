/**
 * Partition Array According To Given Pivot
 * Intuition: To maintain relative order and satisfy the three-group partitioning (less, equal, greater than pivot), a multi-pass approach where elements are placed into their final positions sequentially within a new array is effective.
 * Approach: 1. Initialize a new result array of the same size as the input. 2. First pass: Iterate through the input array and sequentially place all elements less than the pivot into the result array, preserving their original relative order. A dedicated write pointer tracks the next available position. 3. Second pass: Using the final position from the first pass as the starting point, iterate through the input array again and sequentially place all elements equal to the pivot into the result array, preserving their original relative order. A second write pointer tracks the next available position for this group. 4. Third pass: Using the final position from the second pass as the starting point, iterate through the input array one last time and sequentially place all elements greater than the pivot into the result array, preserving their original relative order. A third write pointer tracks this group's positions. 5. Return the fully populated result array.
 * Dry Run: nums = [9,12,5,10,14,3,10], pivot = 10
 * totalLength = 7
 * resultArray = new Array(7) -> [empty × 7]
 *
 * // Pass 1: Populate elements less than pivot
 * lessWriterIndex = 0
 *
 * iterateCountOne = 0, currentNumberOne = 9. (9 < 10) true. resultArray[0] = 9. lessWriterIndex = 1. resultArray = [9, empty × 6]
 * iterateCountOne = 1, currentNumberOne = 12. (12 < 10) false.
 * iterateCountOne = 2, currentNumberOne = 5. (5 < 10) true. resultArray[1] = 5. lessWriterIndex = 2. resultArray = [9, 5, empty × 5]
 * iterateCountOne = 3, currentNumberOne = 10. (10 < 10) false.
 * iterateCountOne = 4, currentNumberOne = 14. (14 < 10) false.
 * iterateCountOne = 5, currentNumberOne = 3. (3 < 10) true. resultArray[2] = 3. lessWriterIndex = 3. resultArray = [9, 5, 3, empty × 4]
 * iterateCountOne = 6, currentNumberOne = 10. (10 < 10) false.
 *
 * End Pass 1. firstPivotIndex = lessWriterIndex = 3.
 *
 * // Pass 2: Populate elements equal to pivot
 * equalWriterIndex = firstPivotIndex = 3
 *
 * iterateCountTwo = 0, currentNumberTwo = 9. (9 === 10) false.
 * iterateCountTwo = 1, currentNumberTwo = 12. (12 === 10) false.
 * iterateCountTwo = 2, currentNumberTwo = 5. (5 === 10) false.
 * iterateCountTwo = 3, currentNumberTwo = 10. (10 === 10) true. resultArray[3] = 10. equalWriterIndex = 4. resultArray = [9, 5, 3, 10, empty × 3]
 * iterateCountTwo = 4, currentNumberTwo = 14. (14 === 10) false.
 * iterateCountTwo = 5, currentNumberTwo = 3. (3 === 10) false.
 * iterateCountTwo = 6, currentNumberTwo = 10. (10 === 10) true. resultArray[4] = 10. equalWriterIndex = 5. resultArray = [9, 5, 3, 10, 10, empty × 2]
 *
 * End Pass 2. firstGreaterIndex = equalWriterIndex = 5.
 *
 * // Pass 3: Populate elements greater than pivot
 * greaterWriterIndex = firstGreaterIndex = 5
 *
 * iterateCountThree = 0, currentNumberThree = 9. (9 > 10) false.
 * iterateCountThree = 1, currentNumberThree = 12. (12 > 10) true. resultArray[5] = 12. greaterWriterIndex = 6. resultArray = [9, 5, 3, 10, 10, 12, empty]
 * iterateCountThree = 2, currentNumberThree = 5. (5 > 10) false.
 * iterateCountThree = 3, currentNumberThree = 10. (10 > 10) false.
 * iterateCountThree = 4, currentNumberThree = 14. (14 > 10) true. resultArray[6] = 14. greaterWriterIndex = 7. resultArray = [9, 5, 3, 10, 10, 12, 14]
 * iterateCountThree = 5, currentNumberThree = 3. (3 > 10) false.
 * iterateCountThree = 6, currentNumberThree = 10. (10 > 10) false.
 *
 * End Pass 3.
 *
 * Final resultArray = [9, 5, 3, 10, 10, 12, 14]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var pivotArray = function (nums, pivot) {
  const totalLength = nums.length;
  const resultArray = new Array(totalLength);

  let lessWriterIndex = 0;
  for (
    let iterateCountOne = 0;
    iterateCountOne < totalLength;
    iterateCountOne++
  ) {
    const currentNumberOne = nums[iterateCountOne];
    if (currentNumberOne < pivot) {
      resultArray[lessWriterIndex] = currentNumberOne;
      lessWriterIndex++;
    }
  }

  const firstPivotIndex = lessWriterIndex;
  let equalWriterIndex = firstPivotIndex;
  for (
    let iterateCountTwo = 0;
    iterateCountTwo < totalLength;
    iterateCountTwo++
  ) {
    const currentNumberTwo = nums[iterateCountTwo];
    if (currentNumberTwo === pivot) {
      resultArray[equalWriterIndex] = currentNumberTwo;
      equalWriterIndex++;
    }
  }

  const firstGreaterIndex = equalWriterIndex;
  let greaterWriterIndex = firstGreaterIndex;
  for (
    let iterateCountThree = 0;
    iterateCountThree < totalLength;
    iterateCountThree++
  ) {
    const currentNumberThree = nums[iterateCountThree];
    if (currentNumberThree > pivot) {
      resultArray[greaterWriterIndex] = currentNumberThree;
      greaterWriterIndex++;
    }
  }

  return resultArray;
};

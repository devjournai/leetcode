/**
 * Find Minimum in Rotated Sorted Array
 * Intuition: The minimum element in a rotated sorted array is the unique point where the array's ascending order is broken. A binary search can efficiently locate this break point or identify the sorted segment that contains the minimum, allowing us to maintain and update a candidate minimum value as we narrow down the search space.
 * Approach: 1. Initialize a variable `minValStored` with the first element of the array. 2. Set two pointers, `startIndex` to 0 and `endIndex` to the last index of the array. 3. Enter a `while` loop that continues as long as `startIndex` is less than or equal to `endIndex`. 4. Calculate `middleIndex` using floor division. 5. First, check if the segment from `startIndex` to `endIndex` is already sorted (i.e., `nums[startIndex] <= nums[endIndex]`). If so, `nums[startIndex]` is the minimum in this segment and a candidate for the overall minimum. Update `minValStored` and `break` the loop, as the minimum has been found. 6. If the segment is not sorted, check the relationship between `nums[middleIndex]` and `nums[startIndex]`: a. If `nums[middleIndex] >= nums[startIndex]`, it means the left half `[startIndex, middleIndex]` is sorted. The minimum must be in the right half `(middleIndex, endIndex]`. Update `minValStored` with `nums[startIndex]` (the minimum of the sorted left half) and move `startIndex` to `middleIndex + 1`. b. If `nums[middleIndex] < nums[startIndex]`, it means the rotation point and the minimum are within the left half `[startIndex, middleIndex]`. Update `minValStored` with `nums[middleIndex]` (as it's a potential minimum) and move `endIndex` to `middleIndex - 1`. 7. After the loop, return `minValStored`.
 * Dry Run: nums = [4,5,6,7,0,1,2]
 * Initial: minValStored = 4, startIndex = 0, endIndex = 6
 *
 * Iteration 1:
 *   startIndex = 0, endIndex = 6, middleIndex = 3 (nums[3] = 7)
 *   nums[0] (4) <= nums[6] (2) is false.
 *   nums[3] (7) >= nums[0] (4) is true.
 *     minValStored = Math.min(4, nums[0]=4) = 4
 *     startIndex = 3 + 1 = 4
 *
 * Iteration 2:
 *   startIndex = 4, endIndex = 6, middleIndex = 5 (nums[5] = 1)
 *   nums[4] (0) <= nums[6] (2) is true.
 *     minValStored = Math.min(4, nums[4]=0) = 0
 *     Break loop.
 *
 * Result: 0
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var findMin = function (nums) {
  let minValStored = nums[0];
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (nums[startIndex] <= nums[endIndex]) {
      minValStored = Math.min(minValStored, nums[startIndex]);
      break;
    }

    if (nums[middleIndex] >= nums[startIndex]) {
      minValStored = Math.min(minValStored, nums[startIndex]);
      startIndex = middleIndex + 1;
    } else {
      minValStored = Math.min(minValStored, nums[middleIndex]);
      endIndex = middleIndex - 1;
    }
  }

  return minValStored;
};

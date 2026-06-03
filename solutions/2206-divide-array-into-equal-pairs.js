/**
 * Divide Array Into Equal Pairs
 * Intuition: For all elements in the array to form pairs of equal numbers, every distinct number must appear an even number of times.
 * Approach: 1. Determine the length of the input array `nums`. 2. Sort the `nums` array in non-decreasing order. 3. Iterate through the sorted array using a `for` loop, incrementing the loop counter by two in each step. 4. In each iteration, compare the current element `nums[i]` with the next element `nums[i + 1]`. If they are not equal, it implies an element cannot be paired, so return `false`. 5. If the loop completes without finding any unequal adjacent elements, it means all elements could be paired, so return `true`.
 * Dry Run: nums = [3, 2, 3, 2]
 *   1. arrayLength = 4.
 *   2. nums.sort((valueA, valueB) => valueA - valueB) sorts nums to [2, 2, 3, 3].
 *   3. Loop firstPointer from 0, step 2:
 *      - firstPointer = 0:
 *          - firstValue = nums[0] (2), secondValue = nums[1] (2).
 *          - (2 !== 2) is false.
 *      - firstPointer = 2:
 *          - firstValue = nums[2] (3), secondValue = nums[3] (3).
 *          - (3 !== 3) is false.
 *   4. Loop finishes.
 *   5. Return true.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var divideArray = function (nums) {
  const arrayLength = nums.length;

  nums.sort((valueA, valueB) => valueA - valueB);

  for (let firstPointer = 0; firstPointer < arrayLength; firstPointer += 2) {
    const firstValue = nums[firstPointer];
    const secondValue = nums[firstPointer + 1];

    if (firstValue !== secondValue) {
      return false;
    }
  }

  return true;
};

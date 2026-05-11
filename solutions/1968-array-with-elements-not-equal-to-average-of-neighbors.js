/**
 * Array With Elements Not Equal To Average Of Neighbors
 * Intuition: By sorting the array and then interleaving the smallest and largest available numbers, we construct a sequence where any element is either strictly greater than both its neighbors or strictly less than both its neighbors. In such a configuration, an element can never be equal to the average of its neighbors.
 * Approach: 1. Sort the input array `nums` in ascending order. 2. Create a new array `outputCollection` of the same length as `nums`. 3. Initialize two pointers, `leftIndex` to the start (0) of the sorted array and `rightIndex` to the end (`nums.length - 1`). 4. Iterate through `outputCollection` using an `arrayPosition` index. If `arrayPosition` is even, assign `nums[leftIndex]` to `outputCollection[arrayPosition]` and increment `leftIndex`. If `arrayPosition` is odd, assign `nums[rightIndex]` to `outputCollection[arrayPosition]` and decrement `rightIndex`. 5. Return the `outputCollection`.
 * Dry Run: nums = [1, 2, 3, 4, 5]
 * 1. nums is sorted: [1, 2, 3, 4, 5]
 * 2. outputCollection = [undefined, undefined, undefined, undefined, undefined]
 * 3. leftIndex = 0, rightIndex = 4
 * 4. Loop while arrayPosition < 5:
 *    - arrayPosition = 0 (even): outputCollection[0] = nums[leftIndex++] (nums[0] = 1). outputCollection = [1, undefined, ..., undefined]. leftIndex = 1.
 *    - arrayPosition = 1 (odd): outputCollection[1] = nums[rightIndex--] (nums[4] = 5). outputCollection = [1, 5, ..., undefined]. rightIndex = 3.
 *    - arrayPosition = 2 (even): outputCollection[2] = nums[leftIndex++] (nums[1] = 2). outputCollection = [1, 5, 2, undefined, undefined]. leftIndex = 2.
 *    - arrayPosition = 3 (odd): outputCollection[3] = nums[rightIndex--] (nums[3] = 4). outputCollection = [1, 5, 2, 4, undefined]. rightIndex = 2.
 *    - arrayPosition = 4 (even): outputCollection[4] = nums[leftIndex++] (nums[2] = 3). outputCollection = [1, 5, 2, 4, 3]. leftIndex = 3.
 * 5. Loop ends. Return [1, 5, 2, 4, 3].
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(N) for the new array `outputCollection`.
 */
var rearrangeArray = function (nums) {
  const arrayLength = nums.length;
  const outputCollection = new Array(arrayLength);

  nums.sort((valueOne, valueTwo) => valueOne - valueTwo);

  let leftIndex = 0;
  let rightIndex = arrayLength - 1;
  let arrayPosition = 0;

  while (arrayPosition < arrayLength) {
    if (arrayPosition % 2 === 0) {
      outputCollection[arrayPosition] = nums[leftIndex++];
    } else {
      outputCollection[arrayPosition] = nums[rightIndex--];
    }
    arrayPosition++;
  }

  return outputCollection;
};

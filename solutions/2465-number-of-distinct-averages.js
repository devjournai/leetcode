/**
 * Number Of Distinct Averages
 * Intuition: Sorting the array simplifies the process of repeatedly finding the minimum and maximum elements. Once sorted, the minimum is always at the leftmost position and the maximum at the rightmost. By pairing these two and moving inward with pointers, we efficiently calculate all necessary averages. A Set is then used to automatically handle duplicates, ensuring only distinct averages are counted.
 * Approach: 1. Sort the input array `nums` in ascending numerical order. This arranges the elements from smallest to largest. 2. Initialize an empty `Set` named `distinctAveragesCollection` to store unique average values. 3. Establish two pointers: `leftCursor` at the start of the array (index 0) and `rightCursor` at the end of the array (index `nums.length - 1`). 4. Enter a loop that continues as long as `leftCursor` is less than `rightCursor`. In each iteration: a. Calculate the sum of the elements at `nums[leftCursor]` and `nums[rightCursor]`. b. Divide this sum by 2 to get the `calculatedAverage`. c. Add the `calculatedAverage` to the `distinctAveragesCollection` Set. d. Increment `leftCursor` by one and decrement `rightCursor` by one to move towards the center of the array. 5. Once the loop concludes (when `leftCursor` meets or crosses `rightCursor`), return the total number of elements in the `distinctAveragesCollection` Set, which represents the count of distinct averages.
 * Dry Run: nums = [4, 1, 4, 0, 3, 5]
 * 1. Sort `nums`: `[0, 1, 3, 4, 4, 5]`
 * 2. `distinctAveragesCollection` = `Set()`
 * 3. `leftCursor` = 0, `rightCursor` = 5
 * Loop 1:
 *   `leftCursor` (0) < `rightCursor` (5) is true.
 *   `nums[0]` = 0, `nums[5]` = 5.
 *   `currentSum` = 0 + 5 = 5.
 *   `calculatedAverage` = 5 / 2 = 2.5.
 *   `distinctAveragesCollection`.add(2.5) -> `{2.5}`.
 *   `leftCursor` becomes 1. `rightCursor` becomes 4.
 * Loop 2:
 *   `leftCursor` (1) < `rightCursor` (4) is true.
 *   `nums[1]` = 1, `nums[4]` = 4.
 *   `currentSum` = 1 + 4 = 5.
 *   `calculatedAverage` = 5 / 2 = 2.5.
 *   `distinctAveragesCollection`.add(2.5) -> `{2.5}` (no change as 2.5 already exists).
 *   `leftCursor` becomes 2. `rightCursor` becomes 3.
 * Loop 3:
 *   `leftCursor` (2) < `rightCursor` (3) is true.
 *   `nums[2]` = 3, `nums[3]` = 4.
 *   `currentSum` = 3 + 4 = 7.
 *   `calculatedAverage` = 7 / 2 = 3.5.
 *   `distinctAveragesCollection`.add(3.5) -> `{2.5, 3.5}`.
 *   `leftCursor` becomes 3. `rightCursor` becomes 2.
 * Loop Termination: `leftCursor` (3) < `rightCursor` (2) is false.
 * 4. Return `distinctAveragesCollection.size` which is 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var distinctAverages = function (nums) {
  nums.sort((alpha, beta) => alpha - beta);
  const distinctAveragesCollection = new Set();

  let leftCursor = 0;
  let rightCursor = nums.length - 1;

  while (leftCursor < rightCursor) {
    let currentSum = nums[leftCursor] + nums[rightCursor];
    let calculatedAverage = currentSum / 2;
    distinctAveragesCollection.add(calculatedAverage);
    leftCursor++;
    rightCursor--;
  }

  return distinctAveragesCollection.size;
};

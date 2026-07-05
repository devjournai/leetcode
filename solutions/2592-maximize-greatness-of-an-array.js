/**
 * Maximize Greatness Of An Array
 * Intuition: To maximize the count of elements in a permuted array `perm` that are strictly greater than their corresponding elements in the original array `nums` (i.e., `perm[i] > nums[i]`), we should employ a greedy strategy. By sorting `nums`, we can iterate through its elements in increasing order. For each `nums[i]`, we aim to find the smallest possible `nums[j]` (from the remaining available elements) such that `nums[j] > nums[i]`. This strategy is optimal because using the smallest valid `nums[j]` leaves larger elements available for subsequent, potentially larger, `nums[k]` values, thereby maximizing future pairing opportunities.
 * Approach: 1. Sort the input array `nums` in non-decreasing order. This ensures that elements are processed from smallest to largest. 2. Initialize a counter, `totalGreatness`, to zero, which will store the number of successful pairings. 3. Initialize two pointers: `firstScanPointer` at index `0` (representing an element from the original `nums` array) and `secondScanPointer` at index `1` (representing a candidate element from the permuted `perm` array). 4. Iterate using a `while` loop as long as `secondScanPointer` is within the array bounds (`secondScanPointer < nums.length`). 5. Inside the loop, compare `nums[secondScanPointer]` with `nums[firstScanPointer]`. If `nums[secondScanPointer]` is strictly greater than `nums[firstScanPointer]`, a valid pair is found. Increment `totalGreatness` and advance both `firstScanPointer` and `secondScanPointer` to consider the next elements for pairing. 6. If `nums[secondScanPointer]` is not strictly greater than `nums[firstScanPointer]` (i.e., `nums[secondScanPointer] <= nums[firstScanPointer]`), it means `nums[secondScanPointer]` cannot be paired with `nums[firstScanPointer]` to satisfy the greatness condition. In this case, only advance `secondScanPointer` to look for a larger candidate element for `nums[firstScanPointer]`. 7. After the loop terminates, `totalGreatness` will contain the maximum possible greatness.
 * Dry Run: Input: nums = [1, 3, 5, 2, 1, 3]
 * 1. Sort nums: nums becomes [1, 1, 2, 3, 3, 5].
 * 2. Initialize totalGreatness = 0, firstScanPointer = 0, secondScanPointer = 1.
 * 3. Loop (secondScanPointer < 6):
 *    - secondScanPointer = 1: nums[1] (1) > nums[0] (1) is FALSE. Increment secondScanPointer to 2.
 *      (totalGreatness = 0, firstScanPointer = 0, secondScanPointer = 2)
 *    - secondScanPointer = 2: nums[2] (2) > nums[0] (1) is TRUE. Increment totalGreatness to 1. Increment firstScanPointer to 1. Increment secondScanPointer to 3.
 *      (totalGreatness = 1, firstScanPointer = 1, secondScanPointer = 3)
 *    - secondScanPointer = 3: nums[3] (3) > nums[1] (1) is TRUE. Increment totalGreatness to 2. Increment firstScanPointer to 2. Increment secondScanPointer to 4.
 *      (totalGreatness = 2, firstScanPointer = 2, secondScanPointer = 4)
 *    - secondScanPointer = 4: nums[4] (3) > nums[2] (2) is TRUE. Increment totalGreatness to 3. Increment firstScanPointer to 3. Increment secondScanPointer to 5.
 *      (totalGreatness = 3, firstScanPointer = 3, secondScanPointer = 5)
 *    - secondScanPointer = 5: nums[5] (5) > nums[3] (3) is TRUE. Increment totalGreatness to 4. Increment firstScanPointer to 4. Increment secondScanPointer to 6.
 *      (totalGreatness = 4, firstScanPointer = 4, secondScanPointer = 6)
 * 4. Loop terminates as secondScanPointer (6) is not less than nums.length (6).
 * 5. Return totalGreatness (4).
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maximizeGreatness = function (nums) {
  nums.sort((elementA, elementB) => elementA - elementB);

  let totalGreatness = 0;
  let firstScanPointer = 0;
  let secondScanPointer = 1;

  while (secondScanPointer < nums.length) {
    if (nums[secondScanPointer] > nums[firstScanPointer]) {
      totalGreatness++;
      firstScanPointer++;
      secondScanPointer++;
    } else {
      secondScanPointer++;
    }
  }

  return totalGreatness;
};

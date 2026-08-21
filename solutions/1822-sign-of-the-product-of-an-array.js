/**
 * Sign Of The Product Of An Array
 * Intuition: The product is 0 if any zero appears; otherwise its sign is negative iff there is an odd number of negatives.
 * Approach: 1. Scan nums. 2. Return 0 on a zero. 3. Count negatives. 4. Return 1 if that count is even else -1.
 * Dry Run: nums = [-1,-2,-3,-4,3,2,1].
 *   - Four negatives, even → 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var arraySign = function (nums) {
  let totalNegativeNumbers = 0;

  for (let iterationIndex = 0; iterationIndex < nums.length; iterationIndex++) {
    let numberToCheck = nums[iterationIndex];
    if (numberToCheck === 0) {
      return 0;
    }
    if (numberToCheck < 0) {
      totalNegativeNumbers++;
    }
  }

  return totalNegativeNumbers % 2 === 0 ? 1 : -1;
};

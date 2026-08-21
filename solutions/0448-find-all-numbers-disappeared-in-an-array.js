/**
 * Find All Numbers Disappeared In An Array
 * Intuition: Mark presence of value v by negating `nums[v-1]`. After one pass, still-positive indices are missing numbers.
 * Approach: 1. For each value, if `nums[abs(v)-1] > 0`, negate it. 2. Scan again; if `nums[i] > 0`, push `i+1`. 3. Return `missingElements`.
 * Dry Run: [4,3,2,7,8,2,3,1]. After marking, indices 4 and 5 stay positive → 5 and 6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findDisappearedNumbers = function (nums) {
  const totalLength = nums.length;
  let indexTraversal = 0;

  for (indexTraversal = 0; indexTraversal < totalLength; indexTraversal++) {
    const absoluteValue = Math.abs(nums[indexTraversal]);
    const targetPosition = absoluteValue - 1;

    if (nums[targetPosition] > 0) {
      nums[targetPosition] *= -1;
    }
  }

  const missingElements = [];
  let positionChecker = 0;

  while (positionChecker < totalLength) {
    if (nums[positionChecker] > 0) {
      missingElements.push(positionChecker + 1);
    }
    positionChecker++;
  }

  return missingElements;
};

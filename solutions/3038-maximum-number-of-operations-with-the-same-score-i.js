/**
 * Maximum Number Of Operations With The Same Score I
 * Intuition: The problem specifies that all operations must achieve the same score. Since operations always involve deleting the first two elements, the very first operation (using nums[0] and nums[1]) implicitly defines the required score for all subsequent operations. We just need to count how many consecutive pairs match this initial score.
 * Approach: 1. Calculate the target score by summing the first two elements of the array. 2. Initialize a counter for successful operations. 3. Iterate through the array, taking elements in pairs (nums[i], nums[i+1]). 4. For each pair, check if their sum equals the predefined target score. 5. If it matches, increment the operation counter and advance the pointer by two. 6. If it does not match, or if there are fewer than two elements remaining, stop the process.
 * Dry Run:
 * Input: nums = [3,2,5,4,1]
 * 1. initialScoreValue = nums[0] + nums[1] = 3 + 2 = 5.
 * 2. totalOperations = 0.
 * 3. elementIndex = 0.
 *
 * Loop 1:
 * Condition: (elementIndex + 1 < nums.length) && ((nums[elementIndex] + nums[elementIndex + 1]) === initialScoreValue)
 * (0 + 1 < 5) && ((nums[0] + nums[1]) === 5)
 * (1 < 5) && (3 + 2 === 5)
 * true && true -> true. Enter loop.
 * totalOperations becomes 1.
 * elementIndex becomes 0 + 2 = 2.
 *
 * Loop 2:
 * Condition: (elementIndex + 1 < nums.length) && ((nums[elementIndex] + nums[elementIndex + 1]) === initialScoreValue)
 * (2 + 1 < 5) && ((nums[2] + nums[3]) === 5)
 * (3 < 5) && (5 + 4 === 5)
 * true && (9 === 5)
 * true && false -> false. Exit loop.
 *
 * Return totalOperations = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxOperations = function (nums) {
  let initialScoreValue = nums[0] + nums[1];
  let totalOperations = 0;
  let elementIndex = 0;

  while (
    elementIndex + 1 < nums.length &&
    nums[elementIndex] + nums[elementIndex + 1] === initialScoreValue
  ) {
    totalOperations++;
    elementIndex += 2;
  }

  return totalOperations;
};

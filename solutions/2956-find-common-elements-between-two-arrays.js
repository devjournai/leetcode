/**
 * Find Common Elements Between Two Arrays
 * Intuition: Using hash sets (Sets in JavaScript) allows for efficient O(1) average time complexity lookups, which is crucial for determining element existence in another array without repeatedly scanning. This approach avoids nested loops, which would lead to a less optimal O(N*M) time complexity.
 * Approach: 1. Create a hash set named `firstSet` containing all unique elements from `nums1`. 2. Create another hash set named `secondSet` containing all unique elements from `nums2`. 3. Initialize an integer `firstAnswerCount` to 0, which will store the count of elements in `nums1` that are also present in `nums2`. 4. Iterate through each `elementInNums1` in the original `nums1` array. For each `elementInNums1`, check if it exists in `secondSet`. If it does, increment `firstAnswerCount`. 5. Initialize an integer `secondAnswerCount` to 0, which will store the count of elements in `nums2` that are also present in `nums1`. 6. Iterate through each `elementInNums2` in the original `nums2` array. For each `elementInNums2`, check if it exists in `firstSet`. If it does, increment `secondAnswerCount`. 7. Finally, return an array containing `firstAnswerCount` and `secondAnswerCount`.
 * Dry Run: nums1 = [1,2,2,1], nums2 = [2,2]
 *   1. firstSet = new Set(nums1) => {1, 2}
 *   2. secondSet = new Set(nums2) => {2}
 *   3. firstAnswerCount = 0
 *   4. Iterate nums1:
 *      - elementInNums1 = 1: secondSet.has(1) is false.
 *      - elementInNums1 = 2: secondSet.has(2) is true. firstAnswerCount becomes 1.
 *      - elementInNums1 = 2: secondSet.has(2) is true. firstAnswerCount becomes 2.
 *      - elementInNums1 = 1: secondSet.has(1) is false.
 *      After this loop, firstAnswerCount is 2.
 *   5. secondAnswerCount = 0
 *   6. Iterate nums2:
 *      - elementInNums2 = 2: firstSet.has(2) is true. secondAnswerCount becomes 1.
 *      - elementInNums2 = 2: firstSet.has(2) is true. secondAnswerCount becomes 2.
 *      After this loop, secondAnswerCount is 2.
 *   7. The function returns [firstAnswerCount, secondAnswerCount], which is [2, 2].
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var findIntersectionValues = function (nums1, nums2) {
  var firstSet = new Set(nums1);
  var secondSet = new Set(nums2);

  var firstAnswerCount = 0;
  for (var elementInNums1 of nums1) {
    if (secondSet.has(elementInNums1)) {
      firstAnswerCount++;
    }
  }

  var secondAnswerCount = 0;
  for (var elementInNums2 of nums2) {
    if (firstSet.has(elementInNums2)) {
      secondAnswerCount++;
    }
  }

  return [firstAnswerCount, secondAnswerCount];
};

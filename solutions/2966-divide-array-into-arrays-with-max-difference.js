/**
 * Divide Array Into Arrays With Max Difference
 * Intuition: To minimize differences within triplets and satisfy the condition, sorting the array first allows for a greedy approach where we pick the smallest available elements. If even the smallest three consecutive elements (after sorting) cannot satisfy the `k` difference, no other combination including the smallest element could, making it impossible.
 * Approach: 1. Sort the input array `nums` in ascending order. 2. Initialize an empty 2D array `finalGroups` to store the resulting triplets. 3. Iterate through the sorted `nums` array, taking elements in groups of three. For each group starting at index `idx`, check if `nums[idx + 2] - nums[idx]` is greater than `k`. If it is, return an empty array `[]` immediately as it's impossible to satisfy the condition. 4. If the condition is met, add the triplet `[nums[idx], nums[idx + 1], nums[idx + 2]]` to `finalGroups`. 5. After iterating through all elements, return `finalGroups`.
 * Dry Run: nums = [1,3,4,8,7,9], k = 2
 * 1. Sort nums: nums becomes [1,3,4,7,8,9].
 * 2. Initialize finalGroups = [].
 * 3. Loop:
 *    - currentIdx = 0:
 *      - Triplet is [nums[0], nums[1], nums[2]] which is [1, 3, 4].
 *      - Check difference: nums[2] - nums[0] = 4 - 1 = 3.
 *      - Is 3 > k (which is 2)? Yes, 3 > 2.
 *      - Return [].
 *    - (The function returns an empty array early, so further iterations do not occur).
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var divideArray = function (nums, k) {
  nums.sort((firstValue, secondValue) => firstValue - secondValue);

  const finalCollection = [];
  const totalElements = nums.length;

  for (
    let groupStartIndex = 0;
    groupStartIndex < totalElements;
    groupStartIndex += 3
  ) {
    const thirdElement = nums[groupStartIndex + 2];
    const firstElement = nums[groupStartIndex];

    if (thirdElement - firstElement > k) {
      return [];
    }
    finalCollection.push([
      firstElement,
      nums[groupStartIndex + 1],
      thirdElement,
    ]);
  }

  return finalCollection;
};

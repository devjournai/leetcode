/**
 * Number of Perfect Pairs
 * Intuition: min(|a-b|,|a+b|)=||a|-|b|| and max(|a-b|,|a+b|)=|a|+|b|, so the second inequality always holds and the first is |b| ≤ 2|a| after sorting absolute values.
 * Approach: 1. Replace nums[i] with |nums[i]| and sort. 2. Two pointers: for each right, advance left while nums[right] > 2*nums[left]. 3. Add right-left pairs.
 * Dry Run: [0,1,2,3] → pairs (1,2) and (2,3) only, answer 2.
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
var perfectPairs = function (nums) {
  for (let index = 0; index < nums.length; index++) {
    nums[index] = Math.abs(nums[index]);
  }
  nums.sort((left, right) => left - right);

  let answer = 0;
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    while (nums[right] - nums[left] > nums[left]) {
      left++;
    }
    answer += right - left;
  }
  return answer;
};

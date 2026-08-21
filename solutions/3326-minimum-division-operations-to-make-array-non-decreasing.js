/**
 * Minimum Division Operations to Make Array Non Decreasing
 * Intuition: Working from right to left, if nums[i] exceeds nums[i + 1], replace it with its smallest divisor greater than 1. That is the cheapest single division (num / smallestPrimeFactor). If even that value is still larger than the next element, it is impossible.
 * Approach: 1. Walk i from n-2 down to 0. 2. When nums[i] > nums[i + 1], find the smallest divisor d in [2, sqrt(num)], or num if prime. 3. If d > nums[i + 1], return -1. 4. Else set nums[i] = d and count one operation.
 * Dry Run: nums = [3, 12, 9]. i=1: 12 > 9, minDivisor=2 <= 9, nums becomes [3, 2, 9], ops=1. i=0: 3 > 2, minDivisor=3 > 2, return -1.
 * Time Complexity: O(N * sqrt(max(nums)))
 * Space Complexity: O(1)
 */

var minOperations = function (nums) {
  let operations = 0;

  for (let index = nums.length - 2; index >= 0; index--) {
    if (nums[index] > nums[index + 1]) {
      const minDivisor = getMinDivisor(nums[index]);
      if (minDivisor > nums[index + 1]) {
        return -1;
      }
      nums[index] = minDivisor;
      operations++;
    }
  }

  return operations;
};

function getMinDivisor(num) {
  for (let divisor = 2; divisor * divisor <= num; divisor++) {
    if (num % divisor === 0) {
      return divisor;
    }
  }
  return num;
}

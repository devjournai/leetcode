/**
 * Two Sum Less Than K
 * Intuition: After sorting, a two-pointer scan finds the largest pair sum still < k: a small+large sum that is too big must shrink the right pointer; otherwise record and grow the left.
 * Approach: 1. Sort nums. 2. lo=0, hi=n-1. 3. If nums[lo]+nums[hi]<k, update max and lo++. 4. Else hi--. 5. Return max or -1.
 * Dry Run: nums=[34,23,1,24,75,33,54,8], k=60. Sorted … 8+54=62 too big, 8+33=41, … best 58 from 24+34.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var twoSumLessThanK = function (nums, k) {
  nums.sort((elementA, elementB) => elementA - elementB);

  let firstPointerIndex = 0;
  let secondPointerIndex = nums.length - 1;
  let maxPossibleSum = -1;

  while (firstPointerIndex < secondPointerIndex) {
    const currentSumCalculation =
      nums[firstPointerIndex] + nums[secondPointerIndex];

    if (currentSumCalculation < k) {
      maxPossibleSum = Math.max(maxPossibleSum, currentSumCalculation);
      firstPointerIndex++;
    } else {
      secondPointerIndex--;
    }
  }

  return maxPossibleSum;
};

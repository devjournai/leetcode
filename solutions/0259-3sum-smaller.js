/**
 * 3sum Smaller
 * Intuition: After sorting, fix the first number and two-pointer the rest: if the triple sum is below target, every index between left and right also works, so add `right-left` and move left up; otherwise shrink from the right.
 * Approach: 1. Sort `nums`. 2. For each `firstElementIndex` up to n-3, set left = i+1, right = n-1. 3. While left < right, if sum < target, add `right-left` and left++; else right--. 4. Return the count. Sort uses O(log N) extra.
 * Dry Run: nums = [-2,0,1,3], target = 2.
 *   - Sorted same. i=-2: (0,3)=1<2 add 2; left moves, (1,3) stop. i=0: (1,3)=4≥2, right-- done. Count 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(log N)
 */
var threeSumSmaller = function (nums, target) {
  nums.sort((alpha, beta) => alpha - beta);

  const arrayLength = nums.length;
  let totalTripletsCount = 0;

  for (
    let firstElementIndex = 0;
    firstElementIndex < arrayLength - 2;
    firstElementIndex++
  ) {
    let leftBoundary = firstElementIndex + 1;
    let rightBoundary = arrayLength - 1;

    while (leftBoundary < rightBoundary) {
      const currentSumOfThree =
        nums[firstElementIndex] + nums[leftBoundary] + nums[rightBoundary];

      if (currentSumOfThree < target) {
        totalTripletsCount += rightBoundary - leftBoundary;
        leftBoundary++;
      } else {
        rightBoundary--;
      }
    }
  }

  return totalTripletsCount;
};

/**
 * Minimum Score By Changing Two Elements
 * Intuition: The problem asks to minimize the sum of high score and low score after changing two elements. By changing two elements to be identical (e.g., both to the minimum existing value in the remaining array), we can always make the low score zero. This reduces the problem to minimizing only the high score. The high score is the maximum absolute difference between any two elements, which in a sorted array is simply `max_element - min_element`. To minimize this difference after effectively "removing" two elements (by changing them to fit within the new range), we consider the three minimal range options by discarding elements from the ends of the sorted array.
 * Approach: 1. Sort the input array `nums` to easily identify the smallest and largest elements. 2. Since we can change any two elements, we can make the "low score" zero by setting two chosen elements to be equal. Thus, we only need to minimize the "high score". 3. The high score is `max_val - min_val`. To minimize this difference after removing two elements, we consider three scenarios: removing the two smallest elements, removing the two largest elements, or removing one smallest and one largest element. 4. Calculate the range (max - min) for each of these three scenarios and return the minimum among them.
 * Dry Run: nums = [1, 5, 0, 10, 14]
 * 1. Sort nums: sortedNumbers = [0, 1, 5, 10, 14]. arrayLength = 5.
 * 2. Calculate three potential minimum high scores:
 *    a. Remove nums[0] and nums[1] (0 and 1): The effective remaining range is from nums[2] to nums[4].
 *       firstRangeCalculation = sortedNumbers[arrayLength - 1] - sortedNumbers[2] = 14 - 5 = 9.
 *    b. Remove nums[3] and nums[4] (10 and 14): The effective remaining range is from nums[0] to nums[2].
 *       secondRangeCalculation = sortedNumbers[arrayLength - 3] - sortedNumbers[0] = 5 - 0 = 5.
 *    c. Remove nums[0] and nums[4] (0 and 14): The effective remaining range is from nums[1] to nums[3].
 *       thirdRangeCalculation = sortedNumbers[arrayLength - 2] - sortedNumbers[1] = 10 - 1 = 9.
 * 3. The minimum overall score is Math.min(9, 5, 9) = 5.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minimizeSum = function (nums) {
  const sortedNumbers = nums.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );
  const arrayLength = sortedNumbers.length;

  const firstRangeCalculation =
    sortedNumbers[arrayLength - 1] - sortedNumbers[2];
  const secondRangeCalculation =
    sortedNumbers[arrayLength - 3] - sortedNumbers[0];
  const thirdRangeCalculation =
    sortedNumbers[arrayLength - 2] - sortedNumbers[1];

  const minimumOverallScore = Math.min(
    firstRangeCalculation,
    secondRangeCalculation,
    thirdRangeCalculation,
  );

  return minimumOverallScore;
};

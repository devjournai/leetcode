/**
 * Identify the Largest Outlier in an Array
 * Intuition: Exactly one value is the outlier; another value equals the sum of the remaining “special” numbers. If the outlier is `x`, then `total - x` is even and `(total - x) / 2` must appear in the array (a different index than `x` unless the value occurs twice).
 * Approach: 1. Sum the array and count frequencies. 2. For each candidate outlier `num`, let `specialSum = (total - num) / 2`. 3. If that value exists with enough leftover count, update the max outlier. 4. Return the maximum.
 * Dry Run: nums = [2, 3, 5, 10]. Total 20. For 10, specialSum=5 which exists → outlier 10. For 5, specialSum=7 missing. Answer 10.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var getLargestOutlier = function (nums) {
  let totalSum = 0;
  const frequencyByValue = new Map();
  for (const num of nums) {
    totalSum += num;
    frequencyByValue.set(num, (frequencyByValue.get(num) || 0) + 1);
  }

  let largestOutlier = -Infinity;
  for (const num of nums) {
    const withoutNum = totalSum - num;
    if (withoutNum % 2 !== 0) {
      continue;
    }
    const specialSum = withoutNum / 2;
    const neededCount = num === specialSum ? 1 : 0;
    if ((frequencyByValue.get(specialSum) || 0) > neededCount) {
      largestOutlier = Math.max(largestOutlier, num);
    }
  }

  return largestOutlier;
};

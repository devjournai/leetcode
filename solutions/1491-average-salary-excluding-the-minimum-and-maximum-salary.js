/**
 * Average Salary Excluding The Minimum And Maximum Salary
 * Intuition: One pass tracks min, max, and total; average is (sum - min - max) / (n-2).
 * Approach: 1. Init min=Infinity, max=-Infinity, sum=0. 2. For each salary update min, max, and sum. 3. Return (sum-min-max)/(n-2).
 * Dry Run: salary = [4000,3000,1000,2000]
 *   - min=1000, max=4000, sum=10000
 *   - (10000-1000-4000)/2 = 2500
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var average = function (salary) {
  let minimumSalary = Infinity;
  let maximumSalary = -Infinity;
  let totalSumValue = 0;
  const arrayLength = salary.length;

  for (let currentSalary of salary) {
    if (currentSalary < minimumSalary) {
      minimumSalary = currentSalary;
    }
    if (currentSalary > maximumSalary) {
      maximumSalary = currentSalary;
    }
    totalSumValue += currentSalary;
  }

  const sumWithoutExtremes = totalSumValue - minimumSalary - maximumSalary;
  const countWithoutExtremes = arrayLength - 2;
  const finalAverage = sumWithoutExtremes / countWithoutExtremes;

  return finalAverage;
};

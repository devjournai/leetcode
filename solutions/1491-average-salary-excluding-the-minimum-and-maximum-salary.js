/**
 * Average Salary Excluding The Minimum And Maximum Salary
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

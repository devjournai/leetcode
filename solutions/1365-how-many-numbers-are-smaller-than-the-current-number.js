/**
 * How Many Numbers Are Smaller Than The Current Number
 * Time Complexity: O(N + K)
 * Space Complexity: O(N + K)
 */
var smallerNumbersThanCurrent = function (nums) {
  const valueRange = 101;
  const frequencyCounts = new Array(valueRange).fill(0);

  for (const numberValue of nums) {
    frequencyCounts[numberValue]++;
  }

  const cumulativeSmaller = new Array(valueRange).fill(0);
  for (let indexValue = 1; indexValue < valueRange; indexValue++) {
    cumulativeSmaller[indexValue] =
      cumulativeSmaller[indexValue - 1] + frequencyCounts[indexValue - 1];
  }

  const resultCollection = [];
  for (const elementValue of nums) {
    resultCollection.push(cumulativeSmaller[elementValue]);
  }

  return resultCollection;
};

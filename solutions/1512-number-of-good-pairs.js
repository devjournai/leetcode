/**
 * Number Of Good Pairs
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numIdenticalPairs = function (inputNumbers) {
  let totalGoodPairs = 0;
  const elementFrequencies = new Array(101).fill(0);

  for (const currentValue of inputNumbers) {
    totalGoodPairs += elementFrequencies[currentValue];
    elementFrequencies[currentValue]++;
  }

  return totalGoodPairs;
};

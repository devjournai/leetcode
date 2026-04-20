/**
 * Count Sorted Vowel Strings
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countVowelStrings = function (n) {
  const vowelCounter = [1, 1, 1, 1, 1];

  for (let stringLength = 1; stringLength < n; stringLength++) {
    for (let vowelPosition = 1; vowelPosition < 5; vowelPosition++) {
      vowelCounter[vowelPosition] += vowelCounter[vowelPosition - 1];
    }
  }

  let finalSum = 0;
  for (let currentPosition = 0; currentPosition < 5; currentPosition++) {
    finalSum += vowelCounter[currentPosition];
  }
  return finalSum;
};

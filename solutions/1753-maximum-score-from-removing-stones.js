/**
 * Maximum Score From Removing Stones
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var maximumScore = function (a, b, c) {
  const pileQuantities = [a, b, c];
  pileQuantities.sort(
    (firstNumber, secondNumber) => firstNumber - secondNumber,
  );

  const smallestCount = pileQuantities[0];
  const mediumCount = pileQuantities[1];
  const largestCount = pileQuantities[2];

  let finalScore;

  if (largestCount > smallestCount + mediumCount) {
    finalScore = smallestCount + mediumCount;
  } else {
    finalScore = Math.floor((smallestCount + mediumCount + largestCount) / 2);
  }

  return finalScore;
};

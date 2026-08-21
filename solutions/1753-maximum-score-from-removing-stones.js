/**
 * Maximum Score From Removing Stones
 * Intuition: Each move takes one stone from two piles. Score is min(total//2, total − maxPile) because the largest pile cannot pair more times than the other two combined.
 * Approach: 1. Sort a,b,c into small/mid/large. 2. If large > small+mid, score is small+mid; else floor(sum/2). 3. Return `finalScore`.
 * Dry Run: a=2, b=4, c=6
 * large 6 = 2+4, sum/2 = 6 → 6.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var maximumScore = function (a, b, c) {
  const pileQuantities = [a, b, c];
  pileQuantities.sort(
    (firstNumber, secondNumber) => firstNumber - secondNumber
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

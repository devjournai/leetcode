/**
 * Maximum Number Of Balloons
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxNumberOfBalloons = function (text) {
  const charFrequencyMap = new Map();

  for (const singleCharacter of text) {
    charFrequencyMap.set(
      singleCharacter,
      (charFrequencyMap.get(singleCharacter) || 0) + 1,
    );
  }

  const countForB = charFrequencyMap.get("b") || 0;
  const countForA = charFrequencyMap.get("a") || 0;
  const countForL = charFrequencyMap.get("l") || 0;
  const countForO = charFrequencyMap.get("o") || 0;
  const countForN = charFrequencyMap.get("n") || 0;

  const limitFromB = countForB;
  const limitFromA = countForA;
  const limitFromL = Math.floor(countForL / 2);
  const limitFromO = Math.floor(countForO / 2);
  const limitFromN = countForN;

  const maximumPossibleBalloons = Math.min(
    limitFromB,
    limitFromA,
    limitFromL,
    limitFromO,
    limitFromN,
  );

  return maximumPossibleBalloons;
};

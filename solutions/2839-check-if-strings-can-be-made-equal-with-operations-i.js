/**
 * Check if Strings Can be Made Equal With Operations I
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canBeEqual = function (s1, s2) {
  const charactersS1EvenIndices = [s1[0], s1[2]];
  const charactersS2EvenIndices = [s2[0], s2[2]];

  const sortedCharsS1Even = charactersS1EvenIndices.sort();
  const sortedCharsS2Even = charactersS2EvenIndices.sort();

  const joinedS1Even = sortedCharsS1Even.join("");
  const joinedS2Even = sortedCharsS2Even.join("");

  const evenPositionsMatch = joinedS1Even === joinedS2Even;

  const charactersS1OddIndices = [s1[1], s1[3]];
  const charactersS2OddIndices = [s2[1], s2[3]];

  const sortedCharsS1Odd = charactersS1OddIndices.sort();
  const sortedCharsS2Odd = charactersS2OddIndices.sort();

  const joinedS1Odd = sortedCharsS1Odd.join("");
  const joinedS2Odd = sortedCharsS2Odd.join("");

  const oddPositionsMatch = joinedS1Odd === joinedS2Odd;

  const overallEqualityPossible = evenPositionsMatch && oddPositionsMatch;
  return overallEqualityPossible;
};

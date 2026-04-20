/**
 * Relative Ranks
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findRelativeRanks = function (score) {
  const initialLength = score.length;
  const scoreOriginalPairs = [];

  for (
    let initialPointer = 0;
    initialPointer < initialLength;
    initialPointer++
  ) {
    scoreOriginalPairs.push([score[initialPointer], initialPointer]);
  }

  scoreOriginalPairs.sort(
    (athleteOne, athleteTwo) => athleteTwo[0] - athleteOne[0],
  );

  const finalRanksArray = new Array(initialLength);

  const goldMedalTitle = "Gold Medal";
  const silverMedalTitle = "Silver Medal";
  const bronzeMedalTitle = "Bronze Medal";

  for (
    let currentRankIndex = 0;
    currentRankIndex < initialLength;
    currentRankIndex++
  ) {
    const currentSortedAthlete = scoreOriginalPairs[currentRankIndex];
    const initialPlacement = currentSortedAthlete[1];
    let rankDescription;

    if (currentRankIndex === 0) {
      rankDescription = goldMedalTitle;
    } else if (currentRankIndex === 1) {
      rankDescription = silverMedalTitle;
    } else if (currentRankIndex === 2) {
      rankDescription = bronzeMedalTitle;
    } else {
      const numericRankValue = currentRankIndex + 1;
      rankDescription = String(numericRankValue);
    }
    finalRanksArray[initialPlacement] = rankDescription;
  }

  return finalRanksArray;
};

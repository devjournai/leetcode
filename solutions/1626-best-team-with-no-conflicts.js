/**
 * Best Team With No Conflicts
 * Intuition: After sorting by age then score, a conflict-free team is a nondecreasing-score subsequence. DP[i] = score[i] plus the best earlier DP[j] with score[j] ≤ score[i].
 * Approach: 1. Pair ages/scores and sort. 2. For each i, start DP[i]=score[i], then try all j < i with score[j] ≤ score[i]. 3. Track the global max DP value.
 * Dry Run: scores=[1,3,5,10], ages=[1,2,3,4] already sorted; DP builds 1,4,9,19 → 19.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var bestTeamScore = function (scoresInput, agesInput) {
  const playerRecordings = [];
  for (
    let currentParticipant = 0;
    currentParticipant < agesInput.length;
    currentParticipant++
  ) {
    playerRecordings.push({
      participantAge: agesInput[currentParticipant],
      participantScore: scoresInput[currentParticipant],
    });
  }

  playerRecordings.sort((firstEntry, secondEntry) => {
    if (firstEntry.participantAge !== secondEntry.participantAge) {
      return firstEntry.participantAge - secondEntry.participantAge;
    }
    return firstEntry.participantScore - secondEntry.participantScore;
  });

  const maximumScoresAtEachIndex = new Array(playerRecordings.length);
  for (
    let scoreTrackerIndex = 0;
    scoreTrackerIndex < playerRecordings.length;
    scoreTrackerIndex++
  ) {
    maximumScoresAtEachIndex[scoreTrackerIndex] = 0;
  }

  let overallMaximumTeamScore = 0;

  for (let mainIndex = 0; mainIndex < playerRecordings.length; mainIndex++) {
    maximumScoresAtEachIndex[mainIndex] =
      playerRecordings[mainIndex].participantScore;

    for (
      let comparisonIndex = 0;
      comparisonIndex < mainIndex;
      comparisonIndex++
    ) {
      if (
        playerRecordings[comparisonIndex].participantScore <=
        playerRecordings[mainIndex].participantScore
      ) {
        maximumScoresAtEachIndex[mainIndex] = Math.max(
          maximumScoresAtEachIndex[mainIndex],
          maximumScoresAtEachIndex[comparisonIndex] +
            playerRecordings[mainIndex].participantScore
        );
      }
    }
    overallMaximumTeamScore = Math.max(
      overallMaximumTeamScore,
      maximumScoresAtEachIndex[mainIndex]
    );
  }

  return overallMaximumTeamScore;
};

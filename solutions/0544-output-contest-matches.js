/**
 * Output Contest Matches
 * Time Complexity: O(N log N)
 * Space Complexity: O(N log N)
 */
var findContestMatch = function (n) {
  let initialTeams = Array.from({ length: n }, (_, teamIndex) =>
    (teamIndex + 1).toString(),
  );

  while (initialTeams.length > 1) {
    let pairingsForNextRound = [];
    let leftPointer = 0;
    let rightPointer = initialTeams.length - 1;

    while (leftPointer < rightPointer) {
      pairingsForNextRound.push(
        "(" +
          initialTeams[leftPointer] +
          "," +
          initialTeams[rightPointer] +
          ")",
      );
      leftPointer++;
      rightPointer--;
    }
    initialTeams = pairingsForNextRound;
  }

  return initialTeams[0];
};

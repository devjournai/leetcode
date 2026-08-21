/**
 * Output Contest Matches
 * Intuition: Strongest vs weakest pairing is first-vs-last in the current list. Nest those pair strings and repeat until one match string remains.
 * Approach: 1. Seed `initialTeams` as `"1".."n"`. 2. While more than one team string exists, pair `left` with `right` into `"(a,b)"` and shrink toward the center. 3. Replace the list with those pairings. 4. Return the single remaining string.
 * Dry Run: n = 4, teams ["1","2","3","4"].
 *   - Round: (1,4), (2,3).
 *   - Next: ((1,4),(2,3)). Return that string.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N log N)
 */
var findContestMatch = function (n) {
  let initialTeams = Array.from({ length: n }, (_, teamIndex) =>
    (teamIndex + 1).toString()
  );

  while (initialTeams.length > 1) {
    let pairingsForNextRound = [];
    let leftPointer = 0;
    let rightPointer = initialTeams.length - 1;

    while (leftPointer < rightPointer) {
      pairingsForNextRound.push(
        "(" + initialTeams[leftPointer] + "," + initialTeams[rightPointer] + ")"
      );
      leftPointer++;
      rightPointer--;
    }
    initialTeams = pairingsForNextRound;
  }

  return initialTeams[0];
};

/**
 * Dota2 Senate
 * Intuition: Senators act in index order; each bans the opposing party's next remaining senator. Queues of indices plus +n for the next round simulate that until one party is empty.
 * Approach: 1. Fill `radiantIndicesQueue` and `direIndicesQueue` from the string. 2. While both are non-empty, shift the earlier index; the winner is pushed as index+n. 3. Return "Radiant" if that queue still has members, else "Dire".
 * Dry Run: senate = "RD".
 *   - R at 0, D at 1. 0<1 so R bans D and R requeues at 2. Dire empty → "Radiant".
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var predictPartyVictory = function (senate) {
  const senateLength = senate.length;
  const radiantIndicesQueue = [];
  const direIndicesQueue = [];

  for (
    let currentSenatorPosition = 0;
    currentSenatorPosition < senateLength;
    currentSenatorPosition++
  ) {
    const partyIdentifier = senate[currentSenatorPosition];
    if (partyIdentifier === "R") {
      radiantIndicesQueue.push(currentSenatorPosition);
    } else {
      direIndicesQueue.push(currentSenatorPosition);
    }
  }

  let radiantPartyHasMembers = radiantIndicesQueue.length > 0;
  let direPartyHasMembers = direIndicesQueue.length > 0;

  while (radiantPartyHasMembers && direPartyHasMembers) {
    const radiantSenatorTurn = radiantIndicesQueue.shift();
    const direSenatorTurn = direIndicesQueue.shift();

    if (radiantSenatorTurn < direSenatorTurn) {
      radiantIndicesQueue.push(radiantSenatorTurn + senateLength);
    } else {
      direIndicesQueue.push(direSenatorTurn + senateLength);
    }

    radiantPartyHasMembers = radiantIndicesQueue.length > 0;
    direPartyHasMembers = direIndicesQueue.length > 0;
  }

  return radiantPartyHasMembers ? "Radiant" : "Dire";
};

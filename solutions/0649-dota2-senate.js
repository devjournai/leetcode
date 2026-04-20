/**
 * Dota2 Senate
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

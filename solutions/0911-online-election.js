/**
 * Online Election
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var TopVotedCandidate = function (personsInput, timesInput) {
  this.timeSequence = timesInput;
  this.leaderHistory = [];
  const voteTally = new Map();
  let highestVoteCount = 0;
  let presentLeader = 0;

  for (let k = 0; k < personsInput.length; k++) {
    const individualVotes = (voteTally.get(personsInput[k]) || 0) + 1;
    voteTally.set(personsInput[k], individualVotes);

    if (individualVotes >= highestVoteCount) {
      highestVoteCount = individualVotes;
      presentLeader = personsInput[k];
    }
    this.leaderHistory[k] = presentLeader;
  }
};

TopVotedCandidate.prototype.q = function (queryTime) {
  let searchStart = 0;
  let searchEnd = this.timeSequence.length;

  while (searchStart < searchEnd) {
    const midPoint = Math.floor((searchStart + searchEnd) / 2);
    if (this.timeSequence[midPoint] > queryTime) {
      searchEnd = midPoint;
    } else {
      searchStart = midPoint + 1;
    }
  }

  return this.leaderHistory[searchStart - 1];
};

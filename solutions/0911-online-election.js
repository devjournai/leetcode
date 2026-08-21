/**
 * Online Election
 * Intuition: After each vote the current leader is known (ties go to the latest voter). Queries ask for the leader at time t, so store that history and binary-search the last vote whose time is ≤ t.
 * Approach: 1. Keep `timeSequence` and build `leaderHistory`. 2. Walk votes: increment `voteTally`, and if the candidate’s count `>= highestVoteCount`, they become `presentLeader`. 3. Record the leader after vote k. 4. `q(queryTime)`: upper-bound binary search for the first time > queryTime; answer is `leaderHistory[searchStart - 1]`.
 * Dry Run: persons=[0,1,1,0], times=[0,5,10,15]. After votes: leaders [0,1,1,0]. q(3) → last time ≤3 is 0 → 0. q(12) → last ≤12 is 10 → 1. q(15) → 0.
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

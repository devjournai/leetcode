/**
 * Find The Town Judge
 * Intuition: The judge trusts nobody (`personOutDegree===0`) and is trusted by everyone else (`personInDegree===n-1`).
 * Approach: 1. Tally in/out degrees from `trust`. 2. Scan persons 1..n for the degree pair. 3. Return that id or -1.
 * Dry Run: n=2, trust=[[1,2]]. Person 2 has in 1 out 0. Return 2.
 * Time Complexity: O(N + T)
 * Space Complexity: O(N)
 */
var findJudge = function (n, trust) {
  const personInDegree = new Array(n + 1).fill(0);
  const personOutDegree = new Array(n + 1).fill(0);

  for (const trustRecord of trust) {
    const trusterIdentifier = trustRecord[0];
    const trustedRecipient = trustRecord[1];
    personOutDegree[trusterIdentifier]++;
    personInDegree[trustedRecipient]++;
  }

  for (let personCandidate = 1; personCandidate <= n; personCandidate++) {
    if (
      personOutDegree[personCandidate] === 0 &&
      personInDegree[personCandidate] === n - 1
    ) {
      return personCandidate;
    }
  }

  return -1;
};

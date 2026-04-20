/**
 * Find The Town Judge
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

/**
 * Kth Ancestor Of A Tree Node
 * Intuition: Binary lifting: ancestorLookup[node][j] is the 2^j-th parent. Queries walk the bits of k.
 * Approach: 1. Let highestPower = ceil(log2 n). 2. Fill level 0 from parent[]. 3. For j>=1, lookup[i][j] = lookup[ lookup[i][j-1] ][j-1] if defined. 4. getKthAncestor shifts k, jumping when the bit is set.
 * Dry Run: n=7, parent=[-1,0,0,1,1,2,2], getKthAncestor(3,1) then (5,2)
 *   - 3's 1st parent is 1
 *   - 5 -> 2 -> 0, 2nd ancestor is 0
 * Time Complexity: O(N log N)
 * Space Complexity: O(N log N)
 */
var TreeAncestor = function (n, parent) {
  let highestPower = 0;
  if (n > 0) {
    highestPower = Math.ceil(Math.log2(n));
  }

  this.ancestorLookup = Array.from({ length: n }, () =>
    new Array(highestPower + 1).fill(-1)
  );

  for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
    this.ancestorLookup[nodeIndex][0] = parent[nodeIndex];
  }

  for (let powerLevel = 1; powerLevel <= highestPower; powerLevel++) {
    for (let nodeIdentifier = 0; nodeIdentifier < n; nodeIdentifier++) {
      let intermediateAncestor =
        this.ancestorLookup[nodeIdentifier][powerLevel - 1];
      if (intermediateAncestor !== -1) {
        this.ancestorLookup[nodeIdentifier][powerLevel] =
          this.ancestorLookup[intermediateAncestor][powerLevel - 1];
      }
    }
  }
};

TreeAncestor.prototype.getKthAncestor = function (node, k) {
  let traversalNode = node;
  let currentPowerIndex = 0;

  while (k > 0 && traversalNode !== -1) {
    if (k & 1) {
      traversalNode = this.ancestorLookup[traversalNode][currentPowerIndex];
    }
    k >>= 1;
    currentPowerIndex++;
  }
  return traversalNode;
};

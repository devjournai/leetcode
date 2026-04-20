/**
 * Kth Ancestor Of A Tree Node
 * Time Complexity: O(N log N)
 * Space Complexity: O(N log N)
 */
var TreeAncestor = function (n, parent) {
  let highestPower = 0;
  if (n > 0) {
    highestPower = Math.ceil(Math.log2(n));
  }

  this.ancestorLookup = Array.from({ length: n }, () =>
    new Array(highestPower + 1).fill(-1),
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

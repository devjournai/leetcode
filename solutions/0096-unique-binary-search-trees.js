/**
 * Unique Binary Search Trees
 * Intuition: The count of BSTs on n keys is the Catalan number: for each possible root, left size i-1 times right size n-i, summed over i.
 * Approach: 1. catalan[0]=1. 2. For nodes=1..n, for root=1..nodes, add catalan[root-1]*catalan[nodes-root]. 3. Return catalan[n].
 * Dry Run: n=3 → catalan[1]=1, [2]=2, [3]=1*2 + 1*1 + 2*1 = 5
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var numTrees = function (n) {
  const catalanNumbers = new Array(n + 1).fill(0);

  catalanNumbers[0] = 1;

  for (let currentNodesCount = 1; currentNodesCount <= n; currentNodesCount++) {
    for (
      let rootIndexOption = 1;
      rootIndexOption <= currentNodesCount;
      rootIndexOption++
    ) {
      const leftSubtreeNodes = rootIndexOption - 1;
      const rightSubtreeNodes = currentNodesCount - rootIndexOption;
      catalanNumbers[currentNodesCount] +=
        catalanNumbers[leftSubtreeNodes] * catalanNumbers[rightSubtreeNodes];
    }
  }

  return catalanNumbers[n];
};

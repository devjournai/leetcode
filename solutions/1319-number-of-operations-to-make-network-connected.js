/**
 * Number Of Operations To Make Network Connected
 * Intuition: Need n-1 unions for one component. Extra edges inside a component are spare cables that can rewire remaining components.
 * Approach: 1. Union-find each connection; count merges vs redundant edges. 2. Need (components-1) cables. 3. Return that if spare cables suffice, else -1.
 * Dry Run: n=4, connections=[[0,1],[0,2],[1,2]]. One spare, two components after unions → 1 operation.
 * Time Complexity: O(N + M * α(N))
 * Space Complexity: O(N)
 */
var makeConnected = function (n, connections) {
  if (n <= 1) {
    return 0;
  }

  const unionParent = Array(n)
    .fill()
    .map((_value, index) => index);
  let componentCountTracker = n;
  let spareCableCount = 0;

  const findRoot = (nodeCurrent) => {
    if (unionParent[nodeCurrent] === nodeCurrent) {
      return nodeCurrent;
    }
    unionParent[nodeCurrent] = findRoot(unionParent[nodeCurrent]);
    return unionParent[nodeCurrent];
  };

  for (const [firstComputer, secondComputer] of connections) {
    const firstComputerRoot = findRoot(firstComputer);
    const secondComputerRoot = findRoot(secondComputer);

    if (firstComputerRoot !== secondComputerRoot) {
      unionParent[secondComputerRoot] = firstComputerRoot;
      componentCountTracker--;
    } else {
      spareCableCount++;
    }
  }

  const requiredConnections = componentCountTracker - 1;

  if (requiredConnections <= spareCableCount) {
    return requiredConnections;
  } else {
    return -1;
  }
};

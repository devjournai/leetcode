/**
 * Possible Bipartition
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var possibleBipartition = function (n, dislikesArr) {
  const adjacencyList = Array.from({ length: n + 1 }, () => []);
  dislikesArr.forEach(([personA, personB]) => {
    adjacencyList[personA].push(personB);
    adjacencyList[personB].push(personA);
  });

  const assignedGroups = new Array(n + 1).fill(0);

  const depthFirstSearchCheck = (nodeIdentifier, currentAssignment) => {
    assignedGroups[nodeIdentifier] = currentAssignment;

    for (const connectedNode of adjacencyList[nodeIdentifier]) {
      if (assignedGroups[connectedNode] === currentAssignment) {
        return false;
      }
      if (assignedGroups[connectedNode] === 0) {
        if (!depthFirstSearchCheck(connectedNode, -currentAssignment)) {
          return false;
        }
      }
    }
    return true;
  };

  for (let currentPersonId = 1; currentPersonId <= n; currentPersonId++) {
    if (assignedGroups[currentPersonId] === 0) {
      if (!depthFirstSearchCheck(currentPersonId, 1)) {
        return false;
      }
    }
  }

  return true;
};

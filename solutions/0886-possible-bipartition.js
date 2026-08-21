/**
 * Possible Bipartition
 * Intuition: Dislike edges form an undirected graph that must be 2-colored. DFS assigns group `1` or `-1` and fails if a neighbor already has the same group.
 * Approach: 1. Build `adjacencyList` for people 1..n. 2. `assignedGroups` starts at 0. 3. `depthFirstSearchCheck(node, assignment)` sets the group, rejects same-group neighbors, and recurses on uncolored neighbors with `-assignment`. 4. For each uncolored person, DFS with group 1; any false → false. Else true.
 * Dry Run: n = 4, dislikes = [[1,2],[1,3],[2,4]].
 *   - 1 gets group 1; 2 and 3 get -1; 4 gets 1. No conflicts → true.
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

/**
 * Graph Valid Tree
 * Intuition: An undirected graph is a tree iff it is connected and acyclic, equivalently n-1 edges and one component. Union-find detects a cycle (union of two nodes already in the same set) and then checks a single root plus edge count.
 * Approach: 1. Parent array of -1. 2. `find` with path compression. 3. `unite` fails if roots match. 4. Union every edge; fail on cycle. 5. Count parent==-1 roots; more than one → false. 6. Return whether `edges.length === nodeCount - 1`.
 * Dry Run: n=5, edges=[[0,1],[0,2],[0,3],[1,4]].
 *   - All unions succeed; one root; 4 edges = 5-1 → true. Extra [2,3] would fail unite.
 * Time Complexity: O(N + M * α(N))
 * Space Complexity: O(N)
 */
var validTree = function (nodeCount, edgeConnections) {
  const parentRegistry = new Array(nodeCount).fill(-1);

  const findSetRepresentative = (memberNode) => {
    if (parentRegistry[memberNode] === -1) {
      return memberNode;
    }
    parentRegistry[memberNode] = findSetRepresentative(
      parentRegistry[memberNode]
    );
    return parentRegistry[memberNode];
  };

  const uniteSets = (nodeA, nodeB) => {
    const rootA = findSetRepresentative(nodeA);
    const rootB = findSetRepresentative(nodeB);

    if (rootA === rootB) {
      return false;
    }

    parentRegistry[rootA] = rootB;
    return true;
  };

  for (const currentEdge of edgeConnections) {
    const firstVertex = currentEdge[0];
    const secondVertex = currentEdge[1];
    if (!uniteSets(firstVertex, secondVertex)) {
      return false;
    }
  }

  let rootComponentsCount = 0;
  for (
    let nodeIndexIdentifier = 0;
    nodeIndexIdentifier < nodeCount;
    nodeIndexIdentifier++
  ) {
    if (parentRegistry[nodeIndexIdentifier] === -1) {
      rootComponentsCount++;
    }
    if (rootComponentsCount > 1) {
      return false;
    }
  }

  return edgeConnections.length === nodeCount - 1;
};

/**
 * Graph Valid Tree
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
      parentRegistry[memberNode],
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

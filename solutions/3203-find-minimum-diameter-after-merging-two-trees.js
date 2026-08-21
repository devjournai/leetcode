/**
 * Find Minimum Diameter After Merging Two Trees
 * Intuition: After connecting the two trees, the new diameter is the max of each original diameter and the path that goes through the new edge. That path is radius1 + 1 + radius2, using ceil(diameter / 2) as each tree's radius from an optimal connection node.
 * Approach: 1. Build each tree and compute its diameter via a rooted max-depth DFS that tracks the two deepest child depths at every node. 2. Combined diameter = ceil(d1/2) + ceil(d2/2) + 1. 3. Answer is max(d1, d2, combined).
 * Dry Run:
 *   Tree1 is a path of 2 edges (diameter 2), tree2 is a single edge (diameter 1).
 *   Radii 1 and 1, combined = 1 + 1 + 1 = 3. max(2, 1, 3) = 3.
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
  const getDiameter = (edges) => {
    const nodeCount = edges.length + 1;
    const adjacencyList = Array.from({ length: nodeCount }, () => []);
    for (const [fromNode, toNode] of edges) {
      adjacencyList[fromNode].push(toNode);
      adjacencyList[toNode].push(fromNode);
    }

    let maximumDiameter = 0;

    const maxDepth = (currentNode, previousNode) => {
      let deepestChild = 0;
      let secondDeepestChild = 0;
      for (const neighborNode of adjacencyList[currentNode]) {
        if (neighborNode === previousNode) {
          continue;
        }
        const childDepth = maxDepth(neighborNode, currentNode);
        if (childDepth > deepestChild) {
          secondDeepestChild = deepestChild;
          deepestChild = childDepth;
        } else if (childDepth > secondDeepestChild) {
          secondDeepestChild = childDepth;
        }
      }
      maximumDiameter = Math.max(
        maximumDiameter,
        deepestChild + secondDeepestChild
      );
      return 1 + deepestChild;
    };

    maxDepth(0, -1);
    return maximumDiameter;
  };

  const diameter1 = getDiameter(edges1);
  const diameter2 = getDiameter(edges2);
  const combinedDiameter =
    Math.floor((diameter1 + 1) / 2) + Math.floor((diameter2 + 1) / 2) + 1;
  return Math.max(diameter1, diameter2, combinedDiameter);
};

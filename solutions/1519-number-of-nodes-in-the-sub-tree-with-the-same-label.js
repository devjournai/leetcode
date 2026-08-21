/**
 * Number Of Nodes In The Sub Tree With The Same Label
 * Intuition: DFS with a 26-count: the subtree answer for a node is how much its label increased while exploring that subtree.
 * Approach: 1. Build undirected adj. 2. DFS: record count[label] before children, increment, recurse, set ans[node]=count[label]-before. 3. Start at 0.
 * Dry Run: n=4, edges=[[0,1],[1,2],[0,3]], labels="abab".
 *   - node2 'a'→1, node1 'b'→1, node3 'b'→1, node0 'a'→2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countSubTrees = function (totalNodes, graphEdges, nodeLabels) {
  const nodeConnections = new Array(totalNodes);
  let adjacencyCreationIndex = 0;
  while (adjacencyCreationIndex < totalNodes) {
    nodeConnections[adjacencyCreationIndex] = [];
    adjacencyCreationIndex++;
  }

  const finalCounts = new Array(totalNodes).fill(0);

  let edgeIterationIndex = 0;
  while (edgeIterationIndex < graphEdges.length) {
    const currentEdge = graphEdges[edgeIterationIndex];
    const firstNode = currentEdge[0];
    const secondNode = currentEdge[1];
    nodeConnections[firstNode].push(secondNode);
    nodeConnections[secondNode].push(firstNode);
    edgeIterationIndex++;
  }

  function traverseSubtree(currentVertex, parentVertex, labelOccurrenceMap) {
    const currentVertexLabel = nodeLabels.charCodeAt(currentVertex) - 97;

    const countBeforeTraversal = labelOccurrenceMap[currentVertexLabel];

    labelOccurrenceMap[currentVertexLabel]++;

    let neighborIterationIndex = 0;
    const currentNeighbors = nodeConnections[currentVertex];
    while (neighborIterationIndex < currentNeighbors.length) {
      const neighborVertex = currentNeighbors[neighborIterationIndex];
      if (neighborVertex !== parentVertex) {
        traverseSubtree(neighborVertex, currentVertex, labelOccurrenceMap);
      }
      neighborIterationIndex++;
    }

    finalCounts[currentVertex] =
      labelOccurrenceMap[currentVertexLabel] - countBeforeTraversal;
  }

  traverseSubtree(0, -1, new Array(26).fill(0));

  return finalCounts;
};

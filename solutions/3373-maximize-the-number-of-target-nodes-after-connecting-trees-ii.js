/**
 * Maximize the Number of Target Nodes After Connecting Trees II
 * Intuition: After connecting the trees, a node is a target of `i` iff it is at even distance from `i`. Even/odd partitions are fixed in each tree. Connecting `i` to a tree2 node of chosen parity lets us take the larger of tree2's even or odd sets, plus tree1's same-parity set as `i`.
 * Approach: 1. Build both graphs. 2. DFS from 0 recording even/odd parity of each node and the even-count. 3. For node `i`, if it is even-parity from 0, it sees `even1` nodes in tree1; else `odd1`. 4. Add `max(even2, odd2)`. 5. Return the array.
 * Dry Run: both trees are single edges (2 nodes). even=1, odd=1, max tree2=1. Each node answers 1+1=2.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var maxTargetNodes = function (edges1, edges2) {
  const buildGraph = (edges) => {
    const graph = Array.from({ length: edges.length + 1 }, () => []);
    for (const [nodeU, nodeV] of edges) {
      graph[nodeU].push(nodeV);
      graph[nodeV].push(nodeU);
    }
    return graph;
  };

  const dfsEvenCount = (graph, node, parent, parity, isEven) => {
    let evenCount = isEven ? 1 : 0;
    parity[node] = isEven;
    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        evenCount += dfsEvenCount(graph, neighbor, node, parity, !isEven);
      }
    }
    return evenCount;
  };

  const nodeCount1 = edges1.length + 1;
  const nodeCount2 = edges2.length + 1;
  const graph1 = buildGraph(edges1);
  const graph2 = buildGraph(edges2);
  const parity1 = new Array(nodeCount1).fill(false);
  const parity2 = new Array(nodeCount2).fill(false);
  const even1 = dfsEvenCount(graph1, 0, -1, parity1, true);
  const even2 = dfsEvenCount(graph2, 0, -1, parity2, true);
  const odd1 = nodeCount1 - even1;
  const odd2 = nodeCount2 - even2;

  const answer = new Array(nodeCount1);
  for (let node = 0; node < nodeCount1; node++) {
    const tree1Targets = parity1[node] ? even1 : odd1;
    answer[node] = tree1Targets + Math.max(even2, odd2);
  }
  return answer;
};

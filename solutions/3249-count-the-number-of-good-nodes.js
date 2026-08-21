/**
 * Count the Number of Good Nodes
 * Intuition: A node is good when every child subtree has the same size (leaves have no children, so they are good). DFS can return subtree sizes while counting.
 * Approach: 1. Build an undirected adjacency list from the edges. 2. DFS from root 0, recording each child's subtree size. 3. If there are no children or all child sizes match, increment the good-node count. Return that count.
 * Dry Run: edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]. Subtrees of 1 and 2 each have two children of size 1, so 0, 1, 2 and all four leaves are good. Answer 7.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countGoodNodes = function (edges) {
  const nodeCount = edges.length + 1;
  const graph = Array.from({ length: nodeCount }, () => []);
  for (const [fromNode, toNode] of edges) {
    graph[fromNode].push(toNode);
    graph[toNode].push(fromNode);
  }

  let goodNodeCount = 0;

  const allChildSizesEqual = (childSizes) => {
    for (let index = 1; index < childSizes.length; index++) {
      if (childSizes[index] !== childSizes[0]) {
        return false;
      }
    }
    return true;
  };

  const subtreeSize = (node, parent) => {
    let size = 1;
    const childSizes = [];
    for (const neighbor of graph[node]) {
      if (neighbor === parent) {
        continue;
      }
      const childSize = subtreeSize(neighbor, node);
      size += childSize;
      childSizes.push(childSize);
    }
    if (childSizes.length === 0 || allChildSizesEqual(childSizes)) {
      goodNodeCount++;
    }
    return size;
  };

  subtreeSize(0, -1);
  return goodNodeCount;
};

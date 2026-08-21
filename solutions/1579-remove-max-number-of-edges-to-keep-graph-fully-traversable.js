/**
 * Remove Max Number Of Edges To Keep Graph Fully Traversable
 * Intuition: Prefer type-3 edges for both Alice and Bob, then exclusive edges; redundant unions can be deleted. Both must end with one component on nodes 1..n.
 * Approach: 1. Two UnionFinds. 2. Union type 3; count unused. 3. Union type 1 for Alice, type 2 for Bob. 4. If both graphs are connected, return removed else -1.
 * Dry Run: n = 4 with mixed type-3 and exclusive edges.
 *   - Keep a spanning pair of trees; leftover edges are removable.
 * Time Complexity: O(M * ╬▒(N))
 * Space Complexity: O(N)
 */
var maxNumEdgesToRemove = function (n, edges) {
  class UnionFind {
    constructor(initialSize) {
      this.parentIdentifiers = Array(initialSize)
        .fill()
        .map((_, i) => i);
      this.rankValues = Array(initialSize).fill(0);
      this.componentCount = initialSize;
    }

    findSet(elementNodeKey) {
      if (this.parentIdentifiers[elementNodeKey] !== elementNodeKey) {
        this.parentIdentifiers[elementNodeKey] = this.findSet(
          this.parentIdentifiers[elementNodeKey]
        );
      }
      return this.parentIdentifiers[elementNodeKey];
    }

    uniteElements(firstElement, secondElement) {
      const rootFirstElement = this.findSet(firstElement);
      const rootSecondElement = this.findSet(secondElement);

      if (rootFirstElement === rootSecondElement) {
        return false;
      }

      if (
        this.rankValues[rootFirstElement] < this.rankValues[rootSecondElement]
      ) {
        this.parentIdentifiers[rootFirstElement] = rootSecondElement;
      } else if (
        this.rankValues[rootFirstElement] > this.rankValues[rootSecondElement]
      ) {
        this.parentIdentifiers[rootSecondElement] = rootFirstElement;
      } else {
        this.parentIdentifiers[rootSecondElement] = rootFirstElement;
        this.rankValues[rootFirstElement]++;
      }
      this.componentCount--;
      return true;
    }
  }

  const aliceManager = new UnionFind(n + 1);
  const bobManager = new UnionFind(n + 1);
  let removedEdgesCount = 0;

  for (const edgeData of edges) {
    const edgeType = edgeData[0];
    const firstNodeIndex = edgeData[1];
    const secondNodeIndex = edgeData[2];

    if (edgeType === 3) {
      const aliceUnionResult = aliceManager.uniteElements(
        firstNodeIndex,
        secondNodeIndex
      );
      const bobUnionResult = bobManager.uniteElements(
        firstNodeIndex,
        secondNodeIndex
      );
      if (!aliceUnionResult && !bobUnionResult) {
        removedEdgesCount++;
      }
    }
  }

  for (const edgeInfo of edges) {
    const kindOfEdge = edgeInfo[0];
    const nodeA = edgeInfo[1];
    const nodeB = edgeInfo[2];

    if (kindOfEdge === 1) {
      if (!aliceManager.uniteElements(nodeA, nodeB)) {
        removedEdgesCount++;
      }
    } else if (kindOfEdge === 2) {
      if (!bobManager.uniteElements(nodeA, nodeB)) {
        removedEdgesCount++;
      }
    }
  }

  if (aliceManager.componentCount === 2 && bobManager.componentCount === 2) {
    return removedEdgesCount;
  } else {
    return -1;
  }
};

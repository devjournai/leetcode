/**
 * Minimum Runes to Add to Cast Spell
 * Intuition: Magic flows along directed edges. Crystals already power their strongly connected component and anything reachable from it. Each SCC with no crystal and no incoming edge from another SCC needs one extra rune.
 * Approach: 1. Build the graph and its reverse. 2. Kosaraju: DFS finish order, then DFS on the reverse graph to label SCCs (iterative to avoid stack overflow). 3. Mark SCCs that contain crystals and SCCs that have an incoming inter-SCC edge. 4. Count SCCs with neither.
 * Dry Run: n=4, crystals=[0], edges 0→1, 1→0, 2→3.
 *   - SCCs: {0,1} has crystal; {2} and {3}: {3} has incoming from {2}, {2} has none → add 1 rune.
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */

var minRunesToAdd = function (n, crystals, flowFrom, flowTo) {
  const graph = Array.from({ length: n }, () => []);
  const reversedGraph = Array.from({ length: n }, () => []);

  for (let edgeIndex = 0; edgeIndex < flowFrom.length; edgeIndex++) {
    graph[flowFrom[edgeIndex]].push(flowTo[edgeIndex]);
    reversedGraph[flowTo[edgeIndex]].push(flowFrom[edgeIndex]);
  }

  const visitedNodes = new Array(n).fill(false);
  const finishOrder = [];

  const recordFinishOrder = (startNode) => {
    const traversalStack = [[startNode, 0]];
    visitedNodes[startNode] = true;
    while (traversalStack.length > 0) {
      const frame = traversalStack[traversalStack.length - 1];
      const currentNode = frame[0];
      const neighborIndex = frame[1];
      if (neighborIndex < graph[currentNode].length) {
        frame[1]++;
        const neighborNode = graph[currentNode][neighborIndex];
        if (!visitedNodes[neighborNode]) {
          visitedNodes[neighborNode] = true;
          traversalStack.push([neighborNode, 0]);
        }
      } else {
        traversalStack.pop();
        finishOrder.push(currentNode);
      }
    }
  };

  for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
    if (!visitedNodes[nodeIndex]) {
      recordFinishOrder(nodeIndex);
    }
  }

  const componentIds = new Array(n).fill(-1);
  let componentCount = 0;

  const paintComponent = (startNode, componentId) => {
    const traversalStack = [startNode];
    componentIds[startNode] = componentId;
    while (traversalStack.length > 0) {
      const currentNode = traversalStack.pop();
      for (const neighborNode of reversedGraph[currentNode]) {
        if (componentIds[neighborNode] === -1) {
          componentIds[neighborNode] = componentId;
          traversalStack.push(neighborNode);
        }
      }
    }
  };

  for (let orderIndex = finishOrder.length - 1; orderIndex >= 0; orderIndex--) {
    const nodeIndex = finishOrder[orderIndex];
    if (componentIds[nodeIndex] === -1) {
      paintComponent(nodeIndex, componentCount);
      componentCount++;
    }
  }

  const hasCrystal = new Array(componentCount).fill(false);
  const hasIncomingFromOtherComponent = new Array(componentCount).fill(false);

  for (const crystalNode of crystals) {
    hasCrystal[componentIds[crystalNode]] = true;
  }

  for (let edgeIndex = 0; edgeIndex < flowFrom.length; edgeIndex++) {
    const fromComponent = componentIds[flowFrom[edgeIndex]];
    const toComponent = componentIds[flowTo[edgeIndex]];
    if (fromComponent !== toComponent) {
      hasIncomingFromOtherComponent[toComponent] = true;
    }
  }

  let runesToAdd = 0;
  for (
    let componentIndex = 0;
    componentIndex < componentCount;
    componentIndex++
  ) {
    if (
      !hasCrystal[componentIndex] &&
      !hasIncomingFromOtherComponent[componentIndex]
    ) {
      runesToAdd++;
    }
  }
  return runesToAdd;
};

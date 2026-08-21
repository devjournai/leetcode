/**
 * Frog Position After T Seconds
 * Intuition: The frog jumps uniformly to unvisited neighbors and stays put only on a leaf. DFS from vertex 1 multiplies 1/degree along the unique tree path and succeeds if we hit the target at time t, or earlier only if it is a leaf.
 * Approach: 1. Build an undirected adjacency list. 2. Recurse (node, parent, time, prob). 3. If time > t, return 0. 4. If at target, return prob when time==t or no further jumps; else 0. 5. Split probability among children and return the first positive path (there is at most one).
 * Dry Run: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 2, target = 4.
 *   - 1 has 3 children (prob 1/3 to 2), 2 has 2 unused children (1/2 to 4). At t=2 on 4: (1/3)*(1/2)=1/6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var frogPosition = function (n, edges, t, target) {
  const graphStructure = Array.from({ length: n + 1 }, () => []);

  for (const [nodeA, nodeB] of edges) {
    graphStructure[nodeA].push(nodeB);
    graphStructure[nodeB].push(nodeA);
  }

  function findPathProbability(
    currentLocation,
    previousLocation,
    elapsedSeconds,
    probabilityAccumulator
  ) {
    if (elapsedSeconds > t) {
      return 0;
    }

    const possibleNextMoves = graphStructure[currentLocation].filter(
      (nextVertex) => nextVertex !== previousLocation
    );
    const countPossibleJumps = possibleNextMoves.length;

    if (currentLocation === target) {
      if (elapsedSeconds === t || countPossibleJumps === 0) {
        return probabilityAccumulator;
      }
      return 0;
    }
    if (countPossibleJumps === 0) {
      return 0;
    }

    const nextStepProbability = probabilityAccumulator / countPossibleJumps;

    for (const nextHopNode of possibleNextMoves) {
      const pathResultProbability = findPathProbability(
        nextHopNode,
        currentLocation,
        elapsedSeconds + 1,
        nextStepProbability
      );
      if (pathResultProbability > 0) {
        return pathResultProbability;
      }
    }

    return 0;
  }

  return findPathProbability(1, 0, 0, 1);
};

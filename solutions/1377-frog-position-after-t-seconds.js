/**
 * Frog Position After T Seconds
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
    probabilityAccumulator,
  ) {
    if (elapsedSeconds > t) {
      return 0;
    }

    const possibleNextMoves = graphStructure[currentLocation].filter(
      (nextVertex) => nextVertex !== previousLocation,
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
        nextStepProbability,
      );
      if (pathResultProbability > 0) {
        return pathResultProbability;
      }
    }

    return 0;
  }

  return findPathProbability(1, 0, 0, 1);
};

/**
 * Check For Contradictions In Equations
 * Intuition: Equations relating variables can be modeled as a directed graph where variables are nodes and ratios are edge weights. A contradiction occurs if an equation states a ratio `X` between two variables, but existing paths in the graph already imply a different ratio `Y` between the same two variables.
 * Approach: 1. Initialize an adjacency list using a `Map` to represent the graph, storing `[neighbor, ratio]` pairs for each variable. 2. Iterate through each equation and its corresponding value. For each equation `[varA, varB]` and `valueV`: 3. Perform a Depth-First Search (DFS) on the *current* graph to find if a path exists from `varA` to `varB`. The DFS accumulates the product of ratios along the path. 4. If a path is found and its computed ratio `R` differs significantly from `valueV` (i.e., `Math.abs(R - valueV) >= 1e-5`), then a contradiction is detected, and `true` is returned. 5. If no path is found, or if the computed ratio `R` matches `valueV`, add bidirectional edges to the graph: `varA` to `varB` with weight `valueV`, and `varB` to `varA` with weight `1 / valueV`. 6. If all equations are processed without finding a contradiction, return `false`.
 * Dry Run: equations = [["a","b"], ["b","c"], ["a","c"]], values = [2.0, 3.0, 5.0]
 *   1. `variableAdjacencyMap = new Map()`.
 *   2. Process `equationIndex = 0`: `sourceIdentifier = "a"`, `targetIdentifier = "b"`, `observedValue = 2.0`.
 *      - Call `computeVariableRatio("a", "b", new Set(), 1.0)`. Graph is empty, returns `null`.
 *      - No contradiction.
 *      - Call `storeEquationEdges("a", "b", 2.0)`. `variableAdjacencyMap` becomes `{"a": [["b", 2.0]], "b": [["a", 0.5]]}`.
 *   3. Process `equationIndex = 1`: `sourceIdentifier = "b"`, `targetIdentifier = "c"`, `observedValue = 3.0`.
 *      - Call `computeVariableRatio("b", "c", new Set(), 1.0)`. Path not found (no "c" yet), returns `null`.
 *      - No contradiction.
 *      - Call `storeEquationEdges("b", "c", 3.0)`. `variableAdjacencyMap` becomes `{"a": [["b", 2.0]], "b": [["a", 0.5], ["c", 3.0]], "c": [["b", 0.3333]]}`.
 *   4. Process `equationIndex = 2`: `sourceIdentifier = "a"`, `targetIdentifier = "c"`, `observedValue = 5.0`.
 *      - Call `computeVariableRatio("a", "c", new Set(), 1.0)`.
 *        - `dfs("a", "c", {"a"}, 1.0)` -> explores `b`
 *        - `dfs("b", "c", {"a", "b"}, 1.0 * 2.0 = 2.0)` -> explores `c`
 *        - `dfs("c", "c", {"a", "b", "c"}, 2.0 * 3.0 = 6.0)` -> `originVariable === destinationVariable`, returns `6.0`.
 *      - `computedRatio = 6.0`.
 *      - `Math.abs(6.0 - 5.0) = 1.0`. `1.0 >= 1e-5` is true.
 *      - Contradiction detected. Return `true`.
 * Time Complexity: O(M * (V + E))
 * Space Complexity: O(V + E)
 */
var checkContradictions = function (equations, values) {
  const variableAdjacencyMap = new Map();

  function computeVariableRatio(
    originVariable,
    destinationVariable,
    pathVisitedNodes,
    currentProduct
  ) {
    if (originVariable === destinationVariable) {
      return currentProduct;
    }
    if (pathVisitedNodes.has(originVariable)) {
      return null;
    }

    pathVisitedNodes.add(originVariable);

    const neighborsList = variableAdjacencyMap.get(originVariable);
    if (neighborsList) {
      let neighborIndex = 0;
      while (neighborIndex < neighborsList.length) {
        const [nextNeighbor, nextRatio] = neighborsList[neighborIndex];
        const foundRatioFromPath = computeVariableRatio(
          nextNeighbor,
          destinationVariable,
          pathVisitedNodes,
          currentProduct * nextRatio
        );
        if (foundRatioFromPath !== null) {
          return foundRatioFromPath;
        }
        neighborIndex++;
      }
    }
    return null;
  }

  function storeEquationEdges(primaryVar, secondaryVar, equationVal) {
    if (!variableAdjacencyMap.has(primaryVar)) {
      variableAdjacencyMap.set(primaryVar, []);
    }
    if (!variableAdjacencyMap.has(secondaryVar)) {
      variableAdjacencyMap.set(secondaryVar, []);
    }
    variableAdjacencyMap.get(primaryVar).push([secondaryVar, equationVal]);
    variableAdjacencyMap.get(secondaryVar).push([primaryVar, 1 / equationVal]);
  }

  let equationIndex = 0;
  while (equationIndex < equations.length) {
    const currentEquation = equations[equationIndex];
    const sourceIdentifier = currentEquation[0];
    const targetIdentifier = currentEquation[1];
    const observedValue = values[equationIndex];

    const currentPathVisited = new Set();
    const computedRatio = computeVariableRatio(
      sourceIdentifier,
      targetIdentifier,
      currentPathVisited,
      1.0
    );

    const epsilonThreshold = 1e-5;
    if (computedRatio !== null) {
      const absoluteDifference = Math.abs(computedRatio - observedValue);
      if (absoluteDifference >= epsilonThreshold) {
        return true;
      }
    }

    storeEquationEdges(sourceIdentifier, targetIdentifier, observedValue);

    equationIndex++;
  }

  return false;
};

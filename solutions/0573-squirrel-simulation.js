/**
 * Squirrel Simulation
 * Intuition: Every nut still goes to the tree and back except the first nut, which the squirrel delivers (squirrel→nut→tree) instead of tree→nut→tree. Total is 2·Σ tree-nut minus the best saving (tree-nut − squirrel-nut).
 * Approach: 1. Manhattan helper. 2. For each nut add 2·dist(nut,tree) and track max of dist(tree,nut)−dist(squirrel,nut). 3. Return total − that max gain.
 * Dry Run: tree [2,2], squirrel [4,4], nuts [[3,0],[2,5]].
 *   - Both nuts contribute 2·tree distances; first-nut saving is larger toward [2,5]. Result 12.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minDistance = function (height, width, tree, squirrel, nuts) {
  const calculateManhattanDistance = (firstPoint, secondPoint) => {
    const firstCoordinateDifference = Math.abs(firstPoint[0] - secondPoint[0]);
    const secondCoordinateDifference = Math.abs(firstPoint[1] - secondPoint[1]);
    return firstCoordinateDifference + secondCoordinateDifference;
  };

  let overallPathDistance = 0;
  let maximalBenefit = -Infinity;

  const totalNutCount = nuts.length;

  for (let nutIterator = 0; nutIterator < totalNutCount; ++nutIterator) {
    const currentNutLocation = nuts[nutIterator];

    const distanceNutToTree = calculateManhattanDistance(
      currentNutLocation,
      tree
    );
    overallPathDistance += 2 * distanceNutToTree;

    const distanceSquirrelToNut = calculateManhattanDistance(
      squirrel,
      currentNutLocation
    );
    const currentIterationGain = distanceNutToTree - distanceSquirrelToNut;

    maximalBenefit = Math.max(maximalBenefit, currentIterationGain);
  }

  const resultDistance = overallPathDistance - maximalBenefit;
  return resultDistance;
};

/**
 * Squirrel Simulation
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
      tree,
    );
    overallPathDistance += 2 * distanceNutToTree;

    const distanceSquirrelToNut = calculateManhattanDistance(
      squirrel,
      currentNutLocation,
    );
    const currentIterationGain = distanceNutToTree - distanceSquirrelToNut;

    maximalBenefit = Math.max(maximalBenefit, currentIterationGain);
  }

  const resultDistance = overallPathDistance - maximalBenefit;
  return resultDistance;
};

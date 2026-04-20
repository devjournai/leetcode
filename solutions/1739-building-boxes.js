/**
 * Building Boxes
 * Time Complexity: O(n^(1/3))
 * Space Complexity: O(1)
 */
var minimumBoxes = function (n) {
  const getTriangularValue = (valueInput) => {
    return (valueInput * (valueInput + 1)) / 2;
  };

  let pyramidHeightCurrent = 0;
  let totalCubesInStructure = 0;

  while (true) {
    let nextLevelDimension = pyramidHeightCurrent + 1;
    let cubesForNextLevelBase = getTriangularValue(nextLevelDimension);

    if (totalCubesInStructure + cubesForNextLevelBase > n) {
      break;
    }

    totalCubesInStructure += cubesForNextLevelBase;
    pyramidHeightCurrent = nextLevelDimension;
  }

  let remainingCubesNeeded = n - totalCubesInStructure;
  let floorBoxesExisting = getTriangularValue(pyramidHeightCurrent);

  let additionalFloorBoxesCount = 0;
  if (remainingCubesNeeded > 0) {
    let floorDimensionApproximate =
      (-1 + Math.sqrt(1 + 8 * remainingCubesNeeded)) / 2;
    additionalFloorBoxesCount = Math.ceil(floorDimensionApproximate);
  }

  return floorBoxesExisting + additionalFloorBoxesCount;
};

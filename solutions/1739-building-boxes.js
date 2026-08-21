/**
 * Building Boxes
 * Intuition: A tight n-box pyramid on the floor uses triangular numbers of floor boxes. Fill complete pyramid levels first (level h uses T(h) boxes), then add the fewest extra floor boxes whose 1+2+…+k ≥ leftover cubes.
 * Approach: 1. Grow `pyramidHeightCurrent` while `totalCubes + T(h+1) ≤ n`. 2. `remainingCubesNeeded = n - total`. 3. Extra floor boxes = ceil((-1+sqrt(1+8*remaining))/2). 4. Return T(height) + extra.
 * Dry Run: n = 3
 * Level 1 uses 1 cube; leftover 2 need T(k)≥2 → k=2 extra floor; total floor 1+2=3.
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

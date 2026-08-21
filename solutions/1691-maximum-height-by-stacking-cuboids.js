/**
 * Maximum Height By Stacking Cuboids
 * Intuition: You may rotate each cuboid, so sort its three sides. After sorting cuboids lexicographically, stacking is LIS: cuboid j can sit on i if all three dimensions of i are ≤ those of j; height is the z-side.
 * Approach: 1. Sort each cuboid's dimensions; sort the list of cuboids. 2. `maximumStackHeights[i]` starts as cuboid i's height. 3. For each earlier cuboid that dominates on all axes, take `maxHeightFromPriorStack + processingCuboid[2]`. 4. Return `overallMaxHeightResult`.
 * Dry Run: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
 * Sorted dims then LIS: 12+20+53 = 85.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var maxHeight = function (cuboids) {
  const cuboidsWithIndividualDimensionsSorted = cuboids.map((inputCuboid) => {
    return inputCuboid.sort(
      (firstDimensionValue, secondDimensionValue) =>
        firstDimensionValue - secondDimensionValue
    );
  });

  cuboidsWithIndividualDimensionsSorted.sort((cubeEntryA, cubeEntryB) => {
    const primaryDimensionDifference = cubeEntryA[0] - cubeEntryB[0];
    if (primaryDimensionDifference !== 0) return primaryDimensionDifference;

    const secondaryDimensionDifference = cubeEntryA[1] - cubeEntryB[1];
    if (secondaryDimensionDifference !== 0) return secondaryDimensionDifference;

    const tertiaryDimensionDifference = cubeEntryA[2] - cubeEntryB[2];
    return tertiaryDimensionDifference;
  });

  const totalCuboidQuantity = cuboidsWithIndividualDimensionsSorted.length;
  const maximumStackHeights = new Array(totalCuboidQuantity).fill(0);
  let overallMaxHeightResult = 0;

  for (
    let currentCuboidIndex = 0;
    currentCuboidIndex < totalCuboidQuantity;
    currentCuboidIndex++
  ) {
    const processingCuboid =
      cuboidsWithIndividualDimensionsSorted[currentCuboidIndex];
    maximumStackHeights[currentCuboidIndex] = processingCuboid[2];

    let earlierCuboidIndex = 0;
    while (earlierCuboidIndex < currentCuboidIndex) {
      const priorCuboid =
        cuboidsWithIndividualDimensionsSorted[earlierCuboidIndex];
      const maxHeightFromPriorStack = maximumStackHeights[earlierCuboidIndex];

      if (
        priorCuboid[0] <= processingCuboid[0] &&
        priorCuboid[1] <= processingCuboid[1] &&
        priorCuboid[2] <= processingCuboid[2]
      ) {
        const candidateStackAddition =
          maxHeightFromPriorStack + processingCuboid[2];
        maximumStackHeights[currentCuboidIndex] = Math.max(
          maximumStackHeights[currentCuboidIndex],
          candidateStackAddition
        );
      }
      earlierCuboidIndex++;
    }
    overallMaxHeightResult = Math.max(
      overallMaxHeightResult,
      maximumStackHeights[currentCuboidIndex]
    );
  }

  return overallMaxHeightResult;
};

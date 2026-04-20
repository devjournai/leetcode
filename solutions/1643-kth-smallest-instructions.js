/**
 * Kth Smallest Instructions
 * Time Complexity: O((row + column) * column)
 * Space Complexity: O(row + column)
 */
var kthSmallestPath = function (destination, k) {
  let currentVerticalMoves = destination[0];
  let currentHorizontalMoves = destination[1];
  const totalPathLength = currentVerticalMoves + currentHorizontalMoves;
  let pathBuilder = "";

  for (let currentStep = 0; currentStep < totalPathLength; currentStep++) {
    if (currentHorizontalMoves === 0) {
      pathBuilder += "V";
      currentVerticalMoves--;
      continue;
    }

    const combinationsIfHorizontal = calculateCombinationsForPath(
      currentVerticalMoves + currentHorizontalMoves - 1,
      currentHorizontalMoves - 1,
    );

    if (k <= combinationsIfHorizontal) {
      pathBuilder += "H";
      currentHorizontalMoves--;
    } else {
      pathBuilder += "V";
      currentVerticalMoves--;
      k -= combinationsIfHorizontal;
    }
  }

  return pathBuilder;
};

const calculateCombinationsForPath = (totalItems, chooseItems) => {
  if (chooseItems < 0 || chooseItems > totalItems) {
    return 0;
  }

  let combinationResult = 1;
  for (
    let iterationCount = 1;
    iterationCount <= chooseItems;
    iterationCount++
  ) {
    combinationResult =
      (combinationResult * (totalItems - iterationCount + 1)) / iterationCount;
  }
  return Math.floor(combinationResult);
};

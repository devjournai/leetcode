/**
 * Kth Smallest Instructions
 * Intuition: Paths are strings of H and V. At each step, C(remaining-1, remainingH-1) paths start with H. If k is in that range, take H; otherwise take V and subtract that count.
 * Approach: 1. Need destination[0] V moves and destination[1] H moves. 2. For each position, if no H left, append V. 3. Else compare k to C(v+h-1, h-1); choose H or V accordingly. 4. Combinations computed iteratively to avoid overflow issues in the usual range.
 * Dry Run: destination=[2,3], k=3.
 *   - C(4,2)=6 ≥ 3 → H; C(3,1)=3 ≥ 3 → H; C(2,0)=1 < 3 → V (k=2); then V (k=1); last H → "HHVVH".
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
      currentHorizontalMoves - 1
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

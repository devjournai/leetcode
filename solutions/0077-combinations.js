/**
 * Combinations
 * Time Complexity: O(C(n, k) * k)
 * Space Complexity: O(C(n, k) * k)
 */
var combine = function (n, k) {
  const allCombinations = [];
  const currentSelection = [];
  const startValue = 1;

  function generateCombinations(
    upperBound,
    requiredSize,
    currentSelectionState,
    startingPoint,
  ) {
    if (currentSelectionState.length === requiredSize) {
      allCombinations.push([...currentSelectionState]);
      return;
    }

    for (
      let numberChoice = startingPoint;
      numberChoice <= upperBound;
      numberChoice++
    ) {
      currentSelectionState.push(numberChoice);
      generateCombinations(
        upperBound,
        requiredSize,
        currentSelectionState,
        numberChoice + 1,
      );
      currentSelectionState.pop();
    }
  }

  generateCombinations(n, k, currentSelection, startValue);
  return allCombinations;
};

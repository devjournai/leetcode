/**
 * Combinations
 * Intuition: Build each k-subset by always appending a number larger than the last choice so combinations stay in increasing order and are generated once.
 * Approach: 1. Recurse with a `startingPoint`. 2. When the current path has length k, snapshot it. 3. Otherwise loop `numberChoice` from start to n, push, recurse from numberChoice+1, then pop.
 * Dry Run: n=4, k=2 → paths [1,2],[1,3],[1,4],[2,3],[2,4],[3,4]
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
    startingPoint
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
        numberChoice + 1
      );
      currentSelectionState.pop();
    }
  }

  generateCombinations(n, k, currentSelection, startValue);
  return allCombinations;
};

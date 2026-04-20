/**
 * Combination Sum
 * Time Complexity: O(N^(T/M) * (T/M))
 * Space Complexity: O(T/M)
 */
var combinationSum = function (candidates, target) {
  const allCombinations = [];

  const findCombinations = (currentSum, startIndex, currentPath) => {
    if (currentSum === 0) {
      allCombinations.push([...currentPath]);
      return;
    }

    if (currentSum < 0) {
      return;
    }

    for (
      let loopIndex = startIndex;
      loopIndex < candidates.length;
      loopIndex++
    ) {
      const chosenCandidate = candidates[loopIndex];
      currentPath.push(chosenCandidate);
      findCombinations(currentSum - chosenCandidate, loopIndex, currentPath);
      currentPath.pop();
    }
  };

  findCombinations(target, 0, []);
  return allCombinations;
};

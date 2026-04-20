/**
 * Combination Sum III
 * Time Complexity: O(C(9, k) * k)
 * Space Complexity: O(k)
 */
var combinationSum3 = function (k, n) {
  const finalCombinations = [];

  function findCombinations(currentPath, currentSumValue, nextStartNumber) {
    if (currentSumValue > n) {
      return;
    }

    if (currentPath.length === k) {
      if (currentSumValue === n) {
        finalCombinations.push(currentPath);
      }
      return;
    }

    for (
      let numberCandidate = nextStartNumber;
      numberCandidate <= 9;
      numberCandidate++
    ) {
      findCombinations(
        [...currentPath, numberCandidate],
        currentSumValue + numberCandidate,
        numberCandidate + 1,
      );
    }
  }

  findCombinations([], 0, 1);

  return finalCombinations;
};

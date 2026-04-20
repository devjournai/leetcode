/**
 * Number Of Ways To Reorder Array To Get Same Bst
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var numOfWays = function (nums) {
  const modulusValue = BigInt(10 ** 9 + 7);
  const memoizedFactorials = Array(nums.length + 1).fill(null);
  memoizedFactorials[0] = 1n;

  const obtainFactorial = (numberToFactorialize) => {
    if (memoizedFactorials[numberToFactorialize] !== null) {
      return memoizedFactorials[numberToFactorialize];
    }
    const recursiveFactorial =
      numberToFactorialize * obtainFactorial(numberToFactorialize - 1n);
    memoizedFactorials[numberToFactorialize] = recursiveFactorial;
    return recursiveFactorial;
  };

  const calculateCombinations = (totalItems, itemsToChoose) => {
    const factorialOfTotal = obtainFactorial(totalItems);
    const factorialOfChosen = obtainFactorial(itemsToChoose);
    const factorialOfDifference = obtainFactorial(totalItems - itemsToChoose);
    const combinationCoefficient =
      factorialOfTotal / (factorialOfChosen * factorialOfDifference);
    return combinationCoefficient;
  };

  const calculatePermutationWays = (currentArray) => {
    if (currentArray.length < 3) {
      return 1n;
    }

    const currentRoot = currentArray[0];
    const leftElements = [];
    const rightElements = [];

    for (
      let elementIndex = 1;
      elementIndex < currentArray.length;
      elementIndex++
    ) {
      const currentElement = currentArray[elementIndex];
      if (currentElement < currentRoot) {
        leftElements.push(currentElement);
      } else {
        rightElements.push(currentElement);
      }
    }

    const waysForLeftSubtree = calculatePermutationWays(leftElements);
    const waysForRightSubtree = calculatePermutationWays(rightElements);

    const totalRemainingNodes = BigInt(currentArray.length - 1);
    const numLeftNodes = BigInt(leftElements.length);

    const combinationsValue = calculateCombinations(
      totalRemainingNodes,
      numLeftNodes,
    );

    const permutationResult =
      (combinationsValue * waysForLeftSubtree * waysForRightSubtree) %
      modulusValue;
    return permutationResult;
  };

  const waysResult = calculatePermutationWays(nums);
  return Number((waysResult - 1n + modulusValue) % modulusValue);
};

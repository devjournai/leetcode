/**
 * Sum of Distances
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var distance = function (nums) {
  const arrayLength = nums.length;
  const valueToIndicesMap = new Map();
  const finalDistances = new Array(arrayLength).fill(0);

  for (
    let elementIterator = 0;
    elementIterator < arrayLength;
    elementIterator++
  ) {
    const currentArrayValue = nums[elementIterator];
    if (!valueToIndicesMap.has(currentArrayValue)) {
      valueToIndicesMap.set(currentArrayValue, []);
    }
    const indicesListForValue = valueToIndicesMap.get(currentArrayValue);
    indicesListForValue.push(elementIterator);
  }

  for (const currentIndicesGroup of valueToIndicesMap.values()) {
    const currentGroupLength = currentIndicesGroup.length;
    if (currentGroupLength <= 1) {
      continue;
    }

    let runningSumOfAbsDifferences = 0;
    const firstGroupIndex = currentIndicesGroup[0];

    for (
      let initialSumCalculator = 1;
      initialSumCalculator < currentGroupLength;
      initialSumCalculator++
    ) {
      const indexedPosition = currentIndicesGroup[initialSumCalculator];
      runningSumOfAbsDifferences += indexedPosition - firstGroupIndex;
    }

    finalDistances[firstGroupIndex] = runningSumOfAbsDifferences;

    for (
      let sumUpdaterLoop = 1;
      sumUpdaterLoop < currentGroupLength;
      sumUpdaterLoop++
    ) {
      const currentPositionIndex = currentIndicesGroup[sumUpdaterLoop];
      const previousPositionIndex = currentIndicesGroup[sumUpdaterLoop - 1];
      const positionDifference = currentPositionIndex - previousPositionIndex;

      const leftCount = sumUpdaterLoop;
      const rightCount = currentGroupLength - sumUpdaterLoop;
      const updateMultiplier = leftCount - rightCount;

      runningSumOfAbsDifferences += positionDifference * updateMultiplier;
      finalDistances[currentPositionIndex] = runningSumOfAbsDifferences;
    }
  }

  return finalDistances;
};

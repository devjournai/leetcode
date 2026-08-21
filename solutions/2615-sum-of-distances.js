/**
 * Sum of Distances
 * Intuition: Distances only involve equal values. For a sorted list of indices, the sum of |pos - others| updates by a linear formula when moving to the next index.
 * Approach: 1. Group indices by value. 2. For each group, compute the sum of distances from the first index. 3. When moving from prev to curr, add (leftCount - rightCount) * gap.
 * Dry Run: nums = [1,3,1,1,2]. Value 1 at indices [0,2,3]. Sum at 0 is 2+3=5. Move to 2: gap=2, left=1, right=2, delta=(1-2)*2=-2, sum=3. Move to 3: gap=1, left=2, right=1, delta=1, sum=4.
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

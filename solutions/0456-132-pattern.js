/**
 * 132 Pattern
 * Intuition: For each middle value as the “3”, the left “1” is the prefix minimum and the “2” is some later value strictly between them. A Fenwick tree on compressed ranks counts how many remaining right values lie in that open interval.
 * Approach: 1. Length < 3 → false. 2. Compress unique values to ids. 3. Prefix mins in `minimumsBeforeCurrent`. 4. Insert all nums[1..] into the Fenwick tree. 5. For middle i, remove nums[i], query count of values in (minLeft, nums[i]); if > 0 return true.
 * Dry Run: [3,1,4,2]. Prefix min before 4 is 1. After removing 4, tree still has 2, which is in (1,4). Return true.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var find132pattern = function (nums) {
  const numberCount = nums.length;
  if (numberCount < 3) {
    return false;
  }

  class FenwickTree {
    constructor(sizeOfTree) {
      this.treeStructure = new Array(sizeOfTree + 1).fill(0);
      this.maximumValue = sizeOfTree;
    }

    updateValue(treeIndex, deltaChange) {
      let currentIdx = treeIndex;
      while (currentIdx <= this.maximumValue) {
        this.treeStructure[currentIdx] += deltaChange;
        currentIdx += currentIdx & -currentIdx;
      }
    }

    querySum(treeIndex) {
      let totalSum = 0;
      let currentIdx = treeIndex;
      while (currentIdx > 0) {
        totalSum += this.treeStructure[currentIdx];
        currentIdx -= currentIdx & -currentIdx;
      }
      return totalSum;
    }
  }

  const uniqueValuesSet = new Set(nums);
  const sortedUniqueValues = Array.from(uniqueValuesSet).sort(
    (valA, valB) => valA - valB
  );
  const valueToIdMap = new Map();
  sortedUniqueValues.forEach((uniqueVal, compressionId) =>
    valueToIdMap.set(uniqueVal, compressionId)
  );
  const compressedMaximumId = sortedUniqueValues.length;

  const minimumsBeforeCurrent = new Array(numberCount);
  minimumsBeforeCurrent[0] = nums[0];
  for (
    let currentLeftIndex = 1;
    currentLeftIndex < numberCount;
    currentLeftIndex++
  ) {
    minimumsBeforeCurrent[currentLeftIndex] = Math.min(
      minimumsBeforeCurrent[currentLeftIndex - 1],
      nums[currentLeftIndex]
    );
  }

  const fenwickTreeInstance = new FenwickTree(compressedMaximumId);
  for (
    let currentRightIndex = 1;
    currentRightIndex < numberCount;
    currentRightIndex++
  ) {
    fenwickTreeInstance.updateValue(
      valueToIdMap.get(nums[currentRightIndex]) + 1,
      1
    );
  }

  for (
    let middleElementIndex = 1;
    middleElementIndex < numberCount - 1;
    middleElementIndex++
  ) {
    const firstElementValue = minimumsBeforeCurrent[middleElementIndex - 1];
    const thirdElementValue = nums[middleElementIndex];

    fenwickTreeInstance.updateValue(
      valueToIdMap.get(thirdElementValue) + 1,
      -1
    );

    if (firstElementValue < thirdElementValue) {
      const firstCompressedId = valueToIdMap.get(firstElementValue);
      const thirdCompressedId = valueToIdMap.get(thirdElementValue);

      const queryResult =
        fenwickTreeInstance.querySum(thirdCompressedId) -
        fenwickTreeInstance.querySum(firstCompressedId + 1);

      if (queryResult > 0) {
        return true;
      }
    }
  }

  return false;
};

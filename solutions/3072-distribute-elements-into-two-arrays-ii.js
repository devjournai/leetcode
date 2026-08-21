/**
 * Distribute Elements Into Two Arrays II
 * Intuition: greaterCount is the number of already-placed values strictly larger than the candidate. Two Fenwick trees on compressed ranks track frequencies so each greaterCount is a prefix-sum query.
 * Approach: 1. Rank-compress unique values. 2. Seed arr1 with nums[0] and arr2 with nums[1], updating both trees. 3. For each later value, compare greaterCount(arr1) and greaterCount(arr2). 4. Append to the array with the larger count; on a tie, append to the shorter array, then to arr1. 5. Return arr1 concatenated with arr2.
 * Dry Run: nums = [2, 1, 3, 3]. arr1 = [2], arr2 = [1]. For 3, greaterCount1 = 0, greaterCount2 = 0, lengths 1=1 so arr1 gets 3 -> [2, 3]. Next 3: greaterCount1 = 0, greaterCount2 = 0, arr1 longer so arr2 gets 3. Result [2, 3, 1, 3].
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var resultArray = function (nums) {
  const ranks = getRanks(nums);
  const firstArray = [];
  const secondArray = [];
  const firstTree = createFenwickTree(ranks.size);
  const secondTree = createFenwickTree(ranks.size);

  appendValue(nums[0], firstArray, firstTree, ranks);
  appendValue(nums[1], secondArray, secondTree, ranks);

  for (let elementIndex = 2; elementIndex < nums.length; elementIndex++) {
    const currentValue = nums[elementIndex];
    const currentRank = ranks.get(currentValue);
    const greaterCountFirst = firstArray.length - firstTree.get(currentRank);
    const greaterCountSecond = secondArray.length - secondTree.get(currentRank);

    if (greaterCountFirst > greaterCountSecond) {
      appendValue(currentValue, firstArray, firstTree, ranks);
    } else if (greaterCountFirst < greaterCountSecond) {
      appendValue(currentValue, secondArray, secondTree, ranks);
    } else if (firstArray.length > secondArray.length) {
      appendValue(currentValue, secondArray, secondTree, ranks);
    } else {
      appendValue(currentValue, firstArray, firstTree, ranks);
    }
  }

  return firstArray.concat(secondArray);
};

function getRanks(nums) {
  const uniqueSortedValues = [...new Set(nums)].sort(
    (leftValue, rightValue) => leftValue - rightValue
  );
  const ranks = new Map();
  for (let rank = 0; rank < uniqueSortedValues.length; rank++) {
    ranks.set(uniqueSortedValues[rank], rank + 1);
  }
  return ranks;
}

function appendValue(value, destinationArray, fenwickTree, ranks) {
  destinationArray.push(value);
  fenwickTree.add(ranks.get(value), 1);
}

function createFenwickTree(size) {
  const sums = new Array(size + 1).fill(0);

  return {
    add(index, delta) {
      while (index < sums.length) {
        sums[index] += delta;
        index += index & -index;
      }
    },
    get(index) {
      let prefixSum = 0;
      while (index > 0) {
        prefixSum += sums[index];
        index -= index & -index;
      }
      return prefixSum;
    },
  };
}

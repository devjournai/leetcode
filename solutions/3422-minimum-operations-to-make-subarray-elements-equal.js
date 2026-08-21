/**
 * Minimum Operations to Make Subarray Elements Equal
 * Intuition: For a window of size k the L1-optimal target is a median. Maintain counts/sums on compressed values with Fenwick trees so each slide updates in log U and we can query the kth value and prefix sums.
 * Approach: 1. Rank unique numbers. 2. Fenwick trees for frequency and value-sum. 3. Cost = leftCount*median - leftSum + rightSum - rightCount*median. 4. Slide the window and take the min cost.
 * Dry Run: nums = [1,3,2,4], k=2. Windows [1,3] cost 2, [3,2] cost 1, [2,4] cost 2 → 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var minOperations = function (nums, k) {
  const uniqueValues = [...new Set(nums)].sort((left, right) => left - right);
  const rankByValue = new Map();
  uniqueValues.forEach((value, index) => {
    rankByValue.set(value, index + 1);
  });
  const treeSize = uniqueValues.length + 2;
  const frequencyTree = new Array(treeSize).fill(0);
  const valueSumTree = new Array(treeSize).fill(0);

  const addFenwick = (tree, index, delta) => {
    for (
      let position = index;
      position < tree.length;
      position += position & -position
    ) {
      tree[position] += delta;
    }
  };

  const queryFenwick = (tree, index) => {
    let total = 0;
    for (let position = index; position > 0; position -= position & -position) {
      total += tree[position];
    }
    return total;
  };

  const insertValue = (value) => {
    const rank = rankByValue.get(value);
    addFenwick(frequencyTree, rank, 1);
    addFenwick(valueSumTree, rank, value);
  };

  const eraseValue = (value) => {
    const rank = rankByValue.get(value);
    addFenwick(frequencyTree, rank, -1);
    addFenwick(valueSumTree, rank, -value);
  };

  const kthRank = (order) => {
    let index = 0;
    let remaining = order;
    for (let bit = 1 << 20; bit > 0; bit >>= 1) {
      const nextIndex = index + bit;
      if (
        nextIndex < frequencyTree.length &&
        frequencyTree[nextIndex] < remaining
      ) {
        remaining -= frequencyTree[nextIndex];
        index = nextIndex;
      }
    }
    return index + 1;
  };

  const windowCost = () => {
    const medianRank = kthRank((k + 1) >> 1);
    const medianValue = uniqueValues[medianRank - 1];
    const leftCount = queryFenwick(frequencyTree, medianRank - 1);
    const leftSum = queryFenwick(valueSumTree, medianRank - 1);
    const medianCount = queryFenwick(frequencyTree, medianRank) - leftCount;
    const totalSum = queryFenwick(valueSumTree, uniqueValues.length);
    const rightSum = totalSum - leftSum - medianValue * medianCount;
    const rightCount = k - leftCount - medianCount;
    return (
      leftCount * medianValue - leftSum + rightSum - rightCount * medianValue
    );
  };

  for (let index = 0; index < k; index++) {
    insertValue(nums[index]);
  }

  let minimumCost = windowCost();
  for (let index = k; index < nums.length; index++) {
    eraseValue(nums[index - k]);
    insertValue(nums[index]);
    minimumCost = Math.min(minimumCost, windowCost());
  }

  return minimumCost;
};

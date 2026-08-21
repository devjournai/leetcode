/**
 * Maximum Sum Of Subsequence With Non-Adjacent Elements
 * Intuition: After each point update the answer is the maximum house-robber subsequence of the whole array. A segment tree stores four states for each range: whether the leftmost and rightmost elements are taken, so adjacent-range merges never pick two touching ends together.
 * Approach: 1. Each leaf is [[0, -inf], [-inf, value]]. 2. Merge left and right by max of (left[l][0]+right[0][r], left[l][0]+right[1][r], left[l][1]+right[0][r]). 3. For every query update the position and add max of the four root states modulo 1e9+7.
 * Dry Run:
 *   nums = [3,5,9], queries update values; each query recomputes the global non-adjacent max.
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N)
 */
var maximumSumSubsequence = function (nums, queries) {
  const MOD = 1000000007;
  const NEG_INF = -1000000000;
  const arrayLength = nums.length;
  const treeSize = 4 * arrayLength;
  const rangeStates = new Array(treeSize);

  const makeLeaf = (value) => [
    [0, NEG_INF],
    [NEG_INF, value],
  ];

  const mergeStates = (leftState, rightState) => {
    const merged = [
      [0, 0],
      [0, 0],
    ];
    for (let leftTaken = 0; leftTaken < 2; leftTaken++) {
      for (let rightTaken = 0; rightTaken < 2; rightTaken++) {
        merged[leftTaken][rightTaken] = Math.max(
          leftState[leftTaken][0] + rightState[0][rightTaken],
          leftState[leftTaken][0] + rightState[1][rightTaken],
          leftState[leftTaken][1] + rightState[0][rightTaken]
        );
      }
    }
    return merged;
  };

  const buildTree = (treeIndex, rangeLeft, rangeRight) => {
    if (rangeLeft === rangeRight) {
      rangeStates[treeIndex] = makeLeaf(nums[rangeLeft]);
      return;
    }
    const rangeMid = Math.floor((rangeLeft + rangeRight) / 2);
    buildTree(treeIndex * 2 + 1, rangeLeft, rangeMid);
    buildTree(treeIndex * 2 + 2, rangeMid + 1, rangeRight);
    rangeStates[treeIndex] = mergeStates(
      rangeStates[treeIndex * 2 + 1],
      rangeStates[treeIndex * 2 + 2]
    );
  };

  const updateTree = (
    treeIndex,
    rangeLeft,
    rangeRight,
    updateIndex,
    newValue
  ) => {
    if (rangeLeft === rangeRight) {
      rangeStates[treeIndex] = makeLeaf(newValue);
      return;
    }
    const rangeMid = Math.floor((rangeLeft + rangeRight) / 2);
    if (updateIndex <= rangeMid) {
      updateTree(treeIndex * 2 + 1, rangeLeft, rangeMid, updateIndex, newValue);
    } else {
      updateTree(
        treeIndex * 2 + 2,
        rangeMid + 1,
        rangeRight,
        updateIndex,
        newValue
      );
    }
    rangeStates[treeIndex] = mergeStates(
      rangeStates[treeIndex * 2 + 1],
      rangeStates[treeIndex * 2 + 2]
    );
  };

  buildTree(0, 0, arrayLength - 1);
  let totalAnswer = 0;
  for (const [updateIndex, newValue] of queries) {
    updateTree(0, 0, arrayLength - 1, updateIndex, newValue);
    const rootState = rangeStates[0];
    const bestSubsequence = Math.max(
      rootState[0][0],
      rootState[0][1],
      rootState[1][0],
      rootState[1][1]
    );
    totalAnswer = (totalAnswer + Math.max(0, bestSubsequence)) % MOD;
  }
  return totalAnswer;
};

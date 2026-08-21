/**
 * Threshold Majority Queries
 * Intuition: Mo's algorithm maintains frequencies while the [l,r] window slides. The answer is the min value among those with maximum frequency, if that frequency ≥ threshold.
 * Approach: 1. Compress values. 2. Segment tree over compressed ids storing (max freq, min value). 3. Sort queries in Hilbert/Mo order. 4. Add/remove points in O(log U) and read the tree root.
 * Dry Run: nums=[1,1,2,2,1,1], query [0,5,4] → 1 appears 4 times.
 * Time Complexity: O((n + q) sqrt(n) log n)
 * Space Complexity: O(n)
 */
var subarrayMajority = function (nums, queries) {
  const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
  const valueIndex = new Map(unique.map((value, index) => [value, index]));
  const uniqueCount = unique.length;

  let treeSize = 1;
  while (treeSize < uniqueCount) {
    treeSize *= 2;
  }
  const maxFreq = Array(treeSize * 2).fill(0);
  const bestValue = Array(treeSize * 2).fill(Infinity);

  const pull = (node) => {
    const left = node * 2;
    const right = left + 1;
    if (
      maxFreq[left] > maxFreq[right] ||
      (maxFreq[left] === maxFreq[right] && bestValue[left] < bestValue[right])
    ) {
      maxFreq[node] = maxFreq[left];
      bestValue[node] = bestValue[left];
    } else {
      maxFreq[node] = maxFreq[right];
      bestValue[node] = bestValue[right];
    }
  };

  const freqOf = Array(uniqueCount).fill(0);

  const setLeaf = (compressed, frequency) => {
    let node = compressed + treeSize;
    maxFreq[node] = frequency;
    bestValue[node] = frequency === 0 ? Infinity : unique[compressed];
    node >>= 1;
    while (node) {
      pull(node);
      node >>= 1;
    }
  };

  const addIndex = (index) => {
    const compressed = valueIndex.get(nums[index]);
    freqOf[compressed]++;
    setLeaf(compressed, freqOf[compressed]);
  };

  const removeIndex = (index) => {
    const compressed = valueIndex.get(nums[index]);
    freqOf[compressed]--;
    setLeaf(compressed, freqOf[compressed]);
  };

  const answers = Array(queries.length).fill(-1);
  const blockSize = Math.floor(Math.sqrt(nums.length)) + 1;
  const order = queries.map((_, index) => index);
  order.sort((a, b) => {
    const blockA = Math.floor(queries[a][0] / blockSize);
    const blockB = Math.floor(queries[b][0] / blockSize);
    if (blockA !== blockB) {
      return blockA - blockB;
    }
    return blockA % 2 === 0
      ? queries[a][1] - queries[b][1]
      : queries[b][1] - queries[a][1];
  });

  let left = 0;
  let right = -1;
  for (const queryIndex of order) {
    const [queryLeft, queryRight, threshold] = queries[queryIndex];
    while (left > queryLeft) {
      left--;
      addIndex(left);
    }
    while (right < queryRight) {
      right++;
      addIndex(right);
    }
    while (left < queryLeft) {
      removeIndex(left);
      left++;
    }
    while (right > queryRight) {
      removeIndex(right);
      right--;
    }
    answers[queryIndex] = maxFreq[1] >= threshold ? bestValue[1] : -1;
  }

  return answers;
};

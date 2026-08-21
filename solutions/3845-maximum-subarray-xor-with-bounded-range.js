/**
 * Maximum Subarray XOR with Bounded Range
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: nums = [5,4,5,6], k = 2 => Output: 7
 * Time Complexity: O(N * 15)
 * Space Complexity: O(N)
 */
var maxXor = function (nums, k) {
  class TrieNode {
    constructor() {
      this.children = [null, null];
      this.count = 0;
    }
  }
  const root = new TrieNode();
  const updateTrie = (value, delta) => {
    let current = root;
    for (let bit = 14; bit >= 0; bit--) {
      const currentBit = (value >> bit) & 1;
      if (!current.children[currentBit])
        current.children[currentBit] = new TrieNode();
      current = current.children[currentBit];
      current.count += delta;
    }
  };
  const getMaxXor = (value) => {
    let current = root;
    let maxXor = 0;
    for (let bit = 14; bit >= 0; bit--) {
      const currentBit = (value >> bit) & 1;
      const oppositeBit = 1 - currentBit;
      if (
        current.children[oppositeBit] &&
        current.children[oppositeBit].count > 0
      ) {
        maxXor |= 1 << bit;
        current = current.children[oppositeBit];
      } else {
        current = current.children[currentBit];
      }
    }
    return maxXor;
  };
  const n = nums.length;
  const prefixXor = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefixXor[i + 1] = prefixXor[i] ^ nums[i];
  const maxDeque = [];
  const minDeque = [];
  let left = 0;
  let result = 0;
  updateTrie(prefixXor[0], 1);
  for (let right = 0; right < n; right++) {
    while (
      maxDeque.length &&
      nums[maxDeque[maxDeque.length - 1]] <= nums[right]
    )
      maxDeque.pop();
    while (
      minDeque.length &&
      nums[minDeque[minDeque.length - 1]] >= nums[right]
    )
      minDeque.pop();
    maxDeque.push(right);
    minDeque.push(right);
    while (nums[maxDeque[0]] - nums[minDeque[0]] > k) {
      if (maxDeque[0] === left) maxDeque.shift();
      if (minDeque[0] === left) minDeque.shift();
      updateTrie(prefixXor[left], -1);
      left++;
    }
    result = Math.max(result, getMaxXor(prefixXor[right + 1]));
    updateTrie(prefixXor[right + 1], 1);
  }
  return result;
};

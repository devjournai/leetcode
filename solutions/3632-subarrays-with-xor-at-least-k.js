/**
 * Subarrays with XOR at Least K
 * Intuition: Prefix XOR p[r]^p[l-1] is the subarray XOR. A binary trie of previous prefixes counts how many p satisfy p^current >= k.
 * Approach: 1. Insert 0. 2. For each num, current ^= num, query trie for prefixes giving XOR>=k, then insert current.
 * Dry Run: nums=[3,1,2,3], k=2. Six prefixes pair to XOR>=2.
 * Time Complexity: O(n log A)
 * Space Complexity: O(n log A)
 */
var countXorSubarrays = function (nums, k) {
  const maxValue = Math.max(k, 1, ...nums);
  const bitLength = maxValue.toString(2).length;
  const leftChild = [-1];
  const rightChild = [-1];
  const counts = [0];

  const newNode = () => {
    leftChild.push(-1);
    rightChild.push(-1);
    counts.push(0);
    return leftChild.length - 1;
  };

  const insert = (value) => {
    let node = 0;
    counts[0]++;
    for (let bit = bitLength - 1; bit >= 0; bit--) {
      const bitValue = (value >> bit) & 1;
      if (bitValue === 0) {
        if (leftChild[node] === -1) {
          leftChild[node] = newNode();
        }
        node = leftChild[node];
      } else {
        if (rightChild[node] === -1) {
          rightChild[node] = newNode();
        }
        node = rightChild[node];
      }
      counts[node]++;
    }
  };

  const queryAtLeast = (prefix, target) => {
    let node = 0;
    let total = 0;
    for (let bit = bitLength - 1; bit >= 0; bit--) {
      if (node === -1) {
        return total;
      }
      const prefixBit = (prefix >> bit) & 1;
      const targetBit = (target >> bit) & 1;
      if (targetBit === 0) {
        const highChild = prefixBit === 0 ? rightChild[node] : leftChild[node];
        if (highChild !== -1) {
          total += counts[highChild];
        }
        node = prefixBit === 0 ? leftChild[node] : rightChild[node];
      } else {
        node = prefixBit === 0 ? rightChild[node] : leftChild[node];
      }
    }
    if (node !== -1) {
      total += counts[node];
    }
    return total;
  };

  insert(0);
  let prefix = 0;
  let answer = 0;
  for (const value of nums) {
    prefix ^= value;
    answer += queryAtLeast(prefix, k);
    insert(prefix);
  }
  return answer;
};

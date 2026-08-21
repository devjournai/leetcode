/**
 * Find the K-th Character in String Game II
 * Intuition: After t operations the string length is 2^t. Position k in the right half came from k - 2^{t-1} in the left half, plus one extra increment if that operation was type 1.
 * Approach: 1. Let operationsCount = ceil(log2(k)). 2. Walk operations from last to first. 3. If k is in the right half, subtract halfSize and add operations[i] to the increment total. 4. Return 'a' + increases % 26.
 * Dry Run: k = 10, operations = [0,1,0,1]
 *   - 10 is in a right half twice with type-1 ops contributing 2 increments → 'c'
 * Time Complexity: O(log k)
 * Space Complexity: O(1)
 */
var kthCharacter = function (k, operations) {
  const operationsCount = Math.ceil(Math.log2(k));
  let increases = 0;

  for (let i = operationsCount - 1; i >= 0; i--) {
    const halfSize = 2 ** i;
    if (k > halfSize) {
      k -= halfSize;
      increases += operations[i];
    }
  }

  return String.fromCharCode(97 + (increases % 26));
};

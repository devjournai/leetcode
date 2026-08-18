/**
 * Minimum Number Of Operations To Make Word K-Periodic
 * Intuition: A k-periodic word is made of identical blocks of length k. We should replace every other block with the most frequent block, so operations = (n/k) - maxFrequency.
 * Approach: 1. Split word into n/k chunks of length k. 2. Count frequencies. 3. Return chunkCount - maxFrequency.
 * Dry Run:
 *   word = "leetcodeleet", k = 4 chunks "leet","code","leet". max freq 2, operations 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumOperationsToMakeKPeriodic = function (word, k) {
  const chunkFrequency = new Map();
  let maxFrequency = 0;
  const chunkCount = word.length / k;
  for (let startIndex = 0; startIndex < word.length; startIndex += k) {
    const chunk = word.slice(startIndex, startIndex + k);
    const nextFrequency = (chunkFrequency.get(chunk) || 0) + 1;
    chunkFrequency.set(chunk, nextFrequency);
    maxFrequency = Math.max(maxFrequency, nextFrequency);
  }
  return chunkCount - maxFrequency;
};

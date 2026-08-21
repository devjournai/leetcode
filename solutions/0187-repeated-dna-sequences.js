/**
 * Repeated Dna Sequences
 * Intuition: Every 10-letter window is a candidate. A set of seen windows plus a set of repeats records a sequence the second time it appears without listing it twice.
 * Approach: 1. If length < 10, return []. 2. Slide windows of length 10. 3. If the substring is already in discovered, add it to repeating. 4. Always add it to discovered. 5. Return the repeating set as an array.
 * Dry Run: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT" (first two "AAAAACCCCC").
 *   - First "AAAAACCCCC" → discovered only.
 *   - Later same window → add to repeating. Output includes "AAAAACCCCC".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findRepeatedDnaSequences = function (s) {
  const dnaSequenceLength = 10;
  if (s.length < dnaSequenceLength) {
    return [];
  }

  const discoveredSequences = new Set();
  const repeatingSequences = new Set();

  for (
    let currentPosition = 0;
    currentPosition <= s.length - dnaSequenceLength;
    currentPosition++
  ) {
    const currentDnaSegment = s.substring(
      currentPosition,
      currentPosition + dnaSequenceLength
    );

    if (discoveredSequences.has(currentDnaSegment)) {
      repeatingSequences.add(currentDnaSegment);
    }
    discoveredSequences.add(currentDnaSegment);
  }

  return [...repeatingSequences];
};

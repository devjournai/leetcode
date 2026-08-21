/**
 * Longer Contiguous Segments Of Ones Than Zeros
 * Intuition: Track current and best runs of 1s and 0s in one pass; compare the two maxima.
 * Approach: 1. On '1', grow `currentOneSequence` and reset zeros. 2. On '0', the opposite. 3. Return whether `longestOnesSegment > longestZerosSegment`.
 * Dry Run: s="110100010". Longest 1s=2, longest 0s=3 → false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var checkZeroOnes = function (s) {
  let longestOnesSegment = 0;
  let longestZerosSegment = 0;
  let currentOneSequence = 0;
  let currentZeroSequence = 0;

  for (let traversalIndex = 0; traversalIndex < s.length; traversalIndex++) {
    const characterValue = s[traversalIndex];

    if (characterValue === "1") {
      currentOneSequence++;
      currentZeroSequence = 0;
      longestOnesSegment = Math.max(longestOnesSegment, currentOneSequence);
    } else {
      currentZeroSequence++;
      currentOneSequence = 0;
      longestZerosSegment = Math.max(longestZerosSegment, currentZeroSequence);
    }
  }

  return longestOnesSegment > longestZerosSegment;
};

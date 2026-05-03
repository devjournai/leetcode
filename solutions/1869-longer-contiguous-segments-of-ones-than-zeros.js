/**
 * Longer Contiguous Segments Of Ones Than Zeros
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

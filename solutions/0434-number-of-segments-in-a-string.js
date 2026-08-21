/**
 * Number Of Segments In A String
 * Intuition: A segment starts at a non-space that follows a space (or the start of the string). Count those rising edges.
 * Approach: 1. Track `isInNonSpaceSequence`. 2. On a non-space, increment `segmentTally` only if not already in a segment, then set the flag. 3. On space, clear the flag. 4. Return the tally.
 * Dry Run: "Hello,  world". Count at 'H' and at 'w'. Spaces reset the flag. Return 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countSegments = function (s) {
  let segmentTally = 0;
  let isInNonSpaceSequence = false;
  const stringLength = s.length;

  for (
    let currentPosition = 0;
    currentPosition < stringLength;
    currentPosition++
  ) {
    const currentCharValue = s[currentPosition];

    if (currentCharValue !== " ") {
      if (!isInNonSpaceSequence) {
        segmentTally++;
        isInNonSpaceSequence = true;
      }
    } else {
      isInNonSpaceSequence = false;
    }
  }

  return segmentTally;
};

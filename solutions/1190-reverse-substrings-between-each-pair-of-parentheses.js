/**
 * Reverse Substrings Between Each Pair Of Parentheses
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseParentheses = function (s) {
  const segmentContainer = [[]];
  const inputStringLength = s.length;

  for (
    let currentPosition = 0;
    currentPosition < inputStringLength;
    currentPosition++
  ) {
    const charAtCurrentPosition = s[currentPosition];

    if (charAtCurrentPosition === "(") {
      segmentContainer.push([]);
    } else if (charAtCurrentPosition === ")") {
      const segmentToFlip = segmentContainer.pop();
      segmentToFlip.reverse();
      const currentActiveSegment =
        segmentContainer[segmentContainer.length - 1];
      for (
        let subSegmentIndex = 0;
        subSegmentIndex < segmentToFlip.length;
        subSegmentIndex++
      ) {
        currentActiveSegment.push(segmentToFlip[subSegmentIndex]);
      }
    } else {
      const currentActiveSegment =
        segmentContainer[segmentContainer.length - 1];
      currentActiveSegment.push(charAtCurrentPosition);
    }
  }

  return segmentContainer[0].join("");
};

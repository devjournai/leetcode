/**
 * Reverse Substrings Between Each Pair Of Parentheses
 * Intuition: Nested parentheses reverse nested segments; a stack of character lists reverses only the innermost list when a ')' is seen.
 * Approach: 1. Start with one empty segment. 2. '(' pushes a new list. 3. Letters append to the current list. 4. ')' pops, reverses, and appends onto the parent. 5. Join the outer list.
 * Dry Run: s = "(u(love)i)". Inner "love" reverses to "evol"; then "uevoli" reverses to "iloveu".
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

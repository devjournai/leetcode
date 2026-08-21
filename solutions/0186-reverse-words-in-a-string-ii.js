/**
 * Reverse Words In A String II
 * Intuition: Reverse the whole character array so words move to their target positions, then reverse each word in place to restore letter order. Two-pointer swaps keep extra space constant.
 * Approach: 1. Reverse the entire array. 2. Scan for spaces (and the end). 3. Reverse each word between start and the character before the space. 4. Set the next word start after the space.
 * Dry Run: s = ['t','h','e',' ','s','k','y'].
 *   - Full reverse: ['y','k','s',' ','e','h','t'].
 *   - Reverse "yks" → "sky", reverse "eht" → "the" → ['s','k','y',' ','t','h','e'].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reverseWords = function (s) {
  let initialStart = 0;
  let initialEnd = s.length - 1;

  while (initialStart < initialEnd) {
    [s[initialStart], s[initialEnd]] = [s[initialEnd], s[initialStart]];
    initialStart++;
    initialEnd--;
  }

  let currentWordBegin = 0;
  let stringLength = s.length;

  for (
    let currentPosition = 0;
    currentPosition <= stringLength;
    currentPosition++
  ) {
    if (currentPosition === stringLength || s[currentPosition] === " ") {
      let segmentLeft = currentWordBegin;
      let segmentRight = currentPosition - 1;

      while (segmentLeft < segmentRight) {
        [s[segmentLeft], s[segmentRight]] = [s[segmentRight], s[segmentLeft]];
        segmentLeft++;
        segmentRight--;
      }
      currentWordBegin = currentPosition + 1;
    }
  }
};

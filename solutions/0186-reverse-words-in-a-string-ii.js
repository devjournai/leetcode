/**
 * Reverse Words In A String II
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

/**
 * Decoded String At Index
 * Time Complexity: O(s.length)
 * Space Complexity: O(1)
 */
var decodeAtIndex = function (s, k) {
  let currentTotalLength = 0;
  let scanForwardIndex = 0;

  while (currentTotalLength < k) {
    let currentChar = s[scanForwardIndex];
    if (currentChar.charCodeAt(0) >= 97 && currentChar.charCodeAt(0) <= 122) {
      currentTotalLength++;
    } else {
      currentTotalLength *= parseInt(currentChar);
    }
    scanForwardIndex++;
  }

  let reverseTraverseIndex = scanForwardIndex - 1;
  while (true) {
    let backtrackChar = s[reverseTraverseIndex];

    k %= currentTotalLength;
    if (k === 0) {
      k = currentTotalLength;
    }

    if (
      backtrackChar.charCodeAt(0) >= 97 &&
      backtrackChar.charCodeAt(0) <= 122
    ) {
      if (k === currentTotalLength) {
        return backtrackChar;
      }
      currentTotalLength--;
    } else {
      currentTotalLength /= parseInt(backtrackChar);
    }
    reverseTraverseIndex--;
  }
};

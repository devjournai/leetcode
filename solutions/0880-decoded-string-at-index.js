/**
 * Decoded String At Index
 * Intuition: The decoded tape is too long to build. Grow `currentTotalLength` until it covers `k`, then walk `s` backward, shrinking length and reducing `k` modulo the current tape size until the k-th character is a letter.
 * Approach: 1. Forward: letters add 1 to length; digits multiply length; stop once length ≥ k. 2. Backward from that index: `k %= currentTotalLength`, then if k is 0 set k to the full length. 3. If the char is a letter and `k === currentTotalLength`, return it; else decrement length. 4. If it is a digit, divide length by that digit.
 * Dry Run: s = "leet2code3", k = 10.
 *   - Forward: length becomes 4, 8, then 12 ≥ 10. Backward undoes digits/letters until k lands on letter 'o'. Return "o".
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

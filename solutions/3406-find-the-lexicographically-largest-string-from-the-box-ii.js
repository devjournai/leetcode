/**
 * Find the Lexicographically Largest String From the Box II
 * Intuition: Same split as Box I, but n is large so we must find the lexicographically last substring in linear time (problem 1163) instead of comparing every suffix.
 * Approach: 1. If one friend, return word. 2. Two-pointer last-substring scan. 3. Clip to length n - numFriends + 1.
 * Dry Run: word = "gh", numFriends = 1 → "gh". numFriends = 2 → last substring "h" clipped to length 1 → "h".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var answerString = function (word, numFriends) {
  if (numFriends === 1) {
    return word;
  }

  const lastSubstring = (text) => {
    let leftIndex = 0;
    let rightIndex = 1;
    let matchLength = 0;

    while (rightIndex + matchLength < text.length) {
      if (text[leftIndex + matchLength] === text[rightIndex + matchLength]) {
        matchLength++;
      } else if (
        text[leftIndex + matchLength] > text[rightIndex + matchLength]
      ) {
        rightIndex = rightIndex + matchLength + 1;
        matchLength = 0;
      } else {
        leftIndex = Math.max(leftIndex + matchLength + 1, rightIndex);
        rightIndex = leftIndex + 1;
        matchLength = 0;
      }
    }

    return text.slice(leftIndex);
  };

  const lastPiece = lastSubstring(word);
  const maximumPieceLength = word.length - numFriends + 1;
  return lastPiece.slice(0, Math.min(lastPiece.length, maximumPieceLength));
};

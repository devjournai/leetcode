/**
 * Find the Lexicographically Largest String From the Box I
 * Intuition: Splitting `word` into `numFriends` nonempty pieces, the best box string is a substring of `word`. The longest allowed piece is `word.length - numFriends + 1`. Among candidates, the last substring in lex order (Duval / 1163) is optimal; take a prefix of that length.
 * Approach: 1. If `numFriends === 1` return the whole word. 2. Find the lexicographically last suffix with two pointers i/j/k. 3. Return that suffix clipped to length `n - numFriends + 1`.
 * Dry Run: word = "dbca", numFriends = 2. Max piece length 3. Last substring "dbca" clipped to "dbc".
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

/**
 * Rearrange Words In A Sentence
 * Intuition: Stable-group words by length so original order among equal lengths is kept, then lowercase everything and capitalize the first character.
 * Approach: 1. Split on spaces. 2. Bucket words by length. 3. Concatenate buckets from length 1 upward. 4. Join, toLowerCase, uppercase char 0, return.
 * Dry Run: text = "Leetcode is cool"
 *   - lengths: is(2), cool(4), Leetcode(8) preserving order within length
 *   - "is cool leetcode" -> "Is cool leetcode"
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var arrangeWords = function (text) {
  let initialSegments = text.split(" ");
  let greatestWordLength = 0;

  for (let currentPiece of initialSegments) {
    if (currentPiece.length > greatestWordLength) {
      greatestWordLength = currentPiece.length;
    }
  }

  let lengthGroupedElements = new Array(greatestWordLength + 1)
    .fill(null)
    .map(() => []);

  for (let wordEntity of initialSegments) {
    lengthGroupedElements[wordEntity.length].push(wordEntity);
  }

  let rearrangedOrder = [];
  for (
    let groupIterator = 1;
    groupIterator <= greatestWordLength;
    ++groupIterator
  ) {
    let currentWordCollection = lengthGroupedElements[groupIterator];
    if (currentWordCollection.length > 0) {
      for (let memberOfCollection of currentWordCollection) {
        rearrangedOrder.push(memberOfCollection);
      }
    }
  }

  let combinedWordsString = rearrangedOrder.join(" ");
  let entirelyLowercaseString = combinedWordsString.toLowerCase();

  let firstCharacterUpper = entirelyLowercaseString.charAt(0).toUpperCase();
  let subsequentCharacters = entirelyLowercaseString.slice(1);

  let resultSentence = firstCharacterUpper + subsequentCharacters;

  return resultSentence;
};

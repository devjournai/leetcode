/**
 * Maximum Number Of Words You Can Type
 * Intuition: A word is typeable iff none of its letters is in the broken-letter set. Count such words after splitting on spaces.
 * Approach: 1. Put `brokenLetters` into a Set. 2. Split `text` on spaces. 3. For each word, scan characters; if any is broken, skip, else increment `typedWordsCount`. 4. Return the count.
 * Dry Run: text = "hello world", brokenLetters = "ad".
 *   - hello: no a/d → count=1
 *   - world: has d → skip. Return 1.
 * Time Complexity: O(N + L)
 * Space Complexity: O(N + L)
 */
var canBeTypedWords = function (text, brokenLetters) {
  const brokenLettersSet = new Set(brokenLetters);
  const textWordsArray = text.split(" ");
  let typedWordsCount = 0;

  textWordsArray.forEach((currentWord) => {
    let isWordBroken = false;
    for (const wordCharacter of currentWord) {
      if (brokenLettersSet.has(wordCharacter)) {
        isWordBroken = true;
        break;
      }
    }
    if (!isWordBroken) {
      typedWordsCount++;
    }
  });

  return typedWordsCount;
};

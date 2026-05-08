/**
 * Maximum Number Of Words You Can Type
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

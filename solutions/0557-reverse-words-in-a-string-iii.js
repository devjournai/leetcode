/**
 * Reverse Words In A String III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseWords = function (str) {
  const stringLength = str.length;
  const charCollection = Array.from(str);

  let currentWordStart = 0;

  for (let mainIndex = 0; mainIndex <= stringLength; mainIndex++) {
    if (mainIndex === stringLength || charCollection[mainIndex] === " ") {
      let reverseHead = currentWordStart;
      let reverseTail = mainIndex - 1;

      while (reverseHead < reverseTail) {
        let temporaryCharacter = charCollection[reverseHead];
        charCollection[reverseHead] = charCollection[reverseTail];
        charCollection[reverseTail] = temporaryCharacter;

        reverseHead++;
        reverseTail--;
      }

      currentWordStart = mainIndex + 1;
    }
  }

  const processedSentence = charCollection.join("");
  return processedSentence;
};

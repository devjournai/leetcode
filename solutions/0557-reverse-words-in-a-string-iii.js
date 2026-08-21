/**
 * Reverse Words In A String III
 * Intuition: Reverse each space-delimited word in place; spaces stay. Scan until space or end, two-pointer reverse that slice, then start the next word after the space.
 * Approach: 1. Copy `str` to `charCollection`. 2. Track `currentWordStart`. 3. When index hits space or length, reverse `[currentWordStart, index-1]`. 4. Set next start to index+1. 5. Join and return.
 * Dry Run: str = "Let's take LeetCode contest".
 *   - Reverse Let's → s'teL; take → ekat; etc. Result "s'teL ekat edoCteeL tsetnoc".
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

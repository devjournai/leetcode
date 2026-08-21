/**
 * Minimum Remove To Make Valid Parentheses
 * Intuition: Drop extra closing parentheses on a left-to-right pass, then drop leftover opening parentheses on a right-to-left pass. Letters always stay.
 * Approach: 1. Split s. 2. Forward: keep '(', count opens; keep ')' only if an open is unmatched; always keep letters. 3. Backward: keep ')', count closes; keep '(' only while closes remain. 4. Reverse the second list and join.
 * Dry Run: s = "lee(t(c)o)de)"
 *   Forward keeps all letters and matched pairs, drops the last ')'. Remaining still balanced.
 *   Backward finds no extra '('. Result "lee(t(c)o)de".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minRemoveToMakeValid = function (s) {
  const sourceStringArray = s.split("");
  const processedCharactersList = [];
  let openParenthesesCount = 0;

  for (
    let characterIndex = 0;
    characterIndex < sourceStringArray.length;
    characterIndex++
  ) {
    const currentChar = sourceStringArray[characterIndex];
    if (currentChar === "(") {
      processedCharactersList.push(currentChar);
      openParenthesesCount++;
    } else if (currentChar === ")") {
      if (openParenthesesCount > 0) {
        processedCharactersList.push(currentChar);
        openParenthesesCount--;
      }
    } else {
      processedCharactersList.push(currentChar);
    }
  }

  const finalResultList = [];
  let closeParenthesesCount = 0;

  for (
    let reverseIndex = processedCharactersList.length - 1;
    reverseIndex >= 0;
    reverseIndex--
  ) {
    const currentProcessingChar = processedCharactersList[reverseIndex];
    if (currentProcessingChar === ")") {
      finalResultList.push(currentProcessingChar);
      closeParenthesesCount++;
    } else if (currentProcessingChar === "(") {
      if (closeParenthesesCount > 0) {
        finalResultList.push(currentProcessingChar);
        closeParenthesesCount--;
      }
    } else {
      finalResultList.push(currentProcessingChar);
    }
  }

  return finalResultList.reverse().join("");
};

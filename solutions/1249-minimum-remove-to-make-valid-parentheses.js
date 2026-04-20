/**
 * Minimum Remove To Make Valid Parentheses
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

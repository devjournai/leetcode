/**
 * Bold Words In String
 * Time Complexity: O(W * L * M)
 * Space Complexity: O(L)
 */
var boldWords = function (keywordList, targetString) {
  const stringLength = targetString.length;
  const boldMarker = new Array(stringLength).fill(false);

  for (const currentWord of keywordList) {
    let currentSearchPosition = targetString.indexOf(currentWord);
    while (currentSearchPosition !== -1) {
      const wordEndPosition = currentSearchPosition + currentWord.length;
      for (
        let boldIndex = currentSearchPosition;
        boldIndex < wordEndPosition;
        boldIndex++
      ) {
        boldMarker[boldIndex] = true;
      }
      currentSearchPosition = targetString.indexOf(
        currentWord,
        currentSearchPosition + 1,
      );
    }
  }

  const outputCollector = [];
  let isCurrentlyBold = false;

  for (let charIndex = 0; charIndex < stringLength; charIndex++) {
    if (boldMarker[charIndex] && !isCurrentlyBold) {
      outputCollector.push("<b>");
      isCurrentlyBold = true;
    } else if (!boldMarker[charIndex] && isCurrentlyBold) {
      outputCollector.push("</b>");
      isCurrentlyBold = false;
    }
    outputCollector.push(targetString[charIndex]);
  }

  if (isCurrentlyBold) {
    outputCollector.push("</b>");
  }

  return outputCollector.join("");
};

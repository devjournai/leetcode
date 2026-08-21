/**
 * Bold Words In String
 * Intuition: Mark every index of `targetString` that sits inside any occurrence of a keyword, then wrap contiguous marked runs with `<b>` / `</b>`.
 * Approach: 1. `boldMarker` is a boolean array of length L. 2. For each `currentWord`, repeatedly `indexOf` from the last match + 1 and set those indices true. 3. Scan the string: on entering a marked run push `"<b>"`; on leaving push `"</b>"`; always push the character. 4. Close a trailing open tag. Join `outputCollector`.
 * Dry Run: keywordList = ["ab","bc"], targetString = "aabcd".
 *   - "ab" marks indices 1–2; "bc" marks 2–3. Marker: F T T T F.
 *   - Output: a + <b> + a b c + </b> + d → "a<b>abc</b>d".
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
        currentSearchPosition + 1
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

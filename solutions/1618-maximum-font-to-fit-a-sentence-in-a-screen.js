/**
 * Maximum Font To Fit A Sentence In A Screen
 * Time Complexity: O(L * log N)
 * Space Complexity: O(1)
 */
var maxFont = function (text, w, h, fonts, fontInfo) {
  let lowerIndex = 0;
  let upperIndex = fonts.length - 1;
  let fittingFontSize = -1;

  while (lowerIndex <= upperIndex) {
    const midpointIndex =
      lowerIndex + Math.floor((upperIndex - lowerIndex) / 2);
    const testedSize = fonts[midpointIndex];

    if (checkFontCompatibility(testedSize, text, w, h, fontInfo)) {
      fittingFontSize = testedSize;
      lowerIndex = midpointIndex + 1;
    } else {
      upperIndex = midpointIndex - 1;
    }
  }

  return fittingFontSize;
};

function checkFontCompatibility(
  candidateSize,
  messageText,
  screenWidth,
  screenHeight,
  fontSource,
) {
  const currentHeightRequirement = fontSource.getHeight(candidateSize);
  if (currentHeightRequirement > screenHeight) {
    return false;
  }

  let accumulatedWidth = 0;
  for (
    let characterIterator = 0;
    characterIterator < messageText.length;
    ++characterIterator
  ) {
    const charValue = messageText[characterIterator];
    const charWidth = fontSource.getWidth(candidateSize, charValue);
    accumulatedWidth += charWidth;

    if (accumulatedWidth > screenWidth) {
      return false;
    }
  }

  return true;
}

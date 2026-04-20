/**
 * Stickers To Spell Word
 * Time Complexity: O(2^T * N * T)
 * Space Complexity: O(2^T + N * 26)
 */
var minStickers = function (stickers, target) {
  const targetLength = target.length;
  const targetMaskSize = 1 << targetLength;
  const dpStickerCounts = new Array(targetMaskSize).fill(Infinity);

  const stickerLetterFrequencies = [];
  for (const singleSticker of stickers) {
    const currentStickerFrequency = new Array(26).fill(0);
    for (const stickerChar of singleSticker) {
      currentStickerFrequency[stickerChar.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    stickerLetterFrequencies.push(currentStickerFrequency);
  }

  dpStickerCounts[0] = 0;

  for (
    let currentMaskIteration = 0;
    currentMaskIteration < targetMaskSize;
    ++currentMaskIteration
  ) {
    if (dpStickerCounts[currentMaskIteration] === Infinity) {
      continue;
    }

    let firstOpenIndex = -1;
    for (let k = 0; k < targetLength; ++k) {
      if (!((currentMaskIteration >> k) & 1)) {
        firstOpenIndex = k;
        break;
      }
    }

    if (firstOpenIndex === -1) {
      continue;
    }

    const charToCover = target[firstOpenIndex];
    const charCodeToCover = charToCover.charCodeAt(0) - "a".charCodeAt(0);

    for (
      let stickerIterator = 0;
      stickerIterator < stickerLetterFrequencies.length;
      ++stickerIterator
    ) {
      const currentStickerFrequencyArray =
        stickerLetterFrequencies[stickerIterator];

      if (currentStickerFrequencyArray[charCodeToCover] === 0) {
        continue;
      }

      let nextTargetMask = currentMaskIteration;
      const tempStickerFrequencyContainer = [...currentStickerFrequencyArray];

      for (
        let characterPosition = 0;
        characterPosition < targetLength;
        ++characterPosition
      ) {
        if (!((nextTargetMask >> characterPosition) & 1)) {
          const targetCharacterAtPosition = target[characterPosition];
          const targetCharacterCodeAtPosition =
            targetCharacterAtPosition.charCodeAt(0) - "a".charCodeAt(0);

          if (
            tempStickerFrequencyContainer[targetCharacterCodeAtPosition] > 0
          ) {
            tempStickerFrequencyContainer[targetCharacterCodeAtPosition]--;
            nextTargetMask |= 1 << characterPosition;
          }
        }
      }

      if (nextTargetMask !== currentMaskIteration) {
        dpStickerCounts[nextTargetMask] = Math.min(
          dpStickerCounts[nextTargetMask],
          dpStickerCounts[currentMaskIteration] + 1,
        );
      }
    }
  }

  const finalAnswer = dpStickerCounts[targetMaskSize - 1];
  return finalAnswer === Infinity ? -1 : finalAnswer;
};

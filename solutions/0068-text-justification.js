/**
 * Text Justification
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var fullJustify = function (words, maxWidth) {
  const resultLinesCollection = [];
  let currentLineWordsBuffer = [];
  let charsInCurrentBuffer = 0;
  let wordIndexProgress = 0;

  while (wordIndexProgress < words.length) {
    const nextWordCandidate = words[wordIndexProgress];

    const hypotheticalTotalLength =
      charsInCurrentBuffer +
      nextWordCandidate.length +
      (currentLineWordsBuffer.length === 0 ? 0 : currentLineWordsBuffer.length);

    if (hypotheticalTotalLength <= maxWidth) {
      currentLineWordsBuffer.push(nextWordCandidate);
      charsInCurrentBuffer += nextWordCandidate.length;
    } else {
      resultLinesCollection.push(currentLineWordsBuffer);
      currentLineWordsBuffer = [nextWordCandidate];
      charsInCurrentBuffer = nextWordCandidate.length;
    }
    wordIndexProgress++;
  }

  if (currentLineWordsBuffer.length > 0) {
    resultLinesCollection.push(currentLineWordsBuffer);
  }

  const finalJustifiedOutput = [];
  let lineProcessorIndex = 0;

  while (lineProcessorIndex < resultLinesCollection.length) {
    const lineWordsArray = resultLinesCollection[lineProcessorIndex];
    const wordsOnThisLineCount = lineWordsArray.length;
    let totalCharactersInWords = 0;

    let charSumIterator = 0;
    while (charSumIterator < wordsOnThisLineCount) {
      totalCharactersInWords += lineWordsArray[charSumIterator].length;
      charSumIterator++;
    }

    if (
      lineProcessorIndex === resultLinesCollection.length - 1 ||
      wordsOnThisLineCount === 1
    ) {
      const leftJustifiedSegment = lineWordsArray.join(" ");
      const additionalSpacesNeeded = maxWidth - leftJustifiedSegment.length;
      finalJustifiedOutput.push(
        leftJustifiedSegment + " ".repeat(additionalSpacesNeeded),
      );
    } else {
      const totalSpacesToDistribute = maxWidth - totalCharactersInWords;
      const numberOfGaps = wordsOnThisLineCount - 1;

      const baseSpacesPerGap = Math.floor(
        totalSpacesToDistribute / numberOfGaps,
      );
      let extraSpacesForLeftGaps = totalSpacesToDistribute % numberOfGaps;

      let constructedLineString = lineWordsArray[0];
      let wordPositionInLine = 1;

      while (wordPositionInLine < wordsOnThisLineCount) {
        let currentGapSpaces = baseSpacesPerGap;
        if (extraSpacesForLeftGaps > 0) {
          currentGapSpaces++;
          extraSpacesForLeftGaps--;
        }
        constructedLineString +=
          " ".repeat(currentGapSpaces) + lineWordsArray[wordPositionInLine];
        wordPositionInLine++;
      }
      finalJustifiedOutput.push(constructedLineString);
    }
    lineProcessorIndex++;
  }

  return finalJustifiedOutput;
};

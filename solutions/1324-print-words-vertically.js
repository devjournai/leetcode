/**
 * Print Words Vertically
 * Time Complexity: O(N + W * L)
 * Space Complexity: O(N + W * L)
 */
var printVertically = function (s) {
  const splitWordsCollection = s.split(" ");

  let greatestLength = 0;
  let wordLengthScanner = 0;
  for (; wordLengthScanner < splitWordsCollection.length; wordLengthScanner++) {
    if (splitWordsCollection[wordLengthScanner].length > greatestLength) {
      greatestLength = splitWordsCollection[wordLengthScanner].length;
    }
  }

  const verticalResultContainers = Array.from(
    { length: greatestLength },
    () => [],
  );

  let rowIterativeIndex = 0;
  for (; rowIterativeIndex < greatestLength; rowIterativeIndex++) {
    let currentWordPosition = 0;
    for (
      ;
      currentWordPosition < splitWordsCollection.length;
      currentWordPosition++
    ) {
      const currentWordString = splitWordsCollection[currentWordPosition];
      if (rowIterativeIndex < currentWordString.length) {
        verticalResultContainers[rowIterativeIndex].push(
          currentWordString[rowIterativeIndex],
        );
      } else {
        verticalResultContainers[rowIterativeIndex].push(" ");
      }
    }
  }

  const finalOutputLines = new Array(greatestLength);
  let lineProcessorIndex = 0;
  for (; lineProcessorIndex < greatestLength; lineProcessorIndex++) {
    const characterSegment = verticalResultContainers[lineProcessorIndex];
    let assembledLine = "";
    let characterConcatenator = 0;
    while (characterConcatenator < characterSegment.length) {
      assembledLine += characterSegment[characterConcatenator];
      characterConcatenator++;
    }

    let lineForTrimming = assembledLine;
    let trailingSpaceRemover = lineForTrimming.length - 1;
    while (
      trailingSpaceRemover >= 0 &&
      lineForTrimming[trailingSpaceRemover] === " "
    ) {
      trailingSpaceRemover--;
    }
    finalOutputLines[lineProcessorIndex] = lineForTrimming.substring(
      0,
      trailingSpaceRemover + 1,
    );
  }

  return finalOutputLines;
};

/**
 * Print Words Vertically
 * Intuition: Treat words as columns of a ragged matrix and read by row, trimming trailing spaces per row.
 * Approach: 1. Split on spaces; find max word length L. 2. For row r in 0..L-1, take char r of each word or a space. 3. Strip trailing spaces. 4. Return the L strings.
 * Dry Run: s = "HOW ARE YOU". Rows "HAY", "ORO", "WEU".
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
    () => []
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
          currentWordString[rowIterativeIndex]
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
      trailingSpaceRemover + 1
    );
  }

  return finalOutputLines;
};

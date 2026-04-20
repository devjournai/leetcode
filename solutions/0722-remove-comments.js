/**
 * Remove Comments
 * Time Complexity: O(TotalChars)
 * Space Complexity: O(TotalChars)
 */
var removeComments = function (source) {
  const processedCodeLines = [];
  let segmentBuilder = [];
  let blockCommentInProgress = false;

  for (const processingLine of source) {
    let currentLineScanIndex = 0;
    while (currentLineScanIndex < processingLine.length) {
      if (blockCommentInProgress) {
        if (
          currentLineScanIndex + 1 < processingLine.length &&
          processingLine[currentLineScanIndex] === "*" &&
          processingLine[currentLineScanIndex + 1] === "/"
        ) {
          blockCommentInProgress = false;
          currentLineScanIndex += 2;
        } else {
          currentLineScanIndex++;
        }
      } else {
        if (
          currentLineScanIndex + 1 < processingLine.length &&
          processingLine[currentLineScanIndex] === "/" &&
          processingLine[currentLineScanIndex + 1] === "/"
        ) {
          currentLineScanIndex = processingLine.length;
        } else if (
          currentLineScanIndex + 1 < processingLine.length &&
          processingLine[currentLineScanIndex] === "/" &&
          processingLine[currentLineScanIndex + 1] === "*"
        ) {
          blockCommentInProgress = true;
          currentLineScanIndex += 2;
        } else {
          segmentBuilder.push(processingLine[currentLineScanIndex]);
          currentLineScanIndex++;
        }
      }
    }

    if (!blockCommentInProgress && segmentBuilder.length > 0) {
      processedCodeLines.push(segmentBuilder.join(""));
      segmentBuilder = [];
    }
  }

  return processedCodeLines;
};

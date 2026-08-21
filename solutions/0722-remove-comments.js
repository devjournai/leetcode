/**
 * Remove Comments
 * Intuition: Scan source as a stream, tracking whether a block comment is open. Line comments discard the rest of the line; block comments can span lines. Keep `segmentBuilder` across lines until a block closes so glued code stays one line.
 * Approach: 1. For each line, walk indices. 2. If a block comment is open, look for the closer else skip. 3. Else a line comment ends the line, a block opener starts a block, otherwise push the char. 4. After a line, if not in a block and the builder is nonempty, emit the joined line and reset.
 * Dry Run: `int a;` then a block comment then `int b;` becomes `int a;  int b;`. An unclosed block holds the builder until it ends.
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

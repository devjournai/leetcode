/**
 * Reorder Data In Log Files
 * Time Complexity: O(N * L * log N)
 * Space Complexity: O(N * L)
 */
var reorderLogFiles = function (logs) {
  let letterLogCollection = [];
  let digitLogCollection = [];

  for (let currentLogEntry of logs) {
    let firstSpaceIndex = currentLogEntry.indexOf(" ");
    let logIdentifier = currentLogEntry.substring(0, firstSpaceIndex);
    let logBody = currentLogEntry.substring(firstSpaceIndex + 1);

    let firstCharOfBody = logBody.charCodeAt(0);

    if (firstCharOfBody >= 48 && firstCharOfBody <= 57) {
      digitLogCollection.push(currentLogEntry);
    } else {
      letterLogCollection.push({
        fullLog: currentLogEntry,
        identifierPart: logIdentifier,
        contentPart: logBody,
      });
    }
  }

  letterLogCollection.sort((logA, logB) => {
    let contentComparisonResult = logA.contentPart.localeCompare(
      logB.contentPart,
    );
    if (contentComparisonResult !== 0) {
      return contentComparisonResult;
    }
    return logA.identifierPart.localeCompare(logB.identifierPart);
  });

  let reorderedLetterLogs = letterLogCollection.map(
    (logObject) => logObject.fullLog,
  );

  return [...reorderedLetterLogs, ...digitLogCollection];
};

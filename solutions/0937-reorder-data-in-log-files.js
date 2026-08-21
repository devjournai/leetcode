/**
 * Reorder Data In Log Files
 * Intuition: Digit logs stay in original order after all letter logs. Letter logs sort by body, then identifier.
 * Approach: 1. Split on first space; if body starts with a digit (code 48–57), keep in `digitLogCollection`. 2. Else store {fullLog, identifierPart, contentPart}. 3. Sort letter logs with localeCompare on content then id. 4. Concatenate mapped letter logs + digit logs.
 * Dry Run: ["dig1 8 1","let1 art can","dig2 3 6","let2 own kit"] → letter "art can" then "own kit", then the two digit logs in input order.
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
      logB.contentPart
    );
    if (contentComparisonResult !== 0) {
      return contentComparisonResult;
    }
    return logA.identifierPart.localeCompare(logB.identifierPart);
  });

  let reorderedLetterLogs = letterLogCollection.map(
    (logObject) => logObject.fullLog
  );

  return [...reorderedLetterLogs, ...digitLogCollection];
};
